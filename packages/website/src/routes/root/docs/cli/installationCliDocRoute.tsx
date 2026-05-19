import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const installationCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/installation",
    beforeLoad: () => ({
        title: "Installation",
        description: "Installez le CLI Arrhes sur macOS et Linux en une commande. Seul curl est requis.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/cli/InstallationCliDocPage.js"),
        "InstallationCliDocPage",
    ),
})
