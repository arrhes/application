import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { computationsLayoutRoute } from "./computationsLayoutRoute.js"

export const computationsRoute = createRoute({
    getParentRoute: () => computationsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/incomeStatements/computations/computationsPage.js"
            ),
        "ComputationsPage",
    ),
})
