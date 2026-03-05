import { createRoute, Outlet } from "@tanstack/react-router"
import { journalsLayoutRoute } from "../journalsLayoutRoute.js"

export const journalLayoutRoute = createRoute({
    getParentRoute: () => journalsLayoutRoute,
    path: "/$idJournal",
    beforeLoad: () => ({
        title: "Journal",
    }),
    component: () => <Outlet />,
})
