export function computeSimilarityScore(parameters: { similarityScores: Array<number> }) {
    const total = parameters.similarityScores.reduce((sum, value) => sum + value, 0)
    const score = total / parameters.similarityScores.length
    return score
}
