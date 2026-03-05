import { createRoute } from "@tanstack/react-router"
import { AccountsPage } from "../../../../../../../../../features/dashboard/$idYear/yearSettings/accounts/accountsPage.js"
import { accountsLayoutRoute } from "./accountsLayoutRoute.js"

export const accountsRoute = createRoute({
    getParentRoute: () => accountsLayoutRoute,
    path: "/",
    beforeLoad: () => ({
        title: undefined,
    }),
    component: () => <AccountsPage />,
})
