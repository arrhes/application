import { createRouter, type LinkProps } from "@tanstack/react-router"
import { applicationTree } from "./applicationTree.js"

export const applicationRouter = createRouter({
    routeTree: applicationTree,
    scrollRestoration: (opts) => !opts.location.pathname.startsWith("/documentation"),
    context: {
        title: undefined,
        section: undefined,
        description: undefined,
        robots: undefined,
    },
})

export type ValidRoutes = LinkProps["to"]
export type ValidParams = LinkProps["params"]

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof applicationRouter
    }
}
