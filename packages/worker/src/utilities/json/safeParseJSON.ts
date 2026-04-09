import { Exception } from "#src/utilities/exception.js"
import { completeStringifiedJSON } from "#src/utilities/json/completeStringifiedJSON.js"

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
