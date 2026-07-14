import { createRoute } from "@tanstack/react-router"
import { XBRLReportsApiDocPage } from "../../../../features/docs/api/XBRLReportsApiDocPage.js"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const exportsGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/exports",
    beforeLoad: () => ({
        title: "Exports",
        description: "Export FEC et génération XBRL pour vos documents comptables.",
    }),
    component: XBRLReportsApiDocPage,
})
