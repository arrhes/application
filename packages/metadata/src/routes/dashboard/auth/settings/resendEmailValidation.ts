import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { userSchemaReturn } from "../../../../schemas/user.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const resendEmailValidationRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/resend-email-validation`,
    schemas: {
        body: v.object({}),
        return: userSchemaReturn,
    },
})
