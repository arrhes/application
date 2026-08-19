import { models, updateOneFileRouteDefinition } from "@comptasse/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../../../../../middlewares/validateBody.middleware.js"
import { registerRoute } from "../../../../../../../../utilities/registerRoute.js"
import { response } from "../../../../../../../../utilities/response.js"
import { updateOne } from "../../../../../../../../utilities/sql/updateOne.js"

export const updateOneFileRoute = registerRoute(updateOneFileRouteDefinition, async (c) => {
    const auth = await checkAuthMiddleware({
        context: c,
    })
    const idOrganization = await requireOrganizationMiddleware({
        idOrganization: auth.idOrganization,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateOneFileRouteDefinition.schemas.body,
    })

    const updateOneFile = await updateOne({
        database: c.var.clients.sql,
        table: models.file,
        data: {
            reference: body.reference,
            name: body.name,
            date: body.date,
            idFolder: body.idFolder,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: auth.user.id,
        },
        where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.id, body.idFile)),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateOneFileRouteDefinition.schemas.return,
        data: updateOneFile,
    })
})
