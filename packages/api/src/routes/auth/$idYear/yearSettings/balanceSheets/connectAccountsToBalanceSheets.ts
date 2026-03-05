/*
import {
    connectAccountsToBalanceSheetsRouteDefinition,
    defaultAssociationBalanceSheets,
    defaultCompanyBalanceSheets,
    models,
} from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const connectAccountsToBalanceSheetsRoute = apiFactory
    .createApp()
    .post(connectAccountsToBalanceSheetsRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: connectAccountsToBalanceSheetsRouteDefinition.schemas.body,
        })

        const readAllAccounts = await selectMany({
            database: c.var.clients.sql,
            table: models.account,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllBalanceSheets = await selectMany({
            database: c.var.clients.sql,
            table: models.balanceSheet,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })
        const defaultBalanceSheets =
            organization.scope === "association" ? defaultAssociationBalanceSheets : defaultCompanyBalanceSheets

        const _connectAccountsToBalanceSheets = await c.var.clients.sql.transaction(async (tx) => {
            for (const defaultBalanceSheet of defaultBalanceSheets) {
                for (const defaultAccount of defaultBalanceSheet.accounts) {
                    const foundAccount = readAllAccounts.find((account) => {
                        return account.number === defaultAccount.number.toString()
                    })

                    if (foundAccount === undefined) {
                        console.log("foundAccount is undefined", defaultBalanceSheet.number, defaultAccount)
                        continue
                    }

                    const balanceSheet = readAllBalanceSheets.find(
                        (balanceSheet) => balanceSheet.number === defaultBalanceSheet.number.toString(),
                    )
                    if (balanceSheet === undefined) {
                        console.log("balanceSheet is undefined", defaultBalanceSheet.number)
                        continue
                    }

                    const _updateOneAccount = await updateOne({
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
                            balanceSheetAssetFlow:
                                defaultBalanceSheet.side === "asset" ? defaultAccount.flow : undefined,

                            idBalanceSheetLiability:
                                defaultBalanceSheet.side === "liability" ? balanceSheet.id : undefined,
                            balanceSheetLiabilityColumn: defaultBalanceSheet.side === "liability" ? "net" : undefined,
                            balanceSheetLiabilityFlow:
                                defaultBalanceSheet.side === "liability" ? defaultAccount.flow : undefined,

                            lastUpdatedAt: new Date().toISOString(),
                            lastUpdatedBy: user.id,
                        },
                        where: (table) =>
                            and(
                                eq(table.idOrganization, idOrganization),
                                eq(table.idYear, body.idYear),
                                eq(table.id, foundAccount.id),
                            ),
                    })
                }
            }
            for (const account of readAllAccounts) {
                const defaultBalanceSheet = defaultBalanceSheets.find((defaultBalanceSheet) => {
                    const _foundAccount = defaultBalanceSheet.accounts.find(
                        (defaultAccount) => defaultAccount.number.toString() === account.number,
                    )

                    return false
                })

                if (defaultBalanceSheet === undefined) {
                    continue
                }

                const balanceSheet = readAllBalanceSheets.find(
                    (balanceSheet) => balanceSheet.number === defaultBalanceSheet.number.toString(),
                )
                if (balanceSheet === undefined) {
                }
            }
        })

        return response({
            context: c,
            statusCode: 200,
            schema: connectAccountsToBalanceSheetsRouteDefinition.schemas.return,
            data: {},
        })
    })
*/
