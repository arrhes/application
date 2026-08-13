import { resolve } from "node:path"
import type { Plugin } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST.ts"
import {
    generateAccountMarkdown,
    generateGlossaryMarkdown,
    generateNavigationMarkdown,
    generateScenarioMarkdown,
    generateStaticDocPageMarkdown,
} from "./docsMdDynamicContent.ts"

/**
 * Vite plugin that serves raw Markdown for documentation pages.
 *
 * - **Dev**: registers a server middleware that serves any `/documentation/**.md`
 *   URL as plain text (no HTML), generated on demand for LLM agents.
 * - **Build**: `.md` files are written to disk by `prerenderPlugin`.
 */
function safeDecodeURIComponent(value: string): string {
    try {
        return decodeURIComponent(value)
    } catch {
        return value
    }
}

export function mdGeneratePlugin(): Plugin {
    const pkgRoot = resolve(__dirname, "..")

    function generateForPath(docPath: string): string | null {
        if (docPath === "/documentation/sommaire") {
            return generateNavigationMarkdown()
        }

        const staticEntry = DOC_PAGE_MANIFEST.find((e) => e.path === docPath)
        if (staticEntry) {
            return generateStaticDocPageMarkdown(pkgRoot, docPath)
        }

        const accountMatch = docPath.match(/^\/documentation\/comptabilité\/ressources\/comptes\/(.+)$/)
        if (accountMatch) {
            return generateAccountMarkdown(pkgRoot, accountMatch[1])
        }

        const scenarioMatch = docPath.match(/^\/documentation\/comptabilité\/ressources\/scénarios\/(.+)$/)
        if (scenarioMatch) {
            return generateScenarioMarkdown(pkgRoot, scenarioMatch[1])
        }

        const glossaryMatch = docPath.match(/^\/documentation\/comptabilité\/ressources\/glossaire\/(.+)$/)
        if (glossaryMatch) {
            return generateGlossaryMarkdown(pkgRoot, glossaryMatch[1])
        }

        return null
    }

    return {
        name: "doc-md-content",
        configureServer(server) {
            // Serve raw `.md` URLs as Markdown (no HTML) for LLM agents.
            server.middlewares.use((req, res, next) => {
                const urlPath = req.url?.split("?")[0] ?? ""
                if (!urlPath.endsWith(".md")) return next()
                const docPath = safeDecodeURIComponent(urlPath.replace(/\.md$/, ""))
                const content = generateForPath(docPath)
                if (content === null) {
                    res.statusCode = 404
                    res.end()
                    return
                }
                res.setHeader("Content-Type", "text/markdown; charset=utf-8")
                res.end(content)
            })
        },
    }
}
