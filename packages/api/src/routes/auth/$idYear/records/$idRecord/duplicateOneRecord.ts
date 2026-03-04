import { duplicateOneRecordRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { insertMany } from "../../../../../utilities/sql/insertMany.js"
import { insertOne } from "../../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"

export const duplicateOneRecordRoute = apiFactory
    .createApp()
    .post(duplicateOneRecordRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: duplicateOneRecordRouteDefinition.schemas.body,
        })

        const duplicatedRecord = await c.var.clients.sql.transaction(async (tx) => {
            const originalRecord = await selectOne({
                database: tx,
                table: models.record,
                where: (table) =>
                    and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.id, body.idRecord),
                    ),
            })

            const originalRecordRows = await selectMany({
                database: tx,
                table: models.recordRow,
                where: (table) =>
                    and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idRecord, originalRecord.id),
                    ),
            })

            const duplicateRecord = await insertOne({
                database: tx,
                table: models.record,
                data: {
                    id: generateId(),
                    idOrganization: originalRecord.idOrganization,
                    idYear: originalRecord.idYear,
                    idJournal: originalRecord.idJournal,
                    idRecordLabel: originalRecord.idRecordLabel,
                    idFile: originalRecord.idFile,
                    label: `${originalRecord.label} (copy)`,
                    date: originalRecord.date,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: user.id,
                    lastUpdatedBy: null,
                },
            })

            const _duplicateRecordRows = await insertMany({
                database: tx,
                table: models.recordRow,
                data: originalRecordRows.map((recordRow) => ({
                    id: generateId(),
                    idOrganization: originalRecord.idOrganization,
                    idYear: originalRecord.idYear,
                    idRecord: duplicateRecord.id,
                    idAccount: recordRow.idAccount,
                    flag: recordRow.flag,
                    isComputedForJournalReport: recordRow.isComputedForJournalReport,
                    isComputedForLedgerReport: recordRow.isComputedForLedgerReport,
                    isComputedForBalanceReport: recordRow.isComputedForBalanceReport,
                    isComputedForBalanceSheetReport: recordRow.isComputedForBalanceSheetReport,
                    isComputedForIncomeStatementReport: recordRow.isComputedForIncomeStatementReport,
                    label: recordRow.label,
                    debit: recordRow.debit,
                    credit: recordRow.credit,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: user.id,
                    lastUpdatedBy: null,
                })),
            })

            return duplicateRecord
        })

        return response({
            context: c,
            statusCode: 200,
            schema: duplicateOneRecordRouteDefinition.schemas.return,
            data: duplicatedRecord,
        })
    })
