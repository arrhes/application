import {
    IconBook,
    IconBooks,
    IconBrain,
    IconBuilding,
    IconBuildingArch,
    IconCalendar,
    IconChecklist,
    IconCode,
    IconCompass,
    IconGavel,
    IconGitPullRequest,
    IconHome,
    IconLifebuoy,
    IconListCheck,
    IconPackage,
    IconPencil,
    IconProgressCheck,
    IconReport,
    IconRobot,
    IconStack,
} from "@tabler/icons-react"
import type { NodeItem } from "./NodeItem.js"

// Documentation sections configuration
export const nodeItems: NodeItem = [
    {
        label: "Accueil",
        path: "/",
        icon: <IconHome />,
    },
    {
        label: "Projet",
        path: null,
        icon: <IconChecklist />,
        children: [
            {
                icon: <IconBrain />,
                path: "/documentation/philosophie",
                label: "Philosophie",
            },
            {
                icon: <IconListCheck />,
                path: "/documentation/fonctionnalités",
                label: "Fonctionnalités",
            },
            {
                icon: <IconBuildingArch />,
                path: "/documentation/architecture",
                label: "Architecture",
            },
            {
                icon: <IconProgressCheck />,
                path: "/documentation/mises-à-jour",
                label: "Mises à jour",
            },
            {
                icon: <IconGitPullRequest />,
                path: "/documentation/contribuer",
                label: "Contribuer",
            },
            {
                icon: <IconLifebuoy />,
                path: "/documentation/support",
                label: "Support",
            },
            {
                icon: <IconGavel />,
                path: "/documentation/mentions-légales",
                label: "Mentions légales",
            },
        ],
    },
    {
        label: "Guide",
        path: null,
        icon: <IconCompass />,
        children: [
            {
                path: "/documentation/guide/démarrer",
                label: "Démarrer",
            },
            {
                path: "/documentation/guide/installation",
                label: "Installation",
            },
            {
                path: "/documentation/guide/authentification",
                label: "Authentification",
            },
            {
                label: "Organisation",
                icon: <IconBuilding />,
                children: [
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
            {
                label: "Exercice",
                icon: <IconCalendar />,
                children: [
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
            {
                label: "Écritures",
                icon: <IconPencil />,
                children: [
                    {
                        path: "/documentation/guide/écritures",
                        label: "Saisie des écritures",
                    },
                ],
            },
            {
                label: "Documents",
                icon: <IconReport />,
                children: [
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
            {
                label: "Gestion",
                icon: <IconPackage />,
                children: [
                    {
                        path: "/documentation/guide/inventaire",
                        label: "Inventaire",
                    },
                ],
            },
            {
                label: "Référence",
                icon: <IconCode />,
                children: [
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
            {
                label: "Base de données",
                icon: <IconStack />,
                children: [
                    {
                        path: "/documentation/guide/migrations",
                        label: "Migrations",
                    },
                ],
            },
            {
                label: "Agent",
                icon: <IconRobot />,
                children: [
                    {
                        path: "/documentation/guide/agent",
                        label: "Skills",
                    },
                    {
                        path: "/documentation/guide/agent/outils",
                        label: "Outils",
                    },
                ],
            },
        ],
    },
    {
        label: "Cours de comptabilité",
        path: null,
        icon: <IconBook />,
        children: [
            {
                path: "/documentation/comptabilité",
                label: "Introduction",
            },
            {
                label: "Les bases",
                icon: <IconStack />,
                children: [
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
            {
                label: "Documents",
                icon: <IconReport />,
                children: [
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
            {
                label: "Ressources",
                icon: <IconBooks />,
                children: [
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
        ],
    },
]
