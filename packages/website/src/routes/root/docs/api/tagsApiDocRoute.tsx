import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const tagsApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/libellés",
    beforeLoad: () => ({
        title: "Libellés",
        description: "Endpoints API pour la gestion des libellés d'écriture d'un exercice Arrhes.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/api/TagsApiDocPage.tsx"), "TagsApiDocPage"),
})
