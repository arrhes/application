import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { yearSchema } from "../../../../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const deleteOneYearRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/delete-one-year`,
    schemas: {
        body: v.object({
            idYear: yearSchema.entries.id,
        }),
        return: v.object({}),
    },
})
