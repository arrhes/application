import { DashboardContextProvider } from "../../../contexts/dashboard/DashboardContextProvider.js"
import { RightPanelContextProvider } from "../../../contexts/rightPanel/RightPanelContextProvider.js"
import { SidebarContextProvider } from "../../../contexts/sidebar/SidebarContextProvider.js"
import { DashboardShell } from "./DashboardShell.tsx"

export function DashboardLayout() {
    return (
        <DashboardContextProvider>
            <SidebarContextProvider>
                <RightPanelContextProvider>
                    <DashboardShell />
                </RightPanelContextProvider>
            </SidebarContextProvider>
        </DashboardContextProvider>
    )
}
