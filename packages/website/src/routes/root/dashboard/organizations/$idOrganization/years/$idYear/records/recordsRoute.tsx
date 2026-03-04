import { createRoute } from "@tanstack/react-router"
import { RecordsPage } from "../../../../../../../../features/dashboard/$idYear/records/recordsPage.js"
import { recordsLayoutRoute } from "./recordsLayoutRoute.js"

export const recordsRoute = createRoute({
    getParentRoute: () => recordsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <RecordsPage />,
})
