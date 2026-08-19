import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import {
    incomeStatementSchema,
    incomeStatementSchemaReturn,
} from "../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const createOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/income-statements`,
    name: "create-one-income-statement",
    schemas: {
        body: v.object({
            idYear: incomeStatementSchema.entries.idYear,
            idIncomeStatementParent: incomeStatementSchema.entries.idIncomeStatementParent,
            isComputed: incomeStatementSchema.entries.isComputed,
            number: incomeStatementSchema.entries.number,
            label: incomeStatementSchema.entries.label,
        }),
        return: incomeStatementSchemaReturn,
    },
})
