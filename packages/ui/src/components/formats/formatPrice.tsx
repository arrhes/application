const priceFormatter = new Intl.NumberFormat("fr", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    roundingMode: "halfExpand",
})

export function formatPrice(parameters: { price?: number | null | string }) {
    if (parameters.price === undefined || parameters.price === null) return "/"
    const price = Number(parameters.price)
    const processedPrice = Math.abs(price) < 0.009 ? 0 : price
    return priceFormatter.format(processedPrice).replace(/,/g, ".")
}
