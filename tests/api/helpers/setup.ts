/**
 * Verifies the API server is running and reachable.
 * Called before integration tests.
 */
export async function verifyApiIsRunning(): Promise<void> {
    try {
        const response = await fetch("http://localhost:3000/", { method: "POST" })
        if (response.status !== 200) {
            throw new Error(`API returned status ${response.status}`)
        }
    } catch (error) {
        throw new Error(
            "API server is not running at http://localhost:3000. " +
                "Start the dev environment with `just dev up` before running integration tests.\n" +
                `Original error: ${error}`,
        )
    }
}
