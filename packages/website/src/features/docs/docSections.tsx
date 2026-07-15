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
    IconPackage,
    IconPencil,
    IconReport,
    IconRobot,
    IconRocket,
    IconStack,
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
                        path: "/documentation/mises-à-jour",
                        label: "Mises à jour",
                    },
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
                        path: "/documentation/confidentialité",
                        label: "Politique de confidentialité",
                    },
                ],
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
            reference: {
                title: "Référence",
                icon: <IconCode />,
                items: [
                    {
                        path: "/documentation/guide/référence-api",
                        label: "Référence API",
                    },
                    {
                        path: "/documentation/guide/référence-cli",
                        label: "Référence CLI",
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
}
