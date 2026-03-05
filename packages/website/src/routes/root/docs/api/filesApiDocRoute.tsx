import { createRoute } from "@tanstack/react-router"
import { FilesApiDocPage } from "../../../../features/docs/api/filesApiDocPage.tsx"
import { apiDocLayoutRoute } from "./apiDocLayoutRoute.tsx"

export const filesApiDocRoute = createRoute({
    getParentRoute: () => apiDocLayoutRoute,
    path: "/stockage",
    beforeLoad: () => ({
        title: "Fichiers et documents",
    }),
    component: () => <FilesApiDocPage />,
})
