import { css } from "@comptasse/ui/utilities/cn.js"

export function DocSourceRef(props: { n: number }) {
    return (
        <sup>
            <a
                href={`#source-${props.n}`}
                className={css({
                    fontSize: "0.625rem",
                    fontWeight: "semibold",
                    color: "primary",
                    textDecoration: "none",
                    cursor: "pointer",
                    _hover: {
                        textDecoration: "underline",
                    },
                    transition: "all 0.15s",
                })}
            >
                [{props.n}]
            </a>
        </sup>
    )
}
