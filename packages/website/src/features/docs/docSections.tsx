import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBook, IconCode, IconGavel, IconHome, IconInfoCircle, IconLayout, IconRobot } from "@tabler/icons-react"
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
            introduction: {
                title: "Introduction",
                icon: <IconBook className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/comptabilité", label: "Accueil" },
                    { path: "/documentation/comptabilité/introduction", label: "Introduction" },
                    { path: "/documentation/comptabilité/partie-double", label: "La partie double" },
                    { path: "/documentation/comptabilité/écritures", label: "Les écritures" },
                ],
            },
            comptes: {
                title: "Comptes",
                icon: <IconBook className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/comptabilité/comptes/introduction", label: "Introduction" },
                    { path: "/documentation/comptabilité/comptes/classes", label: "Classes de comptes" },
                    { path: "/documentation/comptabilité/comptes/liste", label: "Liste des comptes" },
                ],
            },
            documents: {
                title: "Documents",
                icon: <IconBook className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/comptabilité/documents", label: "Introduction" },
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
                    { path: "/documentation/comptabilité/documents/bilan", label: "Bilan" },
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
            glossaire: {
                items: [{ path: "/documentation/comptabilité/glossaire", label: "Glossaire" }],
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
            assistant: {
                title: "Assistant IA",
                icon: <IconRobot className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/dashboard/assistant", label: "Introduction" },
                    { path: "/documentation/dashboard/assistant/modèles", label: "Modèles" },
                    { path: "/documentation/dashboard/assistant/outils", label: "Outils" },
                    { path: "/documentation/dashboard/assistant/ocr", label: "OCR" },
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
                title: "API",
                icon: <IconCode className={css({ width: "1rem", height: "1rem" })} />,
                items: [
                    { path: "/documentation/api", label: "Présentation" },
                    { path: "/documentation/api/introduction", label: "Introduction" },
                    { path: "/documentation/api/authentification", label: "Authentification" },
                    { path: "/documentation/api/organisation", label: "Organisation" },
                    { path: "/documentation/api/exercice", label: "Exercice" },
                    { path: "/documentation/api/stockage", label: "Fichiers et documents" },
                ],
            },
        },
    },
}
