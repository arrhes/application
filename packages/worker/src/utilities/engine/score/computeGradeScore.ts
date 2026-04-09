import type { enginePaperType } from "@evidencesystem/schemas/components"

export const gradeMap = {
    "Meta-analysis": 5,
    Review: 4,
    "Clinical Trial": 4,
    Study: 3,
    "Journal Article": 2,
    "Case Report": 1,
    Editorial: 1,
    "Letters and Comments": 1,
    News: 1,
    Book: 1,
    Conference: 1,
    Dataset: 1,
} satisfies Record<(typeof enginePaperType)[number], number>

export function computeGradeScore(parameters: { types: Array<keyof typeof gradeMap> }) {
    if (parameters.types.length === 0) {
        return 0
    }

    const typeScores = parameters.types.map((type) => gradeMap[type] / 5)
    const score = Math.max(...typeScores)

    return score
}
