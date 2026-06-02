import { type ReactNode, useState } from "react"
import { ContextMenuContext } from "./contextMenuContext.js"

type ContextMenuRootProps = {
    children: ReactNode
    onOpenChange?: (open: boolean) => void
}

export function ContextMenuRoot({ children, onOpenChange }: ContextMenuRootProps) {
    const [open, setOpen] = useState(false)
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    })

    function openMenu(x: number, y: number) {
        setPosition({
            x,
            y,
        })
        setOpen(true)
        onOpenChange?.(true)
    }

    function closeMenu() {
        setOpen(false)
        onOpenChange?.(false)
    }

    return (
        <ContextMenuContext
            value={{
                open,
                position,
                openMenu,
                closeMenu,
            }}
        >
            {children}
        </ContextMenuContext>
    )
}
