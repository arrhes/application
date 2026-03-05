import { createRoute } from "@tanstack/react-router"
import { JournalsPage } from "../../../../../../../../../features/dashboard/$idYear/yearSettings/journals/journalsPage.js"
import { journalsLayoutRoute } from "./journalsLayoutRoute.js"

export const journalsRoute = createRoute({
    getParentRoute: () => journalsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <JournalsPage />,
})
