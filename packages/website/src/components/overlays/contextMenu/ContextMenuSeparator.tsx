import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { ContextMenuSeparator as RadixContextMenuSeparator } from "@radix-ui/react-context-menu"
import type { ComponentPropsWithRef } from "react"

export function ContextMenuSeparator(props: ComponentPropsWithRef<typeof RadixContextMenuSeparator>) {
    return (
        <RadixContextMenuSeparator
            {...props}
            className={cx(
                css({
                    width: "100%",
                    height: "1px",
                    backgroundColor: "neutral/10",
                }),
                props.className,
            )}
        />
    )
}
