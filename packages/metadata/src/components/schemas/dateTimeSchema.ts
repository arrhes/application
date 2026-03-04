import * as v from "valibot"

export const dateTimeSchema = v.pipe(
    v.string("Doit être une chaîne de caractères"),
    v.minLength(1, "Ne doit pas être vide"),
    // v.isoTimestamp()
)
