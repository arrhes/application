import { createRoute } from "@tanstack/react-router"
import { ErrorPage } from "../../features/error/errorPage.js"
import { rootLayoutRoute } from "../rootLayoutRoute.js"

export const errorRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/error",
    beforeLoad: () => ({
        title: "Error",
    }),
    component: () => <ErrorPage />,
})
