import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { loadEnv, type Plugin } from "vite"
import { DOC_PAGE_MANIFEST } from "./DOC_PAGE_MANIFEST"
import { listAccountSlugs, listGlossarySlugs, listScenarioIds } from "./docsMdDynamicContent"

interface RouteMetadata {
    changefreq: string
    priority: string
}

export function sitemapPlugin(): Plugin {
    return {
        name: "sitemap-generator",
        closeBundle() {
            const pkgRoot = resolve(__dirname, "..")
            const env = loadEnv("production", pkgRoot, "VITE_")
            const baseUrl = env.VITE_WEBSITE_BASE_URL || "https://comptasse.com"
            const today = new Date().toISOString().split("T")[0]

            const routeMap = new Map<string, RouteMetadata>()
            const addRoute = (path: string, changefreq: string, priority: string) => {
                if (!routeMap.has(path)) {
                    routeMap.set(path, {
                        changefreq,
                        priority,
                    })
                }
            }

            // Static top-level public routes
            addRoute("/", "weekly", "1.0")
            addRoute("/cli", "monthly", "0.7")

            // Every docs page from the manifest (single source of truth for
            // existing documentation routes)
            for (const entry of DOC_PAGE_MANIFEST) {
                if (entry.path === "/documentation") {
                    addRoute(entry.path, "weekly", "0.8")
                    continue
                }
                const depth = entry.path.split("/").length - 1
                addRoute(entry.path, "monthly", depth <= 2 ? "0.7" : "0.6")
            }

            // Dynamic account pages
            for (const slug of listAccountSlugs(pkgRoot)) {
                addRoute(`/documentation/comptabilité/ressources/comptes/${slug}`, "monthly", "0.5")
            }

            // Dynamic glossary pages
            for (const slug of listGlossarySlugs(pkgRoot)) {
                addRoute(`/documentation/comptabilité/ressources/glossaire/${slug}`, "monthly", "0.5")
            }

            // Dynamic scenario pages
            for (const id of listScenarioIds(pkgRoot)) {
                addRoute(`/documentation/comptabilité/ressources/scénarios/${id}`, "monthly", "0.5")
            }

            const urls = [
                ...routeMap.entries(),
            ]
                .toSorted(([pathA], [pathB]) => pathA.localeCompare(pathB, "fr"))
                .map(
                    ([path, metadata]) => `    <url>
        <loc>${encodeURI(`${baseUrl}${path}`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${metadata.changefreq}</changefreq>
        <priority>${metadata.priority}</priority>
    </url>`,
                )

            const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`
            const outPath = resolve(pkgRoot, "build/sitemap.xml")
            writeFileSync(outPath, sitemap, "utf-8")

            console.log(`[sitemap] Generated sitemap.xml with ${urls.length} URLs`)
        },
    }
}
