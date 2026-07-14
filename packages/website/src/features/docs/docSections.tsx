import {
    IconBook,
    IconBooks,
    IconBuilding,
    IconCalendar,
    IconCode,
    IconCompass,
    IconGavel,
    IconHome,
    IconInfoCircle,
    IconLayout,
    IconPackage,
    IconPencil,
    IconReport,
    IconRobot,
    IconRocket,
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
            updates: {
                title: "Nouveautés",
                icon: undefined,
                items: [
                    {
                        path: "/documentation/mises-à-jour",
                        label: "Mises à jour",
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
    guide: {
        id: "guide",
        label: "Guide",
        path: "/documentation/guide",
        icon: <IconCompass />,
        navigation: {
            home: {
                items: [
                    {
                        path: "/documentation/guide",
                        label: "Accueil",
                    },
                ],
            },
            demarrage: {
                title: "Prise en main",
                icon: <IconRocket />,
                items: [
                    {
                        path: "/documentation/guide/démarrer",
                        label: "Démarrer avec Arrhes",
                    },
                    {
                        path: "/documentation/guide/installation",
                        label: "Installation",
                    },
                    {
                        path: "/documentation/guide/authentification",
                        label: "Authentification",
                    },
                ],
            },
            organisation: {
                title: "Organisation",
                icon: <IconBuilding />,
                items: [
                    {
                        path: "/documentation/guide/organisations",
                        label: "Organisations",
                    },
                    {
                        path: "/documentation/guide/membres",
                        label: "Membres",
                    },
                ],
            },
            exercice: {
                title: "Exercice",
                icon: <IconCalendar />,
                items: [
                    {
                        path: "/documentation/guide/exercices",
                        label: "Exercices",
                    },
                    {
                        path: "/documentation/guide/comptes",
                        label: "Comptes",
                    },
                    {
                        path: "/documentation/guide/journaux",
                        label: "Journaux",
                    },
                    {
                        path: "/documentation/guide/libellés",
                        label: "Libellés",
                    },
                ],
            },
            ecritures: {
                title: "Écritures",
                icon: <IconPencil />,
                items: [
                    {
                        path: "/documentation/guide/écritures",
                        label: "Saisie des écritures",
                    },
                ],
            },
            documents: {
                title: "Documents",
                icon: <IconReport />,
                items: [
                    {
                        path: "/documentation/guide/stockage",
                        label: "Stockage & Fichiers",
                    },
                    {
                        path: "/documentation/guide/documents",
                        label: "Documents comptables",
                    },
                    {
                        path: "/documentation/guide/bilans",
                        label: "Bilans",
                    },
                    {
                        path: "/documentation/guide/compte-de-résultat",
                        label: "Compte de résultat",
                    },
                    {
                        path: "/documentation/guide/exports",
                        label: "Exports",
                    },
                ],
            },
            gestion: {
                title: "Gestion",
                icon: <IconPackage />,
                items: [
                    {
                        path: "/documentation/guide/inventaire",
                        label: "Inventaire",
                    },
                ],
            },
            assistant: {
                title: "Assistant IA",
                icon: <IconRobot />,
                items: [
                    {
                        path: "/documentation/guide/assistant",
                        label: "Introduction",
                    },
                    {
                        path: "/documentation/guide/assistant/modèles",
                        label: "Modèles",
                    },
                    {
                        path: "/documentation/guide/assistant/outils",
                        label: "Outils",
                    },
                    {
                        path: "/documentation/guide/assistant/ocr",
                        label: "OCR",
                    },
                ],
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
                    {
                        path: "/documentation/dashboard/inventaire",
                        label: "Inventaire",
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
