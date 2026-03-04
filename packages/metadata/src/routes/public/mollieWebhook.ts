import * as v from "valibot"
import { routePath } from "../../components/index.js"
import { routeDefinition } from "../../utilities/routeDefinition.js"

export const mollieWebhookRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/mollie-webhook`,
    schemas: {
        body: v.object({
            id: v.string("Ce champ est requis"),
        }),
        return: v.object({}),
    },
})
