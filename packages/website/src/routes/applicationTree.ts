import type { AnyRoute } from "@tanstack/react-router"
import { catchRoute } from "./catchRoute.js"
import { fullDashboardTree } from "./root/dashboard/fullDashboardTree.js"
import { docsTree } from "./root/docs/docsTree.js"
import { homeLayoutRoute } from "./root/home/homeLayoutRoute.js"
import { homeRootRoute } from "./root/home/homeRootRoute.js"
import { resetPasswordRoute } from "./root/signIn/resetPasswordRoute.js"
import { signInRoute } from "./root/signIn/signInRoute.js"
import { signUpRoute } from "./root/signUp/signUpRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"

export const applicationTree: AnyRoute = rootLayoutRoute.addChildren([
    homeLayoutRoute.addChildren([
        homeRootRoute,
    ]),

    docsTree,
    signUpRoute,
    signInRoute,
    resetPasswordRoute,
    fullDashboardTree,

    catchRoute,
])
