import {
    FREE_STORAGE_BYTES,
    INCLUDED_AGENT_TOKENS,
    INCLUDED_OCR_PAGES,
    STORAGE_PRICE_PER_GB_IN_CENTS,
    TOKEN_PACK_PRICE_IN_CENTS,
} from "@arrhes/application-metadata/utilities"

export { FREE_STORAGE_BYTES, INCLUDED_AGENT_TOKENS, INCLUDED_OCR_PAGES }

const RESOURCE_UNIT_PRICE_IN_CENTS = {
    storage_gb: STORAGE_PRICE_PER_GB_IN_CENTS,
    agent_tokens_million: TOKEN_PACK_PRICE_IN_CENTS,
    ocr_pages_hundred: TOKEN_PACK_PRICE_IN_CENTS,
} as const

const ONE_TIME_SERVICE_TYPES = {
    agent_tokens_million: true,
    ocr_pages_hundred: true,
} as const

const RESOURCE_MINIMUM_QUANTITY = {
    storage_gb: 1,
    agent_tokens_million: 1,
    ocr_pages_hundred: 1,
} as const

type SubscriptionLike = {
    type: string
    quantity: number
    amountInCents: number
}

export type ServiceType = "support" | keyof typeof RESOURCE_UNIT_PRICE_IN_CENTS
type ResourceSubscriptionType = keyof typeof RESOURCE_UNIT_PRICE_IN_CENTS

export function isResourceSubscriptionType(type: string): type is ResourceSubscriptionType {
    return type in RESOURCE_UNIT_PRICE_IN_CENTS
}

export function isOneTimeServiceType(type: string): type is Exclude<ResourceSubscriptionType, "storage_gb"> {
    return type in ONE_TIME_SERVICE_TYPES
}

export function isRecurringSubscriptionType(type: string): boolean {
    return type === "support" || type === "storage_gb"
}

export function getResourceSubscriptionUnitPriceInCents(type: ResourceSubscriptionType): number {
    return RESOURCE_UNIT_PRICE_IN_CENTS[type]
}

export function getResourceSubscriptionMinimumQuantity(type: ResourceSubscriptionType): number {
    return RESOURCE_MINIMUM_QUANTITY[type]
}

export function getStorageAddonQuantity(storageMaxUsage: number): number {
    return Math.max(Math.round((storageMaxUsage - FREE_STORAGE_BYTES) / FREE_STORAGE_BYTES), 0)
}

export function getStorageRecurringAmountInCents(storageMaxUsage: number): number {
    return getStorageAddonQuantity(storageMaxUsage) * RESOURCE_UNIT_PRICE_IN_CENTS.storage_gb
}

export function getTokenAddonQuantity(totalTokens: number): number {
    return Math.max(Math.round((totalTokens - INCLUDED_AGENT_TOKENS) / INCLUDED_AGENT_TOKENS), 0)
}

export function getOcrAddonQuantity(totalPages: number): number {
    return Math.max(Math.round((totalPages - INCLUDED_OCR_PAGES) / INCLUDED_OCR_PAGES), 0)
}

export function getTotalTokensFromQuantity(quantity: number): number {
    return INCLUDED_AGENT_TOKENS + quantity * INCLUDED_AGENT_TOKENS
}

export function getTotalOcrPagesFromQuantity(quantity: number): number {
    return INCLUDED_OCR_PAGES + quantity * INCLUDED_OCR_PAGES
}

export function getSubscriptionMonthlyAmountInCents(subscription: SubscriptionLike): number {
    if (isResourceSubscriptionType(subscription.type)) {
        return getResourceSubscriptionUnitPriceInCents(subscription.type) * subscription.quantity
    }

    return subscription.amountInCents
}
