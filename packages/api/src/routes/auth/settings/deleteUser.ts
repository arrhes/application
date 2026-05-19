import { pbkdf2Sync } from "node:crypto"
import { deleteUserRouteDefinition, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import { requireCookieSessionMiddleware } from "../../../middlewares/requireCookieSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../utilities/exception.js"
import { registerRoute } from "../../../utilities/registerRoute.js"
import { response } from "../../../utilities/response.js"
import { deleteOne } from "../../../utilities/sql/deleteOne.js"
import { selectMany } from "../../../utilities/sql/selectMany.js"

export const deleteUserRoute = registerRoute(deleteUserRouteDefinition, async (c) => {
    const { user } = await requireCookieSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: deleteUserRouteDefinition.schemas.body,
    })

    const givenPasswordHash = pbkdf2Sync(body.currentPassword, user.passwordSalt, 128000, 64, `sha512`).toString(`hex`)
    if (givenPasswordHash !== user.passwordHash) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "Invalid password",
            externalMessage: "Mot de passe incorrect",
        })
    }

    // Check the user is not the sole admin of any organization
    const adminMemberships = await selectMany({
        database: c.var.clients.sql,
        table: models.organizationUser,
        where: (table) => and(eq(table.idUser, user.id), eq(table.isAdmin, true)),
    })

    for (const membership of adminMemberships) {
        const otherAdmins = await selectMany({
            database: c.var.clients.sql,
            table: models.organizationUser,
            where: (table) => and(eq(table.idOrganization, membership.idOrganization), eq(table.isAdmin, true)),
        })

        if (otherAdmins.length <= 1) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "User is the sole admin of an organization",
                externalMessage:
                    "Vous êtes le seul administrateur d'une organisation. Transférez le rôle d'administrateur avant de supprimer votre compte.",
            })
        }
    }

    await deleteOne({
        database: c.var.clients.sql,
        table: models.user,
        where: (table) => eq(table.id, user.id),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: deleteUserRouteDefinition.schemas.return,
        data: {},
    })
})
