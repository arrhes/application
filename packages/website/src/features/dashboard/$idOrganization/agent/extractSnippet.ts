
/**
 * Extract a short snippet around the first occurrence of `query` in `content`.
 * Returns `...before**match**after...` or undefined if not found.
 */
export function extractSnippet(content: string, query: string): string | undefined {
    const lowerContent = content.toLowerCase()
    const lowerQuery = query.toLowerCase()
    const index = lowerContent.indexOf(lowerQuery)
    if (index === -1) return undefined

    const snippetRadius = 30
    const start = Math.max(0, index - snippetRadius)
    const end = Math.min(content.length, index + query.length + snippetRadius)

    let snippet = ""
    if (start > 0) snippet += "..."
    snippet += content.slice(start, end)
    if (end < content.length) snippet += "..."

    return snippet
}