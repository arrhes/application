import type { AnyRoute } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accounting/accountingDocLayoutRoute.js"
import { accountsAccountingDocRoute } from "./accounting/accountsAccountingDocRoute.js"
import { glossaryAccountingDocRoute } from "./accounting/glossaryAccountingDocRoute.js"
import { introductionAccountingDocRoute } from "./accounting/introductionAccountingDocRoute.js"
import { recordsAccountingDocRoute } from "./accounting/recordsAccountingDocRoute.js"
import { reportsAccountingDocRoute } from "./accounting/reportsAccountingDocRoute.js"
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
        accountsAccountingDocRoute,
        recordsAccountingDocRoute,
        reportsAccountingDocRoute,
        glossaryAccountingDocRoute,
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
