import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { userProfileLayoutRoute } from "./userProfileLayoutRoute.js"

export const userProfileRoute = createRoute({
    getParentRoute: () => userProfileLayoutRoute,
    path: "/",
    beforeLoad: () => {},
    component: lazyRouteComponent(
        () => import("../../../../features/dashboard/profile/UserProfilePage.js"),
        "UserProfilePage",
    ),
})
