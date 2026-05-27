export type SearchRoute = {
    label: string
    description?: string
    /** Registry key for openTab. */
    tabComponent: string
    /** Props to pass alongside the component key. */
    tabProps: Record<string, unknown>
}

// ─── User-level routes (always visible) ──────────────────────────────────────

export const userSearchRoutes: SearchRoute[] = [
    {
        label: "Organisations",
        description: "Liste de vos organisations",
        tabComponent: "organisations",
        tabProps: {},
    },
    {
        label: "Profil",
        description: "Votre profil utilisateur",
        tabComponent: "profil",
        tabProps: {},
    },
    {
        label: "Support",
        description: "Centre d'aide et tickets",
        tabComponent: "support",
        tabProps: {},
    },
    {
        label: "Paramètres",
        description: "Paramètres de l'application",
        tabComponent: "paramètres",
        tabProps: {},
    },
]

// ─── Organisation-level routes (require idOrganization) ──────────────────────

export type OrgSearchRoute = {
    label: string
    description?: string
    /** Registry key — props will be augmented with `{ idOrganization }` at call time. */
    tabComponent: string
}

export const orgSearchRoutes: OrgSearchRoute[] = [
    {
        label: "Assistant IA",
        description: "Assistant comptable intelligent",
        tabComponent: "agent",
    },
    {
        label: "Exercices",
        description: "Années fiscales",
        tabComponent: "exercices",
    },
    {
        label: "Membres",
        description: "Utilisateurs de l'organisation",
        tabComponent: "membres",
    },
    {
        label: "Stockage",
        description: "Fichiers et documents de l'organisation",
        tabComponent: "organisation-stockage",
    },
    {
        label: "Facturation",
        description: "Abonnements et factures",
        tabComponent: "organisation-facturation",
    },
    {
        label: "Paramètres de l'organisation",
        description: "Configuration générale",
        tabComponent: "organisation-paramètres",
    },
    {
        label: "API",
        description: "Accès API de l'organisation",
        tabComponent: "organisation-api",
    },
]

// ─── Year-level routes (require idOrganization + idYear) ─────────────────────

export type YearSearchRoute = {
    label: string
    description?: string
    /** Registry key — props will be augmented with `{ idOrganization, idYear }` at call time. */
    tabComponent: string
}

export const yearSearchRoutes: YearSearchRoute[] = [
    {
        label: "Écritures",
        description: "Journal comptable de l'exercice",
        tabComponent: "exercice-écritures",
    },
    {
        label: "Documents",
        description: "Rapports, bilans et compte de résultat",
        tabComponent: "exercice-documents",
    },
    {
        label: "Paramètres de l'exercice",
        description: "Journaux, catégories, plan comptable",
        tabComponent: "exercice-paramètres",
    },
]

/** @deprecated use userSearchRoutes */
export const staticSearchRoutes = userSearchRoutes
