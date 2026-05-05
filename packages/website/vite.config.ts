import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

// ─────────────────────────── Docs Search Index Plugin ─────────────────────────────

interface DocPageManifestEntry {
    path: string
    file: string // relative from package root
    section: string
    navGroup: string
    navLabel: string
}

// Maps every static doc page route to its source file and nav metadata.
// Content strings are extracted automatically from the TSX source at build time.
const DOC_PAGE_MANIFEST: DocPageManifestEntry[] = [
    // ── Général / Introduction ────────────────────────────────────────────────
    {
        path: "/documentation",
        file: "src/features/docs/general/rootGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Accueil",
    },
    {
        path: "/documentation/fonctionnalités",
        file: "src/features/docs/general/features/featuresGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Fonctionnalités",
    },
    {
        path: "/documentation/philosophie",
        file: "src/features/docs/general/whitepaperGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Philosophie",
    },
    {
        path: "/documentation/tarifs",
        file: "src/features/docs/general/pricing/pricingGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Tarifs",
    },
    {
        path: "/documentation/support",
        file: "src/features/docs/general/supportGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Support",
    },
    // ── Général / Légal ───────────────────────────────────────────────────────
    {
        path: "/documentation/mentions-légales",
        file: "src/features/docs/general/legalGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Légal",
        navLabel: "Mentions légales",
    },
    {
        path: "/documentation/cgu",
        file: "src/features/docs/general/termsGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Légal",
        navLabel: "Conditions Générales d'Utilisation",
    },
    {
        path: "/documentation/confidentialité",
        file: "src/features/docs/general/privacyGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Légal",
        navLabel: "Politique de confidentialité",
    },
    // ── Comptabilité / Introduction ───────────────────────────────────────────
    {
        path: "/documentation/comptabilité",
        file: "src/features/docs/accounting/introduction/rootAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "Accueil",
    },
    {
        path: "/documentation/comptabilité/introduction",
        file: "src/features/docs/accounting/introduction/introductionAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/comptabilité/partie-double",
        file: "src/features/docs/accounting/introduction/doubleEntryAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "La partie double",
    },
    {
        path: "/documentation/comptabilité/écritures",
        file: "src/features/docs/accounting/introduction/entriesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "Les écritures",
    },
    // ── Comptabilité / Comptes ────────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/comptes/introduction",
        file: "src/features/docs/accounting/accounts/accountsAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Comptes",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/comptabilité/comptes/classes",
        file: "src/features/docs/accounting/accounts/classesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Comptes",
        navLabel: "Classes de comptes",
    },
    {
        path: "/documentation/comptabilité/comptes/liste",
        file: "src/features/docs/accounting/accounts/accountsListAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Comptes",
        navLabel: "Liste des comptes",
    },
    // ── Comptabilité / Documents ──────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/documents",
        file: "src/features/docs/accounting/reports/reportsAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/comptabilité/documents/journal",
        file: "src/features/docs/accounting/reports/journalAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Journal",
    },
    {
        path: "/documentation/comptabilité/documents/grand-livre",
        file: "src/features/docs/accounting/reports/ledgerAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Grand livre",
    },
    {
        path: "/documentation/comptabilité/documents/balance",
        file: "src/features/docs/accounting/reports/balanceAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Balance",
    },
    {
        path: "/documentation/comptabilité/documents/bilan",
        file: "src/features/docs/accounting/reports/balanceSheetAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Bilan",
    },
    {
        path: "/documentation/comptabilité/documents/compte-de-résultat",
        file: "src/features/docs/accounting/reports/incomeStatementAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Compte de résultat",
    },
    {
        path: "/documentation/comptabilité/documents/annexe",
        file: "src/features/docs/accounting/reports/notesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Annexe",
    },
    {
        path: "/documentation/comptabilité/documents/fec",
        file: "src/features/docs/accounting/reports/fecAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "FEC",
    },
    // ── Comptabilité / Glossaire ──────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/glossaire",
        file: "src/features/docs/accounting/glossary/glossaryAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Glossaire",
        navLabel: "Glossaire",
    },
    // ── Dashboard / Guide d'utilisation ──────────────────────────────────────
    {
        path: "/documentation/dashboard",
        file: "src/features/docs/dashboard/rootDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Accueil",
    },
    {
        path: "/documentation/dashboard/démarrage",
        file: "src/features/docs/dashboard/gettingStartedDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Démarrage",
    },
    {
        path: "/documentation/dashboard/organisations",
        file: "src/features/docs/dashboard/organizationsDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Organisations",
    },
    {
        path: "/documentation/dashboard/exercices",
        file: "src/features/docs/dashboard/yearsDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Exercices",
    },
    {
        path: "/documentation/dashboard/écritures",
        file: "src/features/docs/dashboard/entriesDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Saisie des écritures",
    },
    {
        path: "/documentation/dashboard/stockage",
        file: "src/features/docs/dashboard/filesDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Stockage",
    },
    {
        path: "/documentation/dashboard/documents",
        file: "src/features/docs/dashboard/reportsDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Documents comptables",
    },
    // ── Dashboard / Assistant IA ──────────────────────────────────────────────
    {
        path: "/documentation/dashboard/assistant",
        file: "src/features/docs/ai/rootAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/dashboard/assistant/modèles",
        file: "src/features/docs/ai/modelsAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "Modèles",
    },
    {
        path: "/documentation/dashboard/assistant/outils",
        file: "src/features/docs/ai/toolsAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "Outils",
    },
    {
        path: "/documentation/dashboard/assistant/ocr",
        file: "src/features/docs/ai/ocrAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "OCR",
    },
    // ── API ───────────────────────────────────────────────────────────────────
    {
        path: "/documentation/api",
        file: "src/features/docs/api/rootApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Présentation",
    },
    {
        path: "/documentation/api/introduction",
        file: "src/features/docs/api/introductionApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/api/authentification",
        file: "src/features/docs/api/authenticationApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Authentification",
    },
    {
        path: "/documentation/api/organisation",
        file: "src/features/docs/api/organizationApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Organisation",
    },
    {
        path: "/documentation/api/exercice",
        file: "src/features/docs/api/yearApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Exercice",
    },
    {
        path: "/documentation/api/stockage",
        file: "src/features/docs/api/filesApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Fichiers et documents",
    },
]

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
    return [...new Set(parts)]
        .map((p) => p.replace(/\s+/g, " ").trim())
        .filter(Boolean)
        .join(" ")
}

