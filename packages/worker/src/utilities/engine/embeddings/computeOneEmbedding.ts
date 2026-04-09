import * as v from "valibot"
import { ContextClients } from "#src/clients/contextClients.js"
import { Exception } from "#src/utilities/exception.js"
import { validate } from "#src/utilities/validate.js"

export async function computeOneEmbedding(parameters: {
    input: string
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
        schema: v.array(v.number()),
        data: response.map((x) => {
            if (typeof x === "number") {
                return x
            }
            throw new Exception({
                internalMessage: "Invalid response from HuggingFace API",
                cause: "x is not of type 'number'",
            })
        }),
    })

    return {
        embedding: parsedResponse,
        duration: new Date().getTime() - startTime.getTime(),
    }
}
