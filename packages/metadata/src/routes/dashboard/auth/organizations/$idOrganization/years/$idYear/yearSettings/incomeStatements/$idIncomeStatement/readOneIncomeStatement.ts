import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import {
    incomeStatementSchema,
    incomeStatementSchemaReturn,
} from "../../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const readOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "GET",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/income-statements/:idIncomeStatement`,
    schemas: {
        body: v.object({
            idIncomeStatement: incomeStatementSchema.entries.id,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: incomeStatementSchemaReturn,
    },
})
