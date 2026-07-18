import { DashboardContextProvider } from "../../../contexts/dashboard/DashboardContextProvider.js"
import { SidebarContextProvider } from "../../../contexts/sidebar/SidebarContextProvider.js"
import { TabsProvider } from "../../../contexts/tabs/tabsProvider.tsx"
import { DashboardShell } from "./DashboardShell.tsx"

export function DashboardLayout() {
    return (
        <DashboardContextProvider>
            <SidebarContextProvider>
                <TabsProvider>
                    <DashboardShell />
                </TabsProvider>
            </SidebarContextProvider>
        </DashboardContextProvider>
    )
}
