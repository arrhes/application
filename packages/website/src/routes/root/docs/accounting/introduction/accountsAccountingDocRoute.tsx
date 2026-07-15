import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.tsx"

const LazyAccountsAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/introduction/AccountsAccountingDocPage.tsx"),
)

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/comptes",
    beforeLoad: () => ({
        title: "Comptes",
        description:
            "Présentation des comptes comptables : structure, numérotation et fonctionnement du plan comptable général français.",
    }),
    component: () => (
        <DocRoot>
            <LazyAccountsAccountingDocPage />
        </DocRoot>
    ),
})
