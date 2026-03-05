export function formatPrice(price?: number | null | string) {
    if (price === undefined || price === null) return "/"
    return new Intl.NumberFormat("fr", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        roundingMode: "halfExpand",
    })
        .format(Number(price))
        .replace(/,/g, ".")
}
