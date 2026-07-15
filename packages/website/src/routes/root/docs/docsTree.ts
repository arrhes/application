import type { AnyRoute } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accounting/accountingDocLayoutRoute.js"
import { introductionAccountingTree } from "./accounting/introduction/introductionAccountingTree.js"
import { reportsAccountingTree } from "./accounting/reports/reportsAccountingTree.js"
import { resourcesAccountingTree } from "./accounting/resources/resourcesAccountingTree.js"
import { rootAccountingDocRoute } from "./accounting/rootAccountingDocRoute.js"
import { docMdRoute } from "./docMdRoute.js"
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
import { referenceApiGuideDocRoute } from "./guide/referenceApiGuideDocRoute.js"
import { referenceCliGuideDocRoute } from "./guide/referenceCliGuideDocRoute.js"
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
        referenceApiGuideDocRoute,
        referenceCliGuideDocRoute,
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

    // Raw Markdown fallback route for any doc path ending in .md
    docMdRoute,
])
