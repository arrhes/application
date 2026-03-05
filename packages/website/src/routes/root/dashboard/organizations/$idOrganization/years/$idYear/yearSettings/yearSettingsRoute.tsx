import { createRoute } from "@tanstack/react-router"
import { YearSettingsPage } from "../../../../../../../../features/dashboard/$idYear/yearSettings/yearSettingsPage.js"
import { yearSettingsLayoutRoute } from "./yearSettingsLayoutRoute.js"

export const yearSettingsRoute = createRoute({
    getParentRoute: () => yearSettingsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <YearSettingsPage />,
})
