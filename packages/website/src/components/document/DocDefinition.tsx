import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBookmark } from "@tabler/icons-react"
import type { ReactNode } from "react"
import { DocTip } from "./DocTip.js"

export function DocDefinition(props: { term?: string; children: ReactNode }) {
    return (
        <DocTip
            variant="neutral"
            title="Définition"
            icon={IconBookmark}
        >
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    gap: "0.5rem",
                })}
            >
                {props.term && (
                    <dt
                        className={css({
                            fontWeight: "semibold",
                            color: "neutral",
                            fontSize: "sm",
                        })}
                    >
                        {props.term}
                    </dt>
                )}
                <dd
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "1.6",
                    })}
                >
                    {props.children}
                </dd>
            </div>
        </DocTip>
    )
}
