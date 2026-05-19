import { deleteOneFolderRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { deleteOne } from "../../../../../../../../utilities/sql/deleteOne.js"

export const deleteOneFolderRoute = registerRoute(deleteOneFolderRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteOneFolderRouteDefinition.schemas.body,
    })

    const deleteOneFolder = await deleteOne({
        database: c.var.clients.sql,
        table: models.folder,
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idFolder)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteOneFolderRouteDefinition.schemas.return,
        data: deleteOneFolder,
    })
})
