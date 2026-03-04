import { models, updateOneYearRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const updateOneYearRoute = apiFactory.createApp().post(updateOneYearRouteDefinition.path, async (c) => {
    const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneYearRouteDefinition.schemas.body,
    })

    const updateOneYear = await updateOne({
        database: c.var.clients.sql,
        table: models.year,
        data: {
            idYearPrevious: body.idYearPrevious,
            label: body.label,
            startingAt: body.startingAt,
            endingAt: body.endingAt,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: user.id,
        },
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idYear)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneYearRouteDefinition.schemas.return,
        data: updateOneYear,
    })
})
