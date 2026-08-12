import { cn, css } from "@comptasse/ui/utilities/cn.js"
import type { ComponentProps, ReactNode } from "react"
import { useCallback, useMemo, useState } from "react"
import { makePageTabsNavComponent } from "./makePageTabsNavComponent.js"
import { PageBanner } from "./PageBanner.js"
import { PageBanners } from "./PageBanners.js"
import type { PageTabsContentComponent } from "./PageTabsContent.js"
import { makePageTabsContentComponent } from "./PageTabsContent.js"
import type { PageTabNavItem } from "./PageTabsContext.js"
import { PageRootTabsContext, PageTabsContext } from "./PageTabsContext.js"

type SectionTabsNavComponent<T extends string> = (props: {
    items: readonly PageTabNavItem<T>[]
    start?: ReactNode
    children?: ReactNode
}) => ReactNode

export type SectionTabs<T extends string> = {
    Root: (props: { children?: ReactNode; className?: ComponentProps<"div">["className"] }) => ReactNode
    Nav: SectionTabsNavComponent<T>
    Content: PageTabsContentComponent<T>
    Banners: typeof PageBanners
    Banner: typeof PageBanner
}

/**
 * Creates a set of strongly-typed section-tab components bound to the literal
 * union `T`. The active tab key is synced to the URL via the `?tab=` search
 * param (using `replaceState` - no browser history entry is created).
 *
 * Call this at **module level** (not inside a component render) so that React
 * sees stable component identities across renders.
 *
 * @example
 * const MyTabs = createSectionTabs(["a", "b", "c"] as const)
 *
 * <MyTabs.Root>
 *     <MyTabs.Nav items={[{ key: "a", label: "A" }]} />
 *     <MyTabs.Content>
 *         <MyTabs.Content.Item tabKey="a">…</MyTabs.Content.Item>
 *     </MyTabs.Content>
 * </MyTabs.Root>
 */
function safeDecodeURIComponent(value: string): string {
    try {
        return decodeURIComponent(value)
    } catch {
        return value
    }
}

export function createSectionTabs<T extends string>(tabs: readonly T[]): SectionTabs<T> {
    const Nav = makePageTabsNavComponent<T>()
    const Content = makePageTabsContentComponent<T>()

    function Root(props: { children?: ReactNode; className?: ComponentProps<"div">["className"] }) {
        const [basePath] = useState(() => {
            // Decode percent-encoded characters (Chrome returns encoded pathname).
            const pathname = safeDecodeURIComponent(window.location.pathname)
            const lastSegment = pathname.split("/").at(-1) ?? ""
            return (tabs as readonly string[]).includes(lastSegment)
                ? pathname.slice(0, -(lastSegment.length + 1))
                : pathname
        })

        const [activeKey, setActiveKey] = useState<string>(() => {
            const pathname = safeDecodeURIComponent(window.location.pathname)
            const lastSegment = pathname.split("/").at(-1) ?? ""
            const base = (tabs as readonly string[]).includes(lastSegment)
                ? pathname.slice(0, -(lastSegment.length + 1))
                : pathname
            // sessionStorage is the canonical source - survives LRU eviction and page reloads.
            const stored = sessionStorage.getItem(`section-tab:${base}`)
            if (stored !== null && (tabs as readonly string[]).includes(stored)) return stored as T
            // Fall back to URL segment (useful for direct links or first visit).
            if ((tabs as readonly string[]).includes(lastSegment)) return lastSegment as T
            return tabs[0] ?? ""
        })

        const setActiveKeyAndUrl = useCallback(
            (key: string) => {
                setActiveKey(key)
                sessionStorage.setItem(`section-tab:${basePath}`, key)
                window.history.replaceState(window.history.state, "", `${basePath}/${key}`)
            },
            [
                basePath,
            ],
        )

        const pageTabsContextValue = useMemo(
            () => ({
                activeKey,
                setActiveKey: setActiveKeyAndUrl,
            }),
            [
                activeKey,
                setActiveKeyAndUrl,
            ],
        )

        return (
            <PageRootTabsContext.Provider value={tabs}>
                <PageTabsContext.Provider value={pageTabsContextValue}>
                    <div
                        className={cn(
                            css({
                                width: "100%",
                                flexShrink: "0",
                                flex: "1",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "1rem",
                                backgroundColor: "white",
                            }),
                            props.className,
                        )}
                    >
                        {props.children}
                    </div>
                </PageTabsContext.Provider>
            </PageRootTabsContext.Provider>
        )
    }

    return {
        Root,
        Nav,
        Content,
        Banners: PageBanners,
        Banner: PageBanner,
    }
}
