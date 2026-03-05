import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { incomeStatementSchema, incomeStatementSchemaReturn } from "../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const readAllIncomeStatementsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-income-statements`,
    schemas: {
        body: v.object({
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: v.array(incomeStatementSchemaReturn),
    },
})
