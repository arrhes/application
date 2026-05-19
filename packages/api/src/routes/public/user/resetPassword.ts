import { pbkdf2Sync, randomBytes } from "node:crypto"
import { models, resetPasswordRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { sendEmail } from "../../../utilities/email/sendEmail.js"
import { resetPasswordTemplate } from "../../../utilities/email/templates/resetPassword.js"
import { registerRoute } from "../../../utilities/registerRoute.js"
import { response } from "../../../utilities/response.js"
import { selectOne } from "../../../utilities/sql/selectOne.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

function generateTemporaryPassword() {
    return randomBytes(12).toString("base64url")
}

export const resetPasswordRoute = registerRoute(resetPasswordRouteDefinition, async (c) => {
    const body = await validateBodyMiddleware({
        context: c,
        schema: resetPasswordRouteDefinition.schemas.body,
    })

    const user = await selectOne({
        database: c.var.clients.sql,
        table: models.user,
        where: (table) => eq(table.email, body.email.trim().toLowerCase()),
    })

    const temporaryPassword = generateTemporaryPassword()
    const passwordSalt = randomBytes(32).toString("hex")
    const passwordHash = pbkdf2Sync(temporaryPassword, passwordSalt, 128000, 64, "sha512").toString("hex")

    await updateOne({
        database: c.var.clients.sql,
        table: models.user,
        data: {
            passwordHash,
            passwordSalt,
            lastUpdatedAt: new Date().toISOString(),
        },
        where: (table) => eq(table.id, user.id),
    })

    await sendEmail({
        var: c.var,
        to: user.email,
        subject: "Réinitialisation de votre mot de passe",
        html: resetPasswordTemplate({
            newPassword: temporaryPassword,
        }),
    })

    return response({
        context: c,
        statusCode: 200,
        schema: resetPasswordRouteDefinition.schemas.return,
        data: {},
    })
})
