import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const introductionAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction au cours de comptabilité",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/accounting/introductionAccountingDocPage.js"),
        "IntroductionAccountingDocPage",
    ),
})
