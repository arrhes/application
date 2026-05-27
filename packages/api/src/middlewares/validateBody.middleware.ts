import type { Context } from "hono"
import type * as v from "valibot"
import { Exception } from "../utilities/exception.js"
import { validate } from "../utilities/validate.js"

export async function validateBodyMiddleware<TSchema extends v.GenericSchema<unknown, unknown>>(parameters: {
    context: Context
    schema: TSchema
}) {
    try {
        let rawBody: Record<string, unknown>
        if (parameters.context.req.method === "GET") {
            const queries = parameters.context.req.queries()
            rawBody = {}
            for (const [key, values] of Object.entries(queries)) {
                rawBody[key] = values.length === 1 ? values[0] : values
            }
        } else {
            const contentLength = parameters.context.req.header("content-length")
            const hasBody =
                contentLength !== undefined ? Number(contentLength) > 0 : parameters.context.req.raw.body !== null
            try {
                rawBody = hasBody ? await parameters.context.req.json() : {}
            } catch {
                // Body was declared but is empty or could not be parsed
                // (e.g. DELETE requests with Content-Type: application/json but no body).
                // Fall back to empty object; schema validation will reject truly missing fields.
                rawBody = {}
            }
        }

        // Merge URL path params as fallback values (body/query already-set values take precedence).
        // This supports REST-style clients that place idXxx only in the URL path.
        const pathParams = parameters.context.req.param()
        for (const [key, value] of Object.entries(pathParams)) {
            if (!(key in rawBody)) {
                rawBody[key] = value
            }
        }

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
