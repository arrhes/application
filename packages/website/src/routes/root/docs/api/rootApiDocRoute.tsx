import { createRoute } from "@tanstack/react-router"
import { RootApiDocPage } from "../../../../features/docs/api/rootApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const rootApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "API",
    }),
    component: () => <RootApiDocPage />,
})
