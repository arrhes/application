import { timingSafeEqual } from "node:crypto"
import { signString } from "../../utilities/cookies/signString.js"
import { Exception } from "../../utilities/exception.js"

export function unsignString(parameters: { signedValue: string | undefined; secret: string }) {
    try {
        if (parameters.signedValue === undefined) {
            return undefined
        }

        const i = parameters.signedValue.lastIndexOf(".")
        if (i === -1) {
            throw new Exception({
                internalMessage: "Invalid signed value",
            })
        }
        const value = parameters.signedValue.slice(0, i)
        const expectedSignedValue = signString({
            value: value,
            secret: parameters.secret,
        })

        const isSame = timingSafeEqual(Buffer.from(parameters.signedValue), Buffer.from(expectedSignedValue))
        if (isSame === false) {
            throw new Exception({
                internalMessage: "Invalid signed value",
            })
        }

        return value
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Failed to unsign string",
            rawError: error,
        })
    }
}
