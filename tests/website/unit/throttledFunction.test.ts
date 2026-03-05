import { throttledFunction } from "src/utilities/throttledFunction.js"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

describe("throttledFunction", () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("executes the function immediately on first call", async () => {
        const fn = vi.fn()
        const throttled = throttledFunction({ function: fn, delay: 300 })
        await throttled()
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it("ignores subsequent calls within the delay period", async () => {
        const fn = vi.fn()
        const throttled = throttledFunction({ function: fn, delay: 300 })
        await throttled()
        await throttled()
        await throttled()
        expect(fn).toHaveBeenCalledTimes(1)
    })

    it("allows execution again after the delay expires", async () => {
        const fn = vi.fn()
        const throttled = throttledFunction({ function: fn, delay: 300 })
        await throttled()
        expect(fn).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(300)
        await throttled()
        expect(fn).toHaveBeenCalledTimes(2)
    })

    it("uses default delay of 300ms when not specified", async () => {
        const fn = vi.fn()
        const throttled = throttledFunction({ function: fn })
        await throttled()
        expect(fn).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(299)
        await throttled()
        expect(fn).toHaveBeenCalledTimes(1)

        vi.advanceTimersByTime(1)
        await throttled()
        expect(fn).toHaveBeenCalledTimes(2)
    })

    it("handles async functions", async () => {
        const fn = vi.fn(async () => {})
        const throttled = throttledFunction({ function: fn, delay: 100 })
        await throttled()
        expect(fn).toHaveBeenCalledTimes(1)
    })
})
