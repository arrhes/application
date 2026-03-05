// import { defaultAssociationAccounts, defaultAssociationBalanceSheets, defaultAssociationIncomeStatements, DefaultBalanceSheet, defaultCompanyAccounts, defaultCompanyBalanceSheets, defaultCompanyIncomeStatements, DefaultComputation, defaultComputations } from "@arrhes/application-metadata/components"
// import { returnedSchemas } from "@arrhes/application-metadata/schemas"
// import { generateId } from "@arrhes/application-metadata/utilities"
// import * as v from "valibot"

// export async function generateDefaultYearData(parameters: {
//     organization: v.InferOutput<typeof returnedSchemas.organization>
//     year: v.InferOutput<typeof returnedSchemas.year>
//     isMinimalSystem: boolean
// }) {

//     // Add accounts
//     let newAccounts: Array<typeof returnedSchemas.account> = []
//     const defaultAccounts = (
//         (parameters.organization.scope === "association")
//             ? defaultAssociationAccounts
//             : defaultCompanyAccounts
//     )
//     const defaultBalanceSheets = (
//         (parameters.organization.scope === "association")
//             ? defaultAssociationBalanceSheets
//             : defaultCompanyBalanceSheets
//     )
//     const defaultIncomeStatements = (
//         (parameters.organization.scope === "association")
//             ? defaultAssociationIncomeStatements
//             : defaultCompanyIncomeStatements
//     )

//     defaultAccounts
//         .filter((account) => {
//             if (account.isMandatory === false) {
//                 if (parameters.isMinimalSystem === true) return false
//             }
//             return true
//         })
//         .forEach((account) => {
//             newAccounts.push({
//                 id: generateId(),
//                 idOrganization: parameters.organization.id,
//                 idYear: parameters.year.id,
//                 // idAccountParent: account.,
//                 number: account.number,
//                 isMandatory: account.isMandatory,
//                 isClass: account.isClass,
//                 isDefault: true,
//                 isSelectable: account.isSelectable,
//                 label: account.label,
//                 type: account.type,
//                 scope: parameters.organization.scope
//             })
//         })

//     newAccounts = newAccounts.map((_account) => {
//         const parent = newAccounts.find((x) => x.number !== _account.number && _account.number.toString().includes(x.number.toString()) && _account.number.toString().length === x.number.toString().length + 1)
//         return ({
//             ..._account,
//             idParent: parent?.id
//         })
//     })
//     if (newAccounts.length > 0) {
//         await db
//             .insert(accounts)
//             .values(newAccounts)
//     }

//     // Add balanceSheets
//     let newBalanceSheets: (typeof balanceSheets.$inferInsert & { numberParent: number | undefined, accounts: DefaultBalanceSheet["accounts"][number][] })[] = defaultBalanceSheets.map((_balanceSheet) => ({
//         id: generateId(),
//         idOrganization: parameters.organization.id,
//         idYear: parameters.year.id,
//         isDefault: true,
//         side: _balanceSheet.side,
//         number: _balanceSheet.number,
//         label: _balanceSheet.label,
//         addedGrossAmount: "0",
//         addedAllowanceAmount: "0",
//         numberParent: _balanceSheet.numberParent,
//         accounts: _balanceSheet.accounts
//     }))
//     newBalanceSheets = newBalanceSheets.map((_balanceSheet) => {
//         const parent = newBalanceSheets.find((x) => (x.number === _balanceSheet.numberParent) && (x.side === _balanceSheet.side))
//         return ({
//             ..._balanceSheet,
//             idParent: parent?.id
//         })
//     })
//     if (newBalanceSheets.length > 0) {
//         await db
//             .insert(balanceSheets)
//             .values(newBalanceSheets)
//     }

