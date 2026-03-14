import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { recordLabelsLayoutRoute } from "./recordLabelsLayoutRoute.js"

export const recordLabelsRoute = createRoute({
    getParentRoute: () => recordLabelsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../features/dashboard/$idYear/yearSettings/recordLabels/recordLabelsPage.js"
            ),
        "RecordLabelsPage",
    ),
})
