export const premiumOrganizationUsageLimits = {
    ocrPagesPerMonth: 1000,
} as const

export function getCurrentMonthStartISO(date = new Date()) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1)).toISOString()
}

export function isUsageMonthOutdated(parameters: {
    periodStartAt: string | Date | null | undefined
    monthStartISO: string
}) {
    if (parameters.periodStartAt == null) {
        return true
    }

    const usageMonthStartTimestamp = new Date(parameters.periodStartAt).getTime()
    const currentMonthStartTimestamp = new Date(parameters.monthStartISO).getTime()

    if (Number.isNaN(usageMonthStartTimestamp) || Number.isNaN(currentMonthStartTimestamp)) {
        return true
    }

    return usageMonthStartTimestamp < currentMonthStartTimestamp
}
