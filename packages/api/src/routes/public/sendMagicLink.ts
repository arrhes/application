import { models, sendMagicLinkRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../utilities/apiFactory.js"
import { response } from "../../utilities/response.js"
import { selectOne } from "../../utilities/sql/selectOne.js"

export const sendMagicLinkRoute = apiFactory.createApp().post(sendMagicLinkRouteDefinition.path, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: sendMagicLinkRouteDefinition.schemas.body,
    })

    const _user = await selectOne({
        database: c.var.clients.sql,
        table: models.user,
        where: (table) => eq(table.email, body.email.trim().toLowerCase()),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: sendMagicLinkRouteDefinition.schemas.return,
        data: {},
    })
})
