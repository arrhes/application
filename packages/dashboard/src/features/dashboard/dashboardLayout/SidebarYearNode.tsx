import { IconCalendar, IconPencil, IconReport, IconSettings } from "@tabler/icons-react"
import { useState } from "react"
import { TreeNode, TreeNodeLink } from "../../../components/layouts/tree/TreeNode.js"

type Year = {
    id: string
    label: string
}

export function SidebarYearNode({
    orgId,
    year,
    openTab,
}: {
    orgId: string
    year: Year
    openTab: (args: any, options?: any) => string
}) {
    const [expanded, setExpanded] = useState(false)

    return (
        <TreeNode
            icon={<IconCalendar size={14} />}
            label={year.label ?? year.id}
            depth={1}
            expanded={expanded}
            onToggle={() => setExpanded(!expanded)}
            onClick={() =>
                openTab({
                    component: "exercice-écritures",
                    props: {
                        idOrganization: orgId,
                        idYear: year.id,
                    },
                })
            }
        >
            <TreeNodeLink
                icon={<IconPencil size={14} />}
                label="Écritures"
                depth={2}
                onClick={() =>
                    openTab({
                        component: "exercice-écritures",
                        props: {
                            idOrganization: orgId,
                            idYear: year.id,
                        },
                    })
                }
            />
            <TreeNodeLink
                icon={<IconReport size={14} />}
                label="Documents"
                depth={2}
                onClick={() =>
                    openTab({
                        component: "exercice-documents",
                        props: {
                            idOrganization: orgId,
                            idYear: year.id,
                        },
                    })
                }
            />
            <TreeNodeLink
                icon={<IconSettings size={14} />}
                label="Paramètres"
                depth={2}
                onClick={() =>
                    openTab({
                        component: "exercice-paramètres",
                        props: {
                            idOrganization: orgId,
                            idYear: year.id,
                        },
                    })
                }
            />
        </TreeNode>
    )
}
