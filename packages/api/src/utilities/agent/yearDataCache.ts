import { routePath } from "@arrhes/application-metadata"

/**
 * Year-scoped "read all" route paths that can be pre-fetched and cached.
 *
 * These match the 12 queries in the frontend's YearDataContext:
 * accounts, entries, entryLines, entryTags, journals, tags,
 * files, folders, balanceSheets, incomeStatements, computations,
 * computationIncomeStatements.
 *
 * Plus documents (read-all-documents) which is also year-scoped.
 */
const YEAR_SCOPED_READ_ALL_PATHS = [
    `${routePath.auth}/read-all-accounts`,
    `${routePath.auth}/read-all-entries`,
    `${routePath.auth}/read-all-entry-lines`,
    `${routePath.auth}/read-all-entry-tags`,
    `${routePath.auth}/read-all-journals`,
    `${routePath.auth}/read-all-tags`,
    `${routePath.auth}/read-all-files`,
    `${routePath.auth}/read-all-folders`,
    `${routePath.auth}/read-all-balance-sheets`,
    `${routePath.auth}/read-all-income-statements`,
    `${routePath.auth}/read-all-computations`,
    `${routePath.auth}/read-all-computation-income-statements`,
    `${routePath.auth}/read-all-documents`,
] as const

export type YearDataCache = Map<string, unknown>

/**
 * Pre-fetch all year-scoped "read all" data in parallel.
 *
 * Uses the same appFetch mechanism as regular tool execution,
 * but does all fetches upfront so tool calls can return cached data
 * instead of making redundant API calls.
 */
export async function buildYearDataCache(parameters: {
    appFetch: (request: Request) => Promise<Response>
    cookieHeader: string
    authorizationHeader: string
    organizationHeader: string
    idOrganization: string
    idYear: string
}): Promise<YearDataCache> {
    const cache: YearDataCache = new Map()

    const fetchResults = await Promise.allSettled(
        YEAR_SCOPED_READ_ALL_PATHS.map(async (path) => {
            const request = new Request(`http://internal${path}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: parameters.cookieHeader,
                    Authorization: parameters.authorizationHeader,
                    "X-Organization-Id": parameters.organizationHeader,
                },
                body: JSON.stringify({
                    idOrganization: parameters.idOrganization,
                    idYear: parameters.idYear,
                }),
            })

            const response = await parameters.appFetch(request)
            if (!response.ok) {
                console.warn(`[yearDataCache] Failed to pre-fetch ${path}: ${response.status}`)
                return { path, data: null }
            }

            const data = await response.json()
            return { path, data }
        }),
    )

    for (const result of fetchResults) {
        if (result.status === "fulfilled" && result.value.data !== null) {
            cache.set(result.value.path, result.value.data)
        }
    }

    console.log(`[yearDataCache] Pre-fetched ${cache.size}/${YEAR_SCOPED_READ_ALL_PATHS.length} year-scoped datasets`)

    return cache
}

/**
 * Check if a route path is a year-scoped "read all" that can be served from cache.
 *
 * For routes with optional filters (readAllEntryLines with idEntry,
 * readAllComputationIncomeStatements with idComputation/idIncomeStatement),
 * we only use the cache when no filters are provided — the cache holds
 * the unfiltered "all" data.
 */
export function getCachedYearData(parameters: {
    cache: YearDataCache
    path: string
    body: Record<string, unknown>
}): unknown | undefined {
    const { cache, path, body } = parameters

    if (!cache.has(path)) {
        return undefined
    }

    // For entry lines, only use cache when no idEntry filter is specified
    if (path.endsWith("/read-all-entry-lines") && body.idEntry) {
        return undefined
    }

    // For computation income statements, only use cache when no filters are specified
    if (path.endsWith("/read-all-computation-income-statements") && (body.idComputation || body.idIncomeStatement)) {
        return undefined
    }

    return cache.get(path)
}
