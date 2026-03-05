import { sleep } from "src/utilities/sleep.js"
import { describe, expect, it, vi } from "vitest"

describe("sleep", () => {
    it("resolves after the specified delay", async () => {
        vi.useFakeTimers()
        const promise = sleep(100)
        vi.advanceTimersByTime(100)
        await expect(promise).resolves.toBeUndefined()
        vi.useRealTimers()
    })

    it("does not resolve before the delay", async () => {
        vi.useFakeTimers()
        let resolved = false
        const _promise = sleep(500).then(() => {
            resolved = true
        })
        vi.advanceTimersByTime(200)
        await vi.advanceTimersByTimeAsync(0) // flush microtasks
        expect(resolved).toBe(false)
        vi.advanceTimersByTime(300)
        await vi.advanceTimersByTimeAsync(0) // flush microtasks
        expect(resolved).toBe(true)
        vi.useRealTimers()
    })

    it("returns undefined", async () => {
        vi.useFakeTimers()
        const promise = sleep(0)
        vi.advanceTimersByTime(0)
        const result = await promise
        expect(result).toBeUndefined()
        vi.useRealTimers()
    })
})
