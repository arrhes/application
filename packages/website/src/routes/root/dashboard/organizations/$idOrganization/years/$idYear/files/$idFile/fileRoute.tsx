import { createRoute } from "@tanstack/react-router"
import { FilePage } from "../../../../../../../../../features/dashboard/$idYear/files/$idFile/filePage.js"
import { fileLayoutRoute } from "./fileLayoutRoute.js"

export const fileRoute = createRoute({
    getParentRoute: () => fileLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <FilePage />,
})
