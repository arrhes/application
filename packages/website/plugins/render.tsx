import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import { renderToString } from "react-dom/server"
import { applicationTree } from "../src/routes/applicationTree.js"

export async function render(url: string): Promise<string> {
    const router = createRouter({
        routeTree: applicationTree,
        history: createMemoryHistory({
            initialEntries: [
                url,
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
    await router.load()
    return renderToString(<RouterProvider router={router} />)
}
