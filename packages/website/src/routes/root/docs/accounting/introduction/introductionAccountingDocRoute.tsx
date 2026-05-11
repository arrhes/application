import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"

export const introductionAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Introduction au cours de comptabilité",
        description:
            "Introduction aux fondamentaux de la comptabilité française : principes, obligations légales et concepts de base.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../../features/docs/accounting/introduction/introductionAccountingDocPage.js"),
        "IntroductionAccountingDocPage",
    ),
})
