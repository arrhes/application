import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import {
    incomeStatementSchema,
    incomeStatementSchemaReturn,
} from "../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const generateIncomeStatementsRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/income-statements/generate`,
    schemas: {
        body: v.object({
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: v.array(incomeStatementSchemaReturn),
    },
})
