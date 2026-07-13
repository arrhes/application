import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, resolve } from "node:path"
import mdx from "@mdx-js/rollup"
import react from "@vitejs/plugin-react"
import remarkGfm from "remark-gfm"
import { loadEnv, type Plugin, build as viteBuild } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST"
import {
    generateAccountMarkdown,
    generateGlossaryMarkdown,
    generateScenarioMarkdown,
    generateStaticDocPageMarkdown,
    listAccountSlugs,
    listGlossarySlugs,
    listScenarioIds,
} from "./docsMdDynamicContent"
import { docsSearchIndexPlugin } from "./docsSearchIndexPlugin"

export function prerenderPlugin(): Plugin {
    return {
        name: "prerender",
        async closeBundle() {
            if (process.env.BUILD_PRERENDER) return
            process.env.BUILD_PRERENDER = "1"

            try {
                const pkgRoot = resolve(__dirname, "..")
                const buildDir = resolve(pkgRoot, "build")
                const renderBuildDir = resolve(pkgRoot, "build-render")
                const env = loadEnv("production", pkgRoot, "VITE_")
                const baseUrl = env.VITE_WEBSITE_BASE_URL ?? ""

                const spaShell = readFileSync(resolve(buildDir, "index.html"), "utf-8")

                // Build a Node.js bundle of render.tsx so we can call renderToString() for each route
                await viteBuild({
                    root: resolve(pkgRoot, "src"),
                    base: "/",
                    envDir: pkgRoot,
                    plugins: [
                        {
                            ...mdx({
                                remarkPlugins: [
                                    remarkGfm,
                                ],
                            }),
                            enforce: "pre",
                        },
                        react({
                            include: [
                                "**/*.tsx",
                                "**/*.mdx",
                            ],
                        }),
                        docsSearchIndexPlugin(),
                    ],
                    build: {
                        ssr: "../plugins/render.tsx",
                        outDir: renderBuildDir,
                        emptyOutDir: true,
                        rollupOptions: {
                            output: {
                                entryFileNames: "render.js",
                                format: "es",
                            },
                        },
                    },
                    logLevel: "warn",
                })

                // Load the render bundle and generate static HTML for each route
                const renderBundleUrl = `file://${resolve(renderBuildDir, "render.js")}`
                const { render } = (await import(renderBundleUrl)) as {
                    render: (url: string) => Promise<string>
                }

                // Collect all routes to prerender
                const routes: string[] = [
                    "/",
                    "/connexion",
                    "/inscription",
                    "/mot-de-passe-oublié",
                    ...DOC_PAGE_MANIFEST.map((e) => e.path),
                ]

                // Dynamic account slugs
                const accountsDataPath = resolve(
                    pkgRoot,
                    "src/features/docs/accounting/resources/accounts/accountsData.ts",
                )
                for (const m of readFileSync(accountsDataPath, "utf-8").matchAll(
                    /defineAccount\(\s*\n?\s*"([^"]+)"/g,
                )) {
                    routes.push(`/documentation/comptabilité/ressources/comptes/${m[1]}`)
                }

                // Dynamic glossary slugs
                const toSlug = (term: string) =>
                    term
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/(^-|-$)/g, "")
                const glossaryDataPath = resolve(
                    pkgRoot,
                    "src/features/docs/accounting/resources/glossary/glossaryData.ts",
                )
                for (const m of readFileSync(glossaryDataPath, "utf-8").matchAll(/defineTerm\(\s*\n?\s*"([^"]+)"/g)) {
                    routes.push(`/documentation/comptabilité/ressources/glossaire/${toSlug(m[1])}`)
                }

                // Scenario paths
                const scenariosDataPath = resolve(
                    pkgRoot,
                    "src/features/docs/accounting/resources/scenarios/scenariosData.ts",
                )
                for (const m of readFileSync(scenariosDataPath, "utf-8").matchAll(
                    /path:\s*"(\/documentation\/comptabilité\/scénarios\/[^"]+)"/g,
                )) {
                    routes.push(m[1])
                }

                const results = await Promise.all(
                    routes.map(async (route) => {
                        try {
                            const appHtml = await render(route)

                            // Extract the page-specific <title> rendered by React and update <head>
                            const renderedTitle = /<title>([\s\S]*?)<\/title>/.exec(appHtml)?.[1]
                            let html = spaShell
                            if (renderedTitle) {
                                html = html.replace(/<title>[^<]*<\/title>/, `<title>${renderedTitle}</title>`)
                            }
                            html = html.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

                            const outFile =
                                route === "/"
                                    ? resolve(buildDir, "index.html")
                                    : resolve(buildDir, route.slice(1), "index.html")
                            mkdirSync(dirname(outFile), {
                                recursive: true,
                            })
                            writeFileSync(outFile, html, "utf-8")
                            return 1
                        } catch (err) {
                            console.warn(`[prerender] Failed to render ${route}:`, err)
                            return 0
                        }
                    }),
                )
                const count = results.reduce((sum: number, n) => sum + n, 0)

                // Generate .md files for static doc pages
                for (const entry of DOC_PAGE_MANIFEST) {
                    const content = generateStaticDocPageMarkdown(pkgRoot, entry.path, baseUrl)
                    if (!content) continue
                    const mdOutPath = `${entry.path.slice(1)}.md`
                    const mdOutFile = resolve(buildDir, mdOutPath)
                    mkdirSync(dirname(mdOutFile), {
                        recursive: true,
                    })
                    writeFileSync(mdOutFile, content, "utf-8")
                }

                // Generate .md files for dynamic account pages
                for (const slug of listAccountSlugs(pkgRoot)) {
                    const content = generateAccountMarkdown(pkgRoot, slug, baseUrl)
                    if (!content) continue
                    const mdOutFile = resolve(buildDir, `documentation/comptabilité/ressources/comptes/${slug}.md`)
                    mkdirSync(dirname(mdOutFile), {
                        recursive: true,
                    })
                    writeFileSync(mdOutFile, content, "utf-8")
                }

                // Generate .md files for dynamic scenario pages
                for (const id of listScenarioIds(pkgRoot)) {
                    const content = generateScenarioMarkdown(pkgRoot, id, baseUrl)
                    if (!content) continue
                    const mdOutFile = resolve(buildDir, `documentation/comptabilité/ressources/scénarios/${id}.md`)
                    mkdirSync(dirname(mdOutFile), {
                        recursive: true,
                    })
                    writeFileSync(mdOutFile, content, "utf-8")
                }

                // Generate .md files for dynamic glossary pages
                for (const slug of listGlossarySlugs(pkgRoot)) {
                    const content = generateGlossaryMarkdown(pkgRoot, slug, baseUrl)
                    if (!content) continue
                    const mdOutFile = resolve(buildDir, `documentation/comptabilité/ressources/glossaire/${slug}.md`)
                    mkdirSync(dirname(mdOutFile), {
                        recursive: true,
                    })
                    writeFileSync(mdOutFile, content, "utf-8")
                }

                rmSync(renderBuildDir, {
                    recursive: true,
                    force: true,
                })
                // Keep a clean SPA shell (no prerendered route content) as the
                // Nginx fallback for routes that have no prerendered file (e.g.
                // /dashboard).  Without this, Nginx falls back to index.html
                // which contains the prerendered home-page HTML and causes a
                // visible flash of the "/" page on every other route refresh.
                writeFileSync(resolve(buildDir, "__app.html"), spaShell, "utf-8")

                console.log(`[prerender] Generated ${count} static HTML files`)
            } finally {
                delete process.env.BUILD_PRERENDER
            }
        },
    }
}
