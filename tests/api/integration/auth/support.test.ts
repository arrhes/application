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

describe("POST /auth/create-one-ticket", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-one-ticket",
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
            path: "/auth/create-one-ticket",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("creates a support ticket", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-ticket",
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

describe("POST /auth/read-all-tickets", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-tickets",
            body: {},
        })
        expect(response.status).toBe(401)
    })

    it("returns an array of tickets for the current user", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-tickets",
            body: {},
        })
        expect(response.status).toBe(200)

        const data = response.data as any[]
        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBeGreaterThan(0)
        expect(data[0]).toHaveProperty("id")
        expect(data[0]).toHaveProperty("status")
    })
})

describe("POST /auth/read-one-ticket", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-one-ticket",
            body: {
                idTicket: "fake-id",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-one-ticket",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("returns the ticket by id", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-one-ticket",
            body: {
                idTicket,
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idTicket)
        expect(data.status).toBe("open")
    })
})

describe("POST /auth/create-one-ticket-message", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/create-one-ticket-message",
            body: {
                idTicket: "fake-id",
                message: "test",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-ticket-message",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("adds a message to the ticket", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/create-one-ticket-message",
            body: {
                idTicket,
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

describe("POST /auth/read-all-ticket-messages", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/read-all-ticket-messages",
            body: {
                idTicket,
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-ticket-messages",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("returns messages for the ticket", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/read-all-ticket-messages",
            body: {
                idTicket,
            },
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

describe("POST /auth/update-one-ticket", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-one-ticket",
            body: {
                idTicket,
                category: "technical",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-one-ticket",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("updates the ticket category", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-one-ticket",
            body: {
                idTicket,
                category: "feature",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idTicket)
        expect(data.category).toBe("feature")
    })
})

describe("POST /auth/update-one-ticket-status", () => {
    it("rejects unauthenticated requests", async () => {
        const response = await apiRequest({
            path: "/auth/update-one-ticket-status",
            body: {
                idTicket,
                status: "closed",
            },
        })
        expect(response.status).toBe(401)
    })

    it("rejects requests with empty body", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-one-ticket-status",
            body: {},
        })
        expect(response.status).toBe(400)
    })

    it("updates the ticket status to closed", async () => {
        const response = await authenticatedRequest({
            session,
            path: "/auth/update-one-ticket-status",
            body: {
                idTicket,
                status: "closed",
            },
        })
        expect(response.status).toBe(200)

        const data = response.data as any
        expect(data.id).toBe(idTicket)
        expect(data.status).toBe("closed")
    })
})
