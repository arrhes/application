import { createRoute, lazyRouteComponent } from "@tanstack/react-router"
import { cliDocLayoutRoute } from "./cliDocLayoutRoute.js"

export const authenticationCliDocRoute = createRoute({
    getParentRoute: () => cliDocLayoutRoute,
    path: "/authentification",
    beforeLoad: () => ({
        title: "Authentification",
        description:
            "Connectez le CLI Arrhes à votre compte via une clé API et configurez votre organisation par défaut.",
    }),
    component: lazyRouteComponent(
        () => import("../../../../features/docs/cli/AuthenticationCliDocPage.js"),
        "AuthenticationCliDocPage",
    ),
})
