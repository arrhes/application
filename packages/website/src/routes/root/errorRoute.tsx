import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "../rootLayoutRoute.js"
import { ErrorPage } from "../../features/error/ErrorPage.js"

export const errorRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/error",
    beforeLoad: () => ({
        title: "Error",
        robots: "noindex",
    }),
    component: () => <ErrorPage />,
})
