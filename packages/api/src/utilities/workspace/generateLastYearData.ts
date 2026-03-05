// import { accountBalanceSheets, accountIncomeStatements, accounts, balanceSheets, computationIncomeStatements, computations, incomeStatements } from "@coulba/schemas/models"
// import { auth } from "@coulba/schemas/routes"
// import { generateId } from "@coulba/schemas/services"
// import { and, eq } from "drizzle-orm"
// import { HTTPException } from "hono/http-exception"
// import * as v from "valibot"
// import { db } from "../../../clients/db.js"

// type GenerateLastYearData = {
//     organization: v.Output<typeof auth.organizations.get.return>
//     year: v.Output<typeof auth.years.get.return>
// }

// export async function generateLastYearData(props: GenerateLastYearData) {

//     if (!props.year.idPreviousYear) throw new HTTPException(500, { message: "L'id de l'année précédente n'est pas renseigné" })

//     // Add accounts
//     const lastYearAccounts = await db
//         .select()
//         .from(accounts)
//         .where(and(
//             eq(accounts.idOrganization, props.organization.id),
//             eq(accounts.idYear, props.year.idPreviousYear)
//         ))
//     const newAccounts: Array<typeof accounts.$inferInsert> = lastYearAccounts.map((account) => ({
//         id: generateId(),
//         idOrganization: props.organization.id,
//         idYear: props.year.id,
//         idParent: account.idParent,
//         number: account.number,
//         isMandatory: account.isMandatory,
//         isClass: account.isClass,
//         isDefault: account.isDefault,
//         isSelectable: account.isSelectable,
//         label: account.label,
//         type: account.type,
//         scope: account.scope
//     }))
//     if (newAccounts.length > 0) {
//         await db
//             .insert(accounts)
//             .values(newAccounts)
//     }

//     // Add balanceSheets
//     const currentBalanceSheets = await db
//         .select()
//         .from(balanceSheets)
//         .where(and(
//             eq(balanceSheets.idOrganization, props.organization.id),
//             eq(balanceSheets.idYear, props.year.id)
//         ))
//     const lastYearBalanceSheets = await db
//         .select()
//         .from(balanceSheets)
//         .where(and(
//             eq(balanceSheets.idOrganization, props.organization.id),
//             eq(balanceSheets.idYear, props.year.idPreviousYear)
//         ))
//     const newBalanceSheets: Array<typeof balanceSheets.$inferInsert> = lastYearBalanceSheets.map((balanceSheet) => {
//         const currentParent = currentBalanceSheets.find((x) => x.id === balanceSheet.idParent)
//         const newParent = lastYearBalanceSheets.find((x) => x.number === currentParent?.number)
//         return ({
//             id: generateId(),
//             idOrganization: props.organization.id,
//             idYear: props.year.id,
//             idParent: newParent?.id,
//             isDefault: balanceSheet.isDefault,
//             side: balanceSheet.side,
//             number: balanceSheet.number,
//             label: balanceSheet.label,
//             addedGrossAmount: "0",
//             addedAllowanceAmount: "0"
//         })
//     })
//     if (newBalanceSheets.length > 0) {
//         await db
//             .insert(balanceSheets)
//             .values(newBalanceSheets)
//     }

//     // Add accountBalanceSheets
//     const lastYearAccountBalanceSheets = await db
//         .select()
//         .from(accountBalanceSheets)
//         .where(and(
//             eq(accountBalanceSheets.idOrganization, props.organization.id),
//             eq(accountBalanceSheets.idYear, props.year.idPreviousYear)
//         ))
//     const newAccountBalanceSheets: Array<(typeof accountBalanceSheets.$inferInsert)> = lastYearAccountBalanceSheets.map((accountBalanceSheet) => ({
//         id: generateId(),
//         idOrganization: props.organization.id,
//         idYear: props.year.id,
//         idAccount: accountBalanceSheet.idAccount,
//         idBalanceSheet: accountBalanceSheet.idBalanceSheet,
//         flow: accountBalanceSheet.flow,
//         isAllowance: accountBalanceSheet.isAllowance
//     })
//     )
//     if (newAccountBalanceSheets.length > 0) {
//         await db
//             .insert(accountBalanceSheets)
//             .values(newAccountBalanceSheets)
//     }

