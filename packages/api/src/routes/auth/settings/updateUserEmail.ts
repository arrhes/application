import { pbkdf2Sync } from "node:crypto"
import { models, updateUserEmailRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { requireCookieSessionMiddleware } from "../../../middlewares/requireCookieSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../utilities/exception.js"
import { registerRoute } from "../../../utilities/registerRoute.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateUserEmailRoute = registerRoute(updateUserEmailRouteDefinition, async (c) => {
    const { user } = await requireCookieSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: updateUserEmailRouteDefinition.schemas.body,
    })

    const givenPasswordHash = pbkdf2Sync(body.currentPassword, user.passwordSalt, 128000, 64, `sha512`).toString(`hex`)
    if (givenPasswordHash !== user.passwordHash) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "Invalid password",
            externalMessage: "Mot de passe incorrect",
        })
    }

    const updatedEmail = await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            email: body.emailToValidate,
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, user.id),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: updateUserEmailRouteDefinition.schemas.return,
        data: updatedEmail,
    })
})
