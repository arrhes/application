import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/DocRoot"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

const LazyRootAccountingDocPage = lazyRouteComponent(
    () => import("../../../../features/docs/accounting/introduction/RootAccountingDocPage.tsx"),
)

export const rootAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Cours de comptabilité",
        description:
            "Cours de comptabilité française complet : partie double, écritures, comptes, documents de synthèse et glossaire.",
    }),
    component: () => (
        <DocRoot>
            <LazyRootAccountingDocPage />
        </DocRoot>
    ),
})
