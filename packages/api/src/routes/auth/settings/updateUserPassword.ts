import { pbkdf2Sync } from "node:crypto"
import { models, updateUserPasswordRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { Exception } from "../../../utilities/exception.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const updateUserPasswordRoute = apiFactory
    .createApp()
    .post(updateUserPasswordRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: updateUserPasswordRouteDefinition.schemas.body,
        })

        if (body.newPassword !== body.newPasswordCheck) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Wrong new password check",
                externalMessage: "Les mots de passe ne correspondent pas",
            })
        }

        const givenPasswordHash = pbkdf2Sync(body.currentPassword, user.passwordSalt, 128000, 64, `sha512`).toString(
            `hex`,
        )
        if (givenPasswordHash !== user.passwordHash) {
            throw new Exception({
                statusCode: 400,
                internalMessage: "Invalid password",
                externalMessage: "Mot de passe incorrect",
            })
        }

        const newPasswordHash = pbkdf2Sync(body.newPassword, user.passwordSalt, 128000, 64, `sha512`).toString(`hex`)

        const updatePassword = await updateOne({
            database: c.var.clients.sql,
            table: models.user,
            data: {
                passwordHash: newPasswordHash,
                lastUpdatedAt: new Date().toISOString(),
            },
            where: (table) => eq(table.id, user.id),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: updateUserPasswordRouteDefinition.schemas.return,
            data: updatePassword,
        })
    })
