import { Button, ButtonGhostContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import type { Icon, IconProps } from "@tabler/icons-react"
import { type ReactElement, type ReactNode, useState } from "react"

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

type Props = {
    sections: Record<string, Section>
    defaultKey?: string
}

/** State-based tab navigation — no TanStack Router required. */
export function SubPageContent({ sections, defaultKey }: Props) {
    const firstKey = defaultKey ?? Object.values(sections).flatMap((s) => s.items)[0]?.key ?? ""
    const [activeKey, setActiveKey] = useState(firstKey)

    const allItems = Object.values(sections).flatMap((s) => s.items)
    const activeContent = allItems.find((i) => i.key === activeKey)?.content ?? null

    return (
        <div
            className={css({
                width: "100%",
                flex: "1",
                flexShrink: "0",
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
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    paddingX: "1rem",
                    paddingY: "0.5rem",
                    borderBottom: "1px solid",
                    borderBottomColor: "neutral/10",
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

            {/* Active tab content */}
            <div
                className={css({
                    width: "100%",
                    padding: {
                        base: "1rem",
                        md: "2rem",
                    },
                })}
            >
                {activeContent}
            </div>
        </div>
    )
}
