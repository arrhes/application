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

/**
 * Vite plugin that generates Markdown content for every documentation page at
 * build/dev time and exposes it through `virtual:doc-md-content`.
 *
 * The returned map keys are the canonical doc paths (without the `.md`
 * extension). `docMdRoute` consumes this module to render raw Markdown views.
 */
export function mdGeneratePlugin(): Plugin {
    const pkgRoot = resolve(__dirname, "..")

    function buildContent(): Record<string, string> {
        const content: Record<string, string> = {}

        // Static doc pages declared in the manifest.
        for (const entry of DOC_PAGE_MANIFEST) {
            const markdown = generateStaticDocPageMarkdown(pkgRoot, entry.path)
            if (markdown) {
                content[entry.path] = markdown
            }
        }

        // Dynamic account pages.
        for (const slug of listAccountSlugs(pkgRoot)) {
            const markdown = generateAccountMarkdown(pkgRoot, slug)
            if (markdown) {
                content[`/documentation/comptabilité/ressources/comptes/${slug}`] = markdown
            }
        }

        // Dynamic scenario pages.
        for (const id of listScenarioIds(pkgRoot)) {
            const markdown = generateScenarioMarkdown(pkgRoot, id)
            if (markdown) {
                content[`/documentation/comptabilité/ressources/scénarios/${id}`] = markdown
            }
        }

        // Dynamic glossary pages.
        for (const slug of listGlossarySlugs(pkgRoot)) {
            const markdown = generateGlossaryMarkdown(pkgRoot, slug)
            if (markdown) {
                content[`/documentation/comptabilité/ressources/glossaire/${slug}`] = markdown
            }
        }

        return content
    }

    function generateModule(): string {
        return `export const DOC_MD_CONTENT = ${JSON.stringify(buildContent(), null, 4)}`
    }

    return {
        name: "doc-md-content",
        resolveId(id) {
            if (id === DOC_MD_VIRTUAL_MODULE_ID) {
                return RESOLVED_DOC_MD_VIRTUAL_MODULE_ID
            }
        },
        load(id) {
            if (id === RESOLVED_DOC_MD_VIRTUAL_MODULE_ID) {
                return generateModule()
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
