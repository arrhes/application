import { createRoute } from "@tanstack/react-router"
import { HomePage } from "../../../features/home/homePage.tsx"
import { homeLayoutRoute } from "./homeLayoutRoute.tsx"

export const homeRootRoute = createRoute({
    getParentRoute: () => homeLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Arrhes",
    }),
    component: () => <HomePage />,
})
