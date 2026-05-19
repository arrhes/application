import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Plugin } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST.ts"

/**
 * Extracts searchable text from a TSX doc page source file.
 * Pulls: title/description/text prop strings, DocList items, and JSX text nodes.
 */
function extractDocPageContent(source: string): string {
    const parts: string[] = []

    // Strip comments so we don't extract text from them
    const stripped = source
        .replace(/\{\/\*[\s\S]*?\*\/\}/g, "") // JSX block comments
        .replace(/\/\/[^\n]*/g, "") // line comments

    // 1. Named text props (title, description, text, label, headers, variant-unrelated names)
    const propRe = /\b(?:title|description)\s*=\s*"([^"]+)"/g
    for (const m of stripped.matchAll(propRe)) parts.push(m[1])

    // 2. String items inside items={["...", ...]} — DocList, DocTable rows, etc.
    const itemsBlockRe = /\bitems\s*=\s*\{\s*\[([^\]]*?)\]\s*\}/gs
    for (const m of stripped.matchAll(itemsBlockRe)) {
        for (const s of m[1].matchAll(/"([^"]{4,})"/g)) parts.push(s[1])
    }

    // 3. DocTable rows={[["cell", "cell"], ...]}
    const rowsBlockRe = /\brows\s*=\s*\{\s*\[([^\]]*?\][^\]]*?)\]\s*\}/gs
    for (const m of stripped.matchAll(rowsBlockRe)) {
        for (const s of m[1].matchAll(/"([^"]{4,})"/g)) parts.push(s[1])
    }

    // 4. JSX text nodes: text between > and < that is not whitespace-only
    const textNodeRe = />([^<>{}\n]{8,})</g
    for (const m of stripped.matchAll(textNodeRe)) {
        const t = m[1].trim().replace(/\s+/g, " ")
        if (t.length >= 8 && !/^\s*$/.test(t)) parts.push(t)
    }

    // Deduplicate consecutive identical strings and collapse whitespace
    return [
        ...new Set(parts),
    ]
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join(" ")
}

const DOCS_SEARCH_VIRTUAL_MODULE_ID = "virtual:docs-search-index"
const RESOLVED_DOCS_SEARCH_VIRTUAL_MODULE_ID = `\0${DOCS_SEARCH_VIRTUAL_MODULE_ID}`

interface GeneratedSearchEntry {
    path: string
    title: string
    description: string
    section: string
    navGroup: string
    navLabel: string
    content: string
}

/**
 * Parses accountsData.ts source and returns one search entry per account.
 * Content is compact: number + label + description + className + type + side.
 */
