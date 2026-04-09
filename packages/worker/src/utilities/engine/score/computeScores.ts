import type { schemas } from "@evidencesystem/schemas/schemas"
import type * as v from "valibot"
import { computeCitationScore } from "#src/utilities/engine/score/computeCitationScore.js"
import { computeGradeScore } from "#src/utilities/engine/score/computeGradeScore.js"
import { computeInfluentialCitationScore } from "#src/utilities/engine/score/computeInfluentialCitationScore.js"
import { computeOpenScore } from "#src/utilities/engine/score/computeOpenScore.js"
import { computePublishedAtScore } from "#src/utilities/engine/score/computePublishedAtScore.js"
import { computeGlobalScore } from "./computeGlobalScore.js"
import { computeSimilarityScore } from "./computeSimilarityScore.js"

export function computeScores(parameters: {
    enginePapers: Array<
        v.InferOutput<typeof schemas.enginePaper> & {
            similarityScores: Array<number>
        }
    >
}) {
    const startTime = new Date()

    const enginePapers = parameters.enginePapers
        .map((enginePaper) => {
            const publishedAtScore = computePublishedAtScore({
                publishedAt: enginePaper.publishedAt === null ? null : new Date(enginePaper.publishedAt),
            })
            const citationScore = computeCitationScore({
                citationCount: enginePaper.citationCount,
            })
            const influentialCitationScore = computeInfluentialCitationScore({
                influentialCitationCount: enginePaper.influentialCitationCount,
            })
            const similarityScore = computeSimilarityScore({
                similarityScores: enginePaper.similarityScores,
            })
            const gradeScore = computeGradeScore({
                types: enginePaper.types,
            })
            const openAccessScore = computeOpenScore({
                isOpenAccess: enginePaper.isOpenAccess,
            })

            const scoreNumber = 6
            const globalScore = computeGlobalScore({
                scores: [
                    {
                        value: publishedAtScore,
                        weight: 1 / scoreNumber,
                    },
                    {
                        value: citationScore,
                        weight: 1 / scoreNumber,
                    },
                    {
                        value: influentialCitationScore,
                        weight: 1 / scoreNumber,
                    },
                    {
                        value: similarityScore,
                        weight: 1 / scoreNumber,
                    },
                    {
                        value: gradeScore,
                        weight: 1 / scoreNumber,
                    },
                    {
                        value: openAccessScore,
                        weight: 1 / scoreNumber,
                    },
                ],
            })

            return {
                ...enginePaper,
                scores: {
                    publishedAt: publishedAtScore,
                    citation: citationScore,
                    influentialCitation: influentialCitationScore,
                    similarity: similarityScore,
                    grade: gradeScore,
                    openAccess: openAccessScore,
                },
                globalScore: globalScore,
            }
        })
        .sort((a, b) => b.globalScore - a.globalScore)

    return {
        scoreOrderedPapers: enginePapers,
        duration: new Date().getTime() - startTime.getTime(),
    }
}
