import * as v from "valibot"

export const ipSchema = v.pipe(
    v.string("Doit être une chaîne de caractères."),
    v.ipv4("Doit être une adresse IP valide."),
)
