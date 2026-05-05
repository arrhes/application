import { normalizedLinearFunction } from "#src/utilities/math/normalizedLinearFunction.js"

export function computePublishedAtScore(parameters: { publishedAt: Date | null }) {
    const currentTime = parameters.publishedAt === null ? 0 : parameters.publishedAt.getTime()
    const minTime = new Date("2005-01-00:00:00").getTime()
    const maxTime = Date.now()

    const score = normalizedLinearFunction({
        x: currentTime,
        xMin: minTime,
        xMax: maxTime,
    })

    return score
}
