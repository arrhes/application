import { sendSupportMessageRouteDefinition } from "@arrhes/application-metadata"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { sendEmail } from "../../../utilities/email/sendEmail.js"
import { supportTemplate } from "../../../utilities/email/templates/support.js"
import { response } from "../../../utilities/response.js"

export const sendSupportMessageRoute = apiFactory
    .createApp()
    .post(sendSupportMessageRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: sendSupportMessageRouteDefinition.schemas.body,
        })

        await sendEmail({
            var: c.var,
            to: "support@arrhes.fr",
            subject: `[Support] ${user.id}`,
            html: supportTemplate({
                category: body.category ?? "null",
                date: new Date().toISOString(),
                message: body.message,
            }),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: sendSupportMessageRouteDefinition.schemas.return,
            data: {},
        })
    })
