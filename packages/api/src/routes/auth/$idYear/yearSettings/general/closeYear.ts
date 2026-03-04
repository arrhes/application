import { closeYearRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq, not } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const closeYearRoute = apiFactory.createApp().post(closeYearRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: closeYearRouteDefinition.schemas.body,
    })

    const closeYear = await updateOne({
        database: c.var.clients.sql,
        table: models.year,
        data: {
            isClosed: not(models.year.isClosed),
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: user.id,
        },
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: closeYearRouteDefinition.schemas.return,
        data: closeYear,
    })
})
