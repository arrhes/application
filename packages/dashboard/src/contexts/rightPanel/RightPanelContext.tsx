import { createContext, useContext } from "react"
import type { ReactNode } from "react"

type RightPanelContextValue = {
    openPanel: (children: ReactNode, title: string) => void
    closePanel: () => void
}

export const RightPanelContext = createContext<RightPanelContextValue>({
    openPanel: () => {},
    closePanel: () => {},
})

export function useRightPanel() {
    return useContext(RightPanelContext)
}
