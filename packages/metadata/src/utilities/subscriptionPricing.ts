export const FREE_STORAGE_BYTES = 1_073_741_824
export const INCLUDED_AGENT_TOKENS = 1_000_000
export const INCLUDED_OCR_PAGES = 100
export const STORAGE_PRICE_PER_GB_IN_CENTS = 10
export const VAT_PERCENT = 20
export const VAT_RATE = VAT_PERCENT / 100

export const OCR_PAGE_PRICE_IN_CENTS = 1
export const OCR_PAGE_TIERS = [0, 100, 500, 1000, 5000] as const

export const TOKEN_PACK_PRICE_IN_CENTS = 100
export const TOKENS_PER_PACK = 1_000_000
export const TOKEN_TIERS = [0, 1, 5, 10, 50] as const

export const SUPPORT_TIERS = [0, 500, 1000, 2000, 5000] as const

export function getTaxAmountFromHTInCents(amountHTInCents: number) {
    return Math.round(amountHTInCents * VAT_RATE)
}

export function getAmountTTCFromHTInCents(amountHTInCents: number) {
    return amountHTInCents + getTaxAmountFromHTInCents(amountHTInCents)
}
