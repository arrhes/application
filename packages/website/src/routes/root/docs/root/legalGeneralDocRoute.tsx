import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { generalDocLayoutRoute } from "./generalDocLayoutRoute.tsx"

export const legalGeneralDocRoute = createRoute({
    getParentRoute: () => generalDocLayoutRoute,
    path: "/mentions-légales",
    beforeLoad: () => ({
        title: "Mentions légales",
        description: "Mentions légales du logiciel de comptabilité Arrhes. Informations sur l'éditeur et l'hébergeur.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/general/legalGeneralDocPage.tsx"),
        "LegalGeneralDocPage",
    ),
})
