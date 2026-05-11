import { models, readAllFilesRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { response } from "../../../../utilities/response.js"
import { selectMany } from "../../../../utilities/sql/selectMany.js"

export const readAllFilesRoute = apiFactory.createApp().post(readAllFilesRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({
        context: c,
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
