import * as v from "valibot"

export const passwordSchema = v.pipe(
    v.string("Votre mot de passe doit être une chaîne de caractères."),
    // v.minLength(8, 'Votre mot de passe est trop court (min. 8).'),
)
