import * as v from "valibot"
import { routePath } from "../../../../../../../../../../../../components/index.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "../../../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../../../utilities/routeDefinition.js"

export const updateOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "PATCH",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations/:idComputation/income-statements/:idComputationIncomeStatement`,
    schemas: {
        body: v.object({
            idComputationIncomeStatement: computationIncomeStatementSchema.entries.id,
            idYear: computationIncomeStatementSchema.entries.idYear,
            idComputation: v.optional(computationIncomeStatementSchema.entries.idComputation),
            idIncomeStatement: v.optional(computationIncomeStatementSchema.entries.idIncomeStatement),
            index: v.optional(computationIncomeStatementSchema.entries.index),
            operation: v.optional(computationIncomeStatementSchema.entries.operation),
        }),
        return: computationIncomeStatementSchemaReturn,
    },
})
