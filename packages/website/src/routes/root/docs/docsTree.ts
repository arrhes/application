import type { AnyRoute } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accounting/accountingDocLayoutRoute.js"
import { accountAccountingDocRoute } from "./accounting/accounts/accountAccountingDocRoute.js"
import { accountsAccountingDocLayoutRoute } from "./accounting/accounts/accountsAccountingDocLayoutRoute.js"
import { accountsAccountingDocRoute } from "./accounting/accounts/accountsAccountingDocRoute.js"
import { accountsListAccountingDocRoute } from "./accounting/accounts/accountsListAccountingDocRoute.js"
import { classesAccountingDocRoute } from "./accounting/accounts/classesAccountingDocRoute.js"
import { glossaryAccountingDocLayoutRoute } from "./accounting/glossary/glossaryAccountingDocLayoutRoute.js"
import { glossaryAccountingDocIndexRoute } from "./accounting/glossary/glossaryAccountingDocRoute.js"
import { glossaryTermAccountingDocRoute } from "./accounting/glossary/glossaryTermAccountingDocRoute.js"
import { doubleEntryAccountingDocRoute } from "./accounting/introduction/doubleEntryAccountingDocRoute.js"
import { entriesAccountingDocRoute } from "./accounting/introduction/entriesAccountingDocRoute.js"
import { introductionAccountingDocRoute } from "./accounting/introduction/introductionAccountingDocRoute.js"
import { rootAccountingDocRoute } from "./accounting/introduction/rootAccountingDocRoute.js"
import { balanceAccountingDocRoute } from "./accounting/reports/balanceAccountingDocRoute.js"
import { balanceSheetAccountingDocRoute } from "./accounting/reports/balanceSheetAccountingDocRoute.js"
import { fecAccountingDocRoute } from "./accounting/reports/fecAccountingDocRoute.js"
import { incomeStatementAccountingDocRoute } from "./accounting/reports/incomeStatementAccountingDocRoute.js"
import { journalAccountingDocRoute } from "./accounting/reports/journalAccountingDocRoute.js"
import { ledgerAccountingDocRoute } from "./accounting/reports/ledgerAccountingDocRoute.js"
import { notesAccountingDocRoute } from "./accounting/reports/notesAccountingDocRoute.js"
import { reportsAccountingDocLayoutRoute } from "./accounting/reports/reportsAccountingDocLayoutRoute.js"
import { reportsAccountingDocRoute } from "./accounting/reports/reportsAccountingDocRoute.js"
import { apiDocLayoutRoute } from "./api/apiDocLayoutRoute.js"
import { authenticationApiDocRoute } from "./api/authenticationApiDocRoute.js"
import { filesApiDocRoute } from "./api/filesApiDocRoute.js"
import { introductionApiDocRoute } from "./api/introductionApiDocRoute.js"
import { organizationApiDocRoute } from "./api/organizationApiDocRoute.js"
import { rootApiDocRoute } from "./api/rootApiDocRoute.js"
import { yearApiDocRoute } from "./api/yearApiDocRoute.js"
import { dashboardDocLayoutRoute } from "./dashboard/dashboardDocLayoutRoute.js"
import { entriesDashboardDocRoute } from "./dashboard/entriesDashboardDocRoute.js"
import { filesDashboardDocRoute } from "./dashboard/filesDashboardDocRoute.js"
import { gettingStartedDashboardDocRoute } from "./dashboard/gettingStartedDashboardDocRoute.js"
import { organizationsDashboardDocRoute } from "./dashboard/organizationsDashboardDocRoute.js"
import { reportsDashboardDocRoute } from "./dashboard/reportsDashboardDocRoute.js"
import { rootDashboardDocRoute } from "./dashboard/rootDashboardDocRoute.js"
import { yearsDashboardDocRoute } from "./dashboard/yearsDashboardDocRoute.js"
import { aiDocLayoutRoute } from "./ai/aiDocLayoutRoute.js"
import { modelsAiDocRoute } from "./ai/modelsAiDocRoute.js"
import { ocrAiDocRoute } from "./ai/ocrAiDocRoute.js"
import { rootAiDocRoute } from "./ai/rootAiDocRoute.js"
import { toolsAiDocRoute } from "./ai/toolsAiDocRoute.js"
import { docsLayoutRoute } from "./docsLayoutRoute.js"
import { featuresGeneralDocRoute } from "./root/featuresGeneralDocRoute.js"
import { generalDocLayoutRoute } from "./root/generalDocLayoutRoute.js"
import { legalGeneralDocRoute } from "./root/legalGeneralDocRoute.js"
import { pricingGeneralDocRoute } from "./root/pricingGeneralDocRoute.js"
import { privacyGeneralDocRoute } from "./root/privacyGeneralDocRoute.js"
import { rootGeneralDocRoute } from "./root/rootGeneralDocRoute.js"
import { supportGeneralDocRoute } from "./root/supportGeneralDocRoute.js"
import { termsGeneralDocRoute } from "./root/termsGeneralDocRoute.js"
import { whitepaperGeneralDocRoute } from "./root/whitepaperGeneralDocRoute.js"

export const docsTree: AnyRoute = docsLayoutRoute.addChildren([
    // General section (root)
    generalDocLayoutRoute.addChildren([
        rootGeneralDocRoute,
        featuresGeneralDocRoute,
        pricingGeneralDocRoute,
        whitepaperGeneralDocRoute,
        supportGeneralDocRoute,
        legalGeneralDocRoute,
        termsGeneralDocRoute,
        privacyGeneralDocRoute,
    ]),

    // Comptabilite section (cours de comptabilité)
    accountingDocLayoutRoute.addChildren([
        rootAccountingDocRoute,
        introductionAccountingDocRoute,
        doubleEntryAccountingDocRoute,
        entriesAccountingDocRoute,
        accountsAccountingDocLayoutRoute.addChildren([
            accountsAccountingDocRoute,
            classesAccountingDocRoute,
            accountsListAccountingDocRoute,
            accountAccountingDocRoute,
        ]),
        reportsAccountingDocLayoutRoute.addChildren([
            reportsAccountingDocRoute,
            balanceSheetAccountingDocRoute,
            incomeStatementAccountingDocRoute,
            balanceAccountingDocRoute,
            journalAccountingDocRoute,
            ledgerAccountingDocRoute,
            fecAccountingDocRoute,
            notesAccountingDocRoute,
        ]),
        glossaryAccountingDocLayoutRoute.addChildren([glossaryAccountingDocIndexRoute, glossaryTermAccountingDocRoute]),
    ]),

    // Dashboard section (guide d'utilisation)
    dashboardDocLayoutRoute.addChildren([
        rootDashboardDocRoute,
        gettingStartedDashboardDocRoute,
        organizationsDashboardDocRoute,
        yearsDashboardDocRoute,
        entriesDashboardDocRoute,
        filesDashboardDocRoute,
        reportsDashboardDocRoute,
        // AI sub-section (assistant IA)
        aiDocLayoutRoute.addChildren([rootAiDocRoute, modelsAiDocRoute, toolsAiDocRoute, ocrAiDocRoute]),
    ]),

    // API section (documentation technique)
    apiDocLayoutRoute.addChildren([
        rootApiDocRoute,
        introductionApiDocRoute,
        authenticationApiDocRoute,
        organizationApiDocRoute,
        yearApiDocRoute,
        filesApiDocRoute,
    ]),
])
