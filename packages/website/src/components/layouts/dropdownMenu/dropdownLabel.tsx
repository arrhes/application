import { css } from "@arrhes/ui/utilities/cn.js"
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu"
import type { ComponentPropsWithRef } from "react"

export function DropdownLabel(props: ComponentPropsWithRef<typeof DropdownMenuLabel>) {
    return (
        <DropdownMenuLabel
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
        </DropdownMenuLabel>
    )
}
