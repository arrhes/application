import { models, updateManyRecordRowsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const updateManyRecordRowsRoute = apiFactory
    .createApp()
    .post(updateManyRecordRowsRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateManyRecordRowsRouteDefinition.schemas.body,
        })

        const readAllRecordRows = await selectMany({
            database: c.var.clients.sql,
            table: models.recordRow,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.idRecord, body.idRecord),
                ),
        })

        const updatedRecordRows = await c.var.clients.sql.transaction(async (_tx) => {
            const recordRows = []
            for (const recordRow of readAllRecordRows) {
                const updatedRecordRow = await updateOne({
                    database: c.var.clients.sql,
                    table: models.recordRow,
                    data: {
                        isComputedForJournalReport: body.isComputedForJournalReport,
                        isComputedForLedgerReport: body.isComputedForLedgerReport,
                        isComputedForBalanceReport: body.isComputedForBalanceReport,
                        isComputedForBalanceSheetReport: body.isComputedForBalanceSheetReport,
                        isComputedForIncomeStatementReport: body.isComputedForIncomeStatementReport,
                        label: body.label,
                        lastUpdatedAt: new Date().toISOString(),
                        lastUpdatedBy: user.id,
                    },
                    where: (table) =>
                        and(
                            eq(table.idOrganization, idOrganization),
                            eq(table.idYear, body.idYear),
                            eq(table.id, recordRow.id),
                        ),
                })
                recordRows.push(updatedRecordRow)
            }

            return recordRows
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateManyRecordRowsRouteDefinition.schemas.return,
            data: updatedRecordRows,
        })
    })
