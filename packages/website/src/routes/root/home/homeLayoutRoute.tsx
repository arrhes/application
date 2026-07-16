import { createRoute, Outlet } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.tsx"

export const homeLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    id: "homeLayout",
    beforeLoad: () => {},
    component: () => <Outlet />,
})
