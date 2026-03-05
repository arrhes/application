import { createRoute } from "@tanstack/react-router"
import { IntroductionAccountingDocPage } from "../../../../features/docs/accounting/introductionAccountingDocPage.js"
import { accountingDocLayoutRoute } from "./accountingDocLayoutRoute.js"

export const introductionAccountingDocRoute = createRoute({
    getParentRoute: () => accountingDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction au cours de comptabilité",
    }),
    component: () => <IntroductionAccountingDocPage />,
})
