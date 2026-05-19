import { models, readAllFilesRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../utilities/response.js"
import { selectMany } from "../../../../../../../utilities/sql/selectMany.js"

export const readAllFilesRoute = registerRoute(readAllFilesRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    await validateBodyMiddleware({
        context: c,
        schema: readAllFilesRouteDefinition.schemas.body,
    })

    const readAllFiles = await selectMany({
        database: c.var.clients.sql,
        table: models.file,
        where: (table) => eq(table.idOrganization, idOrganization),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: readAllFilesRouteDefinition.schemas.return,
        data: readAllFiles,
    })
})
