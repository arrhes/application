import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"
import { apiRequest } from "../../helpers/testClient.js"

let session: AuthSession
let idTicket: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
})

describe("POST /v1/support/tickets", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/support/tickets",
            body: {
                category: "billing",
                message: "Help",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: "/v1/support/tickets",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("creates a support ticket", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: "/v1/support/tickets",
            body: {
                category: "bug",
                message: "Integration test ticket",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.category).toBe("bug")
        expect(data.status).toBe("open")

        idTicket = data.id
    })
})

describe("GET /v1/support/tickets", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: "/v1/support/tickets",
        })
        expect(response.status).toBe(401)
    })

    it("returns an array of tickets for the current user", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: "/v1/support/tickets",
        })
        expect(response.status).toBe(200)

        const data = response.data as any[]
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBeGreaterThan(0)
        expect(data[0]).toHaveProperty("id")
        expect(data[0]).toHaveProperty("status")
    })
})

describe("GET /v1/support/tickets/:idTicket", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: "/v1/support/tickets/fake-id",
        })
        expect(response.status).toBe(401)
    })

    it("returns the ticket by id", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/v1/support/tickets/${idTicket}`,
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idTicket)
        expect(data.status).toBe("open")
    })
})

describe("POST /v1/support/tickets/:idTicket/messages", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "POST",
            path: "/v1/support/tickets/fake-id/messages",
            body: {
                message: "test",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/v1/support/tickets/${idTicket}/messages`,
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("adds a message to the ticket", async () => {
        const response = await authenticatedRequest({
            session,
            method: "POST",
            path: `/v1/support/tickets/${idTicket}/messages`,
            body: {
                message: "Follow-up message",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data).toHaveProperty("id")
        expect(data.idTicket).toBe(idTicket)
        expect(data.message).toBe("Follow-up message")
    })
})

describe("GET /v1/support/tickets/:idTicket/messages", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "GET",
            path: "/v1/support/tickets/fake-id/messages",
        })
        expect(response.status).toBe(401)
    })

    it("returns messages for the ticket", async () => {
        const response = await authenticatedRequest({
            session,
            method: "GET",
            path: `/v1/support/tickets/${idTicket}/messages`,
        })
        expect(response.status).toBe(200)

        const data = response.data as any[]
        expect(Array.isArray(data)).toBe(true)
        // Should have at least the initial message and the follow-up
        expect(data.length).toBeGreaterThanOrEqual(2)
        expect(data[0]).toHaveProperty("id")
        expect(data[0]).toHaveProperty("message")
    })
})

describe("PATCH /v1/support/tickets/:idTicket", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "PATCH",
            path: "/v1/support/tickets/fake-id",
            body: {
                category: "technical",
            },
        })
        expect(response.status).toBe(401)
    })

    it("accepts an empty body (idTicket in URL, category and status are optional)", async () => {
        const response = await authenticatedRequest({
            session,
            method: "PATCH",
            path: `/v1/support/tickets/${idTicket}`,
            body: {},
        })
        expect(response.status).toBe(200)
    })

    it("updates the ticket category", async () => {
        const response = await authenticatedRequest({
            session,
            method: "PATCH",
            path: `/v1/support/tickets/${idTicket}`,
            body: {
                category: "feature",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idTicket)
        expect(data.category).toBe("feature")
    })
})

describe("PATCH /v1/support/tickets/:idTicket/status", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            method: "PATCH",
            path: "/v1/support/tickets/fake-id/status",
            body: {
                status: "closed",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            method: "PATCH",
            path: `/v1/support/tickets/${idTicket}/status`,
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("updates the ticket status to closed", async () => {
        const response = await authenticatedRequest({
            session,
            method: "PATCH",
            path: `/v1/support/tickets/${idTicket}/status`,
            body: {
                status: "closed",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idTicket)
        expect(data.status).toBe("closed")
    })
})
