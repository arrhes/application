import { models, readOneOrganizationUserRouteDefinition } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../utilities/exception.js"
import { response } from "../../../../../utilities/response.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"

export const readOneOrganizationUserRoute = apiFactory
    .createApp()
    .post(readOneOrganizationUserRouteDefinition.path, async (c) => {
        await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: readOneOrganizationUserRouteDefinition.schemas.body,
        })

        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.id, body.idOrganizationUser)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        const readOneOrganizationUser = await c.var.clients.sql.query.organizationUserModel.findFirst({
            where: (table) => and(eq(table.id, body.idOrganizationUser)),
            with: {
                user: true,
            },
        })
        if (readOneOrganizationUser === undefined) {
            throw new Exception({
                statusCode: 404,
                internalMessage: "Organization user not found",
                externalMessage: "Utilisateur de l'organisation introuvable",
            })
        }

        return response({
            context: c,
            statusCode: 200,
            schema: readOneOrganizationUserRouteDefinition.schemas.return,
            data: readOneOrganizationUser,
        })
    })
