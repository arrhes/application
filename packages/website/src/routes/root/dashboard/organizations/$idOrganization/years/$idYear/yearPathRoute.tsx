import { createRoute } from "@tanstack/react-router"
import { yearsPathRoute } from "../yearsPathRoute.tsx"

export const yearPathRoute = createRoute({
    getParentRoute: () => yearsPathRoute,
    path: "/$idYear",
    beforeLoad: () => ({
        title: "Exercice",
    }),
})
