import { css } from "@arrhes/ui/utilities/cn.js"

export function DocParagraph(props: { children: React.ReactNode }) {
    return (
        <p
            className={css({
                color: "neutral/70",
                lineHeight: "1.75",
                fontSize: "sm",
            })}
        >
            {props.children}
        </p>
    )
}
