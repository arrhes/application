import { createOneOrganizationUserRouteDefinition, generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../utilities/apiFactory.js"
import { Exception } from "../../../../utilities/exception.js"
import { response } from "../../../../utilities/response.js"
import { insertOne } from "../../../../utilities/sql/insertOne.js"
import { selectOne } from "../../../../utilities/sql/selectOne.js"

export const createOneOrganizationUserRoute = apiFactory
    .createApp()
    .post(createOneOrganizationUserRouteDefinition.path, async (c) => {
        const { user, idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: createOneOrganizationUserRouteDefinition.schemas.body,
        })

        // must be admin of the administration
        const organizationUser = await selectOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idUser, user.id), eq(table.idOrganization, idOrganization)),
        })
        if (organizationUser.isAdmin === false) {
            throw new Exception({
                statusCode: 401,
                internalMessage: "User is not admin of the organization",
                externalMessage: "Vous n'êtes pas administrateur de l'organisation",
            })
        }

        // the user must exist
        const toAddUser = await selectOne({
            database: c.var.clients.sql,
            table: models.user,
            where: (table) => eq(table.email, body.user.email),
        })
        if (toAddUser === undefined) {
            throw new Exception({
                statusCode: 404,
                internalMessage: "User not found",
                externalMessage: "Utilisateur non trouvé",
            })
        }

        const createOneOrganizationUser = await insertOne({
            database: c.var.clients.sql,
            table: models.organizationUser,
            data: {
                id: generateId(),
                idOrganization: organizationUser.idOrganization,
                idUser: toAddUser.id,
                isOwner: false,
                isAdmin: body.isAdmin,
                status: "invited",
                createdAt: new Date().toISOString(),
                lastUpdatedAt: null,
                createdBy: user.id,
                lastUpdatedBy: null,
            },
        })

        //  await sendEmail({
        //                 to: updateUser.email,
        //                 subject: "Invitation à collaborer sur Coulba",
        //                 html: invitationTemplate({
        //                     urlInvitation: `${urlApp}/services/invitation?id=${updateUser.id}&token=${updateUser.invitationToken}`,
        //                     urlWebsite: urlWebsite
        //                 })
        //             })

        return response({
            context: c,
            statusCode: 200,
            schema: createOneOrganizationUserRouteDefinition.schemas.return,
            data: createOneOrganizationUser,
        })
    })