//     // Add accountBalanceSheets
//     const newAccountBalanceSheets: Array<(typeof accountBalanceSheets.$inferInsert)> = []
//     newBalanceSheets.forEach((_balanceSheet) => {
//         _balanceSheet.accounts.forEach((_account) => {
//             const account = newAccounts.find((x) => x.number === _account.number)
//             if (!account) return
//             newAccountBalanceSheets.push({
//                 id: generateId(),
//                 idOrganization: parameters.organization.id,
//                 idYear: parameters.year.id,
//                 idAccount: account.id,
//                 idBalanceSheet: _balanceSheet.id,
//                 flow: _account.flow,
//                 isAllowance: _account.isAllowance
//             })
//         })
//     })
//     if (newAccountBalanceSheets.length > 0) {
//         await db
//             .insert(accountBalanceSheets)
//             .values(newAccountBalanceSheets)
//     }

//     // Add incomeStatements
//     let newIncomeStatements: (typeof incomeStatements.$inferInsert & { numberParent: number | undefined, accounts: number[] })[] = defaultIncomeStatements.map((_incomeStatement) => ({
//         id: generateId(),
//         idOrganization: parameters.organization.id,
//         idYear: parameters.year.id,
//         isDefault: true,
//         number: _incomeStatement.number,
//         label: _incomeStatement.label,
//         addedNetAmount: "0",
//         numberParent: _incomeStatement.numberParent,
//         accounts: _incomeStatement.accounts
//     }))
//     newIncomeStatements = newIncomeStatements.map((_incomeStatement) => {
//         const parent = newIncomeStatements.find((x) => x.number === _incomeStatement.numberParent)
//         return ({
//             ..._incomeStatement,
//             idParent: parent?.id
//         })
//     })
//     if (newIncomeStatements.length > 0) {
//         await db
//             .insert(incomeStatements)
//             .values(newIncomeStatements)
//     }

//     // Add accountIncomeStatements
//     const newAccountIncomeStatements: Array<(typeof accountIncomeStatements.$inferInsert)> = []
//     newIncomeStatements.forEach((_incomeStatement) => {
//         _incomeStatement.accounts.forEach((_account) => {
//             const account = newAccounts.find((x) => x.number === _account)
//             if (!account) return
//             newAccountIncomeStatements.push({
//                 id: generateId(),
//                 idOrganization: parameters.organization.id,
//                 idYear: parameters.year.id,
//                 idAccount: account.id,
//                 idIncomeStatement: _incomeStatement.id
//             })
//         })
//     })
//     if (newAccountIncomeStatements.length > 0) {
//         await db
//             .insert(accountIncomeStatements)
//             .values(newAccountIncomeStatements)
//     }

//     // Add computations
//     const newComputations: (typeof computations.$inferInsert & { incomeStatements: DefaultComputation["incomeStatements"][number][] })[] = defaultComputations.map((_computation) => {
//         return ({
//             id: generateId(),
//             idOrganization: parameters.organization.id,
//             idYear: parameters.year.id,
//             number: _computation.number,
//             label: _computation.label,
//             incomeStatements: _computation.incomeStatements
//         })
//     })
//     if (newComputations.length > 0) {
//         await db
//             .insert(computations)
//             .values(newComputations)
//     }

//     // Add computationIncomeStatements
//     const newComputationIncomeStatements: Array<(typeof computationIncomeStatements.$inferInsert)> = []
//     newComputations.forEach((_computation) => {
//         _computation.incomeStatements.forEach((_incomeStatement) => {
//             const incomeStatement = newIncomeStatements.find((x) => x.number === _incomeStatement.number)
//             if (!incomeStatement) return
//             newComputationIncomeStatements.push({
//                 id: generateId(),
//                 idOrganization: parameters.organization.id,
//                 idYear: parameters.year.id,
//                 idComputation: _computation.id,
//                 idIncomeStatement: incomeStatement.id,
//                 operation: _incomeStatement.operation
//             })
//         })
//     })
//     if (newComputationIncomeStatements.length > 0) {
//         await db
//             .insert(computationIncomeStatements)
//             .values(newComputationIncomeStatements)
//     }
// }
