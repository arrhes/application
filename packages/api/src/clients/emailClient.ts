import { createTransport } from "nodemailer"
import { Exception } from "../utilities/exception.js"
import type { getEnv } from "../utilities/getEnv.js"

export function emailClient(env: ReturnType<typeof getEnv>) {
    try {
        const smtpClient = createTransport(
            {
                host: env.EMAIL_ENDPOINT,
                port: 465,
                secure: true,
                auth: {
                    user: env.EMAIL_USER,
                    pass: env.EMAIL_PASSWORD,
                },
            },
            {
                from: "Arrhes <nepasrepondre@arrhes.com>",
            },
        )

        return smtpClient
    } catch (error) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Email client not available",
            rawError: error,
        })
    }
}
