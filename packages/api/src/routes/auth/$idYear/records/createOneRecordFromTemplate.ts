import { createOneRecordFromTemplateRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertMany } from "../../../../utilities/sql/insertMany.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"

export const createOneRecordFromTemplateRoute = apiFactory
    .createApp()
    .post(createOneRecordFromTemplateRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneRecordFromTemplateRouteDefinition.schemas.body,
        })

        const createdRecord = await c.var.clients.sql.transaction(async (tx) => {
            const record = await insertOne({
                database: tx,
                table: models.record,
                data: {
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: body.idYear,
                    idJournal: body.idJournal,
                    idRecordLabel: body.idRecordLabel,
                    idFile: body.idFile,
                    label: body.label,
                    date: body.date,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: user.id,
                    lastUpdatedBy: null,
                },
            })

            if (body.rows.length > 0) {
                await insertMany({
                    database: tx,
                    table: models.recordRow,
                    data: body.rows.map((row) => ({
                        id: generateId(),
                        idOrganization: idOrganization,
                        idYear: body.idYear,
                        idRecord: record.id,
                        idAccount: row.idAccount,
                        isComputedForJournalReport: row.isComputedForJournalReport,
                        isComputedForLedgerReport: row.isComputedForLedgerReport,
                        isComputedForBalanceReport: row.isComputedForBalanceReport,
                        isComputedForBalanceSheetReport: row.isComputedForBalanceSheetReport,
                        isComputedForIncomeStatementReport: row.isComputedForIncomeStatementReport,
                        label: row.label ?? record.label,
                        debit: row.debit ?? "0.00",
                        credit: row.credit ?? "0.00",
                        createdAt: new Date().toISOString(),
                        lastUpdatedAt: null,
                        createdBy: user.id,
                        lastUpdatedBy: null,
                    })),
                })
            }

            return record
        })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneRecordFromTemplateRouteDefinition.schemas.return,
            data: createdRecord,
        })
    })
