import { deleteOneRecordLabelRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../utilities/sql/deleteOne.js"

export const deleteOneRecordLabelRoute = apiFactory
    .createApp()
    .post(deleteOneRecordLabelRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneRecordLabelRouteDefinition.schemas.body,
        })

        const deleteOneRecordLabel = await deleteOne({
            database: c.var.clients.sql,
            table: models.recordLabel,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idRecordLabel),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneRecordLabelRouteDefinition.schemas.return,
            data: deleteOneRecordLabel,
        })
    })
