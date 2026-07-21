import { createContext, useContext } from "react"

type SidebarContextValue = {
    width: number
    setWidth: (width: number) => void
}

export const SidebarContext = createContext<SidebarContextValue>({
    width: 280,
    setWidth: () => {},
})

export function useSidebarContext() {
    return useContext(SidebarContext)
}
