import * as v from "valibot"

export const integerSchema = v.pipe(v.number("Doit être un nombre"), v.integer("Doit être un nombre entier"))
