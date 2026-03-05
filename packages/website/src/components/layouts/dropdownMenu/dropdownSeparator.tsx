import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithRef } from "react"

export function DropdownSeparator(props: ComponentPropsWithRef<typeof DropdownMenuSeparator>) {
    return (
        <DropdownMenuSeparator
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
