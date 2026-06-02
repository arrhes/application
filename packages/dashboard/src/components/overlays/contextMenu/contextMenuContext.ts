import { createContext, useContext } from "react"

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
