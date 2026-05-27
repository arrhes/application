import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { getIsAuthenticated } from "../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const resetPasswordRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/mot-de-passe-oublié",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {
        if (getIsAuthenticated() === true) {
            throw redirect({
                to: "/",
            })
        }
        return {
            title: "Mot de passe oublié",
        }
    },
    component: lazyRouteComponent(() => import("../features/signIn/ResetPasswordPage.js"), "ResetPasswordPage"),
})
