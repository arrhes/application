import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateBalanceSheetXmlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-balance-sheet-xml`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
