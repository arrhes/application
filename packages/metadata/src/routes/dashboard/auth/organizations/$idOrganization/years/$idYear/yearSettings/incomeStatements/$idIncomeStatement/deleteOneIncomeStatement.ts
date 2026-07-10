import * as v from "valibot"
import { routePath } from "../../../../../../../../../../components/index.js"
import {
    incomeStatementSchema,
    incomeStatementSchemaReturn,
} from "../../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../../utilities/routeDefinition.js"

export const deleteOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "DELETE",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/income-statements/:idIncomeStatement`,
    name: "delete-one-income-statement",
    schemas: {
        body: v.object({
            idIncomeStatement: incomeStatementSchema.entries.id,
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: incomeStatementSchemaReturn,
    },
})
