import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { journalLayoutRoute } from "./journalLayoutRoute.js"

export const journalRoute = createRoute({
    getParentRoute: () => journalLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/journals/$idJournal/journalPage.js"
            ),
        "JournalPage",
    ),
})
