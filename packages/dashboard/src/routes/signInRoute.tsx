import { CircularLoader } from "@comptasse/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { getIsAuthenticated } from "../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const signInRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/connexion",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {
        if (getIsAuthenticated() === true) {
            throw redirect({
                to: "/",
            })
        }
        return {
            title: "Connexion",
        }
    },
    component: lazyRouteComponent(() => import("../features/signIn/SignInPage.js"), "SignInPage"),
})
