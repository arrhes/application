import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"
import { usePageTabsContext } from "./PageTabsContext.js"

/** Renders a tab panel. Only visible when its tabKey matches the active tab. */
export function PageTabsItem<T extends string>(props: { tabKey: T; children: ReactNode }) {
    const { activeKey } = usePageTabsContext()
    if (props.tabKey !== activeKey) return null
    return (
        <div
            className={css({
                width: "100%",
            })}
        >
            {props.children}
        </div>
    )
}
