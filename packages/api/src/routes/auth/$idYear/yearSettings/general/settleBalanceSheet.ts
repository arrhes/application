import { settleBalanceSheetRouteDefinition } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"

export const settleBalanceSheetRoute = apiFactory
    .createApp()
    .post(settleBalanceSheetRouteDefinition.path, async (c) => {
        await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: settleBalanceSheetRouteDefinition.schemas.body,
        })

        //  await db.transaction(async (tx) => {

        //     // We delete previous record if existing
        //     await tx
        //         .delete(records)
        //         .where(and(
        //             eq(records.idOrganization, user.idOrganization),
        //             eq(records.idYear, c.var.currentYear.id),
        //             eq(records.idAutomatic, "SETTLE_SHEET")
        //         ))

        //     // We create the new record
        //     const [createRecord] = await tx
        //         .insert(records)
        //         .values({
        //             id: generateId(),
        //             idOrganization: c.var.organization.id,
        //             idYear: c.var.currentYear.id,
        //             idJournal: body.idJournalClosing,
        //             idAutomatic: "SETTLE_SHEET",
        //             isValidated: true,
        //             isComputed: false,
        //             label: "Solde des comptes de bilan",
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
        //             eq(accounts.type, "sheet")
        //         ),
        //         with: {
        //             rows: {
        //                 with: {
        //                     record: true
        //                 }
        //             },
        //             accountSheets: true
        //         }
        //     })

        //     // We create the new rows
        //     const sheetRows: Array<(typeof rows.$inferInsert)> = []
        //     readAccounts.forEach((account) => {

        //         const sum = {
        //             debit: 0,
        //             credit: 0
        //         }
        //         account.rows.forEach((row) => {
        //             if (!row.record.isComputed && row.record.idAutomatic === null) return
        //             sum.debit += Number(row.debit)
        //             sum.credit += Number(row.credit)
        //         })

        //         const algebricBalance = Number(sum.debit) - Number(sum.credit)
        //         if (Math.abs(algebricBalance) < 0.01) return
        //         const balance = {
        //             debit: (algebricBalance > 0) ? algebricBalance : 0,
        //             credit: (algebricBalance < 0) ? -algebricBalance : 0
        //         }
        //         sheetRows.push({
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
        //     if (sheetRows.length === 0) throw new HTTPException(400, { message: "Aucune écriture ne peut être passée" })
        //     await tx
        //         .insert(rows)
        //         .values(sheetRows)
        // })

        return response({
            context: c,
            statusCode: 200,
            schema: settleBalanceSheetRouteDefinition.schemas.return,
            data: {},
        })
    })
