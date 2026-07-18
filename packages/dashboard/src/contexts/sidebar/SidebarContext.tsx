import { createContext, useContext } from "react"

type SidebarContextValue = {
    open: boolean
    width: number
    toggle: () => void
    setWidth: (width: number) => void
}

export const SidebarContext = createContext<SidebarContextValue>({
    open: true,
    width: 280,
    toggle: () => {},
    setWidth: () => {},
})

export function useSidebarContext() {
    return useContext(SidebarContext)
}
