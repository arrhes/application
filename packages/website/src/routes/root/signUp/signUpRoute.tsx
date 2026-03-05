import { CircularLoader } from "@arrhes/ui"
import { createRoute, redirect } from "@tanstack/react-router"
import { SignUpPage } from "../../../features/signUp/signUpPage.js"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const signUpRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/inscription",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: async ({ context }) => {
        if (context.isAuthenticated === true) {
            throw redirect({
                to: "/dashboard",
            })
        }
        return {
            title: "Inscription",
            description: "Veuillez entrer les informations nécessaires à l'inscription",
        }
    },
    component: () => <SignUpPage />,
})
