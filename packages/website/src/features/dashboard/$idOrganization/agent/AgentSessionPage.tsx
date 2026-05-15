import { css } from "@arrhes/ui/css"
import { AgentSessionContent } from "./AgentSessionContent.tsx"

export function AgentSessionPage() {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
            })}
        >
            <AgentSessionContent />
        </div>
    )
}
