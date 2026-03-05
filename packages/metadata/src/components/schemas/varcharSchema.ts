import * as v from "valibot"

export function varcharSchema(parameters: { maxLength: number }) {
    return v.pipe(
        v.string("Doit être une chaîne de caractères"),
        v.maxLength(parameters.maxLength, `Doit avoir au maximum ${parameters.maxLength} caractères`),
    )
}
