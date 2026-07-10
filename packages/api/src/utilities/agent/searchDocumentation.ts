import { readdir, readFile } from "node:fs/promises"
import { join, relative } from "node:path"

/**
 * Base path to the documentation source files.
 * In Docker the workspace is mounted at /workspace.
 * In local dev, fall back to the relative project path.
 */
const DOCS_BASE_PATH = "/workspace/packages/website/src/features/docs"

/** Maximum characters to return to the LLM (≈3 000 tokens). */
const MAX_OUTPUT_CHARS = 8000

// ─── Text extraction helpers ────────────────────────────────────────

/**
 * Strip JSX / TSX boilerplate from a file and return readable French text.
 * Works for the documentation pages (DocParagraph, DocSection, DocList, etc.).
 */
function extractTextFromJsx(source: string): string {
    let text = source

    // Remove import lines
    text = text.replace(/^import\s+.*$/gm, "")

    // Remove export function/const declarations (keep content)
    text = text.replace(/export\s+(function|const)\s+\w+.*?\{/g, "")

    // Remove JSX self-closing tags: <Component ... />
    text = text.replace(/<\w+[^>]*\/>/g, "")

    // Extract meaningful props: title="...", description="...", label="..."
    // Keep them as section headers
    const propValues: string[] = []
    for (const propMatch of source.matchAll(/(?:title|description|label|term)=["']([^"']+)["']/g)) {
        propValues.push(propMatch[1])
    }

    // Extract string content from items={[...]} arrays (DocList)
    for (const itemsMatch of source.matchAll(/items=\{?\[([^\]]*)\]\}?/gs)) {
        const items = itemsMatch[1]
            .split(",")
            .map((s) => s.replace(/["'`]/g, "").trim())
            .filter(Boolean)
        propValues.push(...items)
    }

    // Remove all JSX tags (opening and closing)
    text = text.replace(/<\/?[A-Za-z][\w.]*[^>]*>/g, "")

    // Remove JSX expressions: {" "}, {1}, etc.
    text = text.replace(/\{"?\s*"?\}/g, " ")
    text = text.replace(/\{[^}]{0,5}\}/g, " ")

    // Remove remaining braces, parentheses from JSX structure
    text = text.replace(/[{}()]/g, " ")

    // Remove TypeScript type annotations, return statements
    text = text.replace(/return\s*/g, "")
    text = text.replace(/const\s+\w+\s*=\s*/g, "")

    // Clean up whitespace
    text = text.replace(/\s+/g, " ").trim()

    // Prepend extracted prop values as section headers for better searchability
    const headers = propValues.map((v) => `## ${v}`).join("\n")

    return headers ? `${headers}\n\n${text}` : text
}

/**
 * Extract searchable text from the glossary data file.
 * Returns one block per term for targeted search results.
 */
function extractGlossaryEntries(source: string): {
    term: string
    text: string
}[] {
    const entries: {
        term: string
        text: string
    }[] = []
    for (const match of source.matchAll(/defineTerm\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/g)) {
        const [, term, english, definition] = match

        // Also extract relatedTerms if present after the definition
        const afterMatch = source.slice(match.index + match[0].length, match.index + match[0].length + 500)
        const relatedRegex = /relatedTerms:\s*\[([^\]]*)\]/
        const relatedMatch = afterMatch.match(relatedRegex)
        const relatedTerms = relatedMatch
            ? relatedMatch[1]
                  .split(",")
                  .map((s) => s.replace(/["']/g, "").trim())
                  .filter(Boolean)
            : []

        const parts = [
            `Terme : ${term} (${english})`,
            `Définition : ${definition}`,
        ]
        if (relatedTerms.length > 0) {
            parts.push(`Termes liés : ${relatedTerms.join(", ")}`)
        }
        entries.push({
            term,
            text: parts.join("\n"),
        })
    }
    return entries
}

/**
 * Extract searchable text from the accounts data file.
 * Each account becomes a searchable block.
 */
function extractAccountEntries(source: string): {
    number: string
    label: string
    text: string
}[] {
    const entries: {
        number: string
        label: string
        text: string
    }[] = []
    const allMatches = [
        ...source.matchAll(/defineAccount\(\s*"([^"]+)",\s*"([^"]+)",\s*\{/g),
    ]

    for (let i = 0; i < allMatches.length; i++) {
        const match = allMatches[i]
        const [, number, label] = match
        const startIdx = match.index + match[0].length
        const endIdx = i + 1 < allMatches.length ? allMatches[i + 1].index : source.length
        const block = source.slice(startIdx, endIdx)

        // Extract key fields
        const descMatch = block.match(/description:\s*"([^"]*)"/)
        const examplesMatch = block.match(/examples:\s*\[([^\]]*)\]/)
        const debitMatch = block.match(/debitMeaning:\s*"([^"]*)"/)
        const creditMatch = block.match(/creditMeaning:\s*"([^"]*)"/)
        const tipsMatch = block.match(/usageTips:\s*\[([^\]]*)\]/)
        const sideMatch = block.match(/side:\s*"([^"]*)"/)
        const typeMatch = block.match(/type:\s*"([^"]*)"/)
        const counterpartNumMatch = block.match(/counterpart:\s*\{\s*number:\s*"([^"]*)"/)
        const counterpartLabelMatch = block.match(/label:\s*"([^"]*)"/)

        const parts = [
            `Compte ${number} - ${label}`,
        ]
        if (descMatch) parts.push(`Description : ${descMatch[1]}`)
        if (typeMatch && sideMatch) parts.push(`Type : ${typeMatch[1]}, ${sideMatch[1]}`)
        if (debitMatch) parts.push(`Débit : ${debitMatch[1]}`)
        if (creditMatch) parts.push(`Crédit : ${creditMatch[1]}`)
        if (examplesMatch) {
            const examples = examplesMatch[1]
                .split(",")
                .map((s) => s.replace(/["']/g, "").trim())
                .filter(Boolean)
            if (examples.length > 0) parts.push(`Exemples : ${examples.join("; ")}`)
        }
        if (tipsMatch) {
            const tips = tipsMatch[1]
                .split(/",\s*"/)
                .map((s) => s.replace(/["']/g, "").trim())
                .filter(Boolean)
            if (tips.length > 0) parts.push(`Conseils : ${tips.join("; ")}`)
        }
        if (counterpartNumMatch && counterpartLabelMatch) {
            parts.push(`Contrepartie courante : ${counterpartNumMatch[1]} ${counterpartLabelMatch[1]}`)
        }

        entries.push({
            number,
            label,
            text: parts.join("\n"),
        })
    }
    return entries
}

// ─── File discovery ─────────────────────────────────────────────────

async function getAllDocFiles(basePath: string): Promise<string[]> {
    const files: string[] = []
    async function walk(dir: string) {
        const entries = await readdir(dir, {
            withFileTypes: true,
        })
        for (const entry of entries) {
            const fullPath = join(dir, entry.name)
            if (entry.isDirectory()) {
                // Skip component directories (UI components, not content)
                if (entry.name === "components" || entry.name === "features") continue
                await walk(fullPath)
            } else if (
                (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts")) &&
                // Skip layout/navigation files - no useful content
                !entry.name.includes("Layout") &&
                !entry.name.includes("layout") &&
                !entry.name.includes("sidebarNavigation") &&
                !entry.name.includes("sectionTab") &&
                !entry.name.includes("docSections") &&
                // Skip component files
                !entry.name.includes("Component") &&
                !entry.name.includes("Card") &&
                !entry.name.includes("Item") &&
                entry.name !== "featureCard.tsx" &&
                entry.name !== "faqItem.tsx"
            ) {
                files.push(fullPath)
            }
        }
    }
    await walk(basePath)
    return files
}

// ─── Normalize for search ───────────────────────────────────────────

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

// ─── File path to human-readable section ────────────────────────────

function filePathToSection(filePath: string): string {
    const rel = relative(DOCS_BASE_PATH, filePath)
    const sectionMap: Record<string, string> = {
        "accounting/introduction": "Comptabilité > Introduction",
        "accounting/accounts": "Comptabilité > Comptes",
        "accounting/glossary": "Comptabilité > Glossaire",
        "accounting/reports": "Comptabilité > Documents comptables",
        dashboard: "Guide d'utilisation (Dashboard)",
        api: "API",
        general: "Informations générales",
    }
    for (const [prefix, label] of Object.entries(sectionMap)) {
        if (rel.startsWith(prefix)) return label
    }
    return "Documentation"
}

// ─── Main search function ───────────────────────────────────────────

export interface SearchResult {
    section: string
    title: string
    content: string
    relevance: number
}

/**
 * Search the documentation for content matching the query.
 * Performs keyword-based search across:
 * - JSX doc pages (text extracted from components)
 * - Glossary terms (structured data)
 * - Chart of accounts (structured data, searched by number or label)
 *
 * Returns formatted text ready for LLM consumption, capped at ~3000 tokens.
 */
export async function searchDocumentation(query: string): Promise<string> {
    const normalizedQuery = normalize(query)
    const queryWords = normalizedQuery.split(/\s+/).filter((w) => w.length >= 2)

    if (queryWords.length === 0) {
        return "Veuillez fournir un ou plusieurs mots-clés pour la recherche."
    }

    const results: SearchResult[] = []

    try {
        const docFiles = await getAllDocFiles(DOCS_BASE_PATH)

        for (const filePath of docFiles) {
            const source = await readFile(filePath, "utf-8")
            const fileName = filePath.split("/").pop() ?? ""
            const section = filePathToSection(filePath)

            // ── Glossary data: search by term ──
            if (fileName === "glossaryData.ts") {
                const entries = extractGlossaryEntries(source)
                for (const entry of entries) {
                    const normalizedText = normalize(entry.text)
                    const matchCount = queryWords.filter((w) => normalizedText.includes(w)).length
                    if (matchCount > 0) {
                        results.push({
                            section: "Comptabilité > Glossaire",
                            title: entry.term,
                            content: entry.text,
                            relevance: matchCount / queryWords.length,
                        })
                    }
                }
                continue
            }

            // ── Accounts data: search by number or label ──
            if (fileName === "accountsData.ts") {
                const entries = extractAccountEntries(source)
                for (const entry of entries) {
                    const normalizedText = normalize(entry.text)
                    const matchCount = queryWords.filter((w) => normalizedText.includes(w)).length
                    // For accounts, require stronger match (number or label word)
                    const numberMatch = queryWords.some((w) => entry.number.startsWith(w) || w === entry.number)
                    if (matchCount > 0 && (numberMatch || matchCount >= Math.min(2, queryWords.length))) {
                        results.push({
                            section: "Comptabilité > Plan comptable (PCG)",
                            title: `Compte ${entry.number} - ${entry.label}`,
                            content: entry.text,
                            relevance: numberMatch ? 1 : matchCount / queryWords.length,
                        })
                    }
                }
                continue
            }

            // ── JSX doc pages: extract text and search ──
            const text = extractTextFromJsx(source)
            const normalizedText = normalize(text)
            const matchCount = queryWords.filter((w) => normalizedText.includes(w)).length

            if (matchCount > 0) {
                // Extract a title from the first ## header or filename
                const titleMatch = text.match(/^## (.+)$/m)
                const title = titleMatch
                    ? titleMatch[1]
                    : fileName
                          .replace(/DocPage\.tsx$/, "")
                          .replace(/([A-Z])/g, " $1")
                          .trim()

                results.push({
                    section,
                    title,
                    content: text,
                    relevance: matchCount / queryWords.length,
                })
            }
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return `Erreur lors de la recherche dans la documentation : ${message}`
    }

    if (results.length === 0) {
        return `Aucun résultat trouvé pour "${query}". Essayez avec d'autres mots-clés.`
    }

    // Sort by relevance (highest first), then alphabetically
    results.sort((a, b) => b.relevance - a.relevance || a.title.localeCompare(b.title))

    // Build output, respecting the character limit
    let output = `Résultats de recherche pour "${query}" (${results.length} résultats) :\n\n`
    let charCount = output.length
    let includedCount = 0

    for (const result of results) {
        const block = `### ${result.section} - ${result.title}\n${result.content}\n\n---\n\n`

        if (charCount + block.length > MAX_OUTPUT_CHARS && includedCount > 0) {
            output += `\n... et ${results.length - includedCount} autres résultats non affichés. Affinez votre recherche pour des résultats plus précis.`
            break
        }

        output += block
        charCount += block.length
        includedCount++
    }

    return output
}
