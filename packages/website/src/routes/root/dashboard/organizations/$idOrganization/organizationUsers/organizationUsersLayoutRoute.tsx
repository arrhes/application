import { createRoute, Outlet } from "@tanstack/react-router"
import { organizationLayoutRoute } from "../organizationLayoutRoute.tsx"

export const organizationUsersLayoutRoute = createRoute({
    getParentRoute: () => organizationLayoutRoute,
    path: "/membres",
    beforeLoad: () => ({
        title: "Membres",
    }),
    component: () => <Outlet />,
})
