import { resolve } from "node:path"
import type { Plugin, ViteDevServer } from "vite"
import { loadEnv } from "vite"
import {
    generateAccountMarkdown,
    generateGlossaryMarkdown,
    generateScenarioMarkdown,
    generateStaticDocPageMarkdown,
} from "./docsMdDynamicContent"

const ACCOUNT_MD_REGEX = /^\/documentation\/comptabilité\/ressources\/comptes\/([^/]+)$/
const SCENARIO_MD_REGEX = /^\/documentation\/comptabilité\/ressources\/scénarios\/([^/]+)$/
const GLOSSARY_MD_REGEX = /^\/documentation\/comptabilité\/ressources\/glossaire\/([^/]+)$/

export function mdServePlugin(): Plugin {
    return {
        name: "md-serve",
        configureServer(server: ViteDevServer) {
            const pkgRoot = resolve(server.config.root, "..")
            const env = loadEnv(server.config.mode, pkgRoot, "VITE_")
            const baseUrl = env.VITE_WEBSITE_BASE_URL ?? ""

            server.middlewares.use((req, res, next) => {
                const rawUrl = req.url ?? ""
                if (!rawUrl.endsWith(".md")) return next()

                const decodedUrl = decodeURIComponent(rawUrl)
                const docPath = decodedUrl.replace(/\.md$/, "").replace(/\/$/, "")

                const accountMatch = docPath.match(ACCOUNT_MD_REGEX)
                if (accountMatch) {
                    const content = generateAccountMarkdown(pkgRoot, accountMatch[1], baseUrl)
                    if (content) {
                        res.writeHead(200, {
                            "Content-Type": "text/plain; charset=utf-8",
                        })
                        res.end(content)
                        return
                    }
                    return next()
                }

                const scenarioMatch = docPath.match(SCENARIO_MD_REGEX)
                if (scenarioMatch) {
                    const content = generateScenarioMarkdown(pkgRoot, scenarioMatch[1], baseUrl)
                    if (content) {
                        res.writeHead(200, {
                            "Content-Type": "text/plain; charset=utf-8",
                        })
                        res.end(content)
                        return
                    }
                    return next()
                }

                const glossaryMatch = docPath.match(GLOSSARY_MD_REGEX)
                if (glossaryMatch) {
                    const content = generateGlossaryMarkdown(pkgRoot, glossaryMatch[1], baseUrl)
                    if (content) {
                        res.writeHead(200, {
                            "Content-Type": "text/plain; charset=utf-8",
                        })
                        res.end(content)
                        return
                    }
                    return next()
                }

                const content = generateStaticDocPageMarkdown(pkgRoot, docPath, baseUrl)
                if (content) {
                    res.writeHead(200, {
                        "Content-Type": "text/plain; charset=utf-8",
                    })
                    res.end(content)
                    return
                }

                next()
            })
        },
    }
}
