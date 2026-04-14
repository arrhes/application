import { createOneAgentFileRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq, isNull, sql } from "drizzle-orm"
import { checkOrganizationSubscriptionSessionMiddleware } from "../../../../middlewares/checkOrganizationSubscriptionSessionMiddleware.js"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"
import { generatePutSignedUrl } from "../../../../utilities/storage/generatePutSignedUrl.js"

const MAX_AGENT_FILE_SIZE = 50_000_000

export const createOneAgentFileRoute = apiFactory
    .createApp()
    .post(createOneAgentFileRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneAgentFileRouteDefinition.schemas.body,
        })
        await checkOrganizationSubscriptionSessionMiddleware({ context: c, idOrganization })

        if (body.fileSize > MAX_AGENT_FILE_SIZE) {
            throw new Exception({
                internalMessage: "File size is too big",
                statusCode: 400,
                externalMessage: "Fichier trop volumineux (50 Mo maximum)",
            })
        }

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

        if (session.idOrganization !== idOrganization) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Organization/session mismatch",
                externalMessage: "L'organisation demandée ne correspond pas à la session agent",
            })
        }

        if (!session.idYear) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Agent session has no year selected",
                externalMessage: "Veuillez sélectionner un exercice fiscal pour importer des fichiers",
            })
        }

        const idYear = session.idYear

        // Check for duplicate file by hash within the same organization and year
        const existingFiles = await c.var.clients.sql
            .select()
            .from(models.file)
            .where(
                and(
                    eq(models.file.idOrganization, idOrganization),
                    eq(models.file.idYear, idYear),
                    eq(models.file.hash, body.fileHash),
                ),
            )
            .limit(1)

        if (existingFiles.length > 0 && existingFiles[0]) {
            return response({
                context: c,
                statusCode: 200,
                schema: createOneAgentFileRouteDefinition.schemas.return,
                data: {
                    file: existingFiles[0],
                    url: null,
                },
            })
        }

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        if (organization.storageCurrentUsage + body.fileSize > organization.storageLimit) {
            throw new Exception({
                internalMessage: "Storage limit exceeded",
                statusCode: 400,
                externalMessage: "Limite de stockage atteinte",
            })
        }

        // Find or create the ".agent" folder at the root of the year
        const existingFolders = await c.var.clients.sql
            .select()
            .from(models.folder)
            .where(
                and(
                    eq(models.folder.idOrganization, idOrganization),
                    eq(models.folder.idYear, idYear),
                    eq(models.folder.name, ".agent"),
                    isNull(models.folder.idFolderParent),
                ),
            )
            .limit(1)

        let agentFolderId: string

        if (existingFolders.length > 0 && existingFolders[0]) {
            agentFolderId = existingFolders[0].id
        } else {
            const newFolder = await insertOne({
                database: c.var.clients.sql,
                table: models.folder,
                data: {
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: idYear,
                    idFolderParent: null,
                    name: ".agent",
                    createdAt: new Date().toISOString(),
                    createdBy: user.id,
                },
            })
            agentFolderId = newFolder.id
        }

        const newFileId = generateId()
        const storageKey = `organizations/${idOrganization}/${idYear}/files/${newFileId}`

        const newFile = await insertOne({
            database: c.var.clients.sql,
            table: models.file,
            data: {
                id: newFileId,
                idOrganization: idOrganization,
                idYear: idYear,
                idFolder: agentFolderId,
                reference: null,
                name: body.fileName,
                storageKey: storageKey,
                type: body.fileType,
                size: body.fileSize,
                hash: body.fileHash,
                createdAt: new Date().toISOString(),
                createdBy: user.id,
            },
        })

        await updateOne({
            database: c.var.clients.sql,
            table: models.organization,
            data: {
                storageCurrentUsage: sql`${models.organization.storageCurrentUsage} + ${body.fileSize}`,
            },
            where: (table) => eq(table.id, idOrganization),
        })

        const url = await generatePutSignedUrl({
            var: c.var,
            storageKey: storageKey,
            contentLength: body.fileSize,
            contentType: body.fileType,
            metadata: {
                idOrganization: idOrganization,
                idYear: idYear,
                idUser: user.id,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneAgentFileRouteDefinition.schemas.return,
            data: {
                file: newFile,
                url: url,
            },
        })
    })
