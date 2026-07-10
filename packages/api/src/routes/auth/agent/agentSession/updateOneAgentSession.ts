import { models, updateOneAgentSessionRouteDefinition } from "@arrhes/application-metadata"
import { and, eq, inArray } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { processOcr } from "../../../../utilities/ocr/processOcr.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const updateOneAgentSessionRoute = apiFactory
    .createApp()
    .patch(updateOneAgentSessionRouteDefinition.path, async (c) => {
        const { user } = await checkAuthMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateOneAgentSessionRouteDefinition.schemas.body,
        })

        const session = await selectOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => and(eq(table.id, body.idAgentSession), eq(table.idUser, user.id)),
        })

        const data: Record<string, unknown> = {
            lastUpdatedAt: new Date().toISOString(),
        }

        if (body.idYear !== undefined) {
            data.idYear = body.idYear
        }
        if (body.customInstructions !== undefined) {
            data.customInstructions = body.customInstructions
        }

        // Process file attachments: the client sends the full desired list of fileIds
        if (body.fileIds !== undefined) {
            if (body.fileIds === null || body.fileIds.length === 0) {
                data.attachedFiles = null
            } else {
                const files = await c.var.clients.sql
                    .select()
                    .from(models.file)
                    .where(
                        and(
                            eq(models.file.idOrganization, session.idOrganization),
                            inArray(models.file.id, body.fileIds),
                        ),
                    )

                if (files.length !== body.fileIds.length) {
                    throw new Exception({
                        statusCode: 400,
                        internalMessage: "Some file IDs not found",
                        externalMessage: "Certains fichiers sont introuvables",
                    })
                }

                // Reuse existing attachedFiles entries that haven't changed
                const existingAttached = (session.attachedFiles ?? []) as Array<{
                    idFile: string
                    name: string
                    mimeType: string
                    idOcrFile: string | null
                }>
                const existingMap = new Map(
                    existingAttached.map((f) => [
                        f.idFile,
                        f,
                    ]),
                )

                const attachedFiles: Array<{
                    idFile: string
                    name: string
                    mimeType: string
                    idOcrFile: string | null
                }> = []

                for (const file of files) {
                    // If this file was already processed, keep the existing entry
                    const existing = existingMap.get(file.id)
                    if (existing) {
                        attachedFiles.push(existing)
                        continue
                    }

                    const mimeType = file.type ?? "application/octet-stream"
                    const needsOcr = mimeType.startsWith("image/") || mimeType === "application/pdf"
                    const isTextLike =
                        mimeType.startsWith("text/") ||
                        mimeType === "application/json" ||
                        mimeType === "application/xml" ||
                        mimeType === "application/csv"

                    if (needsOcr) {
                        try {
                            const { ocrFile } = await processOcr({
                                var: c.var,
                                idOrganization: session.idOrganization,
                                idYear: session.idYear ?? "",
                                idUser: user.id,
                                sourceFile: file,
                            })
                            attachedFiles.push({
                                idFile: file.id,
                                name: file.name ?? "fichier",
                                mimeType,
                                idOcrFile: ocrFile.id,
                            })
                        } catch {
                            attachedFiles.push({
                                idFile: file.id,
                                name: file.name ?? "fichier",
                                mimeType,
                                idOcrFile: null,
                            })
                        }
                    } else if (isTextLike) {
                        attachedFiles.push({
                            idFile: file.id,
                            name: file.name ?? "fichier",
                            mimeType,
                            idOcrFile: null,
                        })
                    }
                }

                data.attachedFiles = attachedFiles.length > 0 ? attachedFiles : null
            }
        }

        const updated = await updateOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            data,
            where: (table) => and(eq(table.id, body.idAgentSession), eq(table.idUser, user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateOneAgentSessionRouteDefinition.schemas.return,
            data: updated,
        })
    })
