import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import { scenariosAccountingDocLayoutRoute } from "./scenariosAccountingDocLayoutRoute.js"

const LazyScenariosResourcesAccountingDocPage = lazyRouteComponent(
    () =>
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
            <LazyScenariosResourcesAccountingDocPage />
        </DocRoot>
    ),
})
