import { ContextMenuTrigger as RadixContextMenuTrigger } from "@radix-ui/react-context-menu"
import type { ComponentPropsWithRef } from "react"

export function ContextMenuTrigger(props: ComponentPropsWithRef<typeof RadixContextMenuTrigger>) {
    return <RadixContextMenuTrigger {...props}>{props.children}</RadixContextMenuTrigger>
}
