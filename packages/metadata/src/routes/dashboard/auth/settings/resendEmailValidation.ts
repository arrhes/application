import * as v from "valibot"
import { routePath } from "../../../../components/index.js"
import { userSchemaReturn } from "../../../../schemas/user.js"
import { routeDefinition } from "../../../../utilities/routeDefinition.js"

export const resendEmailValidationRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/users/me/email/resend-validation`,
    schemas: {
        body: v.object({}),
        return: userSchemaReturn,
    },
})
