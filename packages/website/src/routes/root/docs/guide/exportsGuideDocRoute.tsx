import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const exportsGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/exports",
    beforeLoad: () => ({
        title: "Exports",
        description: "Export FEC et génération XBRL pour vos documents comptables.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/ExportsGuideDocPage.js")),
})
