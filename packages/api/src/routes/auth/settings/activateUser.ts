import { activateUserRouteDefinition, models } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { Exception } from "../../../utilities/exception.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const activateUserRoute = apiFactory.createApp().post(activateUserRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: activateUserRouteDefinition.schemas.body,
    })

    if (body.emailToken !== user.emailToken) {
        throw new Exception({
            internalMessage: "Wrong token",
            statusCode: 403,
            externalMessage: "Code incorrect",
        })
    }

    const updatedUser = await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            isActive: true,
            emailToValidate: null,
            emailToken: null,
            emailTokenExpiresAt: null,
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, user.id),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: activateUserRouteDefinition.schemas.return,
        data: updatedUser,
    })
})
