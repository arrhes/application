import { CircularLoader } from "@arrhes/ui"
import { createRoute, redirect } from "@tanstack/react-router"
import { SignInPage } from "../../../features/signIn/signInPage.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const signInRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/connexion",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({ to: "/dashboard" })
        }
        return {
            title: "Connexion",
        }
    },
    component: () => <SignInPage />,
})
