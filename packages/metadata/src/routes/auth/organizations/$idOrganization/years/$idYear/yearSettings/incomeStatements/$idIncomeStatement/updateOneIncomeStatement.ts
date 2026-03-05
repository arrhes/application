import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import {
    incomeStatementSchema,
    incomeStatementSchemaReturn,
} from "../../../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateOneIncomeStatementRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-income-statement`,
    schemas: {
        body: v.object({
            idIncomeStatement: incomeStatementSchema.entries.id,
            idYear: incomeStatementSchema.entries.idYear,
            idIncomeStatementParent: v.optional(incomeStatementSchema.entries.idIncomeStatementParent),
            isComputed: v.optional(incomeStatementSchema.entries.isComputed),
            number: v.optional(incomeStatementSchema.entries.number),
            label: v.optional(incomeStatementSchema.entries.label),
        }),
        return: incomeStatementSchemaReturn,
    },
})
