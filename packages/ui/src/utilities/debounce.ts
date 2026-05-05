export function debounce(parameters: { function: () => void | Promise<void>; delay?: number }) {
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    clearTimeout(timeoutId)
    timeoutId = setTimeout(async () => {
        await parameters.function()
    }, parameters.delay ?? 300)
}
