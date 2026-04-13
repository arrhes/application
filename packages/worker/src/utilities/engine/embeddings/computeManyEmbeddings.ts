import * as v from "valibot"
import { ContextClients } from "#src/clients/contextClients.js"
import { Exception } from "#src/utilities/exception.js"
import { validate } from "#src/utilities/validate.js"

export async function computeManyEmbeddings(parameters: {
    input: Array<string>
    options: {
        model: "sentence-transformers/all-MiniLM-L6-v2"
    }
}) {
    const startTime = new Date()

    const response = await ContextClients.ai.huggingface.featureExtraction({
        model: parameters.options.model,
        inputs: parameters.input,
        provider: "hf-inference",
    })

    const parsedResponse = validate({
        schema: v.array(v.array(v.number())),
        data: response.map((x) => {
            if (typeof x === "number") {
                throw new Exception({
                    internalMessage: "Invalid response from HuggingFace API",
                    cause: "x is of type 'number'",
                })
            }
            return x.map((y) => {
                if (typeof y === "number") {
                    return y
                }
                throw new Exception({
                    internalMessage: "Invalid response from HuggingFace API",
                    cause: "y is not of type 'number'",
                })
            })
        }),
    })

    return {
        embeddings: parsedResponse,
        duration: Date.now() - startTime.getTime(),
    }
}
