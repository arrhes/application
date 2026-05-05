export const premiumOrganizationUsageLimits = {
    // Conservative cap to stay under ~10 EUR/month at 0.15 EUR per 1M tokens.
    agentTokensPerMonth: 64_000_000,
    ocrPagesPerMonth: 1000,
} as const

export function getCurrentMonthStartISO(date = new Date()) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).toISOString()
}

export function isUsageMonthOutdated(parameters: {
    usageMonthStartAt: string | Date | null | undefined
    monthStartISO: string
}) {
    if (parameters.usageMonthStartAt == null) {
        return true
    }

    const usageMonthStartTimestamp = new Date(parameters.usageMonthStartAt).getTime()
    const currentMonthStartTimestamp = new Date(parameters.monthStartISO).getTime()

    if (Number.isNaN(usageMonthStartTimestamp) || Number.isNaN(currentMonthStartTimestamp)) {
        return true
    }

    return usageMonthStartTimestamp < currentMonthStartTimestamp
}
