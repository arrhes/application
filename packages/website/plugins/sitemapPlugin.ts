import { readFileSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"
import type { Plugin } from "vite"

export function sitemapPlugin(): Plugin {
    return {
        name: "sitemap-generator",
        closeBundle() {
            const baseUrl = "https://arrhes.com"
            const today = new Date().toISOString().split("T")[0]

            // Static public routes
            const staticRoutes = [
                {
                    path: "/",
                    priority: "1.0",
                    changefreq: "weekly",
                },
                {
                    path: "/connexion",
                    priority: "0.5",
                    changefreq: "monthly",
                },
                {
                    path: "/inscription",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/mot-de-passe-oublié",
                    priority: "0.5",
                    changefreq: "monthly",
                },

                // General docs
                {
                    path: "/documentation",
                    priority: "0.8",
                    changefreq: "weekly",
                },
                {
                    path: "/documentation/fonctionnalités",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/philosophie",
                    priority: "0.5",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/tarifs",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/support",
                    priority: "0.5",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/mentions-légales",
                    priority: "0.3",
                    changefreq: "yearly",
                },
                {
                    path: "/documentation/cgu",
                    priority: "0.3",
                    changefreq: "yearly",
                },
                {
                    path: "/documentation/confidentialité",
                    priority: "0.3",
                    changefreq: "yearly",
                },

                // Accounting docs
                {
                    path: "/documentation/comptabilité",
                    priority: "0.8",
                    changefreq: "weekly",
                },
                {
                    path: "/documentation/comptabilité/introduction",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/partie-double",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/écritures",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/comptes/introduction",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/comptes/classes",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/comptes/liste",
                    priority: "0.8",
                    changefreq: "weekly",
                },
                {
                    path: "/documentation/comptabilité/documents",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/journal",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/grand-livre",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/balance",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/bilan",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/compte-de-résultat",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/annexe",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/documents/fec",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/scénarios",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/comptabilité/glossaire",
                    priority: "0.7",
                    changefreq: "monthly",
                },

                // Dashboard docs
                {
                    path: "/documentation/dashboard",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/démarrage",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/organisations",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/exercices",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/écritures",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/stockage",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/documents",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/facturation",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/màj",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/assistant",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/assistant/modèles",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/assistant/outils",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/dashboard/assistant/ocr",
                    priority: "0.6",
                    changefreq: "monthly",
                },

                // API docs
                {
                    path: "/documentation/api",
                    priority: "0.7",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/api/introduction",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/api/authentification",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/api/organisation",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/api/exercice",
                    priority: "0.6",
                    changefreq: "monthly",
                },
                {
                    path: "/documentation/api/stockage",
                    priority: "0.6",
                    changefreq: "monthly",
                },
            ]

            // Extract dynamic account slugs from source
            const accountsDataPath = resolve(
                __dirname,
                "../src/features/docs/accounting/resources/accounts/accountsData.ts",
            )
            const accountsSrc = readFileSync(accountsDataPath, "utf-8")
            const accountSlugs = [
                ...accountsSrc.matchAll(/defineAccount\(\s*\n?\s*"([^"]+)"/g),
            ].map((m) => m[1])

            // Extract dynamic glossary slugs from source
            const glossaryDataPath = resolve(
                __dirname,
                "../src/features/docs/accounting/resources/glossary/glossaryData.ts",
            )
            const glossarySrc = readFileSync(glossaryDataPath, "utf-8")
            // The toSlug function: lowercase, NFD normalize, strip diacritics, replace non-alnum with -, trim -
            const glossaryTerms = [
                ...glossarySrc.matchAll(/defineTerm\(\s*\n?\s*"([^"]+)"/g),
            ].map((m) => m[1])
            const toSlug = (term: string) =>
                term
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/(^-|-$)/g, "")
            const glossarySlugs = glossaryTerms.map(toSlug)

            // Extract scenario paths directly from scenariosData.ts
            const scenariosDataPath = resolve(
                __dirname,
                "../src/features/docs/accounting/resources/scenarios/scenariosData.ts",
            )
            const scenariosSrc = readFileSync(scenariosDataPath, "utf-8")
            const scenarioPaths = [
                ...scenariosSrc.matchAll(/path:\s*"(\/documentation\/comptabilité\/scénarios\/[^"]+)"/g),
            ].map((m) => m[1])

            // Build URL entries
            const routeMap = new Map<
                string,
                {
                    changefreq: string
                    priority: string
                }
            >()
            const addRoute = (path: string, changefreq: string, priority: string) => {
                if (!routeMap.has(path)) {
                    routeMap.set(path, {
                        changefreq,
                        priority,
                    })
                }
            }

            for (const route of staticRoutes) {
                addRoute(route.path, route.changefreq, route.priority)
            }

            for (const slug of accountSlugs) {
                addRoute(`/documentation/comptabilité/comptes/liste/${slug}`, "monthly", "0.5")
            }

            for (const slug of glossarySlugs) {
                addRoute(`/documentation/comptabilité/glossaire/${slug}`, "monthly", "0.5")
            }

            for (const path of scenarioPaths) {
                addRoute(path, "monthly", "0.5")
            }

            const urls = [
                ...routeMap.entries(),
            ]
                .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, "fr"))
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
            const outPath = resolve(__dirname, "../build/sitemap.xml")
            writeFileSync(outPath, sitemap, "utf-8")

            console.log(`[sitemap] Generated sitemap.xml with ${urls.length} URLs`)
        },
    }
}
