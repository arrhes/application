import { createRoute } from "@tanstack/react-router"
import { organizationPathRoute } from "../organizationPathRoute.js"

export const yearsPathRoute = createRoute({
    getParentRoute: () => organizationPathRoute,
    path: "/exercices",
    beforeLoad: () => ({
        title: "Exercices",
    }),
})
