import { TabsProvider } from "../../contexts/tabs/tabsProvider.js"
import { DashboardShell } from "./dashboardShell.js"

export function DashboardLayout() {
    return (
        <TabsProvider>
            <DashboardShell />
        </TabsProvider>
    )
}
