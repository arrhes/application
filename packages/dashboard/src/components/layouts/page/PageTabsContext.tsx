import type { Icon, IconProps } from "@tabler/icons-react"
import type { RefAttributes } from "react"
import { createContext, type ReactElement, use } from "react"

export type PageTabNavItem<T extends string = string> = {
    key: T
    label: string
    icon?: ReactElement<IconProps & RefAttributes<Icon>>
}

/** Published by Page.Root when a `tabs` prop is provided. */
export const PageRootTabsContext = createContext<readonly string[] | null>(null)

/** Published by Page.Tabs.Content. Holds the active tab key and setter. */
type PageTabsContextValue = {
    activeKey: string
    setActiveKey: (key: string) => void
}

export const PageTabsContext = createContext<PageTabsContextValue | null>(null)

export function usePageTabsContext(): PageTabsContextValue {
    const ctx = use(PageTabsContext)
    if (ctx === null) throw new Error("usePageTabsContext must be used within a Page.Root with a `tabs` prop")
    return ctx
}
