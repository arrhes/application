import { css } from "@arrhes/ui/utilities/cn.js"

export function Logo() {
    return (
        <div
            className={css({
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            })}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1024 1024"
                className={css({
                    flexShrink: "0",
                    fill: "neutral",
                    height: "16px",
                    width: "16px",
                })}
            >
                <g>
                    <polygon points="484 0 0 0 0 474 280 600 280 280 600 280 484 0" />
                    <polygon points="890 1024 420 1024 550 744 744 744 744 400 1024 288 1024 740 890 1024" />
                </g>
            </svg>
        </div>
    )
}
