import { completeStringifiedJSON } from "./completeStringifiedJSON.js"
import { Exception } from "./exception.js"

export function safeParseJSON(parameters: { rawString: string }) {
    try {
        const completedRawString = completeStringifiedJSON({
            rawString: parameters.rawString,
        })

        const parsedJSON = JSON.parse(completedRawString)

        return parsedJSON
    } catch (error: unknown) {
        throw new Exception({
            internalMessage: "Error parsing the raw json string",
            rawError: error,
        })
    }
}
