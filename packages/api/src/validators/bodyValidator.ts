import { validator } from "hono/validator"
import * as v from "valibot"
import { Exception } from "../utilities/exception.js"

export const bodyValidator = <T extends v.ObjectSchema<v.ObjectEntries, undefined>>(schema: T) => {
    return validator("json", async (value, _c) => {
        const parsed = v.safeParse(schema, value, {
            abortPipeEarly: true,
        })

        if (parsed.success) {
            return parsed.output
        }

        const flatErrors = v.flatten(parsed.issues)

        throw new Exception({
            statusCode: 400,
            internalMessage: "The body object can not be parsed",
            externalMessage: "Requête invalide",
            cause: JSON.stringify(flatErrors),
        })
    })
}
