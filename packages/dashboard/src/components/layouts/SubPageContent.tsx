import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { Icon, IconProps } from "@tabler/icons-react"
import { type ReactElement, type ReactNode, useEffect, useRef, useState } from "react"

type SectionItem = {
    key: string
    label: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    content: ReactNode
}

type Section = {
    title?: string
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    items: SectionItem[]
}

/** State-based tab navigation — no TanStack Router required. */
export function SubPageContent(props: {
    sections: Record<string, Section>
    defaultKey?: string
    children?: ReactNode
}) {
    const allItems = Object.values(props.sections).flatMap((s) => s.items)
    const firstKey = props.defaultKey ?? allItems[0]?.key ?? ""
    const [activeKey, setActiveKey] = useState(firstKey)
    const prevDefaultKey = useRef(props.defaultKey)

    useEffect(() => {
        if (props.defaultKey && props.defaultKey !== prevDefaultKey.current) {
            prevDefaultKey.current = props.defaultKey
            if (allItems.some((i) => i.key === props.defaultKey)) {
                setActiveKey(props.defaultKey)
            }
        }
    }, [
        props.defaultKey,
        allItems,
    ])

    const activeContent = allItems.find((i) => i.key === activeKey)?.content ?? null

    return (
        <div
            className={css({
                width: "100%",
                flex: 1,
                minHeight: 0,
                display: "flex",
                flexDirection: "column",
            })}
        >
            {/* Tab bar */}
            <div
                className={css({
                    flexShrink: "0",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                    flexWrap: "wrap",
                    padding: "1rem",
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
                    {allItems.map((item) => (
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
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    })}
                >
                    {props.children}
                </div>
            </div>

            {/* Active tab content */}
            <div
                className={css({
                    width: "100%",
                    flex: 1,
                    minHeight: 0,
                    overflowY: "auto",
                    padding: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    gap: "1rem",
                })}
            >
                {activeContent}
            </div>
        </div>
    )
}
