import { createRoute } from "@tanstack/react-router"
import { Page } from "../components/layouts/page/page.js"
import { lazy, Suspense } from "react"
const BalanceReportPage = lazy(() => import("../features/dashboard/$idYear/reports/balanceReport/BalanceReportPage.js").then((m) => ({ default: m.BalanceReportPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

function BalanceReportPageWrapper() {
    return (
        <Page.Root>
            <Page.Content>
                <BalanceReportPage />
            </Page.Content>
        </Page.Root>
    )
}

export const dashboardOrganisationExerciceDocumentsBalanceRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/documents/balance",
    component: BalanceReportPageWrapper,
})
