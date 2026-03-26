import { CircularLoader } from "@arrhes/ui"
import { createRoute, redirect } from "@tanstack/react-router"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const rootRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/",
    pendingComponent: () => <CircularLoader />,
    beforeLoad: ({ }) => {
        throw redirect({ to: "/connexion" })
    },
})
