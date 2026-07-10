// ─────────────────────────── Docs Search Index Plugin ─────────────────────────────

interface DocPageManifestEntry {
    path: string
    file: string // relative from package root
    section: string
    navGroup: string
    navLabel: string
}

// Maps every static doc page route to its source file and nav metadata.
// Content strings are extracted automatically from the TSX source at build time.
export const DOC_PAGE_MANIFEST: DocPageManifestEntry[] = [
    // ── Général / Introduction ────────────────────────────────────────────────
    {
        path: "/documentation",
        file: "src/features/docs/general/rootGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Accueil",
    },
    {
        path: "/documentation/fonctionnalités",
        file: "src/features/docs/general/features/featuresGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Fonctionnalités",
    },
    {
        path: "/documentation/architecture",
        file: "src/features/docs/general/architecture/ArchitectureGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Architecture",
    },
    {
        path: "/documentation/philosophie",
        file: "src/features/docs/general/whitepaperGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Philosophie",
    },
    {
        path: "/documentation/support",
        file: "src/features/docs/general/supportGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Introduction",
        navLabel: "Support",
    },
    // ── Général / Légal ───────────────────────────────────────────────────────
    {
        path: "/documentation/mentions-légales",
        file: "src/features/docs/general/legalGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Légal",
        navLabel: "Mentions légales",
    },
    {
        path: "/documentation/cgu",
        file: "src/features/docs/general/termsGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Légal",
        navLabel: "Conditions Générales d'Utilisation",
    },
    {
        path: "/documentation/confidentialité",
        file: "src/features/docs/general/privacyGeneralDocPage.tsx",
        section: "Général",
        navGroup: "Légal",
        navLabel: "Politique de confidentialité",
    },
    // ── Comptabilité / Introduction ───────────────────────────────────────────
    {
        path: "/documentation/comptabilité",
        file: "src/features/docs/accounting/introduction/rootAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "Accueil",
    },
    {
        path: "/documentation/comptabilité/introduction",
        file: "src/features/docs/accounting/introduction/introductionAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/comptabilité/introduction/partie-double",
        file: "src/features/docs/accounting/introduction/doubleEntryAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "La partie double",
    },
    {
        path: "/documentation/comptabilité/introduction/écritures",
        file: "src/features/docs/accounting/introduction/entriesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Introduction",
        navLabel: "Les écritures",
    },
    // ── Comptabilité / Comptes ────────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/introduction/comptes",
        file: "src/features/docs/accounting/introduction/accountsAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Comptes",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/comptabilité/introduction/classes",
        file: "src/features/docs/accounting/introduction/classesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Comptes",
        navLabel: "Classes de comptes",
    },
    {
        path: "/documentation/comptabilité/ressources/comptes",
        file: "src/features/docs/accounting/resources/accounts/accountsResourcesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Comptes",
        navLabel: "Liste des comptes",
    },
    // ── Comptabilité / Documents ──────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/documents",
        file: "src/features/docs/accounting/reports/reportsAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/comptabilité/documents/journal",
        file: "src/features/docs/accounting/reports/journalAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Journal",
    },
    {
        path: "/documentation/comptabilité/documents/grand-livre",
        file: "src/features/docs/accounting/reports/ledgerAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Grand livre",
    },
    {
        path: "/documentation/comptabilité/documents/balance",
        file: "src/features/docs/accounting/reports/balanceAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Balance",
    },
    {
        path: "/documentation/comptabilité/documents/bilan",
        file: "src/features/docs/accounting/reports/balanceSheetAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Bilan",
    },
    {
        path: "/documentation/comptabilité/documents/compte-de-résultat",
        file: "src/features/docs/accounting/reports/incomeStatementAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Compte de résultat",
    },
    {
        path: "/documentation/comptabilité/documents/annexe",
        file: "src/features/docs/accounting/reports/notesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "Annexe",
    },
    {
        path: "/documentation/comptabilité/documents/fec",
        file: "src/features/docs/accounting/reports/fecAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Documents",
        navLabel: "FEC",
    },
    // ── Comptabilité / Scénarios ─────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/ressources/scénarios",
        file: "src/features/docs/accounting/resources/scenarios/scenariosResourcesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Scénarios",
        navLabel: "Scénarios",
    },
    // ── Comptabilité / Glossaire ──────────────────────────────────────────────
    {
        path: "/documentation/comptabilité/ressources/glossaire",
        file: "src/features/docs/accounting/resources/glossary/glossaryResourcesAccountingDocPage.tsx",
        section: "Comptabilité",
        navGroup: "Glossaire",
        navLabel: "Glossaire",
    },
    // ── Dashboard / Guide d'utilisation ──────────────────────────────────────
    {
        path: "/documentation/dashboard",
        file: "src/features/docs/dashboard/rootDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Accueil",
    },
    {
        path: "/documentation/dashboard/démarrage",
        file: "src/features/docs/dashboard/gettingStartedDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Démarrage",
    },
    {
        path: "/documentation/dashboard/organisations",
        file: "src/features/docs/dashboard/organizationsDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Organisations",
    },
    {
        path: "/documentation/dashboard/exercices",
        file: "src/features/docs/dashboard/yearsDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Exercices",
    },
    {
        path: "/documentation/dashboard/écritures",
        file: "src/features/docs/dashboard/entriesDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Saisie des écritures",
    },
    {
        path: "/documentation/dashboard/stockage",
        file: "src/features/docs/dashboard/filesDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Stockage",
    },
    {
        path: "/documentation/dashboard/documents",
        file: "src/features/docs/dashboard/reportsDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Documents comptables",
    },
    {
        path: "/documentation/dashboard/màj",
        file: "src/features/docs/dashboard/UpdatesDashboardDocPage.tsx",
        section: "Dashboard",
        navGroup: "Guide d'utilisation",
        navLabel: "Mises à jour",
    },
    // ── Dashboard / Assistant IA ──────────────────────────────────────────────
    {
        path: "/documentation/dashboard/assistant",
        file: "src/features/docs/ai/rootAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/dashboard/assistant/modèles",
        file: "src/features/docs/ai/modelsAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "Modèles",
    },
    {
        path: "/documentation/dashboard/assistant/outils",
        file: "src/features/docs/ai/toolsAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "Outils",
    },
    {
        path: "/documentation/dashboard/assistant/ocr",
        file: "src/features/docs/ai/ocrAiDocPage.tsx",
        section: "Dashboard",
        navGroup: "Assistant IA",
        navLabel: "OCR",
    },
    // ── API ───────────────────────────────────────────────────────────────────
    {
        path: "/documentation/api",
        file: "src/features/docs/api/rootApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Présentation",
    },
    {
        path: "/documentation/api/introduction",
        file: "src/features/docs/api/introductionApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Introduction",
    },
    {
        path: "/documentation/api/authentification",
        file: "src/features/docs/api/authenticationApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Authentification",
    },
    {
        path: "/documentation/api/organisation",
        file: "src/features/docs/api/organizationApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Organisation",
    },
    {
        path: "/documentation/api/exercice",
        file: "src/features/docs/api/yearApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Exercice",
    },
    {
        path: "/documentation/api/stockage",
        file: "src/features/docs/api/filesApiDocPage.tsx",
        section: "API",
        navGroup: "API",
        navLabel: "Fichiers et documents",
    },
]
