import { getOptions } from "src/utilities/getOptions.js"
import { describe, expect, it } from "vitest"

describe("getOptions", () => {
    it("converts an object to an array of key-label pairs", () => {
        const result = getOptions({ a: "Alpha", b: "Beta" })
        expect(result).toEqual([
            { key: "a", label: "Alpha" },
            { key: "b", label: "Beta" },
        ])
    })

    it("returns an empty array for an empty object", () => {
        const result = getOptions({})
        expect(result).toEqual([])
    })

    it("handles a single entry", () => {
        const result = getOptions({ only: "One" })
        expect(result).toEqual([{ key: "only", label: "One" }])
    })

    it("preserves the key and label values exactly", () => {
        const result = getOptions({ "special-key": "Value With Spaces" })
        expect(result).toEqual([{ key: "special-key", label: "Value With Spaces" }])
    })

    it("handles multiple entries", () => {
        const input = { debit: "Débit", credit: "Crédit", balance: "Solde" }
        const result = getOptions(input)
        expect(result).toHaveLength(3)
        expect(result[0].key).toBe("debit")
        expect(result[1].key).toBe("credit")
        expect(result[2].key).toBe("balance")
    })
})
