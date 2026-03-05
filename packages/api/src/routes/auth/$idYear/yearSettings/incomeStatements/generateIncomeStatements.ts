/*
import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    defaultAssociationIncomeStatements,
    defaultCompanyIncomeStatements,
    generateId,
    generateIncomeStatementsRouteDefinition,
    models,
} from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type * as v from "valibot"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../utilities/exception.js"
import { response } from "../../../../../utilities/response.js"
import { deleteMany } from "../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../utilities/sql/insertMany.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"

export const generateIncomeStatementsRoute = apiFactory
    .createApp()
    .post(generateIncomeStatementsRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateIncomeStatementsRouteDefinition.schemas.body,
        })

        const generatedIncomeStatements = await c.var.clients.sql.transaction(async (tx) => {
            try {
                const _deletedIncomeStatements = await deleteMany({
                    database: tx,
                    table: models.incomeStatement,
                    where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
                })
            } catch (_error: unknown) {
                throw new Exception({
                    internalMessage: "Failed to delete incomeStatements",
                    externalMessage: "Échec de la suppression des lignes de compte de résultat",
                })
            }

            const organization = await selectOne({
                database: tx,
                table: models.organization,
                where: (table) => eq(table.id, idOrganization),
            })
            const defaultIncomeStatements =
                organization.scope === "association"
                    ? defaultAssociationIncomeStatements
                    : defaultCompanyIncomeStatements

            const newIncomeStatements: Array<v.InferOutput<typeof returnedSchemas.incomeStatement>> = []

            defaultIncomeStatements.forEach((defaultIncomeStatement) => {
                const incomeStatementParent = newIncomeStatements.find((newIncomeStatement) => {
                    return newIncomeStatement.number === defaultIncomeStatement.numberParent?.toString()
                })
                newIncomeStatements.push({
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: body.idYear,
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

            const generatedIncomeStatements = await insertMany({
                database: tx,
                table: models.incomeStatement,
                data: newIncomeStatements,
            })

            return generatedIncomeStatements
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateIncomeStatementsRouteDefinition.schemas.return,
            data: generatedIncomeStatements,
        })
    })
*/
