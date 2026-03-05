import { afterEach, describe, expect, it, vi } from "vitest"

const documentMock = {
    cookie: "",
}

vi.stubGlobal("document", documentMock)

import { getIsAuthenticated } from "src/utilities/cookies/getIsAuthenticated.js"

describe("getIsAuthenticated", () => {
    afterEach(() => {
        documentMock.cookie = ""
    })

    it("returns true when arrhes_is_auth cookie is 'true'", () => {
        documentMock.cookie = "arrhes_is_auth=true"
        expect(getIsAuthenticated()).toBe(true)
    })

    it("returns false when arrhes_is_auth cookie is 'false'", () => {
        documentMock.cookie = "arrhes_is_auth=false"
        expect(getIsAuthenticated()).toBe(false)
    })

    it("returns undefined when arrhes_is_auth cookie is not present", () => {
        documentMock.cookie = "other_cookie=value"
        expect(getIsAuthenticated()).toBeUndefined()
    })

    it("returns undefined when no cookies are set", () => {
        documentMock.cookie = ""
        expect(getIsAuthenticated()).toBeUndefined()
    })

    it("returns true when arrhes_is_auth is among multiple cookies", () => {
        documentMock.cookie = "session=abc; arrhes_is_auth=true; other=xyz"
        expect(getIsAuthenticated()).toBe(true)
    })
})
