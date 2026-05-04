import { CircularLoader } from "@arrhes/ui"
import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { rootLayoutRoute } from "../rootLayoutRoute.js"

export const publicFacturationRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/facturation",
    pendingComponent: () => <CircularLoader text="Chargement..." />,
    beforeLoad: () => ({
        title: "Facturation",
        description: "Outil public de lecture de facture UBL XML.",
    }),
    component: lazyRouteComponent(
        () => import("../../features/public/facturation/publicFacturationToolPage.js"),
        "PublicFacturationToolPage",
    ),
})
