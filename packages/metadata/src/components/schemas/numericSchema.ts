import * as v from "valibot"

export const numericSchema = v.pipe(
    v.string("Doit être une chaîne de caractères"),
    v.custom((value) => !Number.isNaN(Number(value)), "Doit être un nombre"),
)
