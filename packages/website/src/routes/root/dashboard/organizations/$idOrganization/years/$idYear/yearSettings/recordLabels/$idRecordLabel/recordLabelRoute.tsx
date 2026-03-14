import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { recordLabelLayoutRoute } from "./recordLabelLayoutRoute.js"

export const recordLabelRoute = createRoute({
    getParentRoute: () => recordLabelLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelPage.js"
            ),
        "RecordLabelPage",
    ),
})
