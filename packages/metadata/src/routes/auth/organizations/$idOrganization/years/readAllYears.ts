import * as v from "valibot"
import { routePath } from "../../../../../components/index.js"
import { yearSchemaReturn } from "../../../../../schemas/year.js"
import { routeDefinition } from "../../../../../utilities/routeDefinition.js"

export const readAllYearsRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/read-all-years`,
    schemas: {
        body: v.object({}),
        return: v.array(yearSchemaReturn),
    },
})
