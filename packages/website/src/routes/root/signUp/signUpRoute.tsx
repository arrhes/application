import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent, redirect } from "@tanstack/react-router"
import { getIsAuthenticated } from "../../../utilities/cookies/getIsAuthenticated.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const signUpRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/inscription",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async () => {
        if (getIsAuthenticated() === true) {
            throw redirect({
                to: "/dashboard",
            })
        }
        return {
            title: "Inscription",
            description:
                "Créez votre compte Arrhes gratuitement et commencez à gérer votre comptabilité en quelques minutes.",
        }
    },
    component: lazyRouteComponent(() => import("../../../features/signUp/signUpPage.js"), "SignUpPage"),
})
