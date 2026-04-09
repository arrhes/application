export function computeGlobalScore(parameters: {
    scores: Array<{
        value: number
        weight: number
    }>
}) {
    if (parameters.scores.length === 0) return 0

    const score = parameters.scores.reduce((acc, score, index) => {
        if (Number.isNaN(score.value)) return acc
        if (Number.isNaN(score.weight)) return acc
        return acc + score.weight * score.value
    }, 0)

    return score
}
