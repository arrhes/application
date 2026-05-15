import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { journalLayoutRoute } from "./journalLayoutRoute.js"

export const journalMetadataRoute = createRoute({
    getParentRoute: () => journalLayoutRoute,
    path: "/métadonnées",
    beforeLoad: () => ({
        title: "Métadonnées",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/journals/$idJournal/JournalMetadataTab.js"
            ),
        "JournalMetadataTab",
    ),
})
