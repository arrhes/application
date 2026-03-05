import { css } from "@arrhes/ui/utilities/cn.js"

export function DocSection(props: { title: string; children: React.ReactNode }) {
    const id = props.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")

    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <h2
                id={id}
                className={css({
                    fontSize: "xl",
                    fontWeight: "semibold",
                    color: "neutral",
                })}
            >
                {props.title}
            </h2>
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                {props.children}
            </div>
        </section>
    )
}