//     // Add incomeStatements
//     const currentIncomeStatements = await db
//         .select()
//         .from(incomeStatements)
//         .where(and(
//             eq(incomeStatements.idOrganization, props.organization.id),
//             eq(incomeStatements.idYear, props.year.id)
//         ))
//     const lastYearIncomeStatements = await db
//         .select()
//         .from(incomeStatements)
//         .where(and(
//             eq(incomeStatements.idOrganization, props.organization.id),
//             eq(incomeStatements.idYear, props.year.idPreviousYear)
//         ))
//     const newIncomeStatements: Array<typeof incomeStatements.$inferInsert> = lastYearIncomeStatements.map((incomeStatement) => {
//         const currentParent = currentIncomeStatements.find((x) => x.id === incomeStatement.idParent)
//         const newParent = lastYearIncomeStatements.find((x) => x.number === currentParent?.number)
//         return ({
//             id: generateId(),
//             idOrganization: props.organization.id,
//             idYear: props.year.id,
//             idParent: incomeStatement.idParent,
//             isDefault: incomeStatement.isDefault,
//             number: incomeStatement.number,
//             label: incomeStatement.label,
//             addedNetAmount: "0"
//         })
//     })
//     if (newIncomeStatements.length > 0) {
//         await db
//             .insert(incomeStatements)
//             .values(newIncomeStatements)
//     }

//     // Add accountIncomeStatements
//     const lastYearAccountIncomeStatements = await db
//         .select()
//         .from(accountIncomeStatements)
//         .where(and(
//             eq(accountIncomeStatements.idOrganization, props.organization.id),
//             eq(accountIncomeStatements.idYear, props.year.idPreviousYear)
//         ))
//     const newAccountIncomeStatements: Array<(typeof accountIncomeStatements.$inferInsert)> = lastYearAccountIncomeStatements.map((accountIncomeStatement) => ({
//         id: generateId(),
//         idOrganization: props.organization.id,
//         idYear: props.year.id,
//         idAccount: accountIncomeStatement.idAccount,
//         idIncomeStatement: accountIncomeStatement.idIncomeStatement
//     })
//     )
//     if (newAccountIncomeStatements.length > 0) {
//         await db
//             .insert(accountIncomeStatements)
//             .values(newAccountIncomeStatements)
//     }

//     // Add computations
//     const lastYearComputations = await db
//         .select()
//         .from(computations)
//         .where(and(
//             eq(computations.idOrganization, props.organization.id),
//             eq(computations.idYear, props.year.idPreviousYear)
//         ))
//     const newComputations: Array<typeof computations.$inferInsert> = lastYearComputations.map((computation) => {
//         return ({
//             id: generateId(),
//             idOrganization: props.organization.id,
//             idYear: props.year.id,
//             number: computation.number,
//             label: computation.label
//         })
//     })
//     if (newComputations.length > 0) {
//         await db
//             .insert(computations)
//             .values(newComputations)
//     }

//     // Add computationIncomeStatements
//     const lastYearComputationIncomeStatements = await db
//         .select()
//         .from(computationIncomeStatements)
//         .where(and(
//             eq(computationIncomeStatements.idOrganization, props.organization.id),
//             eq(computationIncomeStatements.idYear, props.year.idPreviousYear)
//         ))
//     const newComputationIncomeStatements: Array<(typeof computationIncomeStatements.$inferInsert)> = lastYearComputationIncomeStatements.map((computationIncomeStatement) => ({
//         id: generateId(),
//         idOrganization: props.organization.id,
//         idYear: props.year.id,
//         idComputation: computationIncomeStatement.idComputation,
//         idIncomeStatement: computationIncomeStatement.idIncomeStatement,
//         operation: computationIncomeStatement.operation
//     })
//     )
//     if (newComputationIncomeStatements.length > 0) {
//         await db
//             .insert(computationIncomeStatements)
//             .values(newComputationIncomeStatements)
//     }
// }
