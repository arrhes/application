import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    createOneYearRouteDefinition,
    type DefaultAccount,
    defaultAssociationAccounts,
    defaultAssociationBalanceSheets,
    defaultAssociationIncomeStatements,
    defaultCompanyAccounts,
    defaultCompanyBalanceSheets,
    defaultCompanyIncomeStatements,
    defaultComputations,
    defaultJournals,
    generateId,
    models,
} from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type * as v from "valibot"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { insertMany } from "../../../../utilities/sql/insertMany.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../utilities/sql/updateOne.js"

function buildAccountRows(parameters: {
    accounts: Array<DefaultAccount>
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    idAccountParent: v.InferOutput<typeof returnedSchemas.account>["idAccountParent"] | null
}) {
    const newAccounts: Array<v.InferOutput<typeof returnedSchemas.account>> = []

    parameters.accounts.forEach((account) => {
        const newAccount = {
            id: generateId(),
            idOrganization: parameters.idOrganization,
            idYear: parameters.idYear,
            idAccountParent: parameters.idAccountParent,

            idBalanceSheetAsset: null,
            balanceSheetAssetColumn: null,
            balanceSheetAssetFlow: null,

            idBalanceSheetLiability: null,
            balanceSheetLiabilityColumn: null,
            balanceSheetLiabilityFlow: null,

            idIncomeStatement: null,

            number: account.number.toString(),
            isMandatory: account.isMandatory,
            isClass: account.isClass,
            isDefault: true,
            isSelectable: account.isSelectable,
            label: account.label,
            type: account.type,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: null,
            lastUpdatedBy: null,
        }
        newAccounts.push(newAccount)
        newAccounts.push(
            ...buildAccountRows({
                ...parameters,
                accounts: account.children,
                idAccountParent: newAccount.id,
            }),
        )
    })

    return newAccounts
}

