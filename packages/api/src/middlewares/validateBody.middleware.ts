import type { Context } from "hono"
import type * as v from "valibot"
import { Exception } from "../utilities/exception.js"
import { validate } from "../utilities/validate.js"

export async function validateBodyMiddleware<TSchema extends v.GenericSchema<unknown, unknown>>(parameters: {
    context: Context
    schema: TSchema
}) {
    try {
        const rawBody = await parameters.context.req.json()
        const validatedBody = validate({
            schema: parameters.schema,
            data: rawBody,
        })
        return validatedBody
    } catch (error: unknown) {
        throw new Exception({
            statusCode: 400,
            internalMessage: "The body object can not be parsed",
            externalMessage: "Invalid request",
            rawError: error,
        })
    }
}
