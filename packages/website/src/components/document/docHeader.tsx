import { css } from "@arrhes/ui/utilities/cn.js"

export function DocHeader(props: { title: string; description: string }) {
    return (
        <div className={css({ mb: "8" })}>
            <h1
                className={css({
                    fontSize: "lg",
                    fontWeight: "bold",
                    color: "neutral",
                    mb: "1",
                })}
            >
                {props.title}
            </h1>
            <p
                className={css({
                    color: "neutral/60",
                    fontSize: "sm",
                    lineHeight: "relaxed",
                })}
            >
                {props.description}
            </p>
        </div>
    )
}
