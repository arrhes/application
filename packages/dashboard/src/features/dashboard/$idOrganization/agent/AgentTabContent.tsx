import { readAllAgentSessionsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonGhostContent, ButtonOutlineContent, formatDateTime } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMenu, IconMessage, IconPlus } from "@tabler/icons-react"
import { lazy, Suspense, useState } from "react"
import { EmptyState } from "../../../../components/layouts/EmptyState.tsx"
import { SearchBar } from "../../../../components/layouts/SearchBar.tsx"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"
import { extractSnippet } from "./extractSnippet.ts"

const AgentPage = lazy(() =>
    import("./AgentPage.js").then((m) => ({
        default: m.AgentPage,
    })),
)
const AgentSessionContent = lazy(() =>
    import("./AgentSessionContent.js").then((m) => ({
        default: m.AgentSessionContent,
    })),
)

export function AgentTabContent({ idOrganization }: { idOrganization: string }) {
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [search, setSearch] = useState("")

    const searchTrimmed = search.trim()

    const { data: sessions } = useDataFromAPI({
        routeDefinition: readAllAgentSessionsRouteDefinition,
        body: searchTrimmed
            ? {
                  idOrganization,
                  search: searchTrimmed,
              }
            : {
                  idOrganization,
              },
    })

    const displaySessions = sessions ?? []

    const sidebarContent = (
        <div
            className={css({
                width: "16rem",
                flexShrink: 0,
                display: {
                    base: "none",
                    md: "flex",
                },
                flexDirection: "column",
                borderRight: "1px solid",
                borderRightColor: "neutral/10",
                overflow: "hidden",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.5rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
                    flexShrink: 0,
                    padding: "1rem",
                })}
            >
                <SearchBar
                    value={search}
                    onChange={setSearch}
                    placeholder="Rechercher une session..."
                />
                <Button
                    onClick={() => {
                        setSelectedSessionId(null)
                        setIsMenuOpen(false)
                    }}
                >
                    <ButtonOutlineContent leftIcon={<IconPlus />} />
                </Button>
            </div>
            <div
                className={css({
                    flex: 1,
                    overflowY: "auto",
                    minHeight: 0,
                    padding: "1rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        width: "100%",
                    })}
                >
                    {displaySessions.length === 0 ? (
                        <EmptyState
                            icon={<IconMessage />}
                            title="Aucune session"
                            subtitle={undefined}
                        />
                    ) : null}
                    {displaySessions.map((session) => {
                        const snippet =
                            searchTrimmed && session.matchedContent
                                ? extractSnippet(session.matchedContent, searchTrimmed)
                                : undefined

                        return (
                            <Button
                                key={session.id}
                                className={{
                                    width: "100%",
                                    textAlign: "left",
                                }}
                                onClick={() => {
                                    setSelectedSessionId(session.id)
                                    setIsMenuOpen(false)
                                }}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "flex-start",
                                        padding: "0.5rem",
                                        borderRadius: "md",
                                        cursor: "pointer",
                                        fontSize: "sm",
                                        background: "none",
                                        border: "none",
                                        color: "neutral",
                                        textAlign: "left",
                                        width: "100%",
                                        overflow: "hidden",
                                        backgroundColor: session.id === selectedSessionId ? "primary/5" : "transparent",
                                        _hover: {
                                            backgroundColor: "primary/5",
                                        },
                                    })}
                                >
                                    <span
                                        className={css({
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                            width: "100%",
                                        })}
                                    >
                                        {session.title ?? formatDateTime(session.createdAt)}
                                    </span>
                                    {session.title && (
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                color: "neutral/40",
                                                whiteSpace: "nowrap",
                                            })}
                                        >
                                            {formatDateTime(session.createdAt)}
                                        </span>
                                    )}
                                    {snippet && (
                                        <span
                                            className={css({
                                                fontSize: "xs",
                                                color: "neutral/40",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                                width: "100%",
                                                marginTop: "0.125rem",
                                            })}
                                        >
                                            {snippet}
                                        </span>
                                    )}
                                </div>
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )

    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "row",
                width: "100%",
                flex: 1,
                minHeight: 0,
                overflow: "hidden",
            })}
        >
            {sidebarContent}
            <div
                className={css({
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    minHeight: 0,
                    overflow: "hidden",
                })}
            >
                <div
                    className={css({
                        display: {
                            base: "flex",
                            md: "none",
                        },
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        gap: "0.5rem",
                        width: "100%",
                        borderBottom: "1px solid",
                        borderBottomColor: "neutral/10",
                    })}
                >
                    <Button
                        aria-label="Menu"
                        className={{
                            margin: "1rem",
                        }}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <ButtonGhostContent leftIcon={<IconMenu />} />
                    </Button>
                    {isMenuOpen && (
                        <div
                            className={css({
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                borderTop: "1px solid",
                                borderTopColor: "neutral/10",
                            })}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {sidebarContent}
                        </div>
                    )}
                </div>
                <div
                    className={css({
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0,
                        minHeight: 0,
                        overflow: "hidden",
                    })}
                >
                    <Suspense fallback={null}>
                        {selectedSessionId === null ? (
                            <AgentPage
                                idOrganization={idOrganization}
                                onSessionCreated={(id) => setSelectedSessionId(id)}
                            />
                        ) : (
                            // key forces remount when switching sessions
                            <AgentSessionContent
                                key={selectedSessionId}
                                idOrganization={idOrganization}
                                idAgentSession={selectedSessionId}
                                onDeleteSession={() => setSelectedSessionId(null)}
                            />
                        )}
                    </Suspense>
                </div>
            </div>
        </div>
    )
}
