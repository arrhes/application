import { getAllMyOrganizationsRouteDefinition } from "@arrhes/application-metadata/routes"
import { useMemo } from "react"
import { TreeSection } from "../../../components/layouts/tree/TreeSection.js"
import { useTabs } from "../../../contexts/tabs/useTabs.js"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import { SidebarOrganizationNode } from "./SidebarOrganizationNode.js"

export function SidebarNavigation() {
    const { openTab } = useTabs()
    const orgsResponse = useDataFromAPI({
        routeDefinition: getAllMyOrganizationsRouteDefinition,
        body: {},
    })

    const orgs = useMemo(() => {
        if (!orgsResponse.data) return []
        return orgsResponse.data.filter((item: any) => item.organization)
    }, [orgsResponse.data])

    return (
        <nav
            role="tree"
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                height: "100%",
                overflowY: "auto",
                padding: "0.75rem 0.5rem",
            }}
        >
            <TreeSection title="Organisations">
                {orgs.length === 0 && (
                    <div
                        style={{
                            padding: "1rem 0.75rem",
                            fontSize: "0.75rem",
                            color: "var(--colors-neutral-40)",
                        }}
                    >
                        {orgsResponse.isLoading ? "Chargement..." : "Aucune organisation"}
                    </div>
                )}
                {orgs.map((item: any) => {
                    const org = item.organization
                    return (
                        <SidebarOrganizationNode
                            key={org.id}
                            org={org}
                            openTab={openTab}
                        />
                    )
                })}
            </TreeSection>
        </nav>
    )
}
