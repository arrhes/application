import type { ReactNode } from "react"
import { useCallback, useState } from "react"
import { RightPanel } from "../../components/layouts/RightPanel.js"
import { RightPanelContext } from "./RightPanelContext.js"

export function RightPanelContextProvider({ children }: { children: ReactNode }) {
    const [panelContent, setPanelContent] = useState<{ children: ReactNode; title: string } | null>(null)

    const openPanel = useCallback((children: ReactNode, title: string) => {
        setPanelContent({ children, title })
    }, [])

    const closePanel = useCallback(() => {
        setPanelContent(null)
    }, [])

    return (
        <RightPanelContext.Provider value={{ openPanel, closePanel }}>
            {children}
            <RightPanel open={panelContent !== null} onClose={closePanel} title={panelContent?.title ?? ""}>
                {panelContent?.children}
            </RightPanel>
        </RightPanelContext.Provider>
    )
}
