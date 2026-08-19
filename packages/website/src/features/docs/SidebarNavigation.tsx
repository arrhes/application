import { css } from "@comptasse/ui/utilities/cn.js"
import { useState } from "react"
import { DocsTreeNode } from "./DocsTreeNode.tsx"
import { DocsTreeNodeLink } from "./DocsTreeNodeLink.tsx"
import type { NodeItem } from "./NodeItem.js"

function isPathInSection(node: NodeItem[number], pathname: string): boolean {
    if (node.path != null && (pathname === node.path || pathname.startsWith(`${node.path}/`))) return true
    if (node.children) {
        for (const child of node.children) {
            if (isPathInSection(child, pathname)) return true
        }
    }
    return false
}

function SectionNode({
    node,
    pathname,
    depth,
    onClick,
}: {
    node: NodeItem[number]
    pathname: string
    depth: number
    onClick?: () => void
}) {
    const hasChildren = (node.children?.length ?? 0) > 0
    const [expanded, setExpanded] = useState(() => isPathInSection(node, pathname))
    const [prevPathname, setPrevPathname] = useState(pathname)

    if (prevPathname !== pathname) {
        setPrevPathname(pathname)
        if (isPathInSection(node, pathname)) {
            setExpanded(true)
        }
    }

    if (!hasChildren) {
        if (node.path == null) return null
        return (
            <DocsTreeNodeLink
                icon={node.icon}
                path={node.path}
                label={node.label}
                active={pathname === node.path}
                depth={depth}
                onClick={onClick}
            />
        )
    }

    return (
        <DocsTreeNode
            icon={node.icon}
            label={node.label}
            depth={depth}
            expanded={expanded}
            active={false}
            onToggle={() => setExpanded(!expanded)}
        >
            {node.children?.map((child) => (
                <SectionNode
                    key={child.path ?? child.label}
                    node={child}
                    pathname={pathname}
                    depth={depth + 1}
                    onClick={onClick}
                />
            ))}
        </DocsTreeNode>
    )
}

export function SidebarNavigation(props: {
    navigation: NodeItem
    pathname: string
    depth?: number
    onClick?: () => void
}) {
    const depth = props.depth ?? 0

    return (
        <nav
            className={css({
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
                minHeight: "fit-content",
            })}
        >
            {props.navigation.map((node) => (
                <SectionNode
                    key={node.path ?? node.label}
                    node={node}
                    pathname={props.pathname}
                    depth={depth}
                    onClick={props.onClick}
                />
            ))}
        </nav>
    )
}
