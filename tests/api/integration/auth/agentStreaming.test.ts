import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoYearId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"

let session: AuthSession
let idOrganization: string
let idYear: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    const demo = await getDemoYearId(session)
    idOrganization = demo.idOrganization
    idYear = demo.idYear
})

describe("Agent stream fallback", () => {
    it("returns 410 and marks message as error when stream is unavailable", async () => {
        const sessionResponse = await authenticatedRequest<{ id: string }>({
            session,
            path: "/auth/create-one-agent-session",
            body: {
                idOrganization,
                idYear,
                message: `stream-timeout-session-${Date.now()}`,
            },
        })
        expect(sessionResponse.status).toBe(200)
        const idAgentSession = sessionResponse.data.id

        const messageResponse = await authenticatedRequest<{ id: string }>({
            session,
            path: "/auth/create-one-agent-message",
            body: {
                idOrganization,
                idAgentSession,
                message: `stream-timeout-message-${Date.now()}`,
            },
        })
        expect(messageResponse.status).toBe(200)
        const idAgentMessage = messageResponse.data.id

        const streamResponse = await authenticatedRequest({
            session,
            path: "/auth/get-stream-for-agent-message",
            body: {
                idOrganization,
                idAgentMessage,
            },
        })
        expect(streamResponse.status).toBe(410)

        const messagesResponse = await authenticatedRequest<
            Array<{ id: string; state: string; output: string | null }>
        >({
            session,
            path: "/auth/read-all-agent-messages",
            body: { idAgentSession },
        })
        expect(messagesResponse.status).toBe(200)

        const updatedMessage = messagesResponse.data.find((message) => message.id === idAgentMessage)
        expect(updatedMessage).toBeDefined()
        expect(updatedMessage?.state).toBe("error")
        expect(updatedMessage?.output).toContain("expire")
    }, 30_000)
})
