import { createContext, type ReactNode, use, useCallback, useMemo, useState } from "react"

type ContextMenuContextValue = {
    open: boolean
    position: {
        x: number
        y: number
    }
    openMenu: (x: number, y: number) => void
    closeMenu: () => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null)

export function useContextMenu() {
    return use(ContextMenuContext)
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

    const openMenu = useCallback(
        (x: number, y: number) => {
            setPosition({
                x,
                y,
            })
            setOpen(true)
            onOpenChange?.(true)
        },
        [
            onOpenChange,
        ],
    )

    const closeMenu = useCallback(() => {
        setOpen(false)
        onOpenChange?.(false)
    }, [
        onOpenChange,
    ])

    const contextValue = useMemo(
        () => ({
            open,
            position,
            openMenu,
            closeMenu,
        }),
        [
            open,
            position,
            openMenu,
            closeMenu,
        ],
    )

    return <ContextMenuContext value={contextValue}>{children}</ContextMenuContext>
}
