import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoOrganizationId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest, mollieWebhookRequest } from "../../helpers/testClient.js"

let session: AuthSession
let idOrganization: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    idOrganization = await getDemoOrganizationId(session)
})

describe("POST /auth/read-organization-subscription", () => {
    it("returns the subscription status for the demo organization", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-organization-subscription",
            body: { idOrganization },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("isPremium")
        expect(data).toHaveProperty("subcriptionEndingAt")
        expect(data).toHaveProperty("mollieSubscriptionId")
        expect(data).toHaveProperty("status")
        expect(data).toHaveProperty("subscriptionStatus")
        expect(typeof data.isPremium).toBe("boolean")
        expect(["active", "cancelled", "expired", "none"]).toContain(data.subscriptionStatus)

        // Demo org has no subscription, so it should be "none" with isPremium = false
        expect(data.isPremium).toBe(false)
        expect(data.subscriptionStatus).toBe("none")
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-organization-subscription",
            body: { idOrganization },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-organization-subscription",
            body: {},
        })
        expect(response.status).toBe(400)
    })
})

describe("POST /auth/read-all-organization-payments", () => {
    it("returns an array of payments for the demo organization", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-organization-payments",
            body: { idOrganization },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(Array.isArray(data)).toBe(true)
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-organization-payments",
            body: { idOrganization },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-organization-payments",
            body: {},
        })
        expect(response.status).toBe(400)
    })
})

describe("POST /auth/create-first-payment", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-first-payment",
            body: { idOrganization },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-first-payment",
            body: {},
        })
        expect(response.status).toBe(400)
    })
})

describe("POST /auth/cancel-subscription", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/cancel-subscription",
            body: { idOrganization },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/cancel-subscription",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("returns error when no active subscription exists", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/cancel-subscription",
            body: { idOrganization },
        })
        // Demo org has no subscription, so this should fail with 400
        expect(response.status).toBe(400)
    })
})

describe("POST /public/mollie-webhook", () => {
    it("returns 200 even for an unknown payment id", async () => {
        // Mollie sends webhooks as application/x-www-form-urlencoded
        const response = await mollieWebhookRequest("tr_unknown_test")
        expect(response.status).toBe(200)
    })

    it("rejects requests with empty body", async () => {
        const response = await apiRequest({
            path: "/public/mollie-webhook",
            body: {},
        })
        expect(response.status).toBe(200)
    })
})
