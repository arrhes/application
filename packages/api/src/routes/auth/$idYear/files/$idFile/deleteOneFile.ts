import { deleteOneFileRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq, sql } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { response } from "../../../../../utilities/response.js"
import { deleteOne } from "../../../../../utilities/sql/deleteOne.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../../../utilities/sql/updateOne.js"

export const deleteOneFileRoute = apiFactory.createApp().post(deleteOneFileRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneFileRouteDefinition.schemas.body,
    })

    const deletedFile = await c.var.clients.sql.transaction(async (tx) => {
        const readOneFile = await selectOne({
            database: tx,
            table: models.file,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.id, body.idFile),
                ),
        })

        if (readOneFile.size !== null && readOneFile.size > 0) {
            await updateOne({
                database: tx,
                table: models.organization,
                data: {
                    storageCurrentUsage: sql`GREATEST(${models.organization.storageCurrentUsage} - ${readOneFile.size}, 0)`,
                },
                where: (table) => eq(table.id, idOrganization),
            })
        }

        const deleteOneFile = await deleteOne({
            database: tx,
            table: models.file,
            where: (table) =>
                and(
                    eq(table.idOrganization, idOrganization),
                    eq(table.id, body.idFile),
                ),
        })
        return deleteOneFile
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneFileRouteDefinition.schemas.return,
        data: deletedFile,
    })
})
