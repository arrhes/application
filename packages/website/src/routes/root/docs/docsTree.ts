import type { AnyRoute } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accounting/accountingDocLayoutRoute.js"
import { introductionAccountingTree } from "./accounting/introduction/introductionAccountingTree.js"
import { reportsAccountingTree } from "./accounting/reports/reportsAccountingTree.js"
import { resourcesAccountingTree } from "./accounting/resources/resourcesAccountingTree.js"
import { rootAccountingDocRoute } from "./accounting/rootAccountingDocRoute.js"
import { aiDocLayoutRoute } from "./ai/aiDocLayoutRoute.js"
import { modelsAiDocRoute } from "./ai/modelsAiDocRoute.js"
import { ocrAiDocRoute } from "./ai/ocrAiDocRoute.js"
import { rootAiDocRoute } from "./ai/rootAiDocRoute.js"
import { toolsAiDocRoute } from "./ai/toolsAiDocRoute.js"
import { accountsApiDocRoute } from "./api/accountsApiDocRoute.js"
import { apiDocLayoutRoute } from "./api/apiDocLayoutRoute.js"
import { apiKeysApiDocRoute } from "./api/apiKeysApiDocRoute.js"
import { authenticationApiDocRoute } from "./api/authenticationApiDocRoute.js"
import { balanceSheetsApiDocRoute } from "./api/balanceSheetsApiDocRoute.js"
import { entriesApiDocRoute } from "./api/entriesApiDocRoute.js"
import { filesApiDocRoute } from "./api/filesApiDocRoute.js"
import { incomeStatementsApiDocRoute } from "./api/incomeStatementsApiDocRoute.js"
import { introductionApiDocRoute } from "./api/introductionApiDocRoute.js"
import { journalsApiDocRoute } from "./api/journalsApiDocRoute.js"
import { organizationApiDocRoute } from "./api/organizationApiDocRoute.js"
import { orgUsersApiDocRoute } from "./api/orgUsersApiDocRoute.js"
import { rootApiDocRoute } from "./api/rootApiDocRoute.js"
import { tagsApiDocRoute } from "./api/tagsApiDocRoute.js"
import { xbrlReportsApiDocRoute } from "./api/xbrlReportsApiDocRoute.js"
import { yearApiDocRoute } from "./api/yearApiDocRoute.js"
import { authenticationCliDocRoute } from "./cli/authenticationCliDocRoute.js"
import { cliDocLayoutRoute } from "./cli/cliDocLayoutRoute.js"
import { commandsCliDocTree } from "./cli/commands/commandsCliDocTree.js"
import { demarrerCliDocRoute } from "./cli/demarrerCliDocRoute.js"
import { installationCliDocRoute } from "./cli/installationCliDocRoute.js"
import { rootCliDocRoute } from "./cli/rootCliDocRoute.js"
import { billingDashboardDocRoute } from "./dashboard/BillingDashboardDocRoute.js"
import { dashboardDocLayoutRoute } from "./dashboard/dashboardDocLayoutRoute.js"
import { entriesDashboardDocRoute } from "./dashboard/entriesDashboardDocRoute.js"
import { filesDashboardDocRoute } from "./dashboard/filesDashboardDocRoute.js"
import { gettingStartedDashboardDocRoute } from "./dashboard/gettingStartedDashboardDocRoute.js"
import { organizationsDashboardDocRoute } from "./dashboard/organizationsDashboardDocRoute.js"
import { reportsDashboardDocRoute } from "./dashboard/reportsDashboardDocRoute.js"
import { rootDashboardDocRoute } from "./dashboard/rootDashboardDocRoute.js"
import { updatesDashboardDocRoute } from "./dashboard/updatesDashboardDocRoute.js"
import { yearsDashboardDocRoute } from "./dashboard/yearsDashboardDocRoute.js"
import { docsLayoutRoute } from "./docsLayoutRoute.js"
import { architectureGeneralDocRoute } from "./root/architectureGeneralDocRoute.js"
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
        architectureGeneralDocRoute,
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
        introductionAccountingTree,
        reportsAccountingTree,
        resourcesAccountingTree,
    ]),

    // CLI section
    cliDocLayoutRoute.addChildren([
        rootCliDocRoute,
        installationCliDocRoute,
        demarrerCliDocRoute,
        authenticationCliDocRoute,
        commandsCliDocTree,
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
        billingDashboardDocRoute,
        updatesDashboardDocRoute,
        // AI sub-section (assistant IA)
        aiDocLayoutRoute.addChildren([
            rootAiDocRoute,
            modelsAiDocRoute,
            toolsAiDocRoute,
            ocrAiDocRoute,
        ]),
    ]),

    // API section (documentation technique)
    apiDocLayoutRoute.addChildren([
        rootApiDocRoute,
        introductionApiDocRoute,
        authenticationApiDocRoute,
        organizationApiDocRoute,
        apiKeysApiDocRoute,
        orgUsersApiDocRoute,
        filesApiDocRoute,
        yearApiDocRoute,
        accountsApiDocRoute,
        journalsApiDocRoute,
        balanceSheetsApiDocRoute,
        incomeStatementsApiDocRoute,
        tagsApiDocRoute,
        entriesApiDocRoute,
        xbrlReportsApiDocRoute,
    ]),
])
