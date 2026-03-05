import { createRoute } from "@tanstack/react-router"
import { AuthenticationApiDocPage } from "../../../../features/docs/api/authenticationApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const authenticationApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification et utilisateurs",
    }),
    component: () => <AuthenticationApiDocPage />,
})
