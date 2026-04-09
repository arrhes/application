import * as v from "valibot"
import { Exception } from "./exception.js"

type Validate<T extends v.GenericSchema<unknown, unknown>> = {
    schema: T
    data: v.InferOutput<T>
}

export function validate<T extends v.GenericSchema<unknown, unknown>>(parameters: Validate<T>) {
    const parsed = v.safeParse(parameters.schema, parameters.data, {
        abortEarly: true,
        abortPipeEarly: true,
    })

    if (parsed.success === false) {
        throw new Exception({
            internalMessage: "Invalid data",
            cause: JSON.stringify(v.flatten(parsed.issues)),
        })
    }

    return parsed.output
}
