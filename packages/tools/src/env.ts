import * as v from "valibot"

export function env() {
    try {
        return v.parse(
            v.object({
                NODE_ENV: v.picklist(["development", "production"]),
                SQL_DATABASE_URL: v.string(),
            }),
            process.env,
        )
    } catch (error) {
        if (error instanceof v.ValiError) {
            const errorMessage = v.flatten(error.issues)
            console.log(errorMessage)
            throw new Error(`Missing environment variables`)
        }
    }
}
