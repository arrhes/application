import { ContextClients } from "#src/clients/contextClients.js"

export async function retrieveManyPointsArrays(parameters: {
    query: Array<Array<number>>
    options: {
        collection: "abstracts" | "journals" | "authors"
        limit: number
    }
}) {
    const startTime = new Date()

    const resultsArray = await ContextClients.qdrant.queryBatch(parameters.options.collection, {
        searches: parameters.query.map((query) => ({
            query: query,
            limit: parameters.options.limit,
            with_vector: true,
            with_payload: true,
        })),
    })

    const flattenedResults = resultsArray.flatMap((paperPoint) => paperPoint.points)

    return {
        pointsArray: flattenedResults,
        duration: Date.now() - startTime.getTime(),
    }
}
