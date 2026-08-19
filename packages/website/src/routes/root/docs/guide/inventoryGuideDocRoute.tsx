import { createRoute } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { InventaireGuideDocPage } from "../../../../features/docs/guide/InventaireGuideDocPage.js"

export const inventoryGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/inventaire",
    beforeLoad: () => ({
        title: "Inventaire",
        description:
            "Gérez votre stock dans Comptasse : création d'articles, suivi des mouvements et alertes de seuil minimal.",
    }),
    component: () => <InventaireGuideDocPage />,
})
