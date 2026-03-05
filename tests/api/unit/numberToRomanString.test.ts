import { describe, expect, it } from "vitest"
import { numberToRomanString } from "#/utilities/numberToRomanString.js"

describe("numberToRomanString", () => {
    it("converts 0 to empty string", () => {
        expect(numberToRomanString(0)).toBe("")
    })

    it("converts 1 to I", () => {
        expect(numberToRomanString(1)).toBe("I")
    })

    it("converts 4 to IV", () => {
        expect(numberToRomanString(4)).toBe("IV")
    })

    it("converts 9 to IX", () => {
        expect(numberToRomanString(9)).toBe("IX")
    })

    it("converts 14 to XIV", () => {
        expect(numberToRomanString(14)).toBe("XIV")
    })

    it("converts 40 to XL", () => {
        expect(numberToRomanString(40)).toBe("XL")
    })

    it("converts 90 to XC", () => {
        expect(numberToRomanString(90)).toBe("XC")
    })

    it("converts 400 to CD", () => {
        expect(numberToRomanString(400)).toBe("CD")
    })

    it("converts 900 to CM", () => {
        expect(numberToRomanString(900)).toBe("CM")
    })

    it("converts 1994 to MCMXCIV", () => {
        expect(numberToRomanString(1994)).toBe("MCMXCIV")
    })

    it("converts 3999 to MMMCMXCIX", () => {
        expect(numberToRomanString(3999)).toBe("MMMCMXCIX")
    })

    it("converts 2024 to MMXXIV", () => {
        expect(numberToRomanString(2024)).toBe("MMXXIV")
    })

    it("converts 58 to LVIII", () => {
        expect(numberToRomanString(58)).toBe("LVIII")
    })
})
