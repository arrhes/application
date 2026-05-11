import { models, updateManyEntryLinesRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../utilities/sql/selectMany.js"
import { updateOne } from "../../../../../../utilities/sql/updateOne.js"

export const updateManyEntryLinesRoute = apiFactory
    .createApp()
    .post(updateManyEntryLinesRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateManyEntryLinesRouteDefinition.schemas.body,
        })

        const readAllEntryLines = await selectMany({
            database: c.var.clients.sql,
            table: models.entryLine,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.idEntry, body.idEntry),
                ),
        })

        const updatedEntryLines = await c.var.clients.sql.transaction(async (_tx) => {
            const entryLines = []
            for (const entryLine of readAllEntryLines) {
                const updatedEntryLine = await updateOne({
                    database: c.var.clients.sql,
                    table: models.entryLine,
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
                            eq(table.id, entryLine.id),
                        ),
                })
                entryLines.push(updatedEntryLine)
            }

            return entryLines
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateManyEntryLinesRouteDefinition.schemas.return,
            data: updatedEntryLines,
        })
    })
