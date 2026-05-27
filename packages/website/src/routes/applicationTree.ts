import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { cliRoute } from "./root/cliRoute.js"
import { docsTree } from "./root/docs/docsTree.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const applicationTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([
        homeRootRoute,
    ]),

    docsTree,
    cliRoute,

    catchRoute,
])
