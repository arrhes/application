export function formatEuros(cents: number): string {
    return `${(cents / 100).toFixed(2).replace(".", ",")}\u202f€`
}
