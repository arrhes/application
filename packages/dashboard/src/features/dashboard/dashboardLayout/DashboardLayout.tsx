import { DashboardContextProvider } from "../../../contexts/dashboard/DashboardContextProvider.js"
import { TabsProvider } from "../../../contexts/tabs/tabsProvider.tsx"
import { DashboardShell } from "./DashboardShell.tsx"

export function DashboardLayout() {
    return (
        <DashboardContextProvider>
            <TabsProvider>
                <DashboardShell />
            </TabsProvider>
        </DashboardContextProvider>
    )
}
