import type { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { RootLayout } from "../features/RootLayout.js"

const DEFAULT_DESCRIPTION =
    "Logiciel de comptabilité open source pour les entreprises et associations françaises. Gérez vos écritures, comptes et documents comptables simplement."
const SITE_NAME = "Arrhes"
const BASE_URL = "https://arrhes.com"

const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: BASE_URL,
    description: DEFAULT_DESCRIPTION,
}

function buildBreadcrumbJsonLd(pathname: string, title: string) {
    const segments = pathname.split("/").filter(Boolean)
    if (segments.length === 0) return null

    const breadcrumbLabels: Record<string, string> = {
        documentation: "Documentation",
        comptabilité: "Comptabilité",
        comptes: "Comptes",
        classes: "Classes",
        liste: "Plan comptable",
        documents: "Documents",
        glossaire: "Glossaire",
        introduction: "Introduction",
        "partie-double": "La partie double",
        écritures: "Écritures",
        journal: "Journal",
        "grand-livre": "Grand livre",
        balance: "Balance",
        bilan: "Bilan",
        "compte-de-résultat": "Compte de résultat",
        annexe: "Annexe",
        dashboard: "Dashboard",
        devlog: "Devlog",
        démarrage: "Démarrage",
        organisations: "Organisations",
        exercices: "Exercices",
        stockage: "Stockage",
        api: "API",
        authentification: "Authentification",
        organisation: "Organisation",
        exercice: "Exercice",
        tarifs: "Tarifs",
        fonctionnalités: "Fonctionnalités",
        philosophie: "Philosophie",
        support: "Support",
        "mentions-légales": "Mentions légales",
        cgu: "CGU",
        confidentialité: "Confidentialité",
    }

    const items = segments.map((segment, index) => {
        const path = `/${segments.slice(0, index + 1).join("/")}`
        const isLast = index === segments.length - 1
        return {
            "@type": "ListItem",
            position: index + 1,
            name: isLast ? title : breadcrumbLabels[segment] || decodeURIComponent(segment),
            item: `${BASE_URL}${path}`,
        }
    })

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items,
    }
}

export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    section: string | undefined
    description: string | undefined
    robots: string | undefined
    isAuthenticated: boolean | undefined
    userSession: Promise<v.InferOutput<typeof readUserSessionRouteDefinition.schemas.return> | undefined> | undefined
}>()({
    pendingComponent: () => <CircularLoader text="Chargement de l'application..." />,
    beforeLoad: (_ctx) => {},
    component: function RootLayoutRouteComponent() {
        const matches = useRouterState({
            select: (s) => s.matches,
        })
        const pathname = useRouterState({
            select: (s) => s.location.pathname,
        })

        const reversedMatches = [
            ...matches,
        ].reverse()

        const matchWithTitle = reversedMatches.find((d) => d.context.title)
        const matchWithSection = reversedMatches.find((d) => d.context.section)
        const matchWithDescription = reversedMatches.find((d) => d.context.description)
        const matchWithRobots = reversedMatches.find((d) => d.context.robots)

        const rawTitle = matchWithTitle?.context.title || SITE_NAME
        const section = matchWithSection?.context.section
        const title =
            rawTitle === SITE_NAME
                ? SITE_NAME
                : section
                  ? `${rawTitle} - ${section} - ${SITE_NAME}`
                  : `${rawTitle} - ${SITE_NAME}`
        const description = matchWithDescription?.context.description || DEFAULT_DESCRIPTION
        const robots = matchWithRobots?.context.robots
        const canonicalUrl = `${BASE_URL}${pathname}`
        const isHomePage = pathname === "/"
        const isDocPage = pathname.startsWith("/documentation")

        // JSON-LD: WebSite (homepage only)
        const websiteJsonLd = isHomePage
            ? {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  name: SITE_NAME,
                  url: BASE_URL,
                  description: DEFAULT_DESCRIPTION,
                  inLanguage: "fr-FR",
              }
            : null

        // JSON-LD: SoftwareApplication (homepage only)
        const softwareJsonLd = isHomePage
            ? {
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  name: SITE_NAME,
                  url: BASE_URL,
                  applicationCategory: "BusinessApplication",
                  operatingSystem: "Web",
                  description: DEFAULT_DESCRIPTION,
              }
            : null

        // JSON-LD: BreadcrumbList (documentation pages)
        const breadcrumbJsonLd = isDocPage ? buildBreadcrumbJsonLd(pathname, rawTitle) : null

        return (
            <Fragment>
                <title>{title}</title>
                <meta
                    name="description"
                    content={description}
                />
                <link
                    rel="canonical"
                    href={canonicalUrl}
                />
                {robots && (
                    <meta
                        name="robots"
                        content={robots}
                    />
                )}

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content={title}
                />
                <meta
                    property="og:description"
                    content={description}
                />
                <meta
                    property="og:type"
                    content="website"
                />
                <meta
                    property="og:url"
                    content={canonicalUrl}
                />
                <meta
                    property="og:locale"
                    content="fr_FR"
                />
                <meta
                    property="og:site_name"
                    content={SITE_NAME}
                />

                {/* Twitter Card */}
                <meta
                    name="twitter:card"
                    content="summary"
                />
                <meta
                    name="twitter:title"
                    content={title}
                />
                <meta
                    name="twitter:description"
                    content={description}
                />

                {/* JSON-LD Structured Data */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(organizationJsonLd),
                    }}
                />
                {websiteJsonLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(websiteJsonLd),
                        }}
                    />
                )}
                {softwareJsonLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(softwareJsonLd),
                        }}
                    />
                )}
                {breadcrumbJsonLd && (
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify(breadcrumbJsonLd),
                        }}
                    />
                )}

                <RootLayout />
            </Fragment>
        )
    },
})
