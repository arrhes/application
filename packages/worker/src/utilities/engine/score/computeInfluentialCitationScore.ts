import { rationalFunction } from "#src/utilities/math/rationalFunction.js"

export function computeInfluentialCitationScore(parameters: { influentialCitationCount: number | null }) {
    if (parameters.influentialCitationCount === null) {
        return 0
    }

    const x = parameters.influentialCitationCount

    const x_0 = 2
    const y_0 = 0.5
    const k = y_0 / (x_0 * (1 - y_0))

    const score = rationalFunction({
        x: x,
        k: k,
    })

    return score
}
