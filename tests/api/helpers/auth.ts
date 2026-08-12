import { apiRequest, buildCookieString } from "./testClient.js"

const DEMO_EMAIL = "demo@comptasse.com"
const DEMO_PASSWORD = "demo"

export type AuthSession = {
    cookies: string
}

/**
 * Signs in as the demo user and returns the session cookies.
 * Uses the seeded demo account (demo@comptasse.com / demo).
 */
export async function signInAsDemo(): Promise<AuthSession> {
    const response = await apiRequest({
        method: "POST",
        path: "/v1/auth/sign-in",
        body: {
            email: DEMO_EMAIL,
            password: DEMO_PASSWORD,
        },
    })

    if (response.status !== 200) {
        throw new Error(`Failed to sign in as demo user (status ${response.status}): ${JSON.stringify(response.data)}`)
    }

    const cookies = buildCookieString(response.cookies)
    if (!cookies) {
        throw new Error("Sign-in succeeded but no session cookies were returned")
    }

    return {
        cookies,
    }
}

/**
 * Makes an authenticated API request using the provided session.
 */
export async function authenticatedRequest<T = unknown>(parameters: {
    session: AuthSession
    path: string
    method?: "GET" | "POST" | "PATCH" | "DELETE" | "PUT"
    body?: Record<string, unknown>
}) {
    return apiRequest<T>({
        method: parameters.method,
        path: parameters.path,
        body: parameters.body,
        cookies: parameters.session.cookies,
    })
}

const DEMO_ORG_NAME = "Demo company"

/**
 * Returns the idOrganization for the "Demo company" seeded organization.
 * This org contains accounts, journals, years, entries, etc.
 */
export async function getDemoOrganizationId(session: AuthSession): Promise<string> {
    const response = await authenticatedRequest({
        session,
        method: "GET",
        path: "/v1/organizations",
    })
    const orgs = response.data as any[]
    const demoOrg = orgs.find((o: any) => o.organization.name === DEMO_ORG_NAME)
    if (!demoOrg) {
        throw new Error(
            `Could not find organization "${DEMO_ORG_NAME}". Available: ${orgs.map((o: any) => o.organization.name).join(", ")}`,
        )
    }
    return demoOrg.organization.id
}

/**
 * Returns the first idYear for the "Demo company" organization.
 */
export async function getDemoYearId(session: AuthSession): Promise<{
    idOrganization: string
    idYear: string
}> {
    const idOrganization = await getDemoOrganizationId(session)
    const response = await authenticatedRequest({
        session,
        method: "GET",
        path: `/v1/organizations/${idOrganization}/years`,
    })
    const years = response.data as any[]
    if (years.length === 0) {
        throw new Error(`No years found for organization "${DEMO_ORG_NAME}" (${idOrganization})`)
    }
    return {
        idOrganization,
        idYear: years[0].id,
    }
}