const VIRTUAL_MODULE_ID = "virtual:docs-search-index"
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`

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
            path: `/documentation/comptabilité/comptes/liste/${number}`,
            title: `${number} — ${label}`,
            description,
            section: "Comptabilité",
            navGroup: "Comptes",
            navLabel: label,
            content: [number, label, description, className, type, side].filter(Boolean).join(" "),
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
            path: `/documentation/comptabilité/glossaire/${toSlug(term)}`,
            title: term,
            description: definition,
            section: "Comptabilité",
            navGroup: "Glossaire",
            navLabel: term,
            content: [term, englishTranslation, definition, ...relatedTerms].join(" "),
        })
    }
    return entries
}

function docsSearchIndexPlugin(): Plugin {
    const pkgRoot = resolve(__dirname)
    const accountsDataPath = resolve(pkgRoot, "src/features/docs/accounting/accounts/accountsData.ts")
    const glossaryDataPath = resolve(pkgRoot, "src/features/docs/accounting/glossary/glossaryData.ts")

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
                content: [entry.navGroup, entry.navLabel, content].filter(Boolean).join(" "),
            }
        })

        const accountEntries = extractAccountEntries(readFileSync(accountsDataPath, "utf-8"))
        const glossaryEntries = extractGlossaryEntries(readFileSync(glossaryDataPath, "utf-8"))

        const entries = [...pageEntries, ...accountEntries, ...glossaryEntries]
        return `export const docsSearchIndex = ${JSON.stringify(entries, null, 4)};`
    }

    return {
        name: "docs-search-index",
        resolveId(id) {
            if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID
        },
        load(id) {
            if (id === RESOLVED_VIRTUAL_MODULE_ID) return buildIndex()
        },
        handleHotUpdate({ file, server }) {
            const isDocPage = DOC_PAGE_MANIFEST.some((e) => file.endsWith(e.file.replace(/\//g, "/")))
            const isDataFile = file === accountsDataPath || file === glossaryDataPath
            if (isDocPage || isDataFile) {
                const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
                if (mod) server.moduleGraph.invalidateModule(mod)
                server.ws.send({ type: "full-reload" })
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

function fontPreloadPlugin(): Plugin {
    return {
        name: "font-preload",
        transformIndexHtml: {
            order: "post",
            handler(_html, ctx) {
                const fontAssets = (ctx.bundle ? Object.keys(ctx.bundle) : []).filter((name) => name.endsWith(".woff2"))
                return fontAssets.map((font) => ({
                    tag: "link",
                    attrs: {
                        rel: "preload",
                        as: "font",
                        type: "font/woff2",
                        href: `/${font}`,
                        crossorigin: "anonymous",
                    },
                    injectTo: "head" as const,
                }))
            },
        },
    }
}

function sitemapPlugin(): Plugin {
    return {
        name: "sitemap-generator",
        closeBundle() {
            const baseUrl = "https://arrhes.com"
            const today = new Date().toISOString().split("T")[0]

            // Static public routes
            const staticRoutes = [
                { path: "/", priority: "1.0", changefreq: "weekly" },
                { path: "/connexion", priority: "0.5", changefreq: "monthly" },
                { path: "/inscription", priority: "0.6", changefreq: "monthly" },

                // General docs
                { path: "/documentation", priority: "0.8", changefreq: "weekly" },
                { path: "/documentation/fonctionnalités", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/philosophie", priority: "0.5", changefreq: "monthly" },
                { path: "/documentation/tarifs", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/support", priority: "0.5", changefreq: "monthly" },
                { path: "/documentation/mentions-légales", priority: "0.3", changefreq: "yearly" },
                { path: "/documentation/cgu", priority: "0.3", changefreq: "yearly" },
                { path: "/documentation/confidentialité", priority: "0.3", changefreq: "yearly" },

                // Accounting docs
                { path: "/documentation/comptabilité", priority: "0.8", changefreq: "weekly" },
                { path: "/documentation/comptabilité/introduction", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/partie-double", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/écritures", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/comptes/introduction", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/comptes/classes", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/comptes/liste", priority: "0.8", changefreq: "weekly" },
                { path: "/documentation/comptabilité/documents", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/documents/journal", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/documents/grand-livre", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/documents/balance", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/documents/bilan", priority: "0.7", changefreq: "monthly" },
                {
                    path: "/documentation/comptabilité/documents/compte-de-résultat",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                { path: "/documentation/comptabilité/documents/annexe", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/comptabilité/glossaire", priority: "0.7", changefreq: "monthly" },

                // Dashboard docs
                { path: "/documentation/dashboard", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/dashboard/démarrage", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/dashboard/organisations", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/dashboard/exercices", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/dashboard/écritures", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/dashboard/stockage", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/dashboard/documents", priority: "0.6", changefreq: "monthly" },

                // API docs
                { path: "/documentation/api", priority: "0.7", changefreq: "monthly" },
                { path: "/documentation/api/introduction", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/api/authentification", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/api/organisation", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/api/exercice", priority: "0.6", changefreq: "monthly" },
                { path: "/documentation/api/stockage", priority: "0.6", changefreq: "monthly" },
            ]

            // Extract dynamic account slugs from source
            const accountsDataPath = resolve(__dirname, "src/features/docs/accounting/accounts/accountsData.ts")
            const accountsSrc = readFileSync(accountsDataPath, "utf-8")
            const accountSlugs = [...accountsSrc.matchAll(/defineAccount\(\s*\n?\s*"([^"]+)"/g)].map((m) => m[1])

            // Extract dynamic glossary slugs from source
            const glossaryDataPath = resolve(__dirname, "src/features/docs/accounting/glossary/glossaryData.ts")
            const glossarySrc = readFileSync(glossaryDataPath, "utf-8")
            // The toSlug function: lowercase, NFD normalize, strip diacritics, replace non-alnum with -, trim -
            const glossaryTerms = [...glossarySrc.matchAll(/defineTerm\(\s*\n?\s*"([^"]+)"/g)].map((m) => m[1])
            const toSlug = (term: string) =>
                term
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
            const glossarySlugs = glossaryTerms.map(toSlug)

            // Build URL entries
            const urls: string[] = []

            for (const route of staticRoutes) {
                urls.push(`    <url>
        <loc>${baseUrl}${route.path}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
    </url>`)
            }

            for (const slug of accountSlugs) {
                urls.push(`    <url>
        <loc>${baseUrl}/documentation/comptabilit%C3%A9/comptes/liste/${slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>`)
            }

            for (const slug of glossarySlugs) {
                urls.push(`    <url>
        <loc>${baseUrl}/documentation/comptabilit%C3%A9/glossaire/${slug}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
    </url>`)
            }

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`
            const outPath = resolve(__dirname, "build/sitemap.xml")
            writeFileSync(outPath, sitemap, "utf-8")

            console.log(`[sitemap] Generated sitemap.xml with ${urls.length} URLs`)
        },
    }
}

export default defineConfig(() => {
    return {
        plugins: [react({ include: "**/*.tsx" }), fontPreloadPlugin(), sitemapPlugin(), docsSearchIndexPlugin()],
        assetsInclude: ["**/*.md"],
        root: "./src",
        publicDir: "../public",
        base: "/",
        envDir: "../",
        server: {
            host: true,
            port: 5173,
            watch: {
                usePolling: true,
            },
            hmr: true,
        },
        build: {
            outDir: "../build",
            rollupOptions: {
                output: {
                    entryFileNames: "[hash].js",
                    chunkFileNames: "[hash].js",
                    assetFileNames: "[hash].[ext]",
                    manualChunks(id: string) {
                        if (id.includes("react-dom")) {
                            return "react-dom"
                        }
                    },
                },
            },
        },
    }
})
