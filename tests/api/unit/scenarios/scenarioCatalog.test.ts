import { describe, expect, it } from "vitest"
import {
    describeScenarioParams,
    getScenarioDefinition,
    listScenarioDefinitions,
    scenarioCatalog,
} from "@comptasse/application-metadata"

function totalLines(draft: { lines: Array<{ debit: string; credit: string }> }): number {
    return draft.lines.reduce((sum, line) => sum + Number(line.debit) - Number(line.credit), 0)
}

describe("scenarioCatalog", () => {
    it("exposes the full documented catalogue", () => {
        const slugs = Object.keys(scenarioCatalog)
        expect(slugs.length).toBe(20)
        expect(getScenarioDefinition("note-de-frais")).toBeDefined()
        expect(getScenarioDefinition("inconnu")).toBeUndefined()
    })

    it("lists scenarios with slug/title/description", () => {
        const all = listScenarioDefinitions()
        for (const scenario of all) {
            expect(scenario.slug.length).toBeGreaterThan(0)
            expect(scenario.title.length).toBeGreaterThan(0)
            expect(scenario.description.length).toBeGreaterThan(0)
            expect(Object.keys(scenario.paramsSchema.entries).length).toBeGreaterThan(0)
        }
    })

    it("builds balanced entries for every documented example", () => {
        for (const scenario of listScenarioDefinitions()) {
            for (const example of scenario.docExamples) {
                const drafts = scenario.buildEntries(example.params)
                expect(drafts.length).toBeGreaterThan(0)
                for (const draft of drafts) {
                    expect(totalLines(draft), `${scenario.slug}: ${draft.label}`).toBeCloseTo(0, 2)
                    for (const line of draft.lines) {
                        expect(line.debit).toMatch(/^\d+\.\d{2}$/)
                        expect(line.credit).toMatch(/^\d+\.\d{2}$/)
                    }
                }
            }
        }
    })
})

describe("param descriptions", () => {
    it("describes required/optional/choices", () => {
        const reglement = getScenarioDefinition("reglement-fournisseur")
        expect(reglement).toBeDefined()
        const params = describeScenarioParams(reglement!.paramsSchema)
        const amount = params.find((p) => p.name === "amount")
        expect(amount?.required).toBe(true)
        const discount = params.find((p) => p.name === "discountRate")
        expect(discount?.required).toBe(false)
        expect(discount?.default).toBe(0)

        const achat = describeScenarioParams(getScenarioDefinition("achat-marchandises-fournisseur")!.paramsSchema)
        const mode = achat.find((p) => p.name === "paymentMode")
        expect(mode?.type).toBe("choice")
        expect(mode?.choices).toContain("credit")
        expect(mode?.choices).toContain("bank")
    })
})

describe("key scenario outputs", () => {
    it("note-de-frais books expense then reimbursement", () => {
        const note = scenarioCatalog["note-de-frais"]
        const expense = note.buildEntries({ amount: "150", expenseAccount: "625" })[0]
        expect(expense.lines[0]).toEqual({ number: "625", label: "Frais professionnels", debit: "150.00", credit: "0.00" })
        expect(expense.lines[1].number).toBe("421")

        const reimbursement = note.buildEntries({ amount: "150", reimburse: true })[0]
        // reimburse path does not use expenseAccount
        expect(reimbursement.lines[0].number).toBe("421")
        expect(reimbursement.lines[1].number).toBe("512")
    })

    it("constitution-capital produces souscription + libération", () => {
        const drafts = scenarioCatalog["constitution-capital"].buildEntries({
            capitalAmount: "10000",
            liberatedAmount: "4000",
        })
        expect(drafts).toHaveLength(2)
        expect(drafts[0].lines.map((l) => l.number)).toEqual(["4561", "101"])
        expect(drafts[1].lines.map((l) => l.number)).toEqual(["512", "4561"])
    })

    it("vente-prestation-services splits HT and VAT", () => {
        const [draft] = scenarioCatalog["vente-prestation-services"].buildEntries({ amountHT: "5000", vatRate: 20 })
        expect(draft.lines.find((l) => l.number === "706")?.credit).toBe("5000.00")
        expect(draft.lines.find((l) => l.number === "44571")?.credit).toBe("1000.00")
        expect(draft.lines.find((l) => l.number === "411")?.debit).toBe("6000.00")
    })

    it("reglement-fournisseur applies early-payment discount", () => {
        const [draft] = scenarioCatalog["reglement-fournisseur"].buildEntries({ amount: "1200", discountRate: 2 })
        expect(draft.lines.find((l) => l.number === "401")?.debit).toBe("1200.00")
        expect(draft.lines.find((l) => l.number === "765")?.credit).toBe("24.00")
        expect(draft.lines.find((l) => l.number === "512")?.credit).toBe("1176.00")
    })

    it("tva-declaration handles credit case without payNow entry", () => {
        const drafts = scenarioCatalog["tva-declaration-mensuelle"].buildEntries({
            collectedVat: "200",
            deductibleVat: "400",
        })
        expect(drafts).toHaveLength(1)
        const debit44551 = drafts[0].lines.find((l) => l.number === "44551" && Number(l.debit) > 0)
        expect(debit44551).toBeDefined()
        expect(Number(debit44551!.debit)).toBe(200)
    })
})
