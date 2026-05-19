import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const rootCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "CLI",
        description:
            "Présentation de l'interface en ligne de commande Arrhes : automatisez la gestion de votre comptabilité depuis le terminal.",
    }),
    component: lazyRouteComponent(() => import("../../../../features/docs/cli/RootCliDocPage.js"), "RootCliDocPage"),
})
