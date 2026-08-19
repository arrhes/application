import { createRoute } from "@tanstack/react-router"
import { rootLayoutRoute } from "./rootLayoutRoute.js"
import { NotFoundPage } from "../features/notFound/NotFoundPage.js"

export const catchRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "$",
    beforeLoad: () => ({
        title: "Page introuvable",
        description: "La page que vous recherchez n'existe pas ou a été déplacée.",
        robots: "noindex",
    }),
    component: () => <NotFoundPage />,
})
