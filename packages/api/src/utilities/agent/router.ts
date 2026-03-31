import { chat } from "@tanstack/ai"
import type { getEnv } from "../getEnv.js"
import { getAdapter } from "./provider.js"
import { toolCategories } from "./toolCategories.js"

type Env = ReturnType<typeof getEnv>

interface Message {
    role: "user" | "assistant"
    content: string
}

const categoryList = toolCategories.map((c) => `- ${c.name}: ${c.description}`).join("\n")

const routerSystemPrompt = `Tu es un classificateur d'intentions. Tu reçois un message utilisateur dans le contexte d'une application de comptabilité.

Ta tâche : identifier quelles catégories d'outils sont nécessaires pour répondre à la demande.

Catégories disponibles :
${categoryList}

Réponds UNIQUEMENT avec un JSON contenant un tableau de 1 à 3 noms de catégories parmi celles listées ci-dessus.
Format de réponse : {"categories": ["nom1", "nom2"]}

Exemples :
- "Crée une écriture de vente" -> {"categories": ["entries", "entryLines"]}
- "Liste tous les comptes" -> {"categories": ["accounts"]}
- "Quel est le solde du journal des achats ?" -> {"categories": ["journals", "entries"]}
- "Génère le bilan" -> {"categories": ["reports"]}
- "Qu'est-ce que la partie double ?" -> {"categories": ["documentation"]}
- "Comment saisir une écriture dans Arrhes ?" -> {"categories": ["documentation"]}
- "Explique-moi le compte 411" -> {"categories": ["documentation", "accounts"]}
`

const validCategoryNames = new Set(toolCategories.map((c) => c.name))

/**
 * Pass 1: Classify user intent into 1-3 tool categories.
 * Uses a lightweight LLM call with structured output.
 */
export async function classifyIntent(parameters: { messages: Message[]; env: Env }): Promise<string[]> {
    const adapter = getAdapter(parameters.env)

    // Use only the last user message for classification
    const lastUserMessage = [...parameters.messages].reverse().find((m) => m.role === "user")

    if (!lastUserMessage) {
        return ["years", "entries"]
    }

    const stream = chat({
        adapter,
        messages: [{ role: "user", content: lastUserMessage.content }],
        systemPrompts: [routerSystemPrompt],
    })

    // Collect the full response (AG-UI event type)
    let responseText = ""
    for await (const chunk of stream) {
        if (chunk.type === "TEXT_MESSAGE_CONTENT") {
            responseText += chunk.delta ?? ""
        }
    }

    // Parse the JSON response
    try {
        // Extract JSON from response (in case LLM wraps it in markdown code blocks)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/)
        if (!jsonMatch) {
            return ["years", "entries"]
        }

        const parsed = JSON.parse(jsonMatch[0]) as { categories: string[] }

        if (!Array.isArray(parsed.categories)) {
            return ["years", "entries"]
        }

        // Filter to valid category names and limit to 3
        const validCategories = parsed.categories.filter((c) => validCategoryNames.has(c)).slice(0, 3)

        // Always include "years" so the LLM can discover valid year IDs
        const categoriesWithYears = validCategories.length > 0 ? validCategories : ["entries"]
        if (!categoriesWithYears.includes("years")) {
            categoriesWithYears.unshift("years")
        }

        return categoriesWithYears
    } catch {
        // If parsing fails, default to entries with years
        return ["years", "entries"]
    }
}
