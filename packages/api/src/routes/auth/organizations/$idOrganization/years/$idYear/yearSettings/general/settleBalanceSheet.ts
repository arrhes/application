import { generateId, models, settleBalanceSheetRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../../../utilities/exception.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteMany } from "../../../../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../../../../utilities/sql/insertMany.js"
import { insertOne } from "../../../../../../../../utilities/sql/insertOne.js"
import { selectMany } from "../../../../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../../../../utilities/sql/selectOne.js"

export const settleBalanceSheetRoute = apiFactory
    .createApp()
    .post(settleBalanceSheetRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: settleBalanceSheetRouteDefinition.schemas.body,
        })

        const year = await selectOne({
            database: c.var.clients.sql,
            table: models.year,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idYear)),
        })

        await c.var.clients.sql.transaction(async (tx) => {
            // Delete any previous balance-sheet closing entries for this journal+year
            await deleteMany({
                database: tx,
                table: models.entry,
                where: (table) =>
                    and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.idJournal, body.idJournalClosing),
                    ),
            })

            // Fetch all balance-sheet entry lines for this year
            const entryLines = await selectMany({
                database: tx,
                table: models.entryLine,
                where: (table) =>
                    and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.isComputedForBalanceSheetReport, true),
                    ),
            })

            // Fetch all balance-sheet accounts for this year
            const accounts = await selectMany({
                database: tx,
                table: models.account,
                where: (table) =>
                    and(
                        eq(table.idOrganization, idOrganization),
                        eq(table.idYear, body.idYear),
                        eq(table.type, "balance-sheet"),
                    ),
            })

            // Build closing lines: reverse each account balance (skip class/2-digit accounts)
            const sheetLines: Array<typeof models.entryLine.$inferInsert> = []

            for (const account of accounts) {
                if (account.number.length <= 2) continue

                let totalDebit = 0
                let totalCredit = 0
                for (const line of entryLines) {
                    if (line.idAccount !== account.id) continue
                    totalDebit += Number(line.debit)
                    totalCredit += Number(line.credit)
                }

                const algebraicBalance = totalDebit - totalCredit
                if (Math.abs(algebraicBalance) < 0.01) continue

                sheetLines.push({
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: body.idYear,
                    idEntry: "", // filled after entry creation below
                    idAccount: account.id,
                    isComputedForJournalReport: true,
                    isComputedForLedgerReport: true,
                    isComputedForBalanceReport: true,
                    isComputedForBalanceSheetReport: false,
                    isComputedForIncomeStatementReport: false,
                    label: "Solde du compte",
                    debit: algebraicBalance < 0 ? String((-algebraicBalance).toFixed(2)) : "0.00",
                    credit: algebraicBalance > 0 ? String(algebraicBalance.toFixed(2)) : "0.00",
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: auth.user.id,
                    lastUpdatedBy: null,
                })
            }

            if (sheetLines.length === 0) {
                throw new Exception({
                    statusCode: 400,
                    internalMessage: "No balance-sheet entries to close",
                    cause: "Aucune écriture de bilan ne peut être passée",
                })
            }

            // Create the closing entry
            const closingEntry = await insertOne({
                database: tx,
                table: models.entry,
                data: {
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: body.idYear,
                    idJournal: body.idJournalClosing,
                    idFile: null,
                    label: "Solde des comptes de bilan",
                    date: year.endingAt,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: auth.user.id,
                    lastUpdatedBy: null,
                },
            })

            // Assign entry id to all closing lines
            for (const line of sheetLines) {
                line.idEntry = closingEntry.id
            }

            await insertMany({
                database: tx,
                table: models.entryLine,
                data: sheetLines,
            })
        })

        return response({
            context: c,
            statusCode: 200,
            schema: settleBalanceSheetRouteDefinition.schemas.return,
            data: {},
        })
    })
