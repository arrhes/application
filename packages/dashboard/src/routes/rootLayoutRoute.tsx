import type { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router"
import type * as v from "valibot"

export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    section: string | undefined
    isAuthenticated: boolean | undefined
    userSession: Promise<v.InferOutput<typeof readUserSessionRouteDefinition.schemas.return> | undefined> | undefined
}>()({
    pendingComponent: () => <CircularLoader text="Chargement de l'application..." />,
    component: () => <Outlet />,
})
