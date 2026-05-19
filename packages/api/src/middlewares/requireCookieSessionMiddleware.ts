import type { Context } from "hono"
import { Exception } from "../utilities/exception.js"
import { checkAuthMiddleware } from "./checkAuthMiddleware.js"

export async function requireCookieSessionMiddleware(parameters: { context: Context<any> }) {
    const auth = await checkAuthMiddleware({
        context: parameters.context,
    })

    if (auth.userSession === null) {
        throw new Exception({
            statusCode: 401,
            internalMessage: "Session required",
            cause: "This route requires cookie session authentication",
        })
    }

    return auth as typeof auth & {
        userSession: NonNullable<typeof auth.userSession>
    }
}
