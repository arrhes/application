import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook, IconCode, IconGavel, IconHome, IconInfoCircle, IconLayout } from "@tabler/icons-react"
import type { DocSection } from "./sectionTab.tsx"

// Documentation sections configuration
export const docSections: Record<string, DocSection> = {
    general: {
        id: "general",
        label: "Général",
        path: "/documentation",
        icon: <IconInfoCircle />,
        navigation: {
            introduction: {
                title: "Introduction",
                icon: <IconHome className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation", label: "Accueil" },
                    { path: "/documentation/fonctionnalités", label: "Fonctionnalités" },
                    { path: "/documentation/philosophie", label: "Philosophie" },
                    { path: "/documentation/tarifs", label: "Tarifs" },
                    { path: "/documentation/support", label: "Support" },
                ],
            },
            legal: {
                title: "Légal",
                icon: <IconGavel className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/mentions-légales", label: "Mentions légales" },
                    { path: "/documentation/cgu", label: "Conditions Générales d'Utilisation" },
                    { path: "/documentation/confidentialité", label: "Politique de confidentialité" },
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
            cours: {
                title: "Cours de comptabilité",
                icon: <IconBook className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/comptabilité", label: "Accueil" },
                    { path: "/documentation/comptabilité/introduction", label: "Introduction" },
                    { path: "/documentation/comptabilité/comptes", label: "Les comptes" },
                    { path: "/documentation/comptabilité/écritures", label: "Les écritures" },
                    { path: "/documentation/comptabilité/documents", label: "Les documents" },
                    { path: "/documentation/comptabilité/glossaire", label: "Glossaire" },
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
            guide: {
                title: "Guide d'utilisation",
                icon: <IconLayout className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/dashboard", label: "Accueil" },
                    { path: "/documentation/dashboard/démarrage", label: "Démarrage" },
                    { path: "/documentation/dashboard/organisations", label: "Organisations" },
                    { path: "/documentation/dashboard/exercices", label: "Exercices" },
                    { path: "/documentation/dashboard/écritures", label: "Saisie des écritures" },
                    { path: "/documentation/dashboard/stockage", label: "Stockage" },
                    { path: "/documentation/dashboard/documents", label: "Documents comptables" },
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
            api: {
                title: "API REST",
                icon: <IconCode className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/api", label: "Présentation" },
                    { path: "/documentation/api/introduction", label: "Introduction" },
                    { path: "/documentation/api/authentification", label: "Authentification" },
                    { path: "/documentation/api/organisations", label: "Organisations" },
                    { path: "/documentation/api/comptabilité", label: "Comptabilité" },
                    { path: "/documentation/api/stockage", label: "Fichiers et documents" },
                ],
            },
        },
    },
    // ai: {
    //     id: "ai",
    //     label: "Assistant IA",
    //     path: "/documentation/ai",
    //     icon: <IconRobot />,
    //     navigation: {
    //         assistant: {
    //             title: "Assistant IA",
    //             icon: <IconRobot className={css({ width: "1rem", height: "1rem" })} />,
    //             items: [
    //                 { path: "/documentation/ai", label: "Introduction" },
    //                 { path: "/documentation/ai/assistant", label: "Assistant comptable" },
    //                 { path: "/documentation/ai/analyse", label: "Analyse des données" },
    //             ]
    //         }
    //     }
    // }
}
