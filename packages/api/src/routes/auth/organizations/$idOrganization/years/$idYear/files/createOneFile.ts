import { createOneFileRouteDefinition, generateId, models } from "@comptasse/application-metadata"
import { eq, and, sql } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../../../utilities/sql/updateOne.js"
import { putObject } from "../../../../../../../utilities/storage/putObject.js"
import { Exception } from "../../../../../../../utilities/exception.js"

export const createOneFileRoute = registerRoute(createOneFileRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })

    const formData = await c.req.formData()

    const name = formData.get("name")?.toString() ?? ""
    const reference = formData.get("reference")?.toString() ?? null
    const hash = formData.get("hash")?.toString() ?? null
    const idFolder = formData.get("idFolder")?.toString() ?? null
    const file = formData.get("file") as File | null

    if (!file) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "File content is required",
            externalMessage: "Le contenu du fichier est requis",
        })
    }

    if (hash) {
        try {
            const existingFile = await selectOne({
                database: c.var.clients.sql,
                table: models.file,
                where: (table) =>
                    and(eq(table.idOrganization, idOrganization), eq(table.hash, hash)),
            })
            return response({
                context: c,
                statusCode: 200,
                schema: createOneFileRouteDefinition.schemas.return,
                data: existingFile,
            })
        } catch {}
    }

    const storageKey = `organizations/${idOrganization}/storage/${generateId()}`
    const contentType = file.type || "application/octet-stream"
    const size = file.size
    const buffer = Buffer.from(await file.arrayBuffer())

    await putObject({
        var: c.var,
        storageKey,
        contentLength: size,
        contentType,
        metadata: {
            idOrganization,
            idUser: auth.user.id,
        },
        body: buffer,
    })

    const createdFile = await c.var.clients.sql.transaction(async (tx) => {
        const created = await insertOne({
            database: tx,
            table: models.file,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idFolder: idFolder,
                reference: reference,
                name: name,
                storageKey: storageKey,
                type: contentType,
                size: size,
                hash: hash,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: auth.user.id,
                lastUpdatedBy: null,
            },
        })

        await updateOne({
            database: tx,
            table: models.organization,
            data: {
                storageCurrentUsage: sql`${models.organization.storageCurrentUsage} + ${size}`,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        return created
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneFileRouteDefinition.schemas.return,
        data: createdFile,
    })
})
