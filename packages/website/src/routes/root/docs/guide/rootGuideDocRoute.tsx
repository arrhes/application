import { createRoute, redirect } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const rootGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/",
    beforeLoad: () => {
        throw redirect({
            to: "/documentation/guide/démarrer",
        })
    },
    component: () => null,
})
