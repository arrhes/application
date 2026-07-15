import { IconLoader2 } from "@tabler/icons-react"
import type { Styles } from "../../../styled-system/css/css"
import { css } from "../../utilities/cn.ts"

export function CircularLoader(props: { text?: string; className?: Styles; size?: number }) {
    return (
        <div
            className={css(
                {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100dvh",
                    gap: "0.5rem",
                    stroke: "neutral/50",
                },
                props.className,
            )}
        >
            <IconLoader2
                size={props.size ?? 16}
                className={css({
                    animation: "spin 1s linear infinite",
                    stroke: "inherit",
                })}
            />
            {props.text && (
                <span
                    className={css({
                        fontSize: "xs",
                        lineHeight: "none",
                        color: "neutral/25",
                        fontStyle: "italic",
                        whiteSpace: "nowrap",
                    })}
                >
                    {props.text}
                </span>
            )}
        </div>
    )
}
