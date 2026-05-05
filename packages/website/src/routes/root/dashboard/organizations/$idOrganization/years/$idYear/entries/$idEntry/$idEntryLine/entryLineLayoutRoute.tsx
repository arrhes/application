import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { entriesLayoutRoute } from "../../entriesLayoutRoute.js"

export const entryLineLayoutRoute = createRoute({
    getParentRoute: () => entriesLayoutRoute,
    path: "/$idEntry/mouvements/$idEntryLine",
    beforeLoad: () => ({
        title: "Ligne d'écriture",
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/entries/$idEntry/$idEntryLine/entryLineLayout.js"
            ),
        "EntryLineLayout",
    ),
})
