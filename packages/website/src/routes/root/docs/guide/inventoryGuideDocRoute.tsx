import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"

export const inventoryGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/inventaire",
    beforeLoad: () => ({
        title: "Inventaire",
        description:
            "Gérez votre stock dans Arrhes : création d'articles, suivi des mouvements et alertes de seuil minimal.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/guide/InventaireGuideDocPage.js")),
})
