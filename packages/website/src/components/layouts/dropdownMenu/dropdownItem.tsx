import { css } from "@arrhes/ui/utilities/cn.js"
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithRef } from "react"

export function DropdownItem(props: ComponentPropsWithRef<typeof DropdownMenuItem>) {
    return (
        <DropdownMenuItem
            {...props}
            className={css({
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                outline: "none",
            })}
        >
            {props.children}
        </DropdownMenuItem>
    )
}
