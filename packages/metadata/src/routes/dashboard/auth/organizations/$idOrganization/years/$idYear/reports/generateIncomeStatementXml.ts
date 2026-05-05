import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const generateIncomeStatementXmlRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/generate-income-statement-xml`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
        }),
        return: v.object({
            url: v.string(),
        }),
    },
})
