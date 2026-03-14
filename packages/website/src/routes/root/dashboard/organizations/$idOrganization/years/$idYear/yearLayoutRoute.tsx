import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { Page } from "../../../../../../../components/layouts/page/page.js"
import { prefetchYearData } from "../../../../../../../utilities/prefetchYearData.js"
import { yearPathRoute } from "./yearPathRoute.js"

export const yearLayoutRoute = createRoute({
    getParentRoute: () => yearPathRoute,
    id: "yearLayout",
    pendingComponent: () => (
        <Page.Root>
            <Page.Content>
                <CircularLoader text="Récupération des données de l'exercice..." />
            </Page.Content>
        </Page.Root>
    ),
    beforeLoad: ({ params }) => {
        prefetchYearData({
            idYear: params.idYear,
        })

        return {
            title: undefined,
        }
    },
    component: lazyRouteComponent(
        () => import("../../../../../../../features/dashboard/$idYear/yearLayout.js"),
        "YearLayout",
    ),
})
