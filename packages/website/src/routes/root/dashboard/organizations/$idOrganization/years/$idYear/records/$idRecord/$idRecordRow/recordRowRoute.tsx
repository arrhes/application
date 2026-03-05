import { createRoute } from "@tanstack/react-router"
import { RecordRowPage } from "../../../../../../../../../../features/dashboard/$idYear/records/$idRecord/$idRecordRow/recordRowPage.js"
import { recordRowLayoutRoute } from "./recordRowLayoutRoute.js"

export const recordRowRoute = createRoute({
    getParentRoute: () => recordRowLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <RecordRowPage />,
})
