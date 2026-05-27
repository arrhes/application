import type { AnyRoute } from "@tanstack/react-router"
import { dashboardCatchRoute } from "./dashboardCatchRoute.js"
import { dashboardLayoutRoute } from "./dashboardLayoutRoute.js"
import { dashboardRootRoute } from "./dashboardRootRoute.js"
import { dashboardTabHistoryRoute } from "./dashboardTabHistoryRoute.js"
import { dashboardTabRoute } from "./dashboardTabRoute.js"
import { resetPasswordRoute } from "./resetPasswordRoute.js"
import { rootLayoutRoute } from "./rootLayoutRoute.js"
import { signInRoute } from "./signInRoute.js"
import { signUpRoute } from "./signUpRoute.js"

export const applicationTree: AnyRoute = rootLayoutRoute.addChildren([
    dashboardLayoutRoute.addChildren([
        dashboardRootRoute,
        dashboardTabRoute,
        dashboardTabHistoryRoute,
        dashboardCatchRoute,
    ]),
    signInRoute,
    signUpRoute,
    resetPasswordRoute,
])
