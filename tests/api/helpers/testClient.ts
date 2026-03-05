const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3000"

export type TestResponse<T = unknown> = {
    status: number
    data: T
    headers: Headers
    cookies: string[]
}

/**
 * HTTP client for API integration tests.
 * All endpoints are POST-only.
 */
export async function apiRequest<T = unknown>(parameters: {
    path: string
    body?: Record<string, unknown>
    cookies?: string
}): Promise<TestResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${parameters.path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(parameters.cookies ? { Cookie: parameters.cookies } : {}),
        },
        body: JSON.stringify(parameters.body ?? {}),
    })

    const setCookieHeaders = response.headers.getSetCookie?.() ?? []

    const data = (await response.json().catch(() => null)) as T

    return {
        status: response.status,
        data,
        headers: response.headers,
        cookies: setCookieHeaders,
    }
}

/**
 * Sends a Mollie-style webhook request (application/x-www-form-urlencoded).
 * Mollie POSTs the payment id as a form field, not JSON.
 */
export async function mollieWebhookRequest<T = unknown>(paymentId: string): Promise<TestResponse<T>> {
    const response = await fetch(`${API_BASE_URL}/public/mollie-webhook`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `id=${encodeURIComponent(paymentId)}`,
    })

    const setCookieHeaders = response.headers.getSetCookie?.() ?? []

    const data = (await response.json().catch(() => null)) as T

    return {
        status: response.status,
        data,
        headers: response.headers,
        cookies: setCookieHeaders,
    }
}

/**
 * Parses Set-Cookie headers into a cookie string for subsequent requests.
 */
export function buildCookieString(setCookieHeaders: string[]): string {
    return setCookieHeaders.map((header) => header.split(";")[0]).join("; ")
}

/**
 * Merges existing cookies with new Set-Cookie headers.
 */
export function mergeCookies(existing: string, newSetCookieHeaders: string[]): string {
    const existingMap = new Map<string, string>()
    if (existing) {
        for (const part of existing.split("; ")) {
            const [key, ...val] = part.split("=")
            existingMap.set(key, val.join("="))
        }
    }
    for (const header of newSetCookieHeaders) {
        const cookiePart = header.split(";")[0]
        const [key, ...val] = cookiePart.split("=")
        existingMap.set(key, val.join("="))
    }
    return Array.from(existingMap.entries())
        .map(([k, v]) => `${k}=${v}`)
        .join("; ")
}
