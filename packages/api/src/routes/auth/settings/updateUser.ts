import { models, updateUserRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateUserRoute = apiFactory.createApp().post(updateUserRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateUserRouteDefinition.schemas.body,
    })

    const updateUser = await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            alias: body.alias,
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, user.id),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateUserRouteDefinition.schemas.return,
        data: updateUser,
    })
})
