// ─── REST path ↔ tab definition mapping ─────────────────────────────────────
//
// Every tab definition has a canonical REST path that appears in the browser
// URL. The paths mirror the REST resource hierarchy, so deep navigation is
// reflected as deeper URL segments.

// ─── entryToPath ─────────────────────────────────────────────────────────────

/**
 * Return the REST URL path for a given tab definition key and its props.
 * Used for every pushState / replaceState call and for computing tab IDs.
 */
export function entryToPath(definitionKey: string, definitionProps: Record<string, unknown>): string {
    const org = definitionProps.idOrganization as string | undefined
    const year = definitionProps.idYear as string | undefined
    const entry = definitionProps.idEntry as string | undefined
    const ticket = definitionProps.idTicket as string | undefined
    const file = definitionProps.idFile as string | undefined
    switch (definitionKey) {
        // ── No-prop tabs ─────────────────────────────────────────────────────
        case "organisations":
            return "/organisations"
        case "profil":
            return "/profil"
        case "support":
            return "/support"
        case "admin-tickets":
            return "/admin/tickets"
        case "paramètres":
            return "/paramètres"

        // ── Org-level tabs ───────────────────────────────────────────────────
        case "organisation":
            return `/organisations/${org}`
        case "exercices":
            return `/organisations/${org}/exercices`
        case "agent":
            return `/organisations/${org}/assistant`
        case "membres":
            return `/organisations/${org}/membres`
        case "organisation-stockage":
            return `/organisations/${org}/stockage`
        case "organisation-paramètres":
            return `/organisations/${org}/paramètres`
        case "organisation-api":
            return `/organisations/${org}/api`

        // ── Year-level tabs ──────────────────────────────────────────────────
        case "exercice-écritures":
            return `/organisations/${org}/exercices/${year}/écritures`
        case "exercice-documents":
            return `/organisations/${org}/exercices/${year}/documents`
        case "exercice-stockage":
            return `/organisations/${org}/exercices/${year}/stockage`
        case "exercice-paramètres":
            return `/organisations/${org}/exercices/${year}/paramètres`

        // ── Detail tabs ──────────────────────────────────────────────────────
        case "écriture":
            return `/organisations/${org}/exercices/${year}/écritures/${entry}`
        case "ticket":
            return `/support/tickets/${ticket}`
        case "admin-ticket":
            return `/admin/tickets/${ticket}`
        case "fichier":
            return `/organisations/${org}/fichiers/${file}`

        default:
            // Fallback: shouldn't happen if all keys are covered above.
            return `/${definitionKey}`
    }
}

// ─── pathToDefinition ─────────────────────────────────────────────────────────

export type PathDefinition = {
    definitionKey: string
    definitionProps: Record<string, unknown>
}

// Ordered most-specific → least-specific so the regex engine matches the right
// pattern when multiple definitions share a common prefix.
const PATTERNS: Array<{
    pattern: RegExp
    parse: (m: RegExpMatchArray) => PathDefinition
}> = [
    // 6 segments - écriture detail
    {
        pattern: /^\/organisations\/([^/]+)\/exercices\/([^/]+)\/écritures\/([^/]+)$/,
        parse: (m) => ({
            definitionKey: "écriture",
            definitionProps: {
                idOrganization: m[1],
                idYear: m[2],
                idEntry: m[3],
            },
        }),
    },
    // 5 segments - year-level tabs
    {
        pattern: /^\/organisations\/([^/]+)\/exercices\/([^/]+)\/écritures$/,
        parse: (m) => ({
            definitionKey: "exercice-écritures",
            definitionProps: {
                idOrganization: m[1],
                idYear: m[2],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/exercices\/([^/]+)\/documents$/,
        parse: (m) => ({
            definitionKey: "exercice-documents",
            definitionProps: {
                idOrganization: m[1],
                idYear: m[2],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/exercices\/([^/]+)\/stockage$/,
        parse: (m) => ({
            definitionKey: "exercice-stockage",
            definitionProps: {
                idOrganization: m[1],
                idYear: m[2],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/exercices\/([^/]+)\/paramètres$/,
        parse: (m) => ({
            definitionKey: "exercice-paramètres",
            definitionProps: {
                idOrganization: m[1],
                idYear: m[2],
            },
        }),
    },
    // ticket detail  /support/tickets/{id}
    {
        pattern: /^\/support\/tickets\/([^/]+)$/,
        parse: (m) => ({
            definitionKey: "ticket",
            definitionProps: {
                idTicket: m[1],
            },
        }),
    },
    // admin-ticket detail  /admin/tickets/{id}
    {
        pattern: /^\/admin\/tickets\/([^/]+)$/,
        parse: (m) => ({
            definitionKey: "admin-ticket",
            definitionProps: {
                idTicket: m[1],
            },
        }),
    },
    // fichier detail  /organisations/{org}/fichiers/{file}
    {
        pattern: /^\/organisations\/([^/]+)\/fichiers\/([^/]+)$/,
        parse: (m) => ({
            definitionKey: "fichier",
            definitionProps: {
                idOrganization: m[1],
                idFile: m[2],
            },
        }),
    },
    // 4 segments - exercice root  /organisations/{org}/exercices/{year}
    {
        pattern: /^\/organisations\/([^/]+)\/exercices\/([^/]+)$/,
        parse: (m) => ({
            // There is no tab type for "exercise root" - map to écritures as the
            // default landing page for a fiscal year.
            definitionKey: "exercice-écritures",
            definitionProps: {
                idOrganization: m[1],
                idYear: m[2],
            },
        }),
    },
    // 3 segments - org sub-pages
    {
        pattern: /^\/organisations\/([^/]+)\/exercices$/,
        parse: (m) => ({
            definitionKey: "exercices",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/assistant$/,
        parse: (m) => ({
            definitionKey: "agent",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/membres$/,
        parse: (m) => ({
            definitionKey: "membres",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/stockage$/,
        parse: (m) => ({
            definitionKey: "organisation-stockage",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/paramètres$/,
        parse: (m) => ({
            definitionKey: "organisation-paramètres",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    {
        pattern: /^\/organisations\/([^/]+)\/api$/,
        parse: (m) => ({
            definitionKey: "organisation-api",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    // /admin/tickets (no ID - list)
    {
        pattern: /^\/admin\/tickets$/,
        parse: () => ({
            definitionKey: "admin-tickets",
            definitionProps: {},
        }),
    },
    // 2 segments - /organisations/{org}
    {
        pattern: /^\/organisations\/([^/]+)$/,
        parse: (m) => ({
            definitionKey: "organisation",
            definitionProps: {
                idOrganization: m[1],
            },
        }),
    },
    // 1 segment - root-level pages
    {
        pattern: /^\/organisations$/,
        parse: () => ({
            definitionKey: "organisations",
            definitionProps: {},
        }),
    },
    {
        pattern: /^\/profil$/,
        parse: () => ({
            definitionKey: "profil",
            definitionProps: {},
        }),
    },
    {
        pattern: /^\/support$/,
        parse: () => ({
            definitionKey: "support",
            definitionProps: {},
        }),
    },
    {
        pattern: /^\/paramètres$/,
        parse: () => ({
            definitionKey: "paramètres",
            definitionProps: {},
        }),
    },
]

/**
 * Parse a browser pathname back into a tab definition key + props.
 * Returns null if the path is not recognised as a valid tab path.
 */
export function pathToDefinition(path: string): PathDefinition | null {
    for (const { pattern, parse } of PATTERNS) {
        const m = path.match(pattern)
        if (m) return parse(m)
    }
    return null
}
