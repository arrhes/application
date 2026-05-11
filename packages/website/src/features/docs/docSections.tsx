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
} from "@tabler/icons-react"
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
                icon: <IconHome />,
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
                icon: <IconGavel />,
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
            home: {
                title: undefined,
                icon: undefined,
                items: [{ path: "/documentation/comptabilité", label: "Accueil" }],
            },
            introduction: {
                title: "Les bases",
                icon: <IconStack />,
                items: [
                    { path: "/documentation/comptabilité/introduction/", label: "Introduction" },
                    { path: "/documentation/comptabilité/introduction/partie-double", label: "La partie double" },
                    { path: "/documentation/comptabilité/introduction/écritures", label: "Les écritures" },
                    { path: "/documentation/comptabilité/introduction/comptes", label: "Les comptes" },
                    { path: "/documentation/comptabilité/introduction/classes", label: "Classes de comptes" },
                ],
            },
            documents: {
                title: "Documents",
                icon: <IconReport />,
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
            scenarios: {
                title: "Ressources",
                icon: <IconBooks />,
                items: [
                    { path: "/documentation/comptabilité/ressources/comptes", label: "Liste des comptes" },
                    { path: "/documentation/comptabilité/ressources/scénarios", label: "Scénarios" },
                    { path: "/documentation/comptabilité/ressources/glossaire", label: "Glossaire" },
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
                items: [{ path: "/documentation/dashboard", label: "Accueil" }],
            },
            guide: {
                title: "Guide d'utilisation",
                icon: <IconLayout />,
                items: [
                    { path: "/documentation/dashboard/démarrage", label: "Démarrage" },
                    { path: "/documentation/dashboard/organisations", label: "Organisations" },
                    { path: "/documentation/dashboard/exercices", label: "Exercices" },
                    { path: "/documentation/dashboard/écritures", label: "Saisie des écritures" },
                    { path: "/documentation/dashboard/stockage", label: "Stockage" },
                    { path: "/documentation/dashboard/documents", label: "Documents comptables" },
                    { path: "/documentation/dashboard/facturation", label: "Facturation" },
                ],
            },
            assistant: {
                title: "Assistant IA",
                icon: <IconRobot />,
                items: [
                    { path: "/documentation/dashboard/assistant", label: "Introduction" },
                    { path: "/documentation/dashboard/assistant/modèles", label: "Modèles" },
                    { path: "/documentation/dashboard/assistant/outils", label: "Outils" },
                    { path: "/documentation/dashboard/assistant/ocr", label: "OCR" },
                ],
            },
            updates: {
                title: undefined,
                icon: undefined,
                items: [{ path: "/documentation/dashboard/màj", label: "Mises à jour" }],
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
                icon: <IconCode />,
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
