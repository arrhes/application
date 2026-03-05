import { settleIncomeStatementRouteDefinition } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"

export const settleIncomeStatementRoute = apiFactory
    .createApp()
    .post(settleIncomeStatementRouteDefinition.path, async (c) => {
        await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: settleIncomeStatementRouteDefinition.schemas.body,
        })

        // // Check if sheet is balanced
        // let totalAssets = 0
        // let totalLiabilities = 0
        // readAccountSheets.forEach((accountSheet) => {
        //     if (accountSheet.sheet.side === "asset") return totalAssets += Number(accountSheet.sheet.gross) - Number(accountSheet.sheet.allowance)
        //     if (accountSheet.sheet.side === "liability") return totalLiabilities += Number(accountSheet.sheet.gross) - Number(accountSheet.sheet.allowance)
        // })
        // if (totalAssets !== totalLiabilities + yearResult) throw new HTTPException(400, { message: "Le bilan n'est pas équilibré" })

        // await db.transaction(async (tx) => {

        //     // We delete the previsou record if existing
        //     await tx
        //         .delete(records)
        //         .where(and(
        //             eq(records.idOrganization, user.idOrganization),
        //             eq(records.idYear, c.var.currentYear.id),
        //             eq(records.idAutomatic, "COMPUTE_RESULT")
        //         ))

        //     // Add result record
        //     const [createRecord] = await tx
        //         .insert(records)
        //         .values({
        //             id: generateId(),
        //             idOrganization: c.var.organization.id,
        //             idYear: c.var.currentYear.id,
        //             idJournal: body.idJournalClosing,
        //             idAutomatic: "COMPUTE_RESULT",
        //             isValidated: true,
        //             isComputed: false,
        //             label: "Solde des comptes de gestion",
        //             date: c.var.currentYear.endingOn,
        //             validatedOn: c.var.currentYear.endingOn,
        //             lastUpdatedBy: user.id,
        //             createdBy: user.id
        //         })
        //         .returning()

        //     // We read the current accounts
        //     const readAccounts = await tx.query.accounts.findMany({
        //         where: and(
        //             eq(accounts.idOrganization, user.idOrganization),
        //             eq(accounts.idYear, c.var.currentYear.id),
        //             eq(accounts.type, "statement")
        //         ),
        //         with: {
        //             rows: {
        //                 with: {
        //                     record: true
        //                 }
        //             },
        //             accountStatements: true
        //         }
        //     })

        //     // Add closing rows
        //     const statementRows: Array<(typeof rows.$inferInsert)> = []
        //     readAccounts.forEach((account) => {

        //         const sum = {
        //             debit: 0,
        //             credit: 0
        //         }

        //         account.rows.forEach((row) => {
        //             if (!row.record.isComputed) return
        //             sum.debit += Number(row.debit)
        //             sum.credit += Number(row.credit)
        //         })

        //         const algebricBalance = Number(sum.debit) - Number(sum.credit)
        //         if (Math.abs(algebricBalance) < 0.01) return
        //         const balance = {
        //             debit: (algebricBalance > 0) ? algebricBalance : 0,
        //             credit: (algebricBalance < 0) ? -algebricBalance : 0
        //         }
        //         statementRows.push({
        //             id: generateId(),
        //             idOrganization: c.var.organization.id,
        //             idYear: c.var.currentYear.id,
        //             idRecord: createRecord.id,
        //             idAccount: account.id,
        //             debit: balance.credit.toString(),
        //             credit: balance.debit.toString(),
        //             label: "Solde du compte",
        //             lastUpdatedBy: user.id,
        //             createdBy: user.id
        //         })
        //     })
        //     const algebricBalance = statementRows.reduce((sum, row) => sum + Number(row.debit), 0) - statementRows.reduce((sum, row) => sum + Number(row.credit), 0)
        //     const balance = {
        //         debit: (algebricBalance > 0) ? algebricBalance : 0,
        //         credit: (algebricBalance < 0) ? -algebricBalance : 0
        //     }

        //     if (statementRows.length === 0) throw new HTTPException(400, { message: "Aucune écriture ne peut être passée" })
        //     await tx
        //         .insert(rows)
        //         .values([
        //             ...statementRows,
        //             {
        //                 id: generateId(),
        //                 idOrganization: c.var.organization.id,
        //                 idYear: c.var.currentYear.id,
        //                 idRecord: createRecord.id,
        //                 idAccount: (algebricBalance < 0) ? body.idAccountLoss : body.idAccountProfit,
        //                 debit: balance.credit.toString(),
        //                 credit: balance.debit.toString(),
        //                 label: "Résultat de l'exercice",
        //                 lastUpdatedBy: user.id,
        //                 createdBy: user.id
        //             }
        //         ])
        // })

        return response({
            context: c,
            statusCode: 200,
            schema: settleIncomeStatementRouteDefinition.schemas.return,
            data: {},
        })
    })
