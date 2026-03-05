import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readAllComputationIncomeStatementsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-computation-income-statements`,
    schemas: {
        body: v.object({
            idYear: computationIncomeStatementSchema.entries.idYear,
            idComputation: v.optional(computationIncomeStatementSchema.entries.idComputation),
            idIncomeStatement: v.optional(computationIncomeStatementSchema.entries.idIncomeStatement),
        }),
        return: v.array(computationIncomeStatementSchemaReturn),
    },
})
