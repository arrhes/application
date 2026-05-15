import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { journalsLayoutRoute } from "../journalsLayoutRoute.js"

export const journalLayoutRoute = createRoute({
    getParentRoute: () => journalsLayoutRoute,
    path: "/$idJournal",
    beforeLoad: () => ({
        title: "Journal",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/journals/$idJournal/JournalLayout.js"
            ),
        "JournalLayout",
    ),
})
