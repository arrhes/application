import {
    IconBook,
    IconBooks,
    IconCode,
    IconGavel,
    IconHome,
    IconInfoCircle,
    IconLayout,
    IconReport,
    IconRobot,
    IconStack,
    IconTerminal,
} from "@tabler/icons-react"
import type { DocSection } from "./SectionTab.tsx"

// Documentation sections configuration
export const docSections: Record<string, DocSection> = {
    general: {
        id: "general",
        label: "Général",
        path: "/documentation",
        icon: <IconInfoCircle />,
        navigation: {
            root: {
                items: [
                    {
                        path: "/documentation",
                        label: "Accueil",
                    },
                ],
            },
            introduction: {
                title: "Introduction",
                icon: <IconHome />,
                items: [
                    {
                        path: "/documentation/fonctionnalités",
                        label: "Fonctionnalités",
                    },
                    {
                        path: "/documentation/architecture",
                        label: "Architecture",
                    },
                    {
                        path: "/documentation/philosophie",
                        label: "Philosophie",
                    },
                    {
                        path: "/documentation/support",
                        label: "Support",
                    },
                ],
            },
            legal: {
                title: "Légal",
                icon: <IconGavel />,
                items: [
                    {
                        path: "/documentation/mentions-légales",
                        label: "Mentions légales",
                    },
                    {
                        path: "/documentation/cgu",
                        label: "Conditions Générales d'Utilisation",
                    },
                    {
                        path: "/documentation/confidentialité",
                        label: "Politique de confidentialité",
                    },
                ],
            },
        },
    },
    comptabilite: {
        id: "comptabilite",
        label: "Comptabilité",
        path: "/documentation/comptabilité",
        icon: <IconBook />,
        navigation: {
            home: {
                title: undefined,
                icon: undefined,
                items: [
                    {
                        path: "/documentation/comptabilité",
                        label: "Accueil",
                    },
                ],
            },
            introduction: {
                title: "Les bases",
                icon: <IconStack />,
                items: [
                    {
                        path: "/documentation/comptabilité/introduction/",
                        label: "Introduction",
                    },
                    {
                        path: "/documentation/comptabilité/introduction/partie-double",
                        label: "La partie double",
                    },
                    {
                        path: "/documentation/comptabilité/introduction/écritures",
                        label: "Les écritures",
                    },
                    {
                        path: "/documentation/comptabilité/introduction/comptes",
                        label: "Les comptes",
                    },
                    {
                        path: "/documentation/comptabilité/introduction/classes",
                        label: "Classes de comptes",
                    },
                ],
            },
            documents: {
                title: "Documents",
                icon: <IconReport />,
                items: [
                    {
                        path: "/documentation/comptabilité/documents",
                        label: "Introduction",
                    },
                    {
                        path: "/documentation/comptabilité/documents/journal",
                        label: "Journal",
                    },
                    {
                        path: "/documentation/comptabilité/documents/grand-livre",
                        label: "Grand livre",
                    },
                    {
                        path: "/documentation/comptabilité/documents/balance",
                        label: "Balance",
                    },
                    {
                        path: "/documentation/comptabilité/documents/bilan",
                        label: "Bilan",
                    },
                    {
                        path: "/documentation/comptabilité/documents/compte-de-résultat",
                        label: "Compte de résultat",
                    },
                    {
                        path: "/documentation/comptabilité/documents/annexe",
                        label: "Annexe",
                    },
                    {
                        path: "/documentation/comptabilité/documents/fec",
                        label: "FEC",
                    },
                ],
            },
            scenarios: {
                title: "Ressources",
                icon: <IconBooks />,
                items: [
                    {
                        path: "/documentation/comptabilité/ressources/comptes",
                        label: "Liste des comptes",
                    },
                    {
                        path: "/documentation/comptabilité/ressources/scénarios",
                        label: "Scénarios",
                    },
                    {
                        path: "/documentation/comptabilité/ressources/glossaire",
                        label: "Glossaire",
                    },
                ],
            },
            glossaire: {
                items: [],
            },
        },
    },
    dashboard: {
        id: "dashboard",
        label: "Dashboard",
        path: "/documentation/dashboard",
        icon: <IconLayout />,
        navigation: {
            home: {
                items: [
                    {
                        path: "/documentation/dashboard",
                        label: "Accueil",
                    },
                ],
            },
            guide: {
                title: "Guide d'utilisation",
                icon: <IconLayout />,
                items: [
                    {
                        path: "/documentation/dashboard/démarrage",
                        label: "Démarrage",
                    },
                    {
                        path: "/documentation/dashboard/organisations",
                        label: "Organisations",
                    },
                    {
                        path: "/documentation/dashboard/exercices",
                        label: "Exercices",
                    },
                    {
                        path: "/documentation/dashboard/écritures",
                        label: "Saisie des écritures",
                    },
                    {
                        path: "/documentation/dashboard/stockage",
                        label: "Stockage",
                    },
                    {
                        path: "/documentation/dashboard/documents",
                        label: "Documents comptables",
                    },
                    {
                        path: "/documentation/dashboard/facturation",
                        label: "Facturation",
                    },
                ],
            },
            assistant: {
                title: "Assistant IA",
                icon: <IconRobot />,
                items: [
                    {
                        path: "/documentation/dashboard/assistant",
                        label: "Introduction",
                    },
                    {
                        path: "/documentation/dashboard/assistant/modèles",
                        label: "Modèles",
                    },
                    {
                        path: "/documentation/dashboard/assistant/outils",
                        label: "Outils",
                    },
                    {
                        path: "/documentation/dashboard/assistant/ocr",
                        label: "OCR",
                    },
                ],
            },
            updates: {
                title: undefined,
                icon: undefined,
                items: [
                    {
                        path: "/documentation/dashboard/màj",
                        label: "Mises à jour",
                    },
                ],
            },
        },
    },
    api: {
        id: "api",
        label: "API",
        path: "/documentation/api",
        icon: <IconCode />,
        navigation: {
            home: {
                title: undefined,
                icon: undefined,
                items: [
                    {
                        path: "/documentation/api",
                        label: "Présentation",
                    },
                ],
            },
            basicsGroup: {
                title: "Généralités",
                icon: <IconInfoCircle />,
                items: [
                    {
                        path: "/documentation/api/introduction",
                        label: "Introduction",
                    },
                    {
                        path: "/documentation/api/authentification",
                        label: "Authentification",
                    },
                ],
            },
            organisationGroup: {
                title: "Organisation",
                icon: <IconLayout />,
                items: [
                    {
                        path: "/documentation/api/organisation",
                        label: "Organisation",
                    },
                    {
                        path: "/documentation/api/membres",
                        label: "Membres",
                    },
                    {
                        path: "/documentation/api/clés-api",
                        label: "Clés API",
                    },
                    {
                        path: "/documentation/api/stockage",
                        label: "Stockage",
                    },
                ],
            },
            exerciceGroup: {
                title: "Exercice",
                icon: <IconBooks />,
                items: [
                    {
                        path: "/documentation/api/exercice",
                        label: "Exercices",
                    },
                    {
                        path: "/documentation/api/comptes",
                        label: "Comptes",
                    },
                    {
                        path: "/documentation/api/journaux",
                        label: "Journaux",
                    },
                    {
                        path: "/documentation/api/bilans",
                        label: "Bilans",
                    },
                    {
                        path: "/documentation/api/comptes-de-résultat",
                        label: "Comptes de résultat",
                    },
                    {
                        path: "/documentation/api/libellés",
                        label: "Libellés",
                    },
                    {
                        path: "/documentation/api/écritures",
                        label: "Écritures",
                    },
                    {
                        path: "/documentation/api/exports",
                        label: "Exports",
                    },
                ],
            },
        },
    },
    cli: {
        id: "cli",
        label: "CLI",
        path: "/documentation/cli",
        icon: <IconTerminal />,
        navigation: {
            home: {
                items: [
                    {
                        path: "/documentation/cli",
                        label: "Présentation",
                    },
                ],
            },
            guide: {
                title: "Guide",
                icon: <IconTerminal />,
                items: [
                    {
                        path: "/documentation/cli/installation",
                        label: "Installation",
                    },
                    {
                        path: "/documentation/cli/demarrer",
                        label: "Démarrer",
                    },
                    {
                        path: "/documentation/cli/authentification",
                        label: "Authentification",
                    },
                ],
            },
            organisationGroup: {
                title: "Organisation",
                icon: <IconLayout />,
                items: [
                    {
                        path: "/documentation/cli/commandes/organisation",
                        label: "Organisation",
                    },
                    {
                        path: "/documentation/cli/commandes/membres",
                        label: "Membres",
                    },
                    {
                        path: "/documentation/cli/commandes/cles-api",
                        label: "Clés API",
                    },
                    {
                        path: "/documentation/cli/commandes/stockage",
                        label: "Stockage",
                    },
                ],
            },
            exerciceGroup: {
                title: "Exercice",
                icon: <IconBooks />,
                items: [
                    {
                        path: "/documentation/cli/commandes/exercices",
                        label: "Exercices",
                    },
                    {
                        path: "/documentation/cli/commandes/journaux",
                        label: "Journaux",
                    },
                    {
                        path: "/documentation/cli/commandes/comptes",
                        label: "Comptes",
                    },
                    {
                        path: "/documentation/cli/commandes/libelles",
                        label: "Libellés",
                    },
                    {
                        path: "/documentation/cli/commandes/ecritures",
                        label: "Écritures",
                    },
                    {
                        path: "/documentation/cli/commandes/exports",
                        label: "Exports",
                    },
                    {
                        path: "/documentation/cli/commandes/bilans",
                        label: "Bilans",
                    },
                    {
                        path: "/documentation/cli/commandes/comptes-de-resultat",
                        label: "Comptes de résultat",
                    },
                ],
            },
        },
    },
}
