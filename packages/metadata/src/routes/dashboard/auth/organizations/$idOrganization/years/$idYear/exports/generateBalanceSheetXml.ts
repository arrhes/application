import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateBalanceSheetXmlRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/exports/balance-sheet`,
    name: "generate-balance-sheet-xml",
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
