import { deleteOneEntryLineRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../../../utilities/apiFactory.js"
import { response } from "../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneEntryLineRoute = apiFactory
    .createApp()
    .post(deleteOneEntryLineRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: deleteOneEntryLineRouteDefinition.schemas.body,
        })

        const deleteOneEntryLine = await deleteOne({
            database: c.var.clients.sql,
            table: models.entryLine,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.idYear, body.idYear),
                    eq(table.id, body.idEntryLine),
                ),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: deleteOneEntryLineRouteDefinition.schemas.return,
            data: deleteOneEntryLine,
        })
    })
