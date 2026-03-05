import { createRoute } from "@tanstack/react-router"
import { RecordLabelsPage } from "../../../../../../../../../features/dashboard/$idYear/yearSettings/recordLabels/recordLabelsPage.js"
import { recordLabelsLayoutRoute } from "./recordLabelsLayoutRoute.js"

export const recordLabelsRoute = createRoute({
    getParentRoute: () => recordLabelsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <RecordLabelsPage />,
})
