export function serializeCookie(parameters: {
    name: string
    value: string
    options?: {
        path?: string
        domain?: string
        maxAge?: number
        expires?: Date
        httpOnly?: boolean
        secure?: boolean
        sameSite?: "Strict" | "Lax" | "None"
    }
}) {
    let cookie = `${encodeURIComponent(parameters.name)}=${encodeURIComponent(parameters.value)}`

    if (parameters.options?.maxAge != null) {
        cookie += `; Max-Age=${Math.floor(parameters.options?.maxAge)}`
    }
    if (parameters.options?.expires) {
        cookie += `; Expires=${parameters.options?.expires.toUTCString()}`
    }
    if (parameters.options?.domain) {
        cookie += `; Domain=${parameters.options?.domain}`
    }
    if (parameters.options?.path) {
        cookie += `; Path=${parameters.options?.path}`
    }
    if (parameters.options?.httpOnly) {
        cookie += `; HttpOnly`
    }
    if (parameters.options?.secure) {
        cookie += `; Secure`
    }
    if (parameters.options?.sameSite) {
        cookie += `; SameSite=${parameters.options?.sameSite}`
    }

    return cookie
}
