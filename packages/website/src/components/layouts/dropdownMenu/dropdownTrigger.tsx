import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithRef } from "react"

export function DropdownTrigger(props: ComponentPropsWithRef<typeof DropdownMenuTrigger>) {
    return (
        <DropdownMenuTrigger
            {...props}
            className={cx(
                css({
                    cursor: "pointer",
                    width: "fit",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    outline: "none",
                }),
                props.className,
            )}
        >
            {props.children}
        </DropdownMenuTrigger>
    )
}
