import { cookiePrefix } from "../variables.js"
import { getCookie } from "./getCookie.js"

export function getIsAdminAuthenticated() {
    const isAuthenticatedRaw = getCookie(`${cookiePrefix}_is_admin_auth`)

    if (isAuthenticatedRaw === "true") return true
    if (isAuthenticatedRaw === "false") return false

    return undefined
}
