import { activateOrganizationMembershipRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const activateOrganizationMembershipRoute = apiFactory
    .createApp()
    .post(activateOrganizationMembershipRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: activateOrganizationMembershipRouteDefinition.schemas.body,
        })

        const activateOrganizationUser = await updateOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            data: {
                status: "active",
                lastUpdatedAt: new Date().toISOString(),
                lastUpdatedBy: user.id,
            },
            where: (table) => and(eq(table.id, body.idOrganizationUser), eq(table.idUser, user.id)),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: activateOrganizationMembershipRouteDefinition.schemas.return,
            data: activateOrganizationUser,
        })
    })
