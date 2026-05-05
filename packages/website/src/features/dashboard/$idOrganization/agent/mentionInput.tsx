import { searchReferenceableRouteDefinition } from "@arrhes/application-metadata"
import { CircularLoader } from "@arrhes/ui"
import { css, cx } from "@arrhes/ui/css"
import { IconCalculator, IconFile, IconFileText, IconNotebook, IconTag } from "@tabler/icons-react"
import { type KeyboardEvent, useCallback, useEffect, useRef, useState } from "react"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.ts"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface MentionReference {
    id: string
    type: "account" | "entry" | "journal" | "tag" | "file"
    label: string
}

interface MentionInputProps {
    onSubmit: (text: string, references: MentionReference[]) => void
    onValueChange?: (text: string, references: MentionReference[]) => void
    disabled?: boolean
    idOrganization: string
    idYear?: string | null
    placeholder?: string
    className?: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const typeIcons: Record<MentionReference["type"], typeof IconCalculator> = {
    account: IconCalculator,
    entry: IconFileText,
    journal: IconNotebook,
    tag: IconTag,
    file: IconFile,
}

const typeLabels: Record<MentionReference["type"], string> = {
    account: "Compte",
    entry: "Écriture",
    journal: "Journal",
    tag: "Étiquette",
    file: "Fichier",
}

function placeCaretAfterNode(node: Node) {
    const sel = window.getSelection()
    if (!sel) return
    const range = document.createRange()
    range.setStartAfter(node)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
}

// ─── Chip element factory ────────────────────────────────────────────────────

function createChipElement(ref: MentionReference): HTMLSpanElement {
    const chip = document.createElement("span")
    chip.contentEditable = "false"
    chip.dataset.refId = ref.id
    chip.dataset.refType = ref.type
    chip.dataset.refLabel = ref.label
    chip.className = chipClass
    chip.textContent = `@${ref.label}`
    // Add a zero-width space after the chip so the cursor can be placed there
    return chip
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const chipClass = css({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.125rem",
    backgroundColor: "primary/10",
    color: "primary",
    borderRadius: "sm",
    padding: "0.0625rem 0.375rem",
    fontSize: "sm",
    fontWeight: "medium",
    cursor: "default",
    userSelect: "none",
    verticalAlign: "baseline",
    lineHeight: "1.5",
    whiteSpace: "nowrap",
})

const editorClass = css({
    width: "100%",
    padding: "1rem",
    border: "1px solid",
    borderColor: "neutral/20",
    borderRadius: "md",
    fontSize: "sm",
    outline: "none",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
    minHeight: "3.5rem",
    maxHeight: "12rem",
    overflowY: "auto",
    _hover: { borderColor: "neutral/50" },
    _focusWithin: { borderColor: "neutral/50", boxShadow: "inset" },
    _empty: {
        _before: {
            content: "attr(data-placeholder)",
            color: "neutral/25",
            pointerEvents: "none",
        },
    },
})

const dropdownClass = css({
    position: "absolute",
    zIndex: 50,
    backgroundColor: "white",
    borderRadius: "lg",
    boxShadow: "md",
    border: "1px solid",
    borderColor: "neutral/10",
    maxHeight: "256px",
    overflowY: "auto",
    minWidth: "260px",
    maxWidth: "400px",
    padding: "0.25rem",
})

const dropdownItemClass = css({
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.375rem 0.5rem",
    fontSize: "sm",
    borderRadius: "sm",
    cursor: "pointer",
    _hover: { backgroundColor: "background" },
    width: "100%",
    textAlign: "left",
    border: "none",
    background: "none",
})

const dropdownItemActiveClass = css({
    backgroundColor: "background",
})

const typeBadgeClass = css({
    fontSize: "xs",
    color: "neutral/50",
    flexShrink: 0,
})

// ─── Component ───────────────────────────────────────────────────────────────

export function MentionInput(props: MentionInputProps) {
    const editorRef = useRef<HTMLDivElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [showDropdown, setShowDropdown] = useState(false)
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
    const [dropdownSide, setDropdownSide] = useState<"bottom" | "top">("bottom")
    const [searchQuery, setSearchQuery] = useState("")
    const [results, setResults] = useState<MentionReference[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const mentionStartRef = useRef<{ node: Node; offset: number } | null>(null)
    const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // ── Search API ───────────────────────────────────────────────────────

    const performSearch = useCallback(
        async (query: string) => {
            if (!query.trim()) {
                setResults([])
                setIsLoading(false)
                return
            }
            setIsLoading(true)
            try {
                const result = await getResponseBodyFromAPI({
                    routeDefinition: searchReferenceableRouteDefinition,
                    body: {
                        idOrganization: props.idOrganization,
                        idYear: props.idYear ?? null,
                        query: query.trim(),
                    },
                })
                if (result.ok && result.data) {
                    setResults(result.data as unknown as MentionReference[])
                } else {
                    setResults([])
                }
            } catch {
                setResults([])
            } finally {
                setIsLoading(false)
            }
        },
        [props.idOrganization, props.idYear],
    )

    // Debounced search
    useEffect(() => {
        if (!showDropdown) return
        if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        searchTimeoutRef.current = setTimeout(() => {
            performSearch(searchQuery)
        }, 250)
        return () => {
            if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
        }
    }, [searchQuery, showDropdown, performSearch])

    // ── Extract content ──────────────────────────────────────────────────

    const extractContent = useCallback((): { text: string; references: MentionReference[] } => {
        const editor = editorRef.current
        if (!editor) return { text: "", references: [] }

        const references: MentionReference[] = []
        let text = ""

        for (const node of Array.from(editor.childNodes)) {
            if (node.nodeType === Node.TEXT_NODE) {
                text += node.textContent ?? ""
            } else if (node instanceof HTMLElement && node.dataset.refId) {
                references.push({
                    id: node.dataset.refId,
                    type: node.dataset.refType as MentionReference["type"],
                    label: node.dataset.refLabel ?? "",
                })
                text += `@${node.dataset.refLabel ?? ""}`
            } else if (node instanceof HTMLBRElement) {
                text += "\n"
            } else if (node instanceof HTMLElement) {
                // Handle divs created by contentEditable for line breaks
                const innerText = node.textContent ?? ""
                if (text.length > 0 && innerText.length > 0) text += "\n"
                text += innerText
            }
        }

        return { text: text.trim(), references }
    }, [])

    // ── Mention detection ────────────────────────────────────────────────

    const detectMention = useCallback(() => {
        const sel = window.getSelection()
        if (!sel || sel.rangeCount === 0) return

        const range = sel.getRangeAt(0)
        const node = range.startContainer
        if (node.nodeType !== Node.TEXT_NODE) {
            if (showDropdown) {
                setShowDropdown(false)
                mentionStartRef.current = null
            }
            return
        }

        const text = node.textContent ?? ""
        const cursorPos = range.startOffset

        // Find the last @ before cursor that isn't preceded by a word character
        let atPos = -1
        for (let i = cursorPos - 1; i >= 0; i--) {
            if (text[i] === "@") {
                if (i === 0 || /\s/.test(text[i - 1]!)) {
                    atPos = i
                }
                break
            }
            // Stop if we hit whitespace without finding @
            if (/\s/.test(text[i]!)) break
        }

        if (atPos >= 0) {
            const query = text.slice(atPos + 1, cursorPos)
            mentionStartRef.current = { node, offset: atPos }
            setSearchQuery(query)
            setActiveIndex(0)

            // Position dropdown near the @ character
            const editorRect = editorRef.current?.getBoundingClientRect()
            const rangeForPosition = document.createRange()
            rangeForPosition.setStart(node, atPos)
            rangeForPosition.setEnd(node, atPos)
            const atRect = rangeForPosition.getBoundingClientRect()

            if (editorRect) {
                const spaceBelow = window.innerHeight - atRect.bottom
                const dropdownHeight = 256 + 8 // maxHeight + gap
                if (spaceBelow < dropdownHeight) {
                    // Not enough space below — position above the @ character
                    setDropdownSide("top")
                    const bottomOffset = editorRect.bottom - atRect.top + 4
                    setDropdownPosition({
                        top: bottomOffset,
                        left: atRect.left - editorRect.left,
                    })
                } else {
                    setDropdownSide("bottom")
                    setDropdownPosition({
                        top: atRect.bottom - editorRect.top + editorRef.current!.scrollTop + 4,
                        left: atRect.left - editorRect.left,
                    })
                }
            }

            setShowDropdown(true)
        } else if (showDropdown) {
            setShowDropdown(false)
            mentionStartRef.current = null
        }
    }, [showDropdown])

    // ── Insert mention ───────────────────────────────────────────────────

    const insertMention = useCallback(
        (ref: MentionReference) => {
            const editor = editorRef.current
            const start = mentionStartRef.current
            if (!editor || !start) return

            const textNode = start.node as Text
            const text = textNode.textContent ?? ""
            const sel = window.getSelection()
            const cursorPos = sel?.getRangeAt(0).startOffset ?? text.length

            // Split the text node: before @, and after the query
            const before = text.slice(0, start.offset)
            const after = text.slice(cursorPos)

            // Create the chip
            const chip = createChipElement(ref)

            // Replace the text node
            const beforeNode = document.createTextNode(before)
            const afterNode = document.createTextNode(after.length > 0 ? after : "\u00A0")

            const parent = textNode.parentNode!
            parent.insertBefore(beforeNode, textNode)
            parent.insertBefore(chip, textNode)
            parent.insertBefore(afterNode, textNode)
            parent.removeChild(textNode)

            // Place cursor after the chip
            placeCaretAfterNode(chip)

            setShowDropdown(false)
            mentionStartRef.current = null
            setSearchQuery("")
            setResults([])

            const { text: updatedText, references: updatedReferences } = extractContent()
            props.onValueChange?.(updatedText, updatedReferences)
        },
        [extractContent, props],
    )

    // ── Keyboard handling ────────────────────────────────────────────────

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (showDropdown) {
                if (e.key === "ArrowDown") {
                    e.preventDefault()
                    setActiveIndex((prev) => Math.min(prev + 1, results.length - 1))
                    return
                }
                if (e.key === "ArrowUp") {
                    e.preventDefault()
                    setActiveIndex((prev) => Math.max(prev - 1, 0))
                    return
                }
                if (e.key === "Enter" || e.key === "Tab") {
                    if (results[activeIndex]) {
                        e.preventDefault()
                        insertMention(results[activeIndex])
                        return
                    }
                }
                if (e.key === "Escape") {
                    e.preventDefault()
                    setShowDropdown(false)
                    mentionStartRef.current = null
                    return
                }
            }

            if (e.key === "Enter" && !e.shiftKey && !e.ctrlKey) {
                e.preventDefault()
                const { text, references } = extractContent()
                if (!text || props.disabled) return
                props.onSubmit(text, references)
                // Clear the editor
                if (editorRef.current) {
                    editorRef.current.innerHTML = ""
                }
                props.onValueChange?.("", [])
            }
        },
        [showDropdown, results, activeIndex, insertMention, extractContent, props],
    )

    // ── Input handler ────────────────────────────────────────────────────

    const handleInput = useCallback(() => {
        detectMention()
        const { text, references } = extractContent()
        props.onValueChange?.(text, references)
    }, [detectMention, extractContent, props])

    // ── Close dropdown on outside click ──────────────────────────────────

    useEffect(() => {
        if (!showDropdown) return
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                editorRef.current &&
                !editorRef.current.contains(e.target as Node)
            ) {
                setShowDropdown(false)
                mentionStartRef.current = null
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener("mousedown", handler)
    }, [showDropdown])

    // ── Scroll active item into view ─────────────────────────────────────

    useEffect(() => {
        if (!showDropdown || !dropdownRef.current) return
        const item = dropdownRef.current.children[activeIndex] as HTMLElement | undefined
        item?.scrollIntoView({ block: "nearest" })
    }, [activeIndex, showDropdown])

    // ─── Render ──────────────────────────────────────────────────────────

    return (
        <div className={cx(css({ position: "relative", width: "100%", flex: 1 }), props.className)}>
            <div
                ref={editorRef}
                contentEditable={!props.disabled}
                suppressContentEditableWarning
                role="textbox"
                data-placeholder={props.placeholder ?? "Votre message..."}
                className={cx(editorClass, props.disabled ? css({ opacity: 0.5, cursor: "not-allowed" }) : "")}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
            />

            {showDropdown && (
                <div
                    ref={dropdownRef}
                    className={dropdownClass}
                    style={
                        dropdownSide === "top"
                            ? { bottom: dropdownPosition.top, left: dropdownPosition.left }
                            : { top: dropdownPosition.top, left: dropdownPosition.left }
                    }
                >
                    {isLoading && (
                        <div className={css({ padding: "0.5rem", display: "flex", justifyContent: "center" })}>
                            <CircularLoader />
                        </div>
                    )}
                    {!isLoading && results.length === 0 && searchQuery.length > 0 && (
                        <div
                            className={css({
                                padding: "0.5rem",
                                fontSize: "sm",
                                color: "neutral/50",
                                textAlign: "center",
                            })}
                        >
                            Aucun résultat
                        </div>
                    )}
                    {!isLoading && results.length === 0 && searchQuery.length === 0 && (
                        <div
                            className={css({
                                padding: "0.5rem",
                                fontSize: "sm",
                                color: "neutral/50",
                                textAlign: "center",
                            })}
                        >
                            Tapez pour rechercher...
                        </div>
                    )}
                    {results.map((result, index) => {
                        const Icon = typeIcons[result.type]
                        return (
                            <button
                                key={`${result.type}-${result.id}`}
                                type="button"
                                className={cx(dropdownItemClass, index === activeIndex ? dropdownItemActiveClass : "")}
                                onMouseDown={(e) => {
                                    e.preventDefault() // Prevent blur
                                    insertMention(result)
                                }}
                                onMouseEnter={() => setActiveIndex(index)}
                            >
                                <Icon size={16} className={css({ flexShrink: 0, color: "neutral/50" })} />
                                <span className={css({ flex: 1, truncate: true })}>{result.label}</span>
                                <span className={typeBadgeClass}>{typeLabels[result.type]}</span>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
