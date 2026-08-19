import { createRoute } from "@tanstack/react-router"
import { guideDocLayoutRoute } from "./guideDocLayoutRoute.js"
import { EcrituresGuideDocPage } from "../../../../features/docs/guide/EcrituresGuideDocPage.js"

export const ecrituresGuideDocRoute = createRoute({
    getParentRoute: () => guideDocLayoutRoute,
    path: "/écritures",
    beforeLoad: () => ({
        title: "Saisie des écritures",
        description: "Enregistrer vos opérations comptables dans Comptasse.",
    }),
    component: () => <EcrituresGuideDocPage />,
})
