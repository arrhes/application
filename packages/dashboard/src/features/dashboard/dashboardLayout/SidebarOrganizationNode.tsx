import { readAllYearsRouteDefinition } from "@arrhes/application-metadata/routes"
import { IconCalendar, IconSettings, IconCloud, IconPencil, IconReport, IconBuilding } from "@tabler/icons-react"
import { useState, useMemo } from "react"
import { TreeNode, TreeNodeLink } from "../../../components/layouts/tree/TreeNode.js"
import { useDataFromAPI } from "../../../utilities/useHTTPData.js"
import { SidebarYearNode } from "./SidebarYearNode.js"

type Org = {
    id: string
    name?: string
}

export function SidebarOrganizationNode({
    org,
    openTab,
}: {
    org: Org
    openTab: (args: any, options?: any) => string
}) {
    const [expanded, setExpanded] = useState(false)
    const yearsResponse = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: { idOrganization: org.id },
        enabled: expanded,
    })

    const years = useMemo(() => {
        if (!yearsResponse.data) return []
        return yearsResponse.data
    }, [yearsResponse.data])

    return (
        <TreeNode
            icon={<IconBuilding size={16} />}
            label={org.name ?? org.id}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            onClick={() =>
                openTab({
                    component: "exercices",
                    props: { idOrganization: org.id },
                })
            }
        >
            {expanded && yearsResponse.isLoading && (
                <div
                    style={{
                        padding: "0.375rem 0.5rem",
                        paddingLeft: "1.75rem",
                        fontSize: "0.75rem",
                        color: "var(--colors-neutral-40)",
                    }}
                >
                    Chargement...
                </div>
            )}
            {years.map((year: any) => (
                <SidebarYearNode
                    key={year.id}
                    orgId={org.id}
                    year={year}
                    openTab={openTab}
                />
            ))}
            <TreeNodeLink
                icon={<IconUsers size={14} />}
                label="Membres"
                depth={1}
                onClick={() =>
                    openTab({
                        component: "membres",
                        props: { idOrganization: org.id },
                    })
                }
            />
            <TreeNodeLink
                icon={<IconCloud size={14} />}
                label="Stockage"
                depth={1}
                onClick={() =>
                    openTab({
                        component: "organisation-stockage",
                        props: { idOrganization: org.id },
                    })
                }
            />
            <TreeNodeLink
                icon={<IconSettings size={14} />}
                label="Paramètres"
                depth={1}
                onClick={() =>
                    openTab({
                        component: "organisation-paramètres",
                        props: { idOrganization: org.id },
                    })
                }
            />
        </TreeNode>
    )
}