export const createOneYearRoute = apiFactory.createApp().post(createOneYearRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: createOneYearRouteDefinition.schemas.body,
    })

    const createOneYear = await c.var.clients.sql.transaction(async (tx) => {
        // 1. Create the year
        const createdYear = await insertOne({
            database: tx,
            table: models.year,
            data: {
                id: generateId(),
                idOrganization: idOrganization,
                idYearPrevious: body.idYearPrevious,
                isClosed: false,
                closedAt: null,
                label: body.label ?? `Exercice ${new Date(body.startingAt).getFullYear()}`,
                startingAt: body.startingAt,
                endingAt: body.endingAt,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        const idYear = createdYear.id

        const organization = await selectOne({
            database: tx,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })

        // 2. Generate accounts
        const defaultAccounts =
            organization.scope === "association" ? defaultAssociationAccounts : defaultCompanyAccounts

        const newAccounts = buildAccountRows({
            idOrganization: idOrganization,
            idYear: idYear,
            accounts: defaultAccounts,
            idAccountParent: null,
        })

        await insertMany({
            database: tx,
            table: models.account,
            data: newAccounts,
        })

        // 3. Generate journals
        const newJournals = defaultJournals.map((defaultJournal) => {
            return {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: idYear,
                code: defaultJournal.code,
                label: defaultJournal.label,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: null,
                lastUpdatedBy: null,
            }
        })

        await insertMany({
            database: tx,
            table: models.journal,
            data: newJournals,
        })

        // 4. Generate balance sheets
        const defaultBalanceSheets =
            organization.scope === "association" ? defaultAssociationBalanceSheets : defaultCompanyBalanceSheets

        const newBalanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>> = []

        defaultBalanceSheets.forEach((defaultBalanceSheet) => {
            const balanceSheetParent = newBalanceSheets.find((newBalanceSheet) => {
                const isParent = newBalanceSheet.number === defaultBalanceSheet.numberParent?.toString()
                const isSameSide = newBalanceSheet.side === defaultBalanceSheet.side
                return isParent && isSameSide
            })
            newBalanceSheets.push({
                id: generateId(),
                idOrganization: idOrganization,
                idYear: idYear,
                idBalanceSheetParent: balanceSheetParent?.id ?? null,
                number: defaultBalanceSheet.number.toString(),
                isDefault: true,
                isComputed: balanceSheetParent === undefined,
                label: defaultBalanceSheet.label,
                side: defaultBalanceSheet.side,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: null,
                lastUpdatedBy: null,
            })
        })

        await insertMany({
            database: tx,
            table: models.balanceSheet,
            data: newBalanceSheets,
        })

        // 5. Generate income statements
        const defaultIncomeStatements =
            organization.scope === "association" ? defaultAssociationIncomeStatements : defaultCompanyIncomeStatements

        const newIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>> = []

        defaultIncomeStatements.forEach((defaultIncomeStatement) => {
            const incomeStatementParent = newIncomeStatements.find((newIncomeStatement) => {
                return newIncomeStatement.number === defaultIncomeStatement.numberParent?.toString()
            })
            newIncomeStatements.push({
                id: generateId(),
                idOrganization: idOrganization,
                idYear: idYear,
                idIncomeStatementParent: incomeStatementParent?.id ?? null,
                number: defaultIncomeStatement.number.toString(),
                isDefault: true,
                isComputed: incomeStatementParent === undefined,
                label: defaultIncomeStatement.label,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: null,
                lastUpdatedBy: null,
            })
        })

        await insertMany({
            database: tx,
            table: models.incomeStatement,
            data: newIncomeStatements,
        })

        // 6. Generate computations
        const newComputationIncomeStatements: Array<typeof models.computationIncomeStatement.$inferInsert> = []
        const newComputations = defaultComputations.map((defaultComputation, defaultComputationIndex) => {
            const newComputation = {
                id: generateId(),
                idOrganization: idOrganization,
                idYear: idYear,
                index: defaultComputationIndex,
                number: defaultComputation.number.toString(),
                label: defaultComputation.label,
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: null,
                lastUpdatedBy: null,
            }

            defaultComputation.incomeStatements.forEach((_incomeStatement, index) => {
                const incomeStatement = newIncomeStatements.find((x) => x.number === _incomeStatement.number.toString())

                if (incomeStatement === undefined) {
                    return
                }

                newComputationIncomeStatements.push({
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: idYear,
                    idComputation: newComputation.id,
                    idIncomeStatement: incomeStatement.id,
                    index: index,
                    operation: _incomeStatement.operation,
                    createdAt: new Date().toISOString(),
                })
            })

            return newComputation
        })

        await insertMany({
            database: tx,
            table: models.computation,
            data: newComputations,
        })

        await insertMany({
            database: tx,
            table: models.computationIncomeStatement,
            data: newComputationIncomeStatements,
        })

        // 7. Connect accounts to balance sheets
        for (const defaultBalanceSheet of defaultBalanceSheets) {
            for (const defaultAccount of defaultBalanceSheet.accounts) {
                const foundAccount = newAccounts.find((account) => {
                    return account.number === defaultAccount.number.toString()
                })

                if (foundAccount === undefined) {
                    continue
                }

                const balanceSheet = newBalanceSheets.find(
                    (balanceSheet) => balanceSheet.number === defaultBalanceSheet.number.toString(),
                )
                if (balanceSheet === undefined) {
                    continue
                }

                await updateOne({
                    database: tx,
                    table: models.account,
                    data: {
                        idBalanceSheetAsset: defaultBalanceSheet.side === "asset" ? balanceSheet.id : undefined,
                        balanceSheetAssetColumn:
                            defaultBalanceSheet.side === "asset"
                                ? defaultAccount.isAmortization
                                    ? "amortization"
                                    : "gross"
                                : undefined,
                        balanceSheetAssetFlow: defaultBalanceSheet.side === "asset" ? defaultAccount.flow : undefined,

                        idBalanceSheetLiability: defaultBalanceSheet.side === "liability" ? balanceSheet.id : undefined,
                        balanceSheetLiabilityColumn: defaultBalanceSheet.side === "liability" ? "net" : undefined,
                        balanceSheetLiabilityFlow:
                            defaultBalanceSheet.side === "liability" ? defaultAccount.flow : undefined,

                        lastUpdatedAt: new Date().toISOString(),
                        lastUpdatedBy: user.id,
                    },
                    where: (table) =>
                        and(
                            eq(table.idOrganization, idOrganization),
                            eq(table.idYear, idYear),
                            eq(table.id, foundAccount.id),
                        ),
                })
            }
        }

        // 8. Connect accounts to income statements
        for (const defaultIncomeStatement of defaultIncomeStatements) {
            for (const defaultAccount of defaultIncomeStatement.accounts) {
                const foundAccount = newAccounts.find((account) => {
                    return account.number === defaultAccount.toString()
                })

                if (foundAccount === undefined) {
                    continue
                }

                const incomeStatement = newIncomeStatements.find(
                    (incomeStatement) => incomeStatement.number === defaultIncomeStatement.number.toString(),
                )
                if (incomeStatement === undefined) {
                    continue
                }

                await updateOne({
                    database: tx,
                    table: models.account,
                    data: {
                        idIncomeStatement: incomeStatement.id,
                        lastUpdatedAt: new Date().toISOString(),
                        lastUpdatedBy: user.id,
                    },
                    where: (table) =>
                        and(
                            eq(table.idOrganization, idOrganization),
                            eq(table.idYear, idYear),
                            eq(table.id, foundAccount.id),
                        ),
                })
            }
        }

        return createdYear
    })

    return response({
        context: c,
        statusCode: 200,
        schema: createOneYearRouteDefinition.schemas.return,
        data: createOneYear,
    })
})
