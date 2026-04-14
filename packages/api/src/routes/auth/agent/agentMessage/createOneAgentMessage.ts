import {
    createOneAgentMessageRouteDefinition,
    generateId,
    getCurrentMonthStartISO,
    isUsageMonthOutdated,
    models,
    premiumOrganizationUsageLimits,
} from "@arrhes/application-metadata"
import { and, eq, inArray } from "drizzle-orm"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { processOcr } from "../../../../utilities/ocr/processOcr.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

export const createOneAgentMessageRoute = apiFactory
    .createApp()
    .post(createOneAgentMessageRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentMessageRouteDefinition.schemas.body,
        })

        const session = await selectOne({
            database: c.var.clients.sql,
            table: models.agentSession,
            where: (table) => eq(table.id, body.idAgentSession),
        })

        if (session.idUser !== user.id) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Agent session access denied",
                externalMessage: "Vous n'avez pas accès à cette session agent",
            })
        }

        if (session.idOrganization !== body.idOrganization) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Organization/session mismatch",
                externalMessage: "L'organisation demandée ne correspond pas à la session agent",
            })
        }

        await checkOrganizationSubscriptionSessionMiddleware({ context: c, idOrganization: session.idOrganization })

        const monthStartISO = getCurrentMonthStartISO()
        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, session.idOrganization),
        })
        const shouldResetUsageCounters = isUsageMonthOutdated({
            usageMonthStartAt: organization.usageMonthStartAt,
            monthStartISO,
        })
        const currentMonthUsage = shouldResetUsageCounters ? 0 : organization.agentMessagesCurrentMonthUsage

        if (currentMonthUsage >= premiumOrganizationUsageLimits.agentMessagesPerMonth) {
            throw new Exception({
                statusCode: 429,
                internalMessage: "Agent monthly message limit reached",
                externalMessage: "Limite mensuelle de messages agent atteinte pour votre organisation",
            })
        }

        // Process attached files (OCR for PDF/images, text files pass through)
        const fileIds = body.fileIds?.filter(Boolean) ?? []
        let attachedFiles: Array<{ idFile: string; name: string; mimeType: string; idOcrFile: string | null }> | null =
            null

        console.log(`[createOneAgentMessage] fileIds: ${JSON.stringify(fileIds)}`)

        if (fileIds.length > 0) {
            if (!session.idYear) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Agent session has no year for file import",
                    externalMessage: "Veuillez sélectionner un exercice fiscal pour importer des fichiers",
                })
            }

            const files = await c.var.clients.sql
                .select()
                .from(models.file)
                .where(
                    and(
                        eq(models.file.idOrganization, session.idOrganization),
                        eq(models.file.idYear, session.idYear),
                        inArray(models.file.id, fileIds),
                    ),
                )

            console.log(`[createOneAgentMessage] Found ${files.length} files in DB (expected ${fileIds.length})`)

            if (files.length !== fileIds.length) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "Some file IDs not found",
                    externalMessage: "Certains fichiers sont introuvables",
                })
            }

            attachedFiles = []
            for (const file of files) {
                const mimeType = file.type ?? "application/octet-stream"
                const isTextLike =
                    mimeType.startsWith("text/") ||
                    mimeType === "application/json" ||
                    mimeType === "application/xml" ||
                    mimeType === "application/csv"
                const needsOcr = mimeType.startsWith("image/") || mimeType === "application/pdf"

                console.log(
                    `[createOneAgentMessage] Processing file "${file.name}" (type=${mimeType}, needsOcr=${needsOcr}, isTextLike=${isTextLike})`,
                )

                if (needsOcr) {
                    try {
                        const { ocrFile } = await processOcr({
                            var: c.var,
                            idOrganization: session.idOrganization,
                            idYear: session.idYear,
                            idUser: user.id,
                            sourceFile: file,
                        })
                        console.log(
                            `[createOneAgentMessage] OCR completed for "${file.name}" → ocrFile.id=${ocrFile.id}`,
                        )
                        attachedFiles.push({
                            idFile: file.id,
                            name: file.name ?? "fichier",
                            mimeType,
                            idOcrFile: ocrFile.id,
                        })
                    } catch (ocrError) {
                        console.error(`[createOneAgentMessage] OCR failed for "${file.name}":`, ocrError)
                        // Still attach the file without OCR so the worker knows it was attempted
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
                } else {
                    // Unsupported type — skip but don't fail the whole request
                    console.warn(
                        `[createOneAgentMessage] Unsupported file type "${mimeType}" for "${file.name}", skipping`,
                    )
                }
            }

            console.log(`[createOneAgentMessage] attachedFiles result: ${JSON.stringify(attachedFiles)}`)
        }

        const { assistantMessage, workerJob } = await c.var.clients.sql.transaction(async (transaction) => {
            // Create a single message row with the user's question and an assistant streaming placeholder
            const assistantMessage = await insertOne({
                database: transaction,
                table: models.agentMessage,
                data: {
                    id: generateId(),
                    idAgentSession: body.idAgentSession,
                    userMessage: body.message,
                    content: null,
                    toolCalls: null,
                    toolResults: null,
                    usedTools: null,
                    ...(attachedFiles ? { attachedFiles } : {}),
                    state: "streaming",
                    streamKey: generateId(),
                    createdAt: new Date().toISOString(),
                },
            })

            // Create the workerJob row
            const workerJob = await insertOne({
                database: transaction,
                table: models.workerJob,
                data: {
                    id: generateId(),
                    idAgentMessage: assistantMessage.id,
                    status: "pending",
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                },
            })

            await updateOne({
                database: transaction,
                table: models.organization,
                data: {
                    usageMonthStartAt: monthStartISO,
                    ocrCurrentMonthPagesUsage: shouldResetUsageCounters ? 0 : organization.ocrCurrentMonthPagesUsage,
                    agentMessagesCurrentMonthUsage: currentMonthUsage + 1,
                },
                where: (table) => eq(table.id, session.idOrganization),
            })

            return { assistantMessage, workerJob }
        })

        // Enqueue the job to Bull AFTER the transaction commits
        // so the worker can find the rows in the database
        await c.var.clients.queue.add(
            {
                fn: "runAgentSession",
                args: [{ idAgentMessage: assistantMessage.id, idWorkerJob: workerJob.id }],
            },
            {
                jobId: workerJob.id,
                priority: 1,
            },
        )

        return response({
            context: c,
            statusCode: 200,
            schema: createOneAgentMessageRouteDefinition.schemas.return,
            data: assistantMessage,
        })
    })
