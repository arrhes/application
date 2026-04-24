export function parseEuroAmountToCents(value: string): number {
    return Math.round(Number.parseFloat(value.replaceAll(" ", "").replace(",", ".")) * 100)
}