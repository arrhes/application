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
import { dashboardDocLayoutRoute } from "./dashboard/dashboardDocLayoutRoute.js"
import { entriesDashboardDocRoute } from "./dashboard/entriesDashboardDocRoute.js"
import { filesDashboardDocRoute } from "./dashboard/filesDashboardDocRoute.js"
import { gettingStartedDashboardDocRoute } from "./dashboard/gettingStartedDashboardDocRoute.js"
import { inventoryDashboardDocRoute } from "./dashboard/inventoryDashboardDocRoute.js"
import { organizationsDashboardDocRoute } from "./dashboard/organizationsDashboardDocRoute.js"
import { reportsDashboardDocRoute } from "./dashboard/reportsDashboardDocRoute.js"
import { rootDashboardDocRoute } from "./dashboard/rootDashboardDocRoute.js"
import { yearsDashboardDocRoute } from "./dashboard/yearsDashboardDocRoute.js"
import { docsLayoutRoute } from "./docsLayoutRoute.js"
import { assistantModelsGuideDocRoute } from "./guide/assistantModelsGuideDocRoute.js"
import { assistantOcrGuideDocRoute } from "./guide/assistantOcrGuideDocRoute.js"
import { assistantRootGuideDocRoute } from "./guide/assistantRootGuideDocRoute.js"
import { assistantToolsGuideDocRoute } from "./guide/assistantToolsGuideDocRoute.js"
import { authentificationGuideDocRoute } from "./guide/authentificationGuideDocRoute.js"
import { bilansGuideDocRoute } from "./guide/bilansGuideDocRoute.js"
import { compteDeResultatGuideDocRoute } from "./guide/compteDeResultatGuideDocRoute.js"
import { comptesGuideDocRoute } from "./guide/comptesGuideDocRoute.js"
import { demarrerGuideDocRoute } from "./guide/demarrerGuideDocRoute.js"
import { documentsGuideDocRoute } from "./guide/documentsGuideDocRoute.js"
import { ecrituresGuideDocRoute } from "./guide/ecrituresGuideDocRoute.js"
import { exerciceGuideDocRoute } from "./guide/exerciceGuideDocRoute.js"
import { exportsGuideDocRoute } from "./guide/exportsGuideDocRoute.js"
import { guideDocLayoutRoute } from "./guide/guideDocLayoutRoute.js"
import { installationGuideDocRoute } from "./guide/installationGuideDocRoute.js"
import { inventoryGuideDocRoute } from "./guide/inventoryGuideDocRoute.js"
import { journauxGuideDocRoute } from "./guide/journauxGuideDocRoute.js"
import { libellesGuideDocRoute } from "./guide/libellesGuideDocRoute.js"
import { membresGuideDocRoute } from "./guide/membresGuideDocRoute.js"
import { organisationGuideDocRoute } from "./guide/organisationGuideDocRoute.js"
import { rootGuideDocRoute } from "./guide/rootGuideDocRoute.js"
import { stockageGuideDocRoute } from "./guide/stockageGuideDocRoute.js"
import { architectureGeneralDocRoute } from "./root/architectureGeneralDocRoute.js"
import { featuresGeneralDocRoute } from "./root/featuresGeneralDocRoute.js"
import { generalDocLayoutRoute } from "./root/generalDocLayoutRoute.js"
import { legalGeneralDocRoute } from "./root/legalGeneralDocRoute.js"
import { privacyGeneralDocRoute } from "./root/privacyGeneralDocRoute.js"
import { rootGeneralDocRoute } from "./root/rootGeneralDocRoute.js"
import { supportGeneralDocRoute } from "./root/supportGeneralDocRoute.js"
import { termsGeneralDocRoute } from "./root/termsGeneralDocRoute.js"
import { updatesGeneralDocRoute } from "./root/updatesGeneralDocRoute.js"
import { whitepaperGeneralDocRoute } from "./root/whitepaperGeneralDocRoute.js"

export const docsTree: AnyRoute = docsLayoutRoute.addChildren([
    // General section (root)
    generalDocLayoutRoute.addChildren([
        rootGeneralDocRoute,
        featuresGeneralDocRoute,
        architectureGeneralDocRoute,
        whitepaperGeneralDocRoute,
        supportGeneralDocRoute,
        legalGeneralDocRoute,
        termsGeneralDocRoute,
        privacyGeneralDocRoute,
        updatesGeneralDocRoute,
    ]),

    // Guide section (feature-first documentation)
    guideDocLayoutRoute.addChildren([
        rootGuideDocRoute,
        demarrerGuideDocRoute,
        installationGuideDocRoute,
        authentificationGuideDocRoute,
        organisationGuideDocRoute,
        membresGuideDocRoute,
        exerciceGuideDocRoute,
        comptesGuideDocRoute,
        journauxGuideDocRoute,
        libellesGuideDocRoute,
        ecrituresGuideDocRoute,
        stockageGuideDocRoute,
        documentsGuideDocRoute,
        bilansGuideDocRoute,
        compteDeResultatGuideDocRoute,
        exportsGuideDocRoute,
        inventoryGuideDocRoute,
        assistantRootGuideDocRoute,
        assistantModelsGuideDocRoute,
        assistantToolsGuideDocRoute,
        assistantOcrGuideDocRoute,
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
        inventoryDashboardDocRoute,
        reportsDashboardDocRoute,
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
