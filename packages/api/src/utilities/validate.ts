import * as v from "valibot"
import { Exception } from "../utilities/exception.js"

export function validate<T extends v.GenericSchema<unknown, unknown>>(parameters: {
    schema: T
    data: unknown
}): v.InferOutput<T> {
    const parsed = v.safeParse(parameters.schema, parameters.data, {
        abortEarly: true,
        abortPipeEarly: true,
    })

    if (parsed.success === false) {
        throw new Exception({
            statusCode: 500,
            internalMessage: "Invalid data",
            cause: JSON.stringify(v.flatten(parsed.issues)),
        })
    }

    return parsed.output
}
