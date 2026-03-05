import { IconAbacus } from "@tabler/icons-react"
import type { ComponentProps } from "react"
import { css } from "../../utilities/cn.ts"
import { ButtonGhostContent } from "../buttons/buttonGhostContent.tsx"

export function Logo(props: { className?: ComponentProps<"div">["className"]; withText?: boolean }) {
    return (
        <ButtonGhostContent
            leftIcon={<IconAbacus />}
            text={props.withText ? "Arrhes" : undefined}
            className={css({
                fontFamily: "mono",
            })}
        />
    )
}
