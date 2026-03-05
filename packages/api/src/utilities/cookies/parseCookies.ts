import { Exception } from "../../utilities/exception.js"

export function parseCookies(parameters: { value: string | undefined }) {
    try {
        if (parameters.value === undefined) {
            return {}
        }
        return Object.fromEntries(
            parameters.value.split(";").map((cookie) => {
                const [key, ...val] = cookie.trim().split("=")
                return [key, decodeURIComponent(val.join("="))]
            }),
        )
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error while parsing cookies",
            rawError: error,
        })
    }
}
