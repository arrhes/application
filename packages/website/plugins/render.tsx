import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import { renderToString } from "react-dom/server"
import { applicationTree } from "../src/routes/applicationTree.js"

const SITE_NAME = "Comptasse"
const DEFAULT_DESCRIPTION =
    "Logiciel de comptabilité open source pour les entreprises et associations françaises. Gérez vos écritures, comptes et documents comptables simplement."

function createAppRouter(url: string) {
    return createRouter({
        routeTree: applicationTree,
        history: createMemoryHistory({
            initialEntries: [
                encodeURI(url),
            ],
        }),
        scrollRestoration: false,
        context: {
            title: undefined,
            section: undefined,
            description: undefined,
            robots: undefined,
            isAuthenticated: false,
            userSession: undefined,
        },
    })
}

export interface RenderedPage {
    html: string
    title: string
    description: string
}

export async function render(url: string): Promise<RenderedPage> {
    const router = createAppRouter(url)
    await router.load()
    const reversedMatches = [
        ...router.state.matches,
    ].reverse()
    const rawTitle = reversedMatches.find((m) => m.context.title)?.context.title
    const section = reversedMatches.find((m) => m.context.section)?.context.section
    const description = reversedMatches.find((m) => m.context.description)?.context.description ?? DEFAULT_DESCRIPTION
    const title =
        !rawTitle || rawTitle === SITE_NAME
            ? SITE_NAME
            : section
              ? `${rawTitle} - ${section} - ${SITE_NAME}`
              : `${rawTitle} - ${SITE_NAME}`
    const html = renderToString(<RouterProvider router={router} />)
    return {
        html,
        title,
        description,
    }
}
