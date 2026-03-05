import { createRoute } from "@tanstack/react-router"
import { RecordLabelPage } from "../../../../../../../../../../features/dashboard/$idYear/yearSettings/recordLabels/$idRecordLabel/recordLabelPage.js"
import { recordLabelLayoutRoute } from "./recordLabelLayoutRoute.js"

export const recordLabelRoute = createRoute({
    getParentRoute: () => recordLabelLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <RecordLabelPage />,
})
