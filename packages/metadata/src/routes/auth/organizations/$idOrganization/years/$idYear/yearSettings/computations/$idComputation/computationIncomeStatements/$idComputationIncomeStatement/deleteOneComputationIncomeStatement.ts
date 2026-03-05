import * as v from "valibot"
import { routePath } from "../../../../../../../../../../../components/index.js"
import { computationIncomeStatementSchema } from "../../../../../../../../../../../schemas/computationIncomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneComputationIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-computation-income-statement`,
    schemas: {
        body: v.object({
            idComputationIncomeStatement: computationIncomeStatementSchema.entries.id,
            idYear: computationIncomeStatementSchema.entries.idYear,
        }),
        return: v.object({}),
    },
})
