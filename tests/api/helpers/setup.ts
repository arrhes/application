/**
 * Verifies the API server is running and reachable.
 * Called before integration tests.
 */
export async function verifyApiIsRunning(): Promise<void> {
    const apiBaseUrl = process.env.API_BASE_URL ?? "http://localhost:3000"
    try {
        const response = await fetch(`${apiBaseUrl}/`, {
            method: "POST",
        })
        if (response.status !== 200) {
            throw new Error(`API returned status ${response.status}`)
        }
    } catch (error) {
        throw new Error(
            `API server is not running at ${apiBaseUrl}. ` +
                "Start the dev environment with `just dev up` before running integration tests.\n" +
                `Original error: ${error}`,
        )
    }
}
