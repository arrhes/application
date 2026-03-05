import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { documentSchemaReturn } from "../../../../../../../schemas/document.js"
import { incomeStatementSchema } from "../../../../../../../schemas/incomeStatement.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const generateIncomeStatementReportDocumentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-income-statement-report-document`,
    schemas: {
        body: v.object({
            idYear: incomeStatementSchema.entries.idYear,
        }),
        return: documentSchemaReturn,
    },
})
