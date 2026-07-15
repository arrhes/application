import type { DocsSearchEntry } from "virtual:docs-search-index"
import { Button } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSearch } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

const MAX_RESULTS = 8

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

function scoreEntry(entry: DocsSearchEntry, tokens: string[]): number {
    const normContent = normalize(entry.content)
    const normTitle = normalize(entry.title)
    const normDesc = normalize(entry.description)

    if (tokens.some((t) => normTitle.includes(t) || normDesc.includes(t))) {
        return 3
    }

    const matchCount = tokens.filter((t) => normContent.includes(t)).length
    if (matchCount === 0) return 0
    if (matchCount === tokens.length) return 2
    return matchCount / tokens.length
}

function getMatchSnippet(
    text: string,
    query: string,
): {
    before: string
    match: string
    after: string
} | null {
    const normText = normalize(text)
    const normQuery = normalize(query)
    const idx = normText.indexOf(normQuery)
    if (idx === -1) return null
    const ctxBefore = 40
    const start = Math.max(0, idx - ctxBefore)
    const end = Math.min(text.length, idx + query.length + 50)
    return {
        before: (start > 0 ? "\u2026" : "") + text.slice(start, idx),
        match: text.slice(idx, idx + query.length),
        after: text.slice(idx + query.length, end) + (end < text.length ? "\u2026" : ""),
    }
}

function ResultChunk(props: { entry: DocsSearchEntry; tokens: string[] }) {
    const { entry, tokens } = props

    for (const token of tokens) {
        const snippet = getMatchSnippet(entry.description, token) ?? getMatchSnippet(entry.content, token)
        if (snippet) {
            return (
                <span
                    className={css({
                        display: "block",
                        fontSize: "xs",
                        color: "neutral/50",
                        textAlign: "left",
                    })}
                >
                    {snippet.before}
                    <strong
                        className={css({
                            color: "neutral",
                        })}
                    >
                        {snippet.match}
                    </strong>
                    {snippet.after}
                </span>
            )
        }
    }

    if (entry.description) {
        return (
            <span
                className={css({
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "1.5",
                    display: "block",
                })}
            >
                {entry.description.length > 90 ? `${entry.description.slice(0, 90)}\u2026` : entry.description}
            </span>
        )
    }

    return null
}

export function DocsSearch() {
    const [query, setQuery] = useState("")
    const [open, setOpen] = useState(false)
    const [searchIndex, setSearchIndex] = useState<DocsSearchEntry[] | null>(null)
    const loadingRef = useRef(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const navigate = useNavigate()

    const loadSearchIndex = useCallback(async () => {
        if (searchIndex !== null || loadingRef.current) return
        loadingRef.current = true
        const mod = await import("virtual:docs-search-index")
        setSearchIndex(mod.docsSearchIndex)
        loadingRef.current = false
    }, [
        searchIndex,
    ])

    const { results, tokens } = useMemo(() => {
        const trimmed = query.trim()
        if (!trimmed || searchIndex === null)
            return {
                results: [],
                tokens: [],
            }

        const toks = trimmed
            .split(/\s+/)
            .map(normalize)
            .filter((t) => t.length > 0)

        const scored = searchIndex
            .flatMap((entry) => {
                const score = scoreEntry(entry, toks)
                return score > 0
                    ? [
                          {
                              entry,
                              score,
                          },
                      ]
                    : []
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, MAX_RESULTS)
            .map((r) => r.entry)

        return {
            results: scored,
            tokens: toks,
        }
    }, [
        query,
        searchIndex,
    ])

    useEffect(() => {
        function handleMouseDown(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleMouseDown)
        return () => {
            document.removeEventListener("mousedown", handleMouseDown)
        }
    }, [])

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false)
                setQuery("")
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [])

    function handleSelect(path: string) {
        setQuery("")
        setOpen(false)
        void navigate({
            to: path as never,
        })
    }

    return (
        <div
            ref={containerRef}
            className={css({
                position: "relative",
                flex: 1,
                minWidth: 0,
                maxWidth: "300px",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    border: "1px solid",
                    borderRadius: "md",
                    borderColor: "neutral/20",
                    _focusWithin: {
                        borderColor: "neutral/50",
                        boxShadow: "inset",
                    },
                    padding: "0.5rem",
                    boxSizing: "border-box",
                })}
            >
                <IconSearch
                    className={css({
                        minWidth: "1rem",
                        width: "1rem",
                        minHeight: "1rem",
                        height: "1rem",
                        stroke: "neutral/50",
                        flexShrink: 0,
                    })}
                />
                <input
                    type="search"
                    aria-label="Rechercher dans la documentation"
                    autoComplete="off"
                    placeholder="Rechercher dans la documentation..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                        setOpen(true)
                        void loadSearchIndex()
                    }}
                    onFocus={() => {
                        if (query) setOpen(true)
                        void loadSearchIndex()
                    }}
                    className={css({
                        flex: 1,
                        fontSize: "0.875rem",
                        lineHeight: "1rem",
                        fontWeight: "400",
                        backgroundColor: "transparent",
                        _placeholder: {
                            color: "neutral/25",
                        },
                        outline: "none",
                        minWidth: 0,
                    })}
                />
            </div>

            {open && results.length > 0 && (
                <div
                    className={css({
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        borderRadius: "lg",
                        boxShadow: "md",
                        display: "flex",
                        flexDirection: "column",
                        maxHeight: "70vh",
                        overflowY: "auto",
                        minWidth: "300px",
                    })}
                >
                    {results.map((entry) => (
                        <Button
                            key={entry.path}
                            onMouseDown={(e) => {
                                e.preventDefault()
                                handleSelect(entry.path)
                            }}
                            className={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "start",
                                gap: "0.25rem",
                                padding: "0.625rem 0.75rem",
                                cursor: "pointer",
                                _hover: {
                                    backgroundColor: "background",
                                },
                                borderBottom: "1px solid",
                                borderBottomColor: "neutral/5",
                                _last: {
                                    borderBottom: "none",
                                },
                            }}
                        >
                            <span
                                className={css({
                                    fontSize: "sm",
                                    color: "neutral",
                                    textAlign: "left",
                                    fontWeight: "semibold",
                                })}
                            >
                                {entry.title.trim()}
                            </span>

                            <ResultChunk
                                entry={entry}
                                tokens={tokens}
                            />
                        </Button>
                    ))}
                </div>
            )}

            {open && query.trim().length > 0 && results.length === 0 && searchIndex !== null && (
                <div
                    className={css({
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        right: 0,
                        zIndex: 50,
                        backgroundColor: "white",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        borderRadius: "lg",
                        boxShadow: "md",
                        padding: "0.75rem",
                        minWidth: "300px",
                    })}
                >
                    <span
                        className={css({
                            fontSize: "sm",
                            color: "neutral/40",
                        })}
                    >
                        Aucun résultat pour « {query} »
                    </span>
                </div>
            )}
        </div>
    )
}
