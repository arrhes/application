import { css } from "@comptasse/ui/utilities/cn.js"

const dim = css({
    color: "neutral/30",
})
const muted = css({
    color: "neutral/50",
})
const accent = css({
    color: "primary",
})
const success = css({
    color: "success",
})
const row = css({
    display: "block",
    whiteSpace: "pre",
})

export function ArchitectureDiagram() {
    return (
        <div
            className={css({
                width: "fit-content",
                maxWidth: "100%",
                height: "auto",
                display: "inline-block",
                fontFamily: "mono",
                fontSize: "xs",
                lineHeight: "1.3",
                color: "neutral/100",
                whiteSpace: "pre",
            })}
        >
            {/* Utilisateurs box */}
            <div className={row}>
                <span className={dim}>{"            ╭──────────────────╮"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"            │"}</span>
                <span className={muted}>{"   Utilisateurs   "}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"            ╰─────────┬────────╯"}</span>
            </div>

            {/* Center line from user */}
            <div className={row}>
                <span className={dim}>{"                      │"}</span>
            </div>

            {/* Branch to Dashboard, direct API line, and CLI */}
            <div className={row}>
                <span className={dim}>{"              ┌───────┼───────┐"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"              ▼       ▼       ▼"}</span>
            </div>

            {/* Dashboard and CLI boxes with central API line */}
            <div className={row}>
                <span className={dim}>{"        ╭───────────╮ │ ╭───────────╮"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"        │"}</span>
                <span className={accent}>{" Dashboard "}</span>
                <span className={dim}>{"│ │ │"}</span>
                <span className={accent}>{"    CLI    "}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"        ╰─────┬─────╯ │ ╰─────┬─────╯"}</span>
            </div>

            {/* Lines down from Dashboard / CLI and the direct API line */}
            <div className={row}>
                <span className={dim}>{"              │       │       │"}</span>
            </div>

            {/* Merge Dashboard and CLI back into the direct API line */}
            <div className={row}>
                <span className={dim}>{"              └───────┼───────┘"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"                      │"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"                      ▼"}</span>
            </div>

            {/* API box */}
            <div className={row}>
                <span className={dim}>{"              ╭───────────────╮"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"              │"}</span>
                <span className={success}>{"      API      "}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"              ╰───────┬───────╯"}</span>
            </div>

            {/* API to Database */}
            <div className={row}>
                <span className={dim}>{"                      │"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"                      ▼"}</span>
            </div>

            {/* Database box */}
            <div className={row}>
                <span className={dim}>{"              ╭───────────────╮"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"              │"}</span>
                <span className={muted}>{"   Database    "}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"              ╰───────────────╯"}</span>
            </div>
        </div>
    )
}
