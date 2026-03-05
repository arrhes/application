import { Exception } from "../exception.js"
import type { getClients } from "../getClients.js"
import type { getEnv } from "../getEnv.js"

export async function sendEmail(parameters: {
    var: {
        env: ReturnType<typeof getEnv>
        clients: Awaited<ReturnType<typeof getClients>>
    }
    subject: string
    from?: string
    to: string | string[]
    html: string
    // files?: {
    //     content: Buffer | string | undefined
    //     filename: string
    // }[]
}) {
    try {
        const response = await parameters.var.clients.email.sendMail(parameters)

        if (!response.accepted) {
            throw new Exception({
                internalMessage: "Email not sent",
                cause: response.rejected.toString(),
            })
        }
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Email not sent",
            rawError: error,
        })
    }
}
