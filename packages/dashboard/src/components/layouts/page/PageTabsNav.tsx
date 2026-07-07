import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { ReactNode } from "react"
import { type PageTabNavItem, usePageTabsContext } from "./PageTabsContext.js"

function PageTabsNavImpl<T extends string>(props: {
    items: readonly PageTabNavItem<T>[]
    start?: ReactNode
    children?: ReactNode
}) {
    const { activeKey, setActiveKey } = usePageTabsContext()
    return (
        <div
            className={css({
                flexShrink: "0",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                padding: "0.5rem",
                borderBottom: "1px solid",
                borderBottomColor: "neutral/10",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                })}
            >
                {props.start}
                {props.items.map((item) => (
                    <Button
                        key={item.key}
                        onClick={() => setActiveKey(item.key)}
                    >
                        <ButtonGhostContent
                            leftIcon={item.icon}
                            text={item.label}
                            isCurrent={item.key === activeKey}
                        />
                    </Button>
                ))}
            </div>
            <div
                className={css({
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                })}
            >
                {props.children}
            </div>
        </div>
    )
}

export function PageTabsNav(props: {
    items: readonly PageTabNavItem<string>[]
    start?: ReactNode
    children?: ReactNode
}) {
    return PageTabsNavImpl(props)
}
