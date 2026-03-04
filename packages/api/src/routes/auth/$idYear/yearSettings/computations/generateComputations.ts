/*
import {
    defaultComputations,
    generateComputationsRouteDefinition,
    generateId,
    models,
} from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../utilities/exception.js"
import { response } from "../../../../../utilities/response.js"
import { deleteMany } from "../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../utilities/sql/insertMany.js"
import { selectMany } from "../../../../../utilities/sql/selectMany.js"

export const generateComputationsRoute = apiFactory
    .createApp()
    .post(generateComputationsRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateComputationsRouteDefinition.schemas.body,
        })

        const generatedComputations = await c.var.clients.sql.transaction(async (tx) => {
            try {
                const _deletedComputations = await deleteMany({
                    database: tx,
                    table: models.computation,
                    where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
                })
            } catch (_error: unknown) {
                throw new Exception({
                    internalMessage: "Failed to delete computations",
                    externalMessage: "Échec de la suppression des calculs",
                })
            }

            const incomeStatements = await selectMany({
                database: tx,
                table: models.incomeStatement,
                where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
            })

            const newComputationIncomeStatements: Array<typeof models.computationIncomeStatement.$inferInsert> = []
            const newComputations = defaultComputations.map((defaultComputation, defaultComputationIndex) => {
                const newComputation = {
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: body.idYear,
                    index: defaultComputationIndex,
                    number: defaultComputation.number.toString(),
                    label: defaultComputation.label,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: null,
                    lastUpdatedBy: null,
                }

                defaultComputation.incomeStatements.forEach((_incomeStatement, index) => {
                    const incomeStatement = incomeStatements.find(
                        (x) => x.number === _incomeStatement.number.toString(),
                    )

                    if (incomeStatement === undefined) {
                        return
                    }

                    newComputationIncomeStatements.push({
                        id: generateId(),
                        idOrganization: idOrganization,
                        idYear: body.idYear,
                        idComputation: newComputation.id,
                        idIncomeStatement: incomeStatement.id,
                        index: index,
                        operation: _incomeStatement.operation,
                        createdAt: new Date().toISOString(),
                    })
                })

                return newComputation
            })

            const generatedComputations = await insertMany({
                database: tx,
                table: models.computation,
                data: newComputations,
            })

            const _generatedComputationIncomeStatements = await insertMany({
                database: tx,
                table: models.computationIncomeStatement,
                data: newComputationIncomeStatements,
            })

            return generatedComputations
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateComputationsRouteDefinition.schemas.return,
            data: generatedComputations,
        })
    })
*/
