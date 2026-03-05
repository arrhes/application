import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"

export const getAllMyOrganizationsRoute = apiFactory
    .createApp()
    .post(getAllMyOrganizationsRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const _body = await validateBodyMiddleware({
            context: c,
            schema: getAllMyOrganizationsRouteDefinition.schemas.body,
        })

        const readAllOrganizationUsers = await c.var.clients.sql.query.organizationUserModel.findMany({
            where: (table) => and(eq(table.idUser, user.id)),
            with: {
                organization: true,
            },
        })

        return response({
            context: c,
            statusCode: 200,
            schema: getAllMyOrganizationsRouteDefinition.schemas.return,
            data: readAllOrganizationUsers,
        })
    })
