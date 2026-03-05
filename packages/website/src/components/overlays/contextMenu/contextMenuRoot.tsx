import { ContextMenu } from "@radix-ui/react-context-menu"
import type { ComponentPropsWithRef } from "react"

export function ContextMenuRoot(props: ComponentPropsWithRef<typeof ContextMenu>) {
    return (
        <ContextMenu {...props} modal={false}>
            {props.children}
        </ContextMenu>
    )
}
