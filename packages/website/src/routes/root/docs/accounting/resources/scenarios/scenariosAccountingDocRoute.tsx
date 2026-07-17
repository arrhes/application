import { createRoute } from "@tanstack/react-router"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import { scenariosAccountingDocLayoutRoute } from "./scenariosAccountingDocLayoutRoute.js"
import { ScenariosResourcesAccountingDocPage } from "../../../../../../features/docs/accounting/resources/scenarios/ScenariosResourcesAccountingDocPage.js"

=>
        import(
            "../../../../../../features/docs/accounting/resources/scenarios/ScenariosResourcesAccountingDocPage.tsx"
        ),
    "ScenariosResourcesAccountingDocPage",
)

export const scenariosAccountingDocIndexRoute = createRoute({
    getParentRoute: () => scenariosAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Scénarios comptables",
        description: "Liste des cas d'usage comptables avec exemples d'écritures et liens vers les comptes concernés.",
    }),
    component: () => (
        <DocRoot>
            <ScenariosResourcesAccountingDocPage />
        </DocRoot>
    ),
})
