import { ContextClients } from "#src/clients/contextClients.js"
import { Exception } from "#src/utilities/exception.js"

export async function retrieveOnePointsArray(parameters: {
    query: Array<number>
    options: {
        collection: "abstracts" | "journals" | "authors"
        limit: number
    }
}) {
    const startTime = new Date()

    const { points } = await ContextClients.qdrant.query(parameters.options.collection, {
        query: parameters.query,
        limit: parameters.options.limit,
        with_vector: true,
        with_payload: true,
        // score_threshold: 0.60
    })
    if (points.length === 0) {
        throw new Exception({
            internalMessage: "We did not find enough papers to answer your query",
            cause: "Points length is 0",
        })
    }

    return {
        points: points,
        duration: Date.now() - startTime.getTime(),
    }
}