function extractAccountEntries(source: string): GeneratedSearchEntry[] {
    const entries: GeneratedSearchEntry[] = []
    const chunks = source.split(/(?=\bdefineAccount\()/)
    for (const chunk of chunks) {
        if (!/^\s*defineAccount\s*\(\s*"/.test(chunk)) continue
        const numMatch = chunk.match(/defineAccount\(\s*"([^"]+)"/)
        if (!numMatch) continue
        const number = numMatch[1]
        const labelMatch = chunk.match(/defineAccount\(\s*"[^"]+",\s*"([^"]+)"/)
        if (!labelMatch) continue
        const label = labelMatch[1]
        const description = chunk.match(/\bdescription\s*:\s*"([^"]+)"/)?.[1] ?? ""
        const className = chunk.match(/\bclassName\s*:\s*"([^"]+)"/)?.[1] ?? ""
        const type = chunk.match(/\btype\s*:\s*"([^"]+)"/)?.[1] ?? ""
        const side = chunk.match(/\bside\s*:\s*"([^"]+)"/)?.[1] ?? ""
        entries.push({
            path: `/documentation/comptabilité/ressources/comptes/${number}`,
            title: `${number} — ${label}`,
            description,
            section: "Comptabilité",
            navGroup: "Comptes",
            navLabel: label,
            content: [
                number,
                label,
                description,
                className,
                type,
                side,
            ]
                .filter(Boolean)
                .join(" "),
        })
    }
    return entries
}

/**
 * Parses glossaryData.ts source and returns one search entry per glossary term.
 * Content: term + englishTranslation + definition + relatedTerms.
 */
function extractGlossaryEntries(source: string): GeneratedSearchEntry[] {
    const toSlug = (term: string) =>
        term
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")

    const entries: GeneratedSearchEntry[] = []
    const chunks = source.split(/(?=\bdefineTerm\()/)
    for (const chunk of chunks) {
        if (!/^\s*defineTerm\s*\(\s*"/.test(chunk)) continue
        const m = chunk.match(/defineTerm\(\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"/)
        if (!m) continue
        const [, term, englishTranslation, definition] = m
        const relatedTerms: string[] = []
        const rtBlock = chunk.match(/relatedTerms\s*:\s*\[([^\]]*)\]/)
        if (rtBlock) {
            for (const rt of rtBlock[1].matchAll(/"([^"]+)"/g)) relatedTerms.push(rt[1])
        }
        entries.push({
            path: `/documentation/comptabilité/ressources/glossaire/${toSlug(term)}`,
            title: term,
            description: definition,
            section: "Comptabilité",
            navGroup: "Glossaire",
            navLabel: term,
            content: [
                term,
                englishTranslation,
                definition,
                ...relatedTerms,
            ].join(" "),
        })
    }
    return entries
}

export function docsSearchIndexPlugin(): Plugin {
    const pkgRoot = resolve(__dirname, "..")
    const accountsDataPath = resolve(pkgRoot, "src/features/docs/accounting/resources/accounts/accountsData.ts")
    const glossaryDataPath = resolve(pkgRoot, "src/features/docs/accounting/resources/glossary/glossaryData.ts")

    function buildIndex(): string {
        const pageEntries = DOC_PAGE_MANIFEST.map((entry) => {
            const filePath = resolve(pkgRoot, entry.file)
            let source = ""
            try {
                source = readFileSync(filePath, "utf-8")
            } catch {
                console.warn(`[docs-search] Could not read ${entry.file}`)
            }
            const content = extractDocPageContent(source)
            return {
                path: entry.path,
                title: extractTitle(source, entry.navLabel),
                description: extractDescription(source, ""),
                section: entry.section,
                navGroup: entry.navGroup,
                navLabel: entry.navLabel,
                content: [
                    entry.navGroup,
                    entry.navLabel,
                    content,
                ]
                    .filter(Boolean)
                    .join(" "),
            }
        })

        const accountEntries = extractAccountEntries(readFileSync(accountsDataPath, "utf-8"))
        const glossaryEntries = extractGlossaryEntries(readFileSync(glossaryDataPath, "utf-8"))

        const entries = [
            ...pageEntries,
            ...accountEntries,
            ...glossaryEntries,
        ]
        return `export const docsSearchIndex = ${JSON.stringify(entries, null, 4)};`
    }

    return {
        name: "docs-search-index",
        resolveId(id) {
            if (id === DOCS_SEARCH_VIRTUAL_MODULE_ID) return RESOLVED_DOCS_SEARCH_VIRTUAL_MODULE_ID
        },
        load(id) {
            if (id === RESOLVED_DOCS_SEARCH_VIRTUAL_MODULE_ID) return buildIndex()
        },
        handleHotUpdate({ file, server }) {
            const isDocPage = DOC_PAGE_MANIFEST.some((e) => file.endsWith(e.file.replace(/\//g, "/")))
            const isDataFile = file === accountsDataPath || file === glossaryDataPath
            if (isDocPage || isDataFile) {
                const mod = server.moduleGraph.getModuleById(RESOLVED_DOCS_SEARCH_VIRTUAL_MODULE_ID)
                if (mod) server.moduleGraph.invalidateModule(mod)
                server.ws.send({
                    type: "full-reload",
                })
            }
        },
    }
}

/** Extract the `title` prop from a DocHeader (falls back to navLabel). */
function extractTitle(source: string, fallback: string): string {
    const m = source.match(/DocHeader[^>]*\btitle\s*=\s*"([^"]+)"/)
    if (m) return m[1]
    // Custom pages with <h1> or plain heading text
    const h1 = source.match(/<h1[^>]*>\s*([^<\n]{3,})\s*<\/h1>/)
    if (h1) return h1[1].trim()
    return fallback
}

/** Extract the `description` prop from a DocHeader, falling back to <p> below <h1>. */
function extractDescription(source: string, fallback: string): string {
    const m = source.match(/DocHeader[^>]*\bdescription\s*=\s*"([^"]+)"/)
    if (m) return m[1]
    return fallback
}
