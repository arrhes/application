import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const documentsGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/documents",
    beforeLoad: () => ({
        title: "Documents comptables",
        description: "Produire vos documents comptables et analyser vos données.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/DocumentsGuideDocPage.js")),
})
