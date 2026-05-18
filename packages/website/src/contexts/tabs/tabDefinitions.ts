import { createElement } from "react"
import { AgentTabContent } from "../../features/dashboard/$idOrganization/agent/AgentTabContent.js"
import { OrganizationTabContent } from "../../features/dashboard/$idOrganization/OrganizationTabContent.js"
import { OrganizationApiTabContent } from "../../features/dashboard/$idOrganization/organizationApi/OrganizationApiTabContent.js"
import { OrganizationBillingTabContent } from "../../features/dashboard/$idOrganization/organizationBilling/OrganizationBillingTabContent.js"
import { UpdateLicencePage } from "../../features/dashboard/$idOrganization/organizationBilling/UpdateLicencePage.js"
import { UpdateOcrPage } from "../../features/dashboard/$idOrganization/organizationBilling/UpdateOcrPage.js"
import { UpdateStoragePage } from "../../features/dashboard/$idOrganization/organizationBilling/UpdateStoragePage.js"
import { UpdateTokensPage } from "../../features/dashboard/$idOrganization/organizationBilling/UpdateTokensPage.js"
import { WalletTopUpPage } from "../../features/dashboard/$idOrganization/organizationBilling/wallet/WalletTopUpPage.js"
import { WalletWithdrawalPage } from "../../features/dashboard/$idOrganization/organizationBilling/wallet/WalletWithdrawalPage.js"
import { OrganizationSettingsTabContent } from "../../features/dashboard/$idOrganization/organizationSettings/OrganizationSettingsTabContent.js"
import { OrganizationUsersPage } from "../../features/dashboard/$idOrganization/organizationUsers/OrganizationUsersPage.js"
import { YearsPage } from "../../features/dashboard/$idOrganization/years/YearsPage.js"
import { EntryTabContent } from "../../features/dashboard/$idYear/entries/$idEntry/EntryTabContent.js"
import { EntriesPage } from "../../features/dashboard/$idYear/entries/EntriesPage.js"
import { FileTabContent } from "../../features/dashboard/$idYear/files/$idFile/FileTabContent.js"
import { FilesPage } from "../../features/dashboard/$idYear/files/FilesPage.js"
import { ReportsTabContent } from "../../features/dashboard/$idYear/reports/ReportsTabContent.js"
import { YearSettingsTabContent } from "../../features/dashboard/$idYear/yearSettings/YearSettingsTabContent.js"
import { AdminTicketTabContent } from "../../features/dashboard/admin/tickets/$idTicket/AdminTicketTabContent.js"
import { TicketsPage } from "../../features/dashboard/admin/tickets/TicketsPage.js"
import { OrganizationsPage } from "../../features/dashboard/organizations/OrganizationsPage.js"
import { UserProfilePage } from "../../features/dashboard/profile/UserProfilePage.js"
import { SettingsPage } from "../../features/dashboard/settings/SettingsPage.js"
import { TicketTabContent } from "../../features/dashboard/support/$idTicket/TicketTabContent.js"
import { SupportPage } from "../../features/dashboard/support/SupportPage.js"

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

    profil: (_props: Record<never, never>): TabDefinition => ({
        id: "profil",
        title: "Profil",
        description: "Votre profil utilisateur",
        component: createElement(UserProfilePage),
    }),

    support: (_props: Record<never, never>): TabDefinition => ({
        id: "support",
        title: "Support",
        description: "Centre d'aide et tickets",
        component: createElement(SupportPage),
    }),

    "admin-tickets": (_props: Record<never, never>): TabDefinition => ({
        id: "admin-tickets",
        title: "Administration",
        description: "Tickets d'administration",
        component: createElement(TicketsPage),
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

    agent: (props: { idOrganization: string }): TabDefinition => ({
        id: `agent-${props.idOrganization}`,
        title: "Assistant IA",
        description: "Assistant comptable intelligent",
        component: createElement(AgentTabContent, {
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

    "organisation-facturation": (props: { idOrganization: string }): TabDefinition => ({
        id: `organisation-facturation-${props.idOrganization}`,
        title: "Facturation",
        description: "Abonnements et factures",
        component: createElement(OrganizationBillingTabContent, {
            idOrganization: props.idOrganization,
        }),
    }),

    "organisation-paramètres": (props: { idOrganization: string }): TabDefinition => ({
        id: `organisation-paramètres-${props.idOrganization}`,
        title: "Paramètres de l'organisation",
        description: "Configuration générale",
        component: createElement(OrganizationSettingsTabContent, {
            idOrganization: props.idOrganization,
        }),
    }),

    "organisation-api": (props: { idOrganization: string }): TabDefinition => ({
        id: `organisation-api-${props.idOrganization}`,
        title: "API",
        description: "Accès API de l'organisation",
        component: createElement(OrganizationApiTabContent, {
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

    // ─── Billing form tabs ─────────────────────────────────────────────────

    "facturation-licence": (props: { idOrganization: string }): TabDefinition => ({
        id: `facturation-licence-${props.idOrganization}`,
        title: "Modifier la licence",
        description: "Modifier le montant de la licence mensuelle",
        component: createElement(UpdateLicencePage, {
            idOrganization: props.idOrganization,
        }),
    }),

    "facturation-stockage": (props: { idOrganization: string }): TabDefinition => ({
        id: `facturation-stockage-${props.idOrganization}`,
        title: "Modifier le stockage",
        description: "Ajuster la capacité de stockage",
        component: createElement(UpdateStoragePage, {
            idOrganization: props.idOrganization,
        }),
    }),

    "facturation-tokens": (props: { idOrganization: string }): TabDefinition => ({
        id: `facturation-tokens-${props.idOrganization}`,
        title: "Modifier les tokens IA",
        description: "Acheter des tokens pour l'assistant IA",
        component: createElement(UpdateTokensPage, {
            idOrganization: props.idOrganization,
        }),
    }),

    "facturation-ocr": (props: { idOrganization: string }): TabDefinition => ({
        id: `facturation-ocr-${props.idOrganization}`,
        title: "Ajouter des pages OCR",
        description: "Acheter des pages OCR supplémentaires",
        component: createElement(UpdateOcrPage, {
            idOrganization: props.idOrganization,
        }),
    }),

    "facturation-recharge": (props: { idOrganization: string }): TabDefinition => ({
        id: `facturation-recharge-${props.idOrganization}`,
        title: "Recharger le portefeuille",
        description: "Ajouter des fonds au portefeuille",
        component: createElement(WalletTopUpPage, {
            idOrganization: props.idOrganization,
        }),
    }),

    "facturation-retrait": (props: { idOrganization: string }): TabDefinition => ({
        id: `facturation-retrait-${props.idOrganization}`,
        title: "Retirer du portefeuille",
        description: "Retirer des fonds du portefeuille",
        component: createElement(WalletWithdrawalPage, {
            idOrganization: props.idOrganization,
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

    ticket: (props: { idTicket: string }): TabDefinition => ({
        id: `ticket-${props.idTicket}`,
        title: "Ticket",
        component: createElement(TicketTabContent, {
            idTicket: props.idTicket,
        }),
    }),

    "admin-ticket": (props: { idTicket: string }): TabDefinition => ({
        id: `admin-ticket-${props.idTicket}`,
        title: "Ticket",
        component: createElement(AdminTicketTabContent, {
            idTicket: props.idTicket,
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
