import { createOneEntryLineRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { insertOne } from "../../../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../../../utilities/sql/selectOne.js"

export const createOneEntryLineRoute = apiFactory
    .createApp()
    .post(createOneEntryLineRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneEntryLineRouteDefinition.schemas.body,
        })

        const readOneEntry = await selectOne({
            database: c.var.clients.sql,
            table: models.entry,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idEntry),
                ),
        })

        const createOneEntryLine = await insertOne({
            database: c.var.clients.sql,
            table: models.entryLine,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: body.idYear,
                idEntry: body.idEntry,
                idAccount: body.idAccount,
                isComputedForJournalReport: body.isComputedForJournalReport,
                isComputedForLedgerReport: body.isComputedForLedgerReport,
                isComputedForBalanceReport: body.isComputedForBalanceReport,
                isComputedForBalanceSheetReport: body.isComputedForBalanceSheetReport,
                isComputedForIncomeStatementReport: body.isComputedForIncomeStatementReport,
                label: body.label ?? readOneEntry.label,
                debit: body.debit ?? "0.00",
                credit: body.credit ?? "0.00",
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneEntryLineRouteDefinition.schemas.return,
            data: createOneEntryLine,
        })
    })
