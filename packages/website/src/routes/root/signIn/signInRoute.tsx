import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { getIsAuthenticated } from "../../../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const signInRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/connexion",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async () => {
        if (getIsAuthenticated() === true) {
            throw redirect({
                to: "/dashboard",
            })
        }
        return {
            title: "Connexion",
            description: "Connectez-vous à votre compte Arrhes pour accéder à votre espace comptable.",
        }
    },
    component: lazyRouteComponent(() => import("../../../features/signIn/signInPage.js"), "SignInPage"),
})
