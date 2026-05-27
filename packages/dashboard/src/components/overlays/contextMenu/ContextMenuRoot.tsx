import { createContext, type ReactNode, useContext, useState } from "react"

type ContextMenuContextValue = {
    open: boolean
    position: {
        x: number
        y: number
    }
    openMenu: (x: number, y: number) => void
    closeMenu: () => void
}

export const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

export function useContextMenu() {
    return useContext(ContextMenuContext)
}

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
