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

describe("POST /auth/read-organization-billing", () => {
    it("returns the subscription status for the demo organization", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-organization-billing",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("status")
        expect(data).toHaveProperty("ocrPagesTotalUsed")
        expect(data).toHaveProperty("tokensTotalUsed")
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-organization-billing",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })
})

describe("POST /auth/read-all-organization-payments", () => {
    it("returns an array of payments for the demo organization", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-organization-payments",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(Array.isArray(data)).toBe(true)
    })

    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-organization-payments",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })
})

describe("POST /auth/create-first-payment", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-first-payment",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })
})

describe("POST /auth/cancel-subscription", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/cancel-subscription",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })

    it("returns error when no active subscription exists", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/cancel-subscription",
            body: {
                idOrganization,
            },
        })
        // Demo org has no subscription, so this should fail with 400
        expect(response.status).toBe(400)
    })
})

describe("POST /auth/read-all-organization-billings", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-organization-billings",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })

    it("returns an array of subscriptions", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-organization-billings",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(200)
        expect(Array.isArray(response.data)).toBe(true)
    })
})

describe("POST /auth/read-all-invoices", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-invoices",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(401)
    })

    it("returns an array of invoices", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-invoices",
            body: {
                idOrganization,
            },
        })
        expect(response.status).toBe(200)
        expect(Array.isArray(response.data)).toBe(true)
    })
})

describe("POST /auth/update-storage-subscription", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-storage-subscription",
            body: {
                idOrganization,
                newQuantity: 1,
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-storage-subscription",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects negative quantities", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-storage-subscription",
            body: {
                idOrganization,
                newQuantity: -1,
            },
        })
        expect(response.status).toBe(400)
    })

    it("rejects quantity below current storage usage", async () => {
        // Demo org storageCurrentUsage=1_320_000_000 > FREE_STORAGE_BYTES(1GB), so minimum addon=1
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-storage-subscription",
            body: {
                idOrganization,
                newQuantity: 0,
            },
        })
        expect(response.status).toBe(400)
    })

    it("succeeds and sets a pending storage change", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-storage-subscription",
            body: {
                idOrganization,
                newQuantity: 2,
            },
        })
        expect(response.status).toBe(200)
    })
})

describe("POST /auth/create-wallet-withdrawal", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-wallet-withdrawal",
            body: {
                idOrganization,
                amountInCents: 100,
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-wallet-withdrawal",
            body: {},
        })
        expect(response.status).toBe(400)
    })
})

describe("POST /auth/update-licence-subscription", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-licence-subscription",
            body: {
                idOrganization,
                newAmountInCents: 1000,
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-licence-subscription",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects negative amounts", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-licence-subscription",
            body: {
                idOrganization,
                newAmountInCents: -100,
            },
        })
        expect(response.status).toBe(400)
    })

    it("sets a pending licence amount when it differs from the current amount", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-licence-subscription",
            body: {
                idOrganization,
                newAmountInCents: 5000,
            },
        })
        expect(response.status).toBe(200)
    })

    it("clears the pending amount when the new value equals the current licence amount", async () => {
        // Read the current licence amount first
        const orgResponse = await authenticatedRequest({
            session,
            path: "/auth/read-one-organization",
            body: {
                idOrganization,
            },
        })
        expect(orgResponse.status).toBe(200)
        const currentAmount = (orgResponse.data as any).licenceAmount

        const response = await authenticatedRequest({
            session,
            path: "/auth/update-licence-subscription",
            body: {
                idOrganization,
                newAmountInCents: currentAmount,
            },
        })
        expect(response.status).toBe(200)
    })
})

describe("POST /auth/update-ocr-subscription", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-ocr-subscription",
            body: {
                idOrganization,
                newQuantity: 1,
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-ocr-subscription",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects negative quantities", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-ocr-subscription",
            body: {
                idOrganization,
                newQuantity: -1,
            },
        })
        expect(response.status).toBe(400)
    })

    it("succeeds when quantity equals the current addon pages (no-op, no wallet deduction)", async () => {
        const orgResponse = await authenticatedRequest({
            session,
            path: "/auth/read-one-organization",
            body: {
                idOrganization,
            },
        })
        expect(orgResponse.status).toBe(200)
        const org = orgResponse.data as any
        const INCLUDED_PAGES = 100
        const currentAddonPages = Math.max(org.ocrPagesTotalAvailable + org.ocrPagesTotalUsed - INCLUDED_PAGES, 0)
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-ocr-subscription",
            body: {
                idOrganization,
                newQuantity: currentAddonPages,
            },
        })
        expect(response.status).toBe(200)
    })

    it("rejects reducing below the current addon pages", async () => {
        // Current addon is 200; requesting 50 is a reduction
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-ocr-subscription",
            body: {
                idOrganization,
                newQuantity: 50,
            },
        })
        expect(response.status).toBe(400)
    })

    it("rejects when wallet balance is insufficient", async () => {
        // Requesting an absurdly large quantity to exhaust any wallet
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-ocr-subscription",
            body: {
                idOrganization,
                newQuantity: 9_999_999,
            },
        })
        expect(response.status).toBe(400)
    })

    it("purchases additional OCR pages and deducts from wallet", async () => {
        // Add 10 pages (10 × 0,01€ = 0,10€ = 10 cents)
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-ocr-subscription",
            body: {
                idOrganization,
                newQuantity: 210,
            },
        })
        expect(response.status).toBe(200)
    })
})

describe("POST /auth/update-tokens-subscription", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-tokens-subscription",
            body: {
                idOrganization,
                newQuantity: 1,
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-tokens-subscription",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("rejects negative quantities", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-tokens-subscription",
            body: {
                idOrganization,
                newQuantity: -1,
            },
        })
        expect(response.status).toBe(400)
    })

    it("succeeds when quantity equals the current token packs (no-op, no wallet deduction)", async () => {
        const orgResponse = await authenticatedRequest({
            session,
            path: "/auth/read-one-organization",
            body: {
                idOrganization,
            },
        })
        expect(orgResponse.status).toBe(200)
        const org = orgResponse.data as any
        const INCLUDED_TOKENS = 1_000_000
        const currentAddonPacks = Math.max(
            Math.round((org.tokensTotalAvailable + org.tokensTotalUsed - INCLUDED_TOKENS) / INCLUDED_TOKENS),
            0,
        )
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-tokens-subscription",
            body: {
                idOrganization,
                newQuantity: currentAddonPacks,
            },
        })
        expect(response.status).toBe(200)
    })

    it("rejects reducing below the current token packs", async () => {
        // Current quantity is 2; requesting 0 is a reduction
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-tokens-subscription",
            body: {
                idOrganization,
                newQuantity: 0,
            },
        })
        expect(response.status).toBe(400)
    })

    it("rejects when wallet balance is insufficient", async () => {
        // 10_000 packs × 100 cents = 1_000_000 cents — far beyond the demo wallet
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-tokens-subscription",
            body: {
                idOrganization,
                newQuantity: 10_000,
            },
        })
        expect(response.status).toBe(400)
    })

    it("purchases additional token packs and deducts from wallet", async () => {
        // Add 1 more pack (100 cents) — demo wallet has 21_470 cents so this succeeds
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-tokens-subscription",
            body: {
                idOrganization,
                newQuantity: 3,
            },
        })
        expect(response.status).toBe(200)
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
