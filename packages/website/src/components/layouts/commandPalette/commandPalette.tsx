import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { InputCombobox } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBuilding, IconCalendar, IconLayoutGrid, IconSearch, IconUser } from "@tabler/icons-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { createPortal } from "react-dom"
import type { OpenTabArgs } from "../../../contexts/tabs/tabDefinitions.js"
import { useTabs } from "../../../contexts/tabs/tabsContext.js"
import { levenshtein } from "../../../utilities/levenshtein.js"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import {
    type OrgSearchRoute,
    orgSearchRoutes,
    type SearchRoute,
    userSearchRoutes,
    type YearSearchRoute,
    yearSearchRoutes,
} from "./searchRoutes.js"

// ─── Fuzzy filter ─────────────────────────────────────────────────────────────

function scoreMatch(query: string, target: string): number {
    const q = query.toLowerCase()
    const t = target.toLowerCase()
    if (t.includes(q)) return 0
    return levenshtein(q, t.slice(0, Math.max(t.length, q.length)))
}

function filterRoutes<
    T extends {
        label: string
        description?: string
    },
>(query: string, routes: T[]): T[] {
    if (!query) return routes
    return routes
        .map((r) => ({
            ...r,
            _score: Math.min(scoreMatch(query, r.label), r.description ? scoreMatch(query, r.description) : 99),
        }))
        .filter((r) => r._score <= 3)
        .sort((a, b) => a._score - b._score)
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CommandPalette(props: { selectedOrgId: string | null; selectedYearId: string | null }) {
    const { selectedOrgId, selectedYearId } = props
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState("")
    const [selected, setSelected] = useState(0)
    const { openTab } = useTabs()
    const inputRef = useRef<HTMLInputElement>(null)

    const orgsData = useDataFromAPI({
        routeDefinition: getAllMyOrganizationsRouteDefinition,
        body: {},
    })

    // Reset on open
    useEffect(() => {
        if (open) {
            setQuery("")
            setSelected(0)
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [
        open,
    ])

    // Open via custom DOM event
    useEffect(() => {
        function handleOpen() {
            setOpen(true)
        }
        window.addEventListener("arrhes:open-palette", handleOpen)
        return () => window.removeEventListener("arrhes:open-palette", handleOpen)
    }, [])

    // Close when a tab is opened
    useEffect(() => {
        function handleTabOpened() {
            setOpen(false)
        }
        window.addEventListener("arrhes:tab-opened", handleTabOpened)
        return () => window.removeEventListener("arrhes:tab-opened", handleTabOpened)
    }, [])

    // Ctrl/Cmd+K shortcut
    useEffect(() => {
        function handleKey(e: KeyboardEvent) {
            if ((e.ctrlKey || e.metaKey) && e.key === "k") {
                e.preventDefault()
                setOpen(true)
            }
        }
        document.addEventListener("keydown", handleKey)
        return () => document.removeEventListener("keydown", handleKey)
    }, [])

    // ─── Result computation ────────────────────────────────────────────────────

    const allOrgs = orgsData.data ?? []

    // User section: static pages + matching orgs (when no org selected)
    const filteredUserPages = filterRoutes(query, userSearchRoutes)

    const filteredOrgItems: SearchRoute[] = useMemo(() => {
        if (!selectedOrgId) {
            // Show orgs as navigable items — open their exercices tab.
            return filterRoutes(
                query,
                allOrgs.map((ou) => ({
                    label: ou.organization.name,
                    description: "Organisation",
                    tabComponent: "exercices",
                    tabProps: {
                        idOrganization: ou.organization.id,
                    },
                })),
            )
        }
        // Show org-level sub-routes.
        return filterRoutes(
            query,
            orgSearchRoutes.map(
                (r: OrgSearchRoute): SearchRoute => ({
                    label: r.label,
                    description: r.description,
                    tabComponent: r.tabComponent,
                    tabProps: {
                        idOrganization: selectedOrgId,
                    },
                }),
            ),
        )
    }, [
        query,
        allOrgs,
        selectedOrgId,
    ])

    const filteredYearItems: SearchRoute[] = useMemo(() => {
        if (!selectedOrgId || !selectedYearId) return []
        return filterRoutes(
            query,
            yearSearchRoutes.map(
                (r: YearSearchRoute): SearchRoute => ({
                    label: r.label,
                    description: r.description,
                    tabComponent: r.tabComponent,
                    tabProps: {
                        idOrganization: selectedOrgId,
                        idYear: selectedYearId,
                    },
                }),
            ),
        )
    }, [
        query,
        selectedOrgId,
        selectedYearId,
    ])

    const allItems: SearchRoute[] = [
        ...filteredUserPages,
        ...filteredOrgItems,
        ...filteredYearItems,
    ]

    function activate(item: SearchRoute) {
        setOpen(false)
        openTab(
            {
                component: item.tabComponent,
                props: item.tabProps,
            } as OpenTabArgs,
            {
                newTab: true,
            },
        )
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "ArrowDown") {
            e.preventDefault()
            setSelected((s) => Math.min(s + 1, allItems.length - 1))
        } else if (e.key === "ArrowUp") {
            e.preventDefault()
            setSelected((s) => Math.max(s - 1, 0))
        } else if (e.key === "Enter") {
            e.preventDefault()
            const item = allItems[selected]
            if (item) activate(item)
        } else if (e.key === "Escape") {
            setOpen(false)
        }
    }

    // Keep selected index in bounds when filtered list changes
    useEffect(() => {
        setSelected(0)
    }, [
        query,
        selectedOrgId,
        selectedYearId,
    ])

    if (!open) return null

    // Offset counters for multi-section active tracking
    const userOffset = 0
    const orgOffset = filteredUserPages.length
    const yearOffset = orgOffset + filteredOrgItems.length

    return createPortal(
        <div
            className={css({
                position: "fixed",
                inset: "0",
                zIndex: "50",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "10vh 1rem 1rem",
                backgroundColor: "rgba(0,0,0,0.25)",
            })}
            onMouseDown={(e) => {
                if (e.target === e.currentTarget) setOpen(false)
            }}
        >
            <div
                className={css({
                    width: "100%",
                    maxWidth: "620px",
                    backgroundColor: "white",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "lg",
                })}
                onKeyDown={handleKeyDown}
            >
                {/* Search input */}
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.75rem 1rem",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                    })}
                >
                    <IconSearch
                        size={18}
                        className={css({
                            color: "neutral/400",
                            flexShrink: 0,
                        })}
                    />
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher des pages, organisations…"
                        className={css({
                            flex: 1,
                            fontSize: "0.9375rem",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            color: "neutral/900",
                            _placeholder: {
                                color: "neutral/400",
                            },
                        })}
                    />
                </div>

                {/* Results */}
                <div
                    className={css({
                        maxHeight: "400px",
                        overflowY: "auto",
                        padding: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.125rem",
                    })}
                >
                    {allItems.length === 0 && (
                        <p
                            className={css({
                                padding: "1.5rem",
                                textAlign: "center",
                                color: "neutral/400",
                                fontSize: "0.875rem",
                            })}
                        >
                            {query ? `Aucun résultat pour « ${query} »` : "Aucun résultat"}
                        </p>
                    )}

                    {filteredUserPages.length > 0 && (
                        <Section
                            label="Utilisateur"
                            icon={<IconUser size={11} />}
                        >
                            {filteredUserPages.map((page, i) => (
                                <ResultRow
                                    key={page.tabComponent}
                                    icon={<IconLayoutGrid size={15} />}
                                    label={page.label}
                                    description={page.description}
                                    active={selected === userOffset + i}
                                    onMouseEnter={() => setSelected(userOffset + i)}
                                    onClick={() => activate(page)}
                                />
                            ))}
                        </Section>
                    )}

                    {filteredOrgItems.length > 0 && (
                        <Section
                            label={selectedOrgId ? "Organisation" : "Organisations"}
                            icon={<IconBuilding size={11} />}
                        >
                            {filteredOrgItems.map((item, i) => (
                                <ResultRow
                                    key={`${item.tabComponent}-${JSON.stringify(item.tabProps)}`}
                                    icon={<IconBuilding size={15} />}
                                    label={item.label}
                                    description={item.description}
                                    active={selected === orgOffset + i}
                                    onMouseEnter={() => setSelected(orgOffset + i)}
                                    onClick={() => activate(item)}
                                />
                            ))}
                        </Section>
                    )}

                    {filteredYearItems.length > 0 && (
                        <Section
                            label="Exercice"
                            icon={<IconCalendar size={11} />}
                        >
                            {filteredYearItems.map((item, i) => (
                                <ResultRow
                                    key={`${item.tabComponent}-${JSON.stringify(item.tabProps)}`}
                                    icon={<IconCalendar size={15} />}
                                    label={item.label}
                                    description={item.description}
                                    active={selected === yearOffset + i}
                                    onMouseEnter={() => setSelected(yearOffset + i)}
                                    onClick={() => activate(item)}
                                />
                            ))}
                        </Section>
                    )}
                </div>
            </div>
        </div>,
        document.body,
    )
}

// ─── ContextSelect ────────────────────────────────────────────────────────────

export function ContextSelect(props: {
    placeholder: string
    value: string | null
    onChange: (v: string | null) => void
    options: {
        key: string
        label: string
    }[]
    isLoading?: boolean
}) {
    return (
        <InputCombobox
            placeholder={props.placeholder}
            value={props.value}
            onChange={(v) => props.onChange(v ?? null)}
            options={props.options}
            isLoading={props.isLoading}
            allowEmpty={true}
        />
    )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ label, icon, children }: { label: string; icon?: React.ReactNode; children: React.ReactNode }) {
    return (
        <div>
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.375rem 0.75rem 0.25rem",
                })}
            >
                {icon && (
                    <span
                        className={css({
                            color: "neutral/400",
                            display: "flex",
                            alignItems: "center",
                        })}
                    >
                        {icon}
                    </span>
                )}
                <p
                    className={css({
                        fontSize: "0.6875rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        color: "neutral/400",
                    })}
                >
                    {label}
                </p>
            </div>
            {children}
        </div>
    )
}

function ResultRow(props: {
    icon: React.ReactNode
    label: string
    description?: string
    active: boolean
    onMouseEnter: () => void
    onClick: () => void
}) {
    return (
        <button
            type="button"
            onMouseEnter={props.onMouseEnter}
            onClick={props.onClick}
            className={css({
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "0.625rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.375rem",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.1s",
            })}
            style={{
                backgroundColor: props.active ? "var(--colors-accent-50, #eff6ff)" : "transparent",
            }}
        >
            <span
                className={css({
                    flexShrink: 0,
                    color: "neutral/400",
                    display: "flex",
                    alignItems: "center",
                })}
            >
                {props.icon}
            </span>
            <span
                className={css({
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                })}
            >
                <span
                    className={css({
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        color: "neutral/900",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                    })}
                >
                    {props.label}
                </span>
                {props.description && (
                    <span
                        className={css({
                            fontSize: "0.75rem",
                            color: "neutral/500",
                        })}
                    >
                        {props.description}
                    </span>
                )}
            </span>
        </button>
    )
}
