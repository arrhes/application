import type { ReactNode } from "react"
import { usePageTabsContext } from "./PageTabsContext.js"
import { Page } from "./page.js"

export type PageTabsItemComponent<T extends string> = (props: { tabKey: T; children: ReactNode }) => ReactNode

export type PageTabsContentComponent<T extends string> = {
    (props: { children: ReactNode }): ReactNode
    Item: PageTabsItemComponent<T>
}

export const PageTabsContent = makePageTabsContentComponent<string>()

export function makePageTabsContentComponent<T extends string>(): PageTabsContentComponent<T> {
    function Item(props: { tabKey: T; children: ReactNode }) {
        const { activeKey } = usePageTabsContext()
        if (props.tabKey !== activeKey) return null
        return <>{props.children}</>
    }
    function Content(props: { children: ReactNode }) {
        return <Page.Content>{props.children}</Page.Content>
    }
    Content.Item = Item
    return Content
}
