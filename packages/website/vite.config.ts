import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

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
            const accountSlugs = [...accountsSrc.matchAll(/defineAccount\("([^"]+)"/g)].map((m) => m[1])

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
        plugins: [react({ include: "**/*.tsx" }), fontPreloadPlugin(), sitemapPlugin()],
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
