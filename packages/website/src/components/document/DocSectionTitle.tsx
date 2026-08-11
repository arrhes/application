import { css } from "@comptasse/ui/utilities/cn.js"

const headingLevels = [
    "h2",
    "h3",
    "h4",
] as const

export function DocSectionTitle(props: { title: string; depth?: number }) {
    const id = props.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")

    const depth = props.depth ?? 0
    const Heading = headingLevels[Math.min(depth, headingLevels.length - 1)]

    return (
        <Heading
            id={id}
            className={css({
                fontSize: depth === 0 ? "xl" : "lg",
                fontWeight: "semibold",
                color: "neutral",
            })}
        >
            {props.title}
        </Heading>
    )
}
