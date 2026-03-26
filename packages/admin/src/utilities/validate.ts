import * as v from "valibot"

export function validate<T extends v.GenericSchema>(parameters: { schema: T; data: unknown }) {
    const result = v.safeParse(parameters.schema, parameters.data)

    if (result.success) {
        return <const>{ success: true, data: result.output, error: undefined }
    }

    return <const>{
        success: false,
        data: undefined,
        error: JSON.stringify(v.flatten(result.issues)),
    }
}
