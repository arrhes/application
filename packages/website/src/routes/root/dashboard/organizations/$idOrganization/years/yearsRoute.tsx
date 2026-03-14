import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { yearsLayoutRoute } from "./yearsLayoutRoute.js"

export const yearsRoute = createRoute({
    getParentRoute: () => yearsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Exercices fiscaux",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../../features/dashboard/$idOrganization/years/yearsPage.js"),
        "YearsPage",
    ),
})
