import type { ReactNode } from "react"
import type { PageTabNavItem } from "./PageTabsContext.js"
import { PageTabsNav } from "./PageTabsNav.js"

export function makePageTabsNavComponent<T extends string>() {
    return function TypedPageTabsNav(props: {
        items: readonly PageTabNavItem<T>[]
        start?: ReactNode
        children?: ReactNode
    }) {
        return PageTabsNav(props)
    }
}
