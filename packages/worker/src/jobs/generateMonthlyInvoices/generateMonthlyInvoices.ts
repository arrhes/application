import { ContextEnv } from "#src/utilities/contextEnv.js"

/**
 * Triggers the monthly recurring billing cycle by calling the internal API route.
 * This job is intended to run on the 1st of each month.
 */
export async function generateMonthlyInvoices(): Promise<void> {
    const apiBaseUrl = ContextEnv.API_BASE_URL
    const internalApiKey = ContextEnv.INTERNAL_API_KEY ?? ""

    const res = await fetch(`${apiBaseUrl}/internal/generate-monthly-invoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-internal-api-key": internalApiKey,
        },
    })

    if (!res.ok) {
        const text = await res.text()
        throw new Error(`Invoice generation failed: ${res.status} ${text}`)
    }

    const body = (await res.json()) as {
        generatedCount?: number
    }
    console.log(`[generateMonthlyInvoices] Processed ${body.generatedCount ?? 0} monthly billing cycle(s).`)
}
