import { createRoute } from "@tanstack/react-router"
import { YearApiDocPage } from "../../../../features/docs/api/yearApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const yearApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/exercice",
    beforeLoad: () => ({
        title: "Exercice",
    }),
    component: () => <YearApiDocPage />,
})
