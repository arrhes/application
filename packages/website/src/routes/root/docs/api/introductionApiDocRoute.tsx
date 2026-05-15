import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const introductionApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/introduction",
    beforeLoad: () => ({
        title: "Introduction",
        description:
            "Introduction à l'API Arrhes : authentification, format des requêtes, gestion des erreurs et bonnes pratiques.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/api/IntroductionApiDocPage.tsx"),
        "IntroductionApiDocPage",
    ),
})
