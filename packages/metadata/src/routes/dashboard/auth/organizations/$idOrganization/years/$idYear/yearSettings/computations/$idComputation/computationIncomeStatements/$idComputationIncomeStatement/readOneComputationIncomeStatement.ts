import * as v from "valibot"
import { routePath } from "../../../../../../../../../../../../components/index.js"
import {
    computationIncomeStatementSchema,
    computationIncomeStatementSchemaReturn,
} from "../../../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../../../utilities/routeDefinition.js"

export const readOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/computations/:idComputation/income-statements/:idComputationIncomeStatement`,
    schemas: {
        body: v.object({
            idComputationIncomeStatement: computationIncomeStatementSchema.entries.id,
            idYear: computationIncomeStatementSchema.entries.idYear,
        }),
        return: computationIncomeStatementSchemaReturn,
    },
})
