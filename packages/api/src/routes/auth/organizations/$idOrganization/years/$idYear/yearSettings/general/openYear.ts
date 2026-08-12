import { openYearRouteDefinition } from "@comptasse/application-metadata"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"

export const openYearRoute = registerRoute(openYearRouteDefinition, async (c) => {
    await checkAuthMiddleware({
        context: c,
    })
    const _body = await validateBodyMiddleware({
        context: c,
        schema: openYearRouteDefinition.schemas.body,
    })

    // const idPreviousYear = c.var.currentYear.idPreviousYear
    // if (!idPreviousYear) throw new HTTPException(400, { message: "Aucun exercice précédent n'est déclaré" })

    // await db.transaction(async (tx) => {

    //     // We delete, if existing, the previous opening entry
    //     await tx
    //         .delete(entries)
    //         .where(and(
    //             eq(entries.idOrganization, user.idOrganization),
    //             eq(entries.idYear, c.var.currentYear.id),
    //             eq(entries.idAutomatic, "OPEN_SHEET")
    //         ))

    //     // We create the new opening entry
    //     const [createEntry] = await tx
    //         .insert(entries)
    //         .values({
    //             id: generateId(),
    //             idOrganization: c.var.organization.id,
    //             idYear: c.var.currentYear.id,
    //             idJournal: body.idJournalOpening,
    //             idAutomatic: "OPEN_SHEET",
    //             isValidated: true,
    //             isComputed: true,
    //             label: "Report du bilan de l'exercice précédent",
    //             date: c.var.currentYear.startingOn,
    //             lastUpdatedBy: user.id,
    //             createdBy: user.id
    //         })
    //         .returning()

    //     // We read the current accounts
    //     const readEntry = await tx.query.entries.findFirst({
    //         where: and(
    //             eq(entries.idOrganization, user.idOrganization),
    //             eq(entries.idYear, idPreviousYear),
    //             eq(entries.idAutomatic, "SETTLE_SHEET")
    //         ),
    //         with: {
    //             lines: {
    //                 with: {
    //                     account: true
    //                 }
    //             },
    //         }
    //     })
    //     if (!readEntry) throw new HTTPException(400, { message: "Le solde du bilan de l'exercice précédent n'a pas été trouvé" })

    //     const readAccounts = await tx.query.accounts.findMany({
    //         where: and(
    //             eq(entries.idOrganization, user.idOrganization),
    //             eq(entries.idYear, c.var.currentYear.id)
    //         )
    //     })

    //     // We create the new lines
    //     const sheetLines: Array<(typeof lines.$inferInsert)> = []
    //     readEntry.lines.forEach((line) => {
    //         const account = readAccounts.find((_account) => _account.number === line.account.number)
    //         if (!account) throw new HTTPException(400, { message: "Les comptes liés n'ont pas été rapprochés" })
    //         sheetLines.push({
    //             id: generateId(),
    //             idOrganization: c.var.organization.id,
    //             idYear: c.var.currentYear.id,
    //             idEntry: createEntry.id,
    //             idAccount: account.id,
    //             debit: line.credit.toString(),
    //             credit: line.debit.toString(),
    //             label: "Report du compte",
    //             lastUpdatedBy: user.id,
    //             createdBy: user.id
    //         })
    //     })
    //     await tx
    //         .insert(lines)
    //         .values(sheetLines)

    // })

    return response({
        context: c,
        statusCode: 200,
        schema: openYearRouteDefinition.schemas.return,
        data: {},
    })
})
