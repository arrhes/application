import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { dashboardDocLayoutRoute } from "./dashboardDocLayoutRoute.tsx"

export const rootDashboardDocRoute = createRoute({
    getParentRoute: () => dashboardDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Guide d'utilisation",
        description:
            "Guide d'utilisation du dashboard Arrhes : créez vos organisations, gérez vos exercices et saisissez vos écritures comptables.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/dashboard/RootDashboardDocPage.tsx"),
        "RootDashboardDocPage",
    ),
})
