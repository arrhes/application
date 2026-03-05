import * as v from "valibot"
import { routePath } from "../../../../../../../../../../../components/index.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "../../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../../utilities/routeDefinition.js"

export const readOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-one-computation-income-statement`,
    schemas: {
        body: v.object({
            idComputationIncomeStatement: computationIncomeStatementSchema.entries.id,
            idYear: computationIncomeStatementSchema.entries.idYear,
        }),
        return: computationIncomeStatementSchemaReturn,
    },
})
