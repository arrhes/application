import { cancelSubscriptionRouteDefinition } from "@arrhes/application-metadata"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"

export const cancelSubscriptionRoute = apiFactory
    .createApp()
    .post(cancelSubscriptionRouteDefinition.path, async (c) => {
        await checkAuthMiddleware({
            context: c,
        })
        await validateBodyMiddleware({
            context: c,
            schema: cancelSubscriptionRouteDefinition.schemas.body,
        })

        return response({
            context: c,
            statusCode: 200,
            schema: cancelSubscriptionRouteDefinition.schemas.return,
            data: {},
        })
    })
