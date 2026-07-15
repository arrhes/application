import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../../components/document/DocRoot"
import { accountsAccountingDocLayoutRoute } from "./accountsAccountingDocLayoutRoute.js"

const LazyAccountsResourcesAccountingDocPage = lazyRouteComponent(
    () =>
        import("../../../../../../features/docs/accounting/resources/accounts/AccountsResourcesAccountingDocPage.tsx"),
    "AccountsResourcesAccountingDocPage",
)

export const accountsAccountingDocRoute = createRoute({
    getParentRoute: () => accountsAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Plan comptable",
        description:
            "Liste complète des comptes du plan comptable général français. Recherchez et consultez les comptes par numéro ou libellé.",
    }),
    component: () => (
        <DocRoot>
            <LazyAccountsResourcesAccountingDocPage />
        </DocRoot>
    ),
})
