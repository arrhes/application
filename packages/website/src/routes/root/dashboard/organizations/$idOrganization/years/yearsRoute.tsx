import { createRoute } from "@tanstack/react-router"
import { YearsPage } from "../../../../../../features/dashboard/$idOrganization/years/yearsPage.js"
import { yearsLayoutRoute } from "./yearsLayoutRoute.js"

export const yearsRoute = createRoute({
    getParentRoute: () => yearsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: "Exercices fiscaux",
    }),
    component: () => <YearsPage />,
})
