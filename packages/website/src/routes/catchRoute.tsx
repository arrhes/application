import { createRoute } from "@tanstack/react-router"
import { NotFoundPage } from "../features/notFound/NotFoundPage.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const catchRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "$",
    beforeLoad: () => ({
        title: "Page introuvable",
        description: "La page que vous recherchez n'existe pas ou a été déplacée.",
    }),
    component: () => <NotFoundPage />,
})
