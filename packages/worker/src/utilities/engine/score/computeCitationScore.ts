import { rationalFunction } from "#src/utilities/math/rationalFunction.js"

export function computeCitationScore(parameters: { citationCount: number | null }) {
    if (parameters.citationCount === null) {
        return 0
    }

    const x = parameters.citationCount

    const x_0 = 30
    const y_0 = 0.5
    const k = y_0 / (x_0 * (1 - y_0))

    const score = rationalFunction({
        x: x,
        k: k,
    })

    return score
}
