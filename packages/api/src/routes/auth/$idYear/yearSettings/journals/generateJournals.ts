/*
import { defaultJournals, generateId, generateJournalsRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../utilities/exception.js"
import { response } from "../../../../../utilities/response.js"
import { deleteMany } from "../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../utilities/sql/insertMany.js"

export const generateJournalsRoute = apiFactory.createApp().post(generateJournalsRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: generateJournalsRouteDefinition.schemas.body,
    })

    const generatedJournals = await c.var.clients.sql.transaction(async (tx) => {
        try {
            const _deletedJournals = await deleteMany({
                database: tx,
                table: models.journal,
                where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
            })
        } catch (_error: unknown) {
            throw new Exception({
                internalMessage: "Failed to delete journals",
                externalMessage: "Échec de la suppression des journaux",
            })
        }

        const newJournals = defaultJournals.map((defaultJournal) => {
            return {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                code: defaultJournal.code,
                label: defaultJournal.label,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: null,
                lastUpdatedBy: null,
            }
        })

        const generatedJournals = await insertMany({
            database: tx,
            table: models.journal,
            data: newJournals,
        })

        return generatedJournals
    })

    return response({
        context: c,
        statusCode: 200,
        schema: generateJournalsRouteDefinition.schemas.return,
        data: generatedJournals,
    })
})
*/
