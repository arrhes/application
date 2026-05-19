import { createFirstPaymentRouteDefinition } from "@arrhes/application-metadata"
import { checkAuthMiddleware } from "../../../../../../middlewares/checkAuthMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../../utilities/exception.js"

export const createFirstPaymentRoute = apiFactory
    .createApp()
    .post(createFirstPaymentRouteDefinition.path, async (c) => {
        await checkAuthMiddleware({
            context: c,
        })
        await validateBodyMiddleware({
            context: c,
            schema: createFirstPaymentRouteDefinition.schemas.body,
        })

        throw new Exception({
            statusCode: 400,
            internalMessage: "Mollie subscription integration has been retired",
            externalMessage: "Cette fonctionnalité n'est plus disponible",
        })
    })
