import { beforeAll, describe, expect, it } from "vitest"
import { type AuthSession, authenticatedRequest, getDemoYearId, signInAsDemo } from "../../helpers/auth.js"
import { verifyApiIsRunning } from "../../helpers/setup.js"

let session: AuthSession
let idOrganization: string
let idYear: string
let idJournalOd: string

beforeAll(async () => {
    await verifyApiIsRunning()
    session = await signInAsDemo()
    const demo = await getDemoYearId(session)
    idOrganization = demo.idOrganization
    idYear = demo.idYear

    const journalsResponse = await authenticatedRequest({
        session,
        method: "GET",
        path: `/organizations/${idOrganization}/years/${idYear}/journals`,
    })
    const journals = journalsResponse.data as Array<{ id: string; code: string }>
    const od = journals.find((journal) => journal.code === "OD")
    if (!od) throw new Error("No OD journal in demo year")
    idJournalOd = od.id
})

describe("Scenarios", () => {
    describe("GET /organizations/:idOrganization/years/:idYear/scenarios", () => {
        it("lists all scenarios", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/organizations/${idOrganization}/years/${idYear}/scenarios`,
            })
            expect(response.status).toBe(200)
            const scenarios = response.data as Array<{ scenario: string; title: string }>
            expect(scenarios.length).toBeGreaterThanOrEqual(20)
            expect(scenarios.some((scenario) => scenario.scenario === "note-de-frais")).toBe(true)
        })
    })

    describe("GET /organizations/:idOrganization/years/:idYear/scenarios/:scenario", () => {
        it("returns params and sample entries", async () => {
            const response = await authenticatedRequest({
                session,
                method: "GET",
                path: `/organizations/${idOrganization}/years/${idYear}/scenarios/note-de-frais`,
            })
            expect(response.status).toBe(200)
            const detail = response.data as {
                scenario: string
                params: Array<{ name: string; required: boolean }>
                sample: { entries: Array<{ lines: Array<{ number: string }> }> }
            }
            expect(detail.scenario).toBe("note-de-frais")
            expect(detail.params.some((param) => param.name === "amount")).toBe(true)
            expect(detail.sample.entries.length).toBeGreaterThan(0)

            const unknown = await authenticatedRequest({
                session,
                method: "GET",
                path: `/organizations/${idOrganization}/years/${idYear}/scenarios/inconnu`,
            })
            expect(unknown.status).toBe(404)
        })
    })

    describe("POST /organizations/:idOrganization/years/:idYear/scenarios/:scenario", () => {
        it("creates a balanced entry from params", async () => {
            const created = await authenticatedRequest({
                session,
                method: "POST",
                path: `/organizations/${idOrganization}/years/${idYear}/scenarios/note-de-frais`,
                body: {
                    idYear,
                    idJournal: idJournalOd,
                    params: { amount: "12.34", expenseAccount: "625" },
                },
            })
            expect(created.status).toBe(200)
            const result = created.data as { entries: Array<{ entry: { id: string }; lines: Array<Record<string, unknown>> }> }
            expect(result.entries).toHaveLength(1)
            const [first] = result.entries
            expect(first.lines).toHaveLength(2)

            // Cleanup keeps the demo dataset pristine.
            await authenticatedRequest({
                session,
                method: "DELETE",
                path: `/organizations/${idOrganization}/years/${idYear}/entries/${first.entry.id}`,
            })
        })

        it("rejects invalid params", async () => {
            const rejected = await authenticatedRequest({
                session,
                method: "POST",
                path: `/organizations/${idOrganization}/years/${idYear}/scenarios/note-de-frais`,
                body: { idYear, idJournal: idJournalOd, params: {} },
            })
            expect(rejected.status).toBe(400)
        })
    })
})
