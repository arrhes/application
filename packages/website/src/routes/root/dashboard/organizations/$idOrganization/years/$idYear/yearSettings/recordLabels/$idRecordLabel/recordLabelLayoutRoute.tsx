import { createRoute, Outlet } from "@tanstack/react-router"
import { recordLabelsLayoutRoute } from "../recordLabelsLayoutRoute.js"

export const recordLabelLayoutRoute = createRoute({
    getParentRoute: () => recordLabelsLayoutRoute,
    path: "/$idRecordLabel",
    beforeLoad: () => ({
        title: "Catégorie",
    }),
    component: () => <Outlet />,
})
