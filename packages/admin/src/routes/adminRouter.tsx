import { createRouter, type LinkProps } from "@tanstack/react-router"
import { getIsAdminAuthenticated } from "../utilities/cookies/getIsAdminAuthenticated.js"
import { adminTree } from "./adminTree.js"

export const adminRouter = createRouter({
    routeTree: adminTree,
    scrollRestoration: true,
    context: {
        isAdminAuthenticated: getIsAdminAuthenticated(),
    },
})

export type ValidRoutes = LinkProps["to"]
export type ValidParams = LinkProps["params"]

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof adminRouter
    }
}
