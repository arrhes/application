import { createElement } from "react"
import { OrganizationTabContent } from "../../features/dashboard/$idOrganization/OrganizationTabContent.js"
import { OrganizationSettingsTabContent } from "../../features/dashboard/$idOrganization/organizationSettings/OrganizationSettingsTabContent.js"
import { OrganizationUsersPage } from "../../features/dashboard/$idOrganization/organizationUsers/OrganizationUsersPage.js"
import { YearsPage } from "../../features/dashboard/$idOrganization/years/YearsPage.js"
import { EntryTabContent } from "../../features/dashboard/$idYear/entries/$idEntry/EntryTabContent.js"
import { EntriesPage } from "../../features/dashboard/$idYear/entries/EntriesPage.js"
import { FileTabContent } from "../../features/dashboard/$idYear/files/$idFile/FileTabContent.js"
import { FilesPage } from "../../features/dashboard/$idYear/files/FilesPage.js"
import { ReportsTabContent } from "../../features/dashboard/$idYear/reports/ReportsTabContent.js"
import { YearSettingsTabContent } from "../../features/dashboard/$idYear/yearSettings/YearSettingsTabContent.js"
import { OrganizationsPage } from "../../features/dashboard/organizations/OrganizationsPage.js"
import { SettingsPage } from "../../features/dashboard/settings/SettingsPage.js"
import { UserSettingsTabContent } from "../../features/dashboard/userSettings/UserSettingsTabContent.js"

// ─── Types ───────────────────────────────────────────────────────────────────

export type TabDefinition = {
    id: string
    title: string
    description?: string
    component: React.ReactNode
}

// ─── Registry ────────────────────────────────────────────────────────────────

export const TAB_REGISTRY = {
    // ─── No-prop tabs ──────────────────────────────────────────────────────
    organisations: (_props: Record<never, never>): TabDefinition => ({
        id: "organisations",
        title: "Organisations",
        description: "Liste de vos organisations",
        component: createElement(OrganizationsPage),
    }),

    profil: (props: { subTab?: string }): TabDefinition => ({
        id: "profil",
        title: "Profil",
        description: "Votre profil utilisateur",
        component: createElement(UserSettingsTabContent, props as any),
    }),

    paramètres: (_props: Record<never, never>): TabDefinition => ({
        id: "paramètres",
        title: "Paramètres",
        description: "Paramètres de l'application",
        component: createElement(SettingsPage),
    }),

    // ─── Org-level tabs ────────────────────────────────────────────────────

    organisation: (props: { idOrganization: string }): TabDefinition => ({
        id: `organisation-${props.idOrganization}`,
        title: "Organisation",
        description: "Vue d'ensemble de l'organisation",
        component: createElement(OrganizationTabContent, {
            idOrganization: props.idOrganization,
        }),
    }),

    exercices: (props: { idOrganization: string }): TabDefinition => ({
        id: `exercices-${props.idOrganization}`,
        title: "Exercices",
        description: "Années fiscales",
        component: createElement(YearsPage, {
            idOrganization: props.idOrganization,
        }),
    }),

    membres: (props: { idOrganization: string }): TabDefinition => ({
        id: `membres-${props.idOrganization}`,
        title: "Membres",
        description: "Utilisateurs de l'organisation",
        component: createElement(OrganizationUsersPage, {
            idOrganization: props.idOrganization,
        }),
    }),

    "organisation-stockage": (props: { idOrganization: string }): TabDefinition => ({
        id: `organisation-stockage-${props.idOrganization}`,
        title: "Stockage",
        description: "Fichiers et documents de l'organisation",
        component: createElement(FilesPage),
    }),

    "organisation-paramètres": (props: { idOrganization: string }): TabDefinition => ({
        id: `organisation-paramètres-${props.idOrganization}`,
        title: "Paramètres de l'organisation",
        description: "Configuration générale",
        component: createElement(OrganizationSettingsTabContent, {
            idOrganization: props.idOrganization,
        }),
    }),

    // ─── Year-level tabs ───────────────────────────────────────────────────

    "exercice-écritures": (props: { idOrganization: string; idYear: string }): TabDefinition => ({
        id: `exercice-écritures-${props.idOrganization}-${props.idYear}`,
        title: "Écritures",
        description: "Journal comptable de l'exercice",
        component: createElement(EntriesPage, {
            idOrganization: props.idOrganization,
            idYear: props.idYear,
        }),
    }),

    "exercice-documents": (props: { idOrganization: string; idYear: string }): TabDefinition => ({
        id: `exercice-documents-${props.idOrganization}-${props.idYear}`,
        title: "Documents",
        description: "Rapports, bilans et compte de résultat",
        component: createElement(ReportsTabContent, {
            idOrganization: props.idOrganization,
            idYear: props.idYear,
        }),
    }),

    "exercice-stockage": (props: { idOrganization: string; idYear: string }): TabDefinition => ({
        id: `exercice-stockage-${props.idOrganization}-${props.idYear}`,
        title: "Stockage",
        description: "Fichiers attachés à l'exercice",
        component: createElement(FilesPage),
    }),

    "exercice-paramètres": (props: { idOrganization: string; idYear: string }): TabDefinition => ({
        id: `exercice-paramètres-${props.idOrganization}-${props.idYear}`,
        title: "Paramètres de l'exercice",
        description: "Journaux, catégories, plan comptable",
        component: createElement(YearSettingsTabContent, {
            idOrganization: props.idOrganization,
            idYear: props.idYear,
        }),
    }),

    // ─── Detail tabs ───────────────────────────────────────────────────────

    écriture: (props: { idOrganization: string; idYear: string; idEntry: string; label?: string }): TabDefinition => ({
        id: `écriture-${props.idOrganization}-${props.idYear}-${props.idEntry}`,
        title: "Écriture",
        description: props.label,
        component: createElement(EntryTabContent, {
            idOrganization: props.idOrganization,
            idYear: props.idYear,
            idEntry: props.idEntry,
        }),
    }),

    fichier: (props: { idOrganization: string; idFile: string }): TabDefinition => ({
        id: `fichier-${props.idOrganization}-${props.idFile}`,
        title: "Fichier",
        component: createElement(FileTabContent, {
            idOrganization: props.idOrganization,
            idFile: props.idFile,
        }),
    }),
}

// ─── Open tab args (discriminated union derived from registry) ────────────────

export type OpenTabArgs = {
    [K in keyof typeof TAB_REGISTRY]: {
        component: K
        props: Parameters<(typeof TAB_REGISTRY)[K]>[0]
    }
}[keyof typeof TAB_REGISTRY]
