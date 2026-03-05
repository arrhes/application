/*
import {
    connectAccountsToIncomeStatementsRouteDefinition,
    defaultAssociationIncomeStatements,
    defaultCompanyIncomeStatements,
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

export const connectAccountsToIncomeStatementsRoute = apiFactory
    .createApp()
    .post(connectAccountsToIncomeStatementsRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: connectAccountsToIncomeStatementsRouteDefinition.schemas.body,
        })

        const readAllAccounts = await selectMany({
            database: c.var.clients.sql,
            table: models.account,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const readAllIncomeStatements = await selectMany({
            database: c.var.clients.sql,
            table: models.incomeStatement,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
        })

        const organization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })
        const defaultIncomeStatements =
            organization.scope === "association" ? defaultAssociationIncomeStatements : defaultCompanyIncomeStatements

        const _connectAccountsToIncomeStatements = await c.var.clients.sql.transaction(async (tx) => {
            for (const defaultIncomeStatement of defaultIncomeStatements) {
                for (const defaultAccount of defaultIncomeStatement.accounts) {
                    const foundAccount = readAllAccounts.find((account) => {
                        return account.number === defaultAccount.toString()
                    })

                    if (foundAccount === undefined) {
                        console.log("foundAccount is undefined", defaultIncomeStatement.number, defaultAccount)
                        continue
                    }

                    const incomeStatement = readAllIncomeStatements.find(
                        (incomeStatement) => incomeStatement.number === defaultIncomeStatement.number.toString(),
                    )
                    if (incomeStatement === undefined) {
                        console.log("incomeStatement is undefined", defaultIncomeStatement.number)
                        continue
                    }

                    const _updateOneAccount = await updateOne({
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
                                eq(table.idYear, body.idYear),
                                eq(table.id, foundAccount.id),
                            ),
                    })
                }
            }
        })

        return response({
            context: c,
            statusCode: 200,
            schema: connectAccountsToIncomeStatementsRouteDefinition.schemas.return,
            data: {},
        })
    })
*/
