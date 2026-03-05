import * as v from "valibot"

export const emailSchema = v.pipe(
    v.string("Doit être une chaîne de caractères"),
    v.trim(),
    v.toLowerCase(),
    v.maxLength(512, "Doit contenir au maximum 512 caractères"),
    v.email("Doit être une adresse email valide"),
)
