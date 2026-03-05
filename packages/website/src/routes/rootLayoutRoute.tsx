import type { readUserSessionRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { RootLayout } from "../features/rootLayout.js"

export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    isAuthenticated: boolean | undefined
    userSession: Promise<v.InferOutput<typeof readUserSessionRouteDefinition.schemas.return> | undefined> | undefined
}>()({
    pendingComponent: () => <CircularLoader text="Chargement de l'application..." />,
    beforeLoad: (_ctx) => {},
    component: () => {
        const matches = useRouterState({ select: (s) => s.matches })

        const matchWithTitle = [...matches].reverse().find((d) => d.context.title)

        const title = matchWithTitle?.context.title || "Arrhes"

        return (
            <Fragment>
                <title>{title}</title>
                <RootLayout />
            </Fragment>
        )
    },
})
