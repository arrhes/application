import { css } from "@arrhes/ui/utilities/cn.js"

export function DocTextSection(props: { title: string; children: React.ReactNode }) {
    return (
        <section
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
            })}
        >
            <h2
                className={css({
                    fontSize: "md",
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
                    gap: "0.5rem",
                    fontSize: "sm",
                    color: "neutral/70",
                    lineHeight: "relaxed",
                    "& p": {
                        margin: 0,
                    },
                    "& ul, & ol": {
                        margin: 0,
                        paddingLeft: "1.5rem",
                    },
                    "& li": {
                        marginBottom: "0.25rem",
                    },
                    "& strong": {
                        color: "neutral",
                        fontWeight: "medium",
                    },
                    "& code": {
                        backgroundColor: "neutral/5",
                        padding: "0.125rem 0.375rem",
                        borderRadius: "sm",
                        fontFamily: "mono",
                        fontSize: "xs",
                    },
                })}
            >
                {props.children}
            </div>
        </section>
    )
}
