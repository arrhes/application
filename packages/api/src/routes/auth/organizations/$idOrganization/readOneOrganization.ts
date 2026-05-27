import { models, readOneOrganizationRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkAuthMiddleware } from "../../../../middlewares/checkAuthMiddleware.js"
import { requireOrganizationMiddleware } from "../../../../middlewares/requireOrganizationMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const readOneOrganizationRoute = apiFactory
    .createApp()
    .get(readOneOrganizationRouteDefinition.path, async (c) => {
        const auth = await checkAuthMiddleware({
            context: c,
        })
        const idOrganization = await requireOrganizationMiddleware({
            idOrganization: auth.idOrganization,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneOrganizationRouteDefinition.schemas.body,
        })

        if (body.idOrganization !== idOrganization) {
            throw new Exception({
                statusCode: 403,
                internalMessage: "Body organization id does not match active organization",
                externalMessage: "L'organisation demandée ne correspond pas à l'organisation active.",
            })
        }

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idOrganization, body.idOrganization), eq(table.idUser, auth.user.id)),
        })

        const readOneOrganization = await selectOne({
            database: c.var.clients.sql,
            table: models.organization,
            where: (table) => eq(table.id, organizationUser.idOrganization),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: readOneOrganizationRouteDefinition.schemas.return,
            data: readOneOrganization,
        })
    })
