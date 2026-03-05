import { createRoute } from "@tanstack/react-router"
import { IntroductionApiDocPage } from "../../../../features/docs/api/introductionApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const introductionApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction",
    }),
    component: () => <IntroductionApiDocPage />,
})
