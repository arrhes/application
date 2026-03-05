import { css } from "@arrhes/ui/utilities/cn.js"

export function FaqItem(props: { question: string; answer: string }) {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
            })}
        >
            <h3
                className={css({
                    fontSize: "sm",
                    fontWeight: "medium",
                    color: "neutral",
                })}
            >
                {props.question}
            </h3>
            <p
                className={css({
                    fontSize: "sm",
                    color: "neutral/60",
                    lineHeight: "relaxed",
                    margin: 0,
                })}
            >
                {props.answer}
            </p>
        </div>
    )
}
