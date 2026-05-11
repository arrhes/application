import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { scenariosAccountingDocLayoutRoute } from "./scenariosAccountingDocLayoutRoute.js"

export const scenariosAccountingDocIndexRoute = createRoute({
    getParentRoute: () => scenariosAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Scénarios comptables",
        description:
            "Liste des cas d'usage comptables avec exemples d'écritures et liens vers les comptes concernés.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/docs/accounting/resources/scenarios/scenariosResourcesAccountingDocPage.tsx"),
        "ScenariosResourcesAccountingDocPage",
    ),
})
