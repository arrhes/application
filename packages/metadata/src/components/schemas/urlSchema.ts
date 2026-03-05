import * as v from "valibot"

export const urlSchema = v.pipe(v.string("Doit être une chaîne de caractères"), v.url("Doit être une URL valide."))
