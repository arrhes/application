import { CircularLoader } from "@comptasse/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { getIsAuthenticated } from "../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const signUpRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/inscription",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: () => {
        if (getIsAuthenticated() === true) {
            throw redirect({
                to: "/",
            })
        }
        return {
            title: "Inscription",
        }
    },
    component: lazyRouteComponent(() => import("../features/signUp/SignUpPage.js"), "SignUpPage"),
})
