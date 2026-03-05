import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const createOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-computation-income-statement`,
    schemas: {
        body: v.object({
            idYear: computationIncomeStatementSchema.entries.idYear,
            idComputation: computationIncomeStatementSchema.entries.idComputation,
            idIncomeStatement: computationIncomeStatementSchema.entries.idIncomeStatement,
            index: computationIncomeStatementSchema.entries.index,
            operation: computationIncomeStatementSchema.entries.operation,
        }),
        return: computationIncomeStatementSchemaReturn,
    },
})
