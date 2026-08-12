import { createRoute, redirect } from "@tanstack/react-router"
import { docsLayoutRoute } from "../docsLayoutRoute.js"

export const rootGeneralDocRoute = createRoute({
    getParentRoute: () => docsLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({
            to: "/documentation/fonctionnalités",
        })
    },
})
