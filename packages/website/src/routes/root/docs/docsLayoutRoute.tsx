import { createRoute, Outlet } from "@tanstack/react-router"
import { rootLayoutRoute } from "../../rootLayoutRoute.js"

export const docsLayoutRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/documentation",
    beforeLoad: () => ({
        title: "Documentation",
        section: "Documentation",
        description:
            "Documentation complète d'Arrhes : guide d'utilisation, cours de comptabilité, référence API et informations générales.",
    }),
    component: () => <div style={{ padding: "2rem" }}><h1>DOCS WORKS</h1><Outlet /></div>,
})
