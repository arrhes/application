import * as v from "valibot"
import { routePath } from "../../../components/index.js"
import { userSchema } from "../../../schemas/user.js"
import { routeDefinition } from "../../../utilities/routeDefinition.js"

export const sendMagicLinkRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.public}/send-magic-link`,
    schemas: {
        body: v.object({
            email: v.nonNullable(userSchema.entries.email),
        }),
        return: v.object({}),
    },
})
