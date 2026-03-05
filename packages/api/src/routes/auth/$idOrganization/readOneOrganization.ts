import { models, readOneOrganizationRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"

export const readOneOrganizationRoute = apiFactory
    .createApp()
    .post(readOneOrganizationRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: readOneOrganizationRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idUser, user.id)),
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
