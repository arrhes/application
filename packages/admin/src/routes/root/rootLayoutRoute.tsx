import { CircularLoader } from "@arrhes/ui"
import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router"
import { Fragment } from "react/jsx-runtime"
import { RootLayout } from "../../features/rootLayout.js"

const SITE_NAME = "Arrhes Admin"

export const rootLayoutRoute = createRootRouteWithContext<{
    title: string | undefined
    section: string | undefined
    isAdminAuthenticated: boolean | undefined
}>()({
    pendingComponent: () => <CircularLoader text="Chargement..." />,
    component: () => {
        const matches = useRouterState({ select: (s) => s.matches })

        const reversedMatches = [...matches].reverse()

        const matchWithTitle = reversedMatches.find((d) => d.context.title)
        const matchWithSection = reversedMatches.find((d) => d.context.section)

        const rawTitle = matchWithTitle?.context.title || SITE_NAME
        const section = matchWithSection?.context.section
        const title =
            rawTitle === SITE_NAME
                ? SITE_NAME
                : section
                  ? `${rawTitle} - ${section} - ${SITE_NAME}`
                  : `${rawTitle} - ${SITE_NAME}`

        return (
            <Fragment>
                <title>{title}</title>
                <meta name="robots" content="noindex, nofollow" />
                <RootLayout />
            </Fragment>
        )
    },
})
