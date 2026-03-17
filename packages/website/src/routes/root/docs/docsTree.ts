import type { AnyRoute } from "@tanstack/react-router"
import { accountDetailAccountingDocRoute } from "./accounting/accountDetailAccountingDocRoute.js"
import { accountingDocLayoutRoute } from "./accounting/accountingDocLayoutRoute.js"
import { accountsAccountingDocIndexRoute } from "./accounting/accountsAccountingDocIndexRoute.js"
import { accountsAccountingDocLayoutRoute } from "./accounting/accountsAccountingDocLayoutRoute.js"
import { accountsClassesAccountingDocRoute } from "./accounting/accountsClassesAccountingDocRoute.js"
import { accountsListAccountingDocRoute } from "./accounting/accountsListAccountingDocRoute.js"
import { annexeAccountingDocRoute } from "./accounting/annexeAccountingDocRoute.js"
import { balanceAccountingDocRoute } from "./accounting/balanceAccountingDocRoute.js"
import { bilanAccountingDocRoute } from "./accounting/bilanAccountingDocRoute.js"
import { compteDeResultatAccountingDocRoute } from "./accounting/compteDeResultatAccountingDocRoute.js"
import { doubleEntryAccountingDocRoute } from "./accounting/doubleEntryAccountingDocRoute.js"
import { glossaryAccountingDocIndexRoute } from "./accounting/glossaryAccountingDocIndexRoute.js"
import { glossaryAccountingDocLayoutRoute } from "./accounting/glossaryAccountingDocLayoutRoute.js"
import { glossaryTermAccountingDocRoute } from "./accounting/glossaryTermAccountingDocRoute.js"
import { grandLivreAccountingDocRoute } from "./accounting/grandLivreAccountingDocRoute.js"
import { introductionAccountingDocRoute } from "./accounting/introductionAccountingDocRoute.js"
import { journalAccountingDocRoute } from "./accounting/journalAccountingDocRoute.js"
import { recordsAccountingDocRoute } from "./accounting/recordsAccountingDocRoute.js"
import { reportsAccountingDocIndexRoute } from "./accounting/reportsAccountingDocIndexRoute.js"
import { reportsAccountingDocLayoutRoute } from "./accounting/reportsAccountingDocLayoutRoute.js"
import { rootAccountingDocRoute } from "./accounting/rootAccountingDocRoute.js"
import { apiDocLayoutRoute } from "./api/apiDocLayoutRoute.js"
import { authenticationApiDocRoute } from "./api/authenticationApiDocRoute.js"
import { filesApiDocRoute } from "./api/filesApiDocRoute.js"
import { introductionApiDocRoute } from "./api/introductionApiDocRoute.js"
import { organizationApiDocRoute } from "./api/organizationApiDocRoute.js"
import { rootApiDocRoute } from "./api/rootApiDocRoute.js"
import { yearApiDocRoute } from "./api/yearApiDocRoute.js"
import { dashboardDocLayoutRoute } from "./dashboard/dashboardDocLayoutRoute.js"
import { filesDashboardDocRoute } from "./dashboard/filesDashboardDocRoute.js"
import { gettingStartedDashboardDocRoute } from "./dashboard/gettingStartedDashboardDocRoute.js"
import { organizationsDashboardDocRoute } from "./dashboard/organizationsDashboardDocRoute.js"
import { recordsDashboardDocRoute } from "./dashboard/recordsDashboardDocRoute.js"
import { reportsDashboardDocRoute } from "./dashboard/reportsDashboardDocRoute.js"
import { rootDashboardDocRoute } from "./dashboard/rootDashboardDocRoute.js"
import { yearsDashboardDocRoute } from "./dashboard/yearsDashboardDocRoute.js"
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
        recordsAccountingDocRoute,
        accountsAccountingDocLayoutRoute.addChildren([
            accountsAccountingDocIndexRoute,
            accountsClassesAccountingDocRoute,
            accountsListAccountingDocRoute,
            accountDetailAccountingDocRoute,
        ]),
        reportsAccountingDocLayoutRoute.addChildren([
            reportsAccountingDocIndexRoute,
            bilanAccountingDocRoute,
            compteDeResultatAccountingDocRoute,
            balanceAccountingDocRoute,
            journalAccountingDocRoute,
            grandLivreAccountingDocRoute,
            annexeAccountingDocRoute,
        ]),
        glossaryAccountingDocLayoutRoute.addChildren([glossaryAccountingDocIndexRoute, glossaryTermAccountingDocRoute]),
    ]),

    // Dashboard section (guide d'utilisation)
    dashboardDocLayoutRoute.addChildren([
        rootDashboardDocRoute,
        gettingStartedDashboardDocRoute,
        organizationsDashboardDocRoute,
        yearsDashboardDocRoute,
        recordsDashboardDocRoute,
        filesDashboardDocRoute,
        reportsDashboardDocRoute,
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
