import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { recordRowLayoutRoute } from "./recordRowLayoutRoute.js"

export const recordRowRoute = createRoute({
    getParentRoute: () => recordRowLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: lazyRouteComponent(
        () =>
            import(
                "../../../../../../../../../../features/dashboard/$idYear/records/$idRecord/$idRecordRow/recordRowPage.js"
            ),
        "RecordRowPage",
    ),
})
