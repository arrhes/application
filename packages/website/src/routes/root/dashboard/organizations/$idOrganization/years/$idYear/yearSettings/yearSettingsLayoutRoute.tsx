import { createRoute } from "@tanstack/react-router"
import { YearSettingsLayout } from "../../../../../../../../features/dashboard/$idYear/yearSettings/yearSettingsLayout.js"
import { yearLayoutRoute } from "../yearLayoutRoute.js"

export const yearSettingsLayoutRoute = createRoute({
    getParentRoute: () => yearLayoutRoute,
    path: "/paramètres",
    beforeLoad: () => ({
        title: "Paramètres",
    }),
    component: () => <YearSettingsLayout />,
})
