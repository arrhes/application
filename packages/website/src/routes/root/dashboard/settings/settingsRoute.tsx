import { createRoute } from "@tanstack/react-router"
import { SettingsPage } from "../../../../features/dashboard/settings/settingsPage.js"
import { settingsLayoutRoute } from "./settingsLayoutRoute.js"

export const settingsRoute = createRoute({
    getParentRoute: () => settingsLayoutRoute,
    path: "/",
    beforeLoad: () => {},
    component: () => <SettingsPage />,
})
