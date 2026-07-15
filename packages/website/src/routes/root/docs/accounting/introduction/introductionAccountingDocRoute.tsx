import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { DocRoot } from "../../../../../components/document/DocRoot"
import { introductionAccountingDocLayoutRoute } from "./introductionAccountingDocLayoutRoute.js"

const LazyIntroductionAccountingDocPage = lazyRouteComponent(
    () => import("../../../../../features/docs/accounting/introduction/IntroductionAccountingDocPage.tsx"),
)

export const introductionAccountingDocRoute = createRoute({
    getParentRoute: () => introductionAccountingDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Introduction au cours de comptabilité",
        description:
            "Introduction aux fondamentaux de la comptabilité française : principes, obligations légales et concepts de base.",
    }),
    component: () => (
        <DocRoot>
            <LazyIntroductionAccountingDocPage />
        </DocRoot>
    ),
})
