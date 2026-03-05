import { pbkdf2Sync } from "node:crypto"
import { models, updateUserEmailRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { Exception } from "../../../utilities/exception.js"
import { generateVerificationToken } from "../../../utilities/generateVerificationToken.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateUserEmailRoute = apiFactory.createApp().post(updateUserEmailRouteDefinition.path, async (c) => {
    const { user } = await checkUserSessionMiddleware({ context: c })
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
            emailToValidate: body.emailToValidate,
            emailToken: generateVerificationToken(),
            emailTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, user.id),
    })

    // await sendEmail({
    //     to: updateUser.email,
    //     subject: "Valider votre email",
    //     html: emailValidationTemplate({
    //         url: `${urlApp}/services/email?id=${updateUser.id}&token=${updateUser.emailToken}`,
    //     })
    // })

    return response({
        context: c,
        statusCode: 200,
        schema: updateUserEmailRouteDefinition.schemas.return,
        data: updatedEmail,
    })
})
