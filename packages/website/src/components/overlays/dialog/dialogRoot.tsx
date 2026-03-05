import * as DialogPrimitive from "@radix-ui/react-dialog"
import type { ComponentPropsWithRef } from "react"

export function DialogRoot(props: ComponentPropsWithRef<typeof DialogPrimitive.Root>) {
    return (
        <DialogPrimitive.Root {...props} modal={true}>
            {props.children}
        </DialogPrimitive.Root>
    )
}
