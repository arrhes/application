import { resolve } from "node:path"
import type { Plugin } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST.ts"
import {
    generateAccountMarkdown,
    generateGlossaryMarkdown,
    generateScenarioMarkdown,
    generateStaticDocPageMarkdown,
    listAccountSlugs,
    listGlossarySlugs,
    listScenarioIds,
} from "./docsMdDynamicContent.ts"

const DOC_MD_VIRTUAL_MODULE_ID = "virtual:doc-md-content"
const RESOLVED_DOC_MD_VIRTUAL_MODULE_ID = `\0${DOC_MD_VIRTUAL_MODULE_ID}`
const MIDDLEWARE_PATH = "/__doc-md-content"

/**
 * Vite plugin that generates Markdown content for documentation pages and
 * exposes it through `virtual:doc-md-content`.
 *
 * - **Build**: generates all pages eagerly into a static JSON map.
 * - **Dev**: registers a server middleware and exposes a lazy `getDocMdContent`
 *   function that fetches per-path content on demand, so the first page load
 *   only pays the cost of generating that single page.
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

    function buildAllContent(): Record<string, string> {
        const content: Record<string, string> = {}

        for (const entry of DOC_PAGE_MANIFEST) {
            const markdown = generateStaticDocPageMarkdown(pkgRoot, entry.path)
            if (markdown) {
                content[entry.path] = markdown
            }
        }

        for (const slug of listAccountSlugs(pkgRoot)) {
            const markdown = generateAccountMarkdown(pkgRoot, slug)
            if (markdown) {
                content[`/documentation/comptabilité/ressources/comptes/${slug}`] = markdown
            }
        }

        for (const id of listScenarioIds(pkgRoot)) {
            const markdown = generateScenarioMarkdown(pkgRoot, id)
            if (markdown) {
                content[`/documentation/comptabilité/ressources/scénarios/${id}`] = markdown
            }
        }

        for (const slug of listGlossarySlugs(pkgRoot)) {
            const markdown = generateGlossaryMarkdown(pkgRoot, slug)
            if (markdown) {
                content[`/documentation/comptabilité/ressources/glossaire/${slug}`] = markdown
            }
        }

        return content
    }

    function generateModuleAll(): string {
        return `export const DOC_MD_CONTENT = ${JSON.stringify(buildAllContent(), null, 4)}`
    }

    function generateModuleDev(): string {
        return `
const cache = {};

export async function getDocMdContent(path) {
    if (path in cache) return cache[path];
    const res = await fetch("${MIDDLEWARE_PATH}" + encodeURIComponent(path));
    if (!res.ok) { cache[path] = null; return null; }
    const content = await res.text();
    cache[path] = content;
    return content;
}

export const DOC_MD_CONTENT = new Proxy({}, {
    get(_, path) {
        const key = String(path);
        if (key in cache) return cache[key];
        return getDocMdContent(key);
    }
});
`.trim()
    }

    return {
        name: "doc-md-content",
        resolveId(id) {
            if (id === DOC_MD_VIRTUAL_MODULE_ID) {
                return RESOLVED_DOC_MD_VIRTUAL_MODULE_ID
            }
        },
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (!req.url?.startsWith(MIDDLEWARE_PATH)) return next()
                const docPath = safeDecodeURIComponent(req.url.slice(MIDDLEWARE_PATH.length))
                const content = generateForPath(docPath)
                if (content === null) {
                    res.statusCode = 404
                    res.end()
                    return
                }
                res.setHeader("Content-Type", "text/plain; charset=utf-8")
                res.end(content)
            })
        },
        load(id) {
            if (id !== RESOLVED_DOC_MD_VIRTUAL_MODULE_ID) return

            if (process.env.BUILD_PRERENDER) {
                return generateModuleAll()
            }

            return {
                code: generateModuleDev(),
                map: null,
            }
        },
        handleHotUpdate({ file, server }) {
            const isDocPage = DOC_PAGE_MANIFEST.some((e) => file.endsWith(e.file))
            const isDataFile =
                file.endsWith("src/features/docs/accounting/resources/accounts/accountsData.ts") ||
                file.endsWith("src/features/docs/accounting/resources/scenarios/scenariosData.ts") ||
                file.endsWith("src/features/docs/accounting/resources/glossary/glossaryData.ts")

            if (isDocPage || isDataFile) {
                const mod = server.moduleGraph.getModuleById(RESOLVED_DOC_MD_VIRTUAL_MODULE_ID)
                if (mod) {
                    server.moduleGraph.invalidateModule(mod)
                }
                server.ws.send({
                    type: "full-reload",
                })
            }
        },
    }
}
