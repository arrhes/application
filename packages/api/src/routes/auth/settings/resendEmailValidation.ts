import { models, resendEmailValidationRouteDefinition } from "@arrhes/application-metadata"
import { eq } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { sendEmail } from "../../../utilities/email/sendEmail.js"
import { emailValidationTemplate } from "../../../utilities/email/templates/emailValidation.js"
import { Exception } from "../../../utilities/exception.js"
import { generateVerificationToken } from "../../../utilities/generateVerificationToken.js"
import { response } from "../../../utilities/response.js"
import { updateOne } from "../../../utilities/sql/updateOne.js"

export const resendEmailValidationRoute = apiFactory
    .createApp()
    .post(resendEmailValidationRouteDefinition.path, async (c) => {
        const { user } = await checkUserSessionMiddleware({
            context: c,
        })

        if (user.emailToValidate === null) {
            throw new Exception({
                internalMessage: "No pending email validation",
                statusCode: 400,
                externalMessage: "Aucun changement d'email en attente",
            })
        }

        const updatedUser = await updateOne({
            database: c.var.clients.sql,
            table: models.user,
            data: {
                emailToken: generateVerificationToken(),
                emailTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
                lastUpdatedAt: new Date().toISOString(),
            },
            where: (table) => eq(table.id, user.id),
        })

        await sendEmail({
            var: c.var,
            to: user.emailToValidate,
            subject: "Valider votre email",
            html: emailValidationTemplate({
                token: updatedUser.emailToken!,
            }),
        })

        return response({
            context: c,
            statusCode: 200,
            schema: resendEmailValidationRouteDefinition.schemas.return,
            data: updatedUser,
        })
    })
