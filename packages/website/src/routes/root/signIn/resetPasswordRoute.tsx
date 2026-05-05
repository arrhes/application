import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { getIsAuthenticated } from "../../../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const resetPasswordRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/mot-de-passe-oublié",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async () => {
        if (getIsAuthenticated() === true) {
            throw redirect({ to: "/dashboard" })
        }
        return {
            title: "Mot de passe oublié",
            description: "Recevez un nouveau mot de passe temporaire par email.",
        }
    },
    component: lazyRouteComponent(() => import("../../../features/signIn/resetPasswordPage.js"), "ResetPasswordPage"),
})
