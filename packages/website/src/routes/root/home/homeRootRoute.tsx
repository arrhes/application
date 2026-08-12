import { createRoute } from "@tanstack/react-router"
import { HomePage } from "../../../features/home/HomePage.tsx"
import { rootLayoutRoute } from "../../rootLayoutRoute.tsx"

export const homeRootRoute = createRoute({
    getParentRoute: () => rootLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Comptasse",
        description:
            "Comptasse est un logiciel de comptabilité open source, moderne et intuitif, conçu pour les entreprises et associations françaises.",
    }),
    component: () => <HomePage />,
})
