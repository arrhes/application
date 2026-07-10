import { generateId, models, ocrFileRouteDefinition } from "@arrhes/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"
import { getObject } from "../../../../../../../../utilities/storage/getObject.js"
import { getOrganizationS3Client } from "../../../../../../../../utilities/storage/getOrganizationS3Client.js"
import { putObject } from "../../../../../../../../utilities/storage/putObject.js"

function fixCommonMojibake(text: string) {
    // Heuristic: repair common UTF-8 text interpreted as Latin-1 (e.g. "NumÃ©ro" -> "Numéro").
    if (!/[Ãâ€]/.test(text)) {
        return text
    }

    const repaired = Buffer.from(text, "latin1").toString("utf-8")
    return repaired.includes("�") ? text : repaired
}

export const ocrFileRoute = registerRoute(ocrFileRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: ocrFileRouteDefinition.schemas.body,
    })
    const sourceFile = await selectOne({
        database: c.var.clients.sql,
        table: models.file,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idFile)),
    })

    if (sourceFile.storageKey === null) {
        throw new Exception({
            internalMessage: "File has no storage key",
            statusCode: 400,
            externalMessage: "Le fichier source n'a pas de contenu associé",
        })
    }

    const organization = await selectOne({
        database: c.var.clients.sql,
        table: models.organization,
        where: (table) => eq(table.id, idOrganization),
    })

    const s3Client =
        organization.storageEndpoint && organization.storageAccessKey && organization.storageSecretKey
            ? getOrganizationS3Client(organization)
            : undefined
    const bucketName = organization.storageBucketName ?? undefined

    const storageResponse = await getObject({
        var: c.var,
        s3Client,
        bucketName,
        storageKey: sourceFile.storageKey,
    })

    const fileBytes = await storageResponse.Body?.transformToByteArray()
    if (!fileBytes) {
        throw new Exception({
            internalMessage: "Failed to read file from storage",
            statusCode: 500,
            externalMessage: "Impossible de lire le fichier source",
        })
    }

    const base64Content = Buffer.from(fileBytes).toString("base64")
    const mimeType = sourceFile.type ?? "application/octet-stream"
    const isImage = mimeType.startsWith("image/")
    const isPdf = mimeType === "application/pdf"

    if (!isImage && !isPdf) {
        throw new Exception({
            internalMessage: `Unsupported OCR file type: ${mimeType}`,
            statusCode: 400,
            externalMessage: "Le format du fichier n'est pas compatible avec l'OCR (image ou PDF uniquement)",
        })
    }

    const dataUri = `data:${mimeType};base64,${base64Content}`

    const mistralApiKey = c.var.env.LLM_API_KEY
    if (!mistralApiKey) {
        throw new Exception({
            internalMessage: "LLM_API_KEY is not configured",
            statusCode: 500,
            externalMessage: "La clé API Mistral n'est pas configurée",
        })
    }

    const document = isImage
        ? {
              type: "image_url" as const,
              image_url: dataUri,
          }
        : {
              type: "document_url" as const,
              document_url: dataUri,
          }

    const ocrResponse = await fetch("https://api.mistral.ai/v1/ocr", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${mistralApiKey}`,
        },
        body: JSON.stringify({
            model: "mistral-ocr-latest",
            document,
        }),
    })

    if (!ocrResponse.ok) {
        const errorText = await ocrResponse.text().catch(() => "")
        throw new Exception({
            internalMessage: `Mistral OCR error: ${ocrResponse.status} ${errorText}`,
            statusCode: 500,
            externalMessage: "Erreur lors de l'extraction de texte",
        })
    }

    const ocrResult = (await ocrResponse.json()) as {
        pages?: Array<{
            markdown: string
        }>
    }

    const extractedPagesCount = ocrResult.pages?.length ?? 0
    if (extractedPagesCount <= 0) {
        throw new Exception({
            internalMessage: "Mistral OCR returned no pages",
            statusCode: 500,
            externalMessage: "L'extraction OCR n'a retourné aucune page",
        })
    }

    const markdownContent = ocrResult.pages?.map((p) => p.markdown).join("\n\n---\n\n")
    if (!markdownContent) {
        throw new Exception({
            internalMessage: "Mistral OCR returned no content",
            statusCode: 500,
            externalMessage: "L'extraction de texte n'a retourné aucun résultat",
        })
    }

    const normalizedMarkdownContent = fixCommonMojibake(markdownContent)

    const markdownBuffer = Buffer.from(normalizedMarkdownContent, "utf-8")
    const newFileId = generateId()
    const originalName = sourceFile.name || sourceFile.reference || "document"
    const baseName = originalName.replace(/\.[^.]+$/, "")
    const markdownName = `${baseName}.md`
    const storageKey = `organizations/${idOrganization}/storage/${newFileId}`

    const newFile = await insertOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            id: newFileId,
            idOrganization: idOrganization,
            idFolder: sourceFile.idFolder,
            reference: sourceFile.reference,
            name: markdownName,
            storageKey: storageKey,
            type: "text/markdown",
            size: markdownBuffer.length,
            createdAt: new Date().toISOString(),
            createdBy: auth.user.id,
        },
    })

    await putObject({
        var: c.var,
        s3Client,
        bucketName,
        storageKey: storageKey,
        contentLength: markdownBuffer.length,
        contentType: "text/markdown; charset=utf-8",
        metadata: {
            idOrganization: idOrganization,
            idUser: auth.user.id,
        },
        body: markdownBuffer,
    })

    await updateOne({
        database: c.var.clients.sql,
        table: models.organization,
        data: {
            storageCurrentUsage: sql`${models.organization.storageCurrentUsage} + ${markdownBuffer.length}`,
        },
        where: (table) => eq(table.id, idOrganization),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: ocrFileRouteDefinition.schemas.return,
        data: {
            file: newFile,
        },
    })
})
