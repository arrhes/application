import * as v from "valibot"
import { routePath } from "../../../../../../../components/index.js"
import { balanceSheetSchema } from "../../../../../../../schemas/balanceSheet.js"
import { documentSchemaReturn } from "../../../../../../../schemas/document.js"
import { routeDefinition } from "../../../../../../../utilities/routeDefinition.js"

export const generateBalanceSheetReportDocumentRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-balance-sheet-report-document`,
    schemas: {
        body: v.object({
            idYear: balanceSheetSchema.entries.idYear,
        }),
        return: documentSchemaReturn,
    },
})
