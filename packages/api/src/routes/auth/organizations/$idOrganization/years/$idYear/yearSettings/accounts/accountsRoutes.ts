import { $idAccountRoutes } from "./$idAccount/$idAccountRoutes.js"
import { createOneAccountRoute } from "./createOneAccount.js"
import { readAllAccountsRoute } from "./readAllAccounts.js"

export const accountsRoutes = [
    createOneAccountRoute,
    readAllAccountsRoute,

    ...$idAccountRoutes,
]
