import { models, validateUserEmailRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { requireCookieSessionMiddleware } from "../../../middlewares/requireCookieSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { Exception } from "../../../utilities/exception.js"
import { registerRoute } from "../../../utilities/registerRoute.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const validateUserEmailRoute = registerRoute(validateUserEmailRouteDefinition, async (c) => {
    const { user } = await requireCookieSessionMiddleware({
        context: c,
    })
    const body = await validateBodyMiddleware({
        context: c,
        schema: validateUserEmailRouteDefinition.schemas.body,
    })

    if (body.emailToken !== user.emailToken) {
        throw new Exception({
            internalMessage: "Wrong token",
            statusCode: 403,
            externalMessage: "Code incorrect",
        })
    }

    const newEmail = user.emailToValidate
    if (newEmail === null) {
        throw new Exception({
            internalMessage: "No email to validate",
            statusCode: 403,
            externalMessage: "Aucun email à valider",
        })
    }

    const updatedUser = await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            email: newEmail,
            emailToValidate: null,
            emailToken: null,
            emailTokenExpiresAt: null,
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.emailToken, body.emailToken),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: validateUserEmailRouteDefinition.schemas.return,
        data: updatedUser,
    })
})
