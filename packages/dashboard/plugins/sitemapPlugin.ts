import { writeFileSync } from "node:fs"
import { resolve } from "node:path"
import { loadEnv, type Plugin } from "vite"

export function sitemapPlugin(): Plugin {
    return {
        name: "sitemap-generator",
        closeBundle() {
            const pkgRoot = resolve(__dirname, "..")
            const env = loadEnv("production", pkgRoot, "VITE_")
            const baseUrl = env.VITE_DASHBOARD_BASE_URL || "https://app.comptasse.com"
            const today = new Date().toISOString().split("T")[0]

            // Public, non-authenticated routes of the dashboard app
            const routes = [
                {
                    path: "/connexion",
                    changefreq: "monthly",
                    priority: "0.5",
                },
                {
                    path: "/inscription",
                    changefreq: "monthly",
                    priority: "0.6",
                },
                {
                    path: "/mot-de-passe-oublié",
                    changefreq: "monthly",
                    priority: "0.5",
                },
            ]

            const urls = routes
                .toSorted((a, b) => a.path.localeCompare(b.path, "fr"))
                .map(
                    (route) => `    <url>
        <loc>${encodeURI(`${baseUrl}${route.path}`)}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${route.changefreq}</changefreq>
        <priority>${route.priority}</priority>
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
