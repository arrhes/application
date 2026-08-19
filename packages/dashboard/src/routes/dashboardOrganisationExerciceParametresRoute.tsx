import { createRoute, useParams } from "@tanstack/react-router"
import { Page } from "../components/layouts/page/page.js"
import { lazy, Suspense } from "react"
const YearSettingsPage = lazy(() => import("../features/dashboard/$idYear/yearSettings/YearSettingsPage.js").then((m) => ({ default: m.YearSettingsPage })))
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"

function YearSettingsPageWrapper() {
    const { idOrganization, idYear } = useParams({ strict: false }) as { idOrganization: string; idYear: string }
    return (
        <Page.Root>
            <Page.Content>
                <YearSettingsPage idOrganization={idOrganization} idYear={idYear} />
            </Page.Content>
        </Page.Root>
    )
}

export const dashboardOrganisationExerciceParametresRoute = createRoute({
    getParentRoute: () => dashboardLayoutRoute,
    path: "/organisation/$idOrganization/exercice/$idYear/paramètres",
    component: YearSettingsPageWrapper,
})
