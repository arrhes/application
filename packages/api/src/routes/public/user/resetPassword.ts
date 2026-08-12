import { pbkdf2Sync, randomBytes } from "node:crypto"
import { models, resetPasswordRouteDefinition } from "@comptasse/application-metadata"
import { eq } from "drizzle-orm"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
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

    // Security: always return 200 regardless of whether the email exists
    // to prevent email enumeration attacks.
    const user = await selectOne({
        database: c.var.clients.sql,
        table: models.user,
        where: (table) => eq(table.email, body.email.trim().toLowerCase()),
    }).catch(() => null)

    if (user === null) {
        return response({
            context: c,
            statusCode: 200,
            schema: resetPasswordRouteDefinition.schemas.return,
            data: {},
        })
    }

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

    console.info(`[Password Reset] New temporary password for ${user.email}: ${temporaryPassword}`)

    return response({
        context: c,
        statusCode: 200,
        schema: resetPasswordRouteDefinition.schemas.return,
        data: {},
    })
})
