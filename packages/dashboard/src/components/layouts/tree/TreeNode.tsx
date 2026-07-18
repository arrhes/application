import { Button, ButtonGhostContent } from "@arrhes/ui"
import { cn, css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import type { Icon, IconProps } from "@tabler/icons-react"
import type { ReactElement, ReactNode } from "react"

type TreeNodeProps = {
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    label: string
    expanded?: boolean
    active?: boolean
    depth?: number
    onToggle?: () => void
    onClick?: () => void
    children?: ReactNode
}

export function TreeNode({
    icon,
    label,
    expanded = false,
    active = false,
    depth = 0,
    onToggle,
    onClick,
    children,
}: TreeNodeProps) {
    const hasChildren = children !== undefined
    const canToggle = hasChildren && onToggle !== undefined

    return (
        <div>
            <div
                className={cn(
                    css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.25rem",
                        padding: "0.375rem 0.5rem",
                        paddingLeft: `${0.75 + depth * 1.25}rem`,
                        borderRadius: "md",
                        cursor: "pointer",
                        fontSize: "sm",
                        color: active ? "primary" : "neutral/70",
                        backgroundColor: active ? "primary/8" : "transparent",
                        transition: "background 0.1s, color 0.1s",
                        _hover: {
                            backgroundColor: active ? "primary/12" : "neutral/5",
                        },
                        userSelect: "none",
                        whiteSpace: "nowrap",
                    }),
                )}
                onClick={() => {
                    if (canToggle) onToggle()
                    if (onClick) onClick()
                }}
                role="treeitem"
                aria-expanded={hasChildren ? expanded : undefined}
            >
                {hasChildren && (
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "1rem",
                            height: "1rem",
                            flexShrink: 0,
                            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                            transition: "transform 0.15s",
                            color: "neutral/40",
                        })}
                    >
                        <IconChevronRight size={14} />
                    </span>
                )}
                {!hasChildren && (
                    <span
                        className={css({
                            width: "1rem",
                            flexShrink: 0,
                        })}
                    />
                )}
                {icon && (
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            flexShrink: 0,
                            color: active ? "primary" : "neutral/50",
                        })}
                    >
                        {icon}
                    </span>
                )}
                <span
                    className={css({
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        minWidth: 0,
                    })}
                >
                    {label}
                </span>
            </div>
            {hasChildren && expanded && (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                    })}
                >
                    {children}
                </div>
            )}
        </div>
    )
}

type TreeNodeLinkProps = {
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    label: string
    active?: boolean
    depth?: number
    onClick: () => void
}

export function TreeNodeLink({ icon, label, active = false, depth = 0, onClick }: TreeNodeLinkProps) {
    return (
        <div
            className={cn(
                css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.375rem",
                    padding: "0.375rem 0.5rem",
                    paddingLeft: `${1.75 + depth * 1.25}rem`,
                    borderRadius: "md",
                    cursor: "pointer",
                    fontSize: "sm",
                    color: active ? "primary" : "neutral/60",
                    backgroundColor: active ? "primary/8" : "transparent",
                    transition: "background 0.1s, color 0.1s",
                    _hover: {
                        backgroundColor: active ? "primary/12" : "neutral/5",
                    },
                    userSelect: "none",
                    whiteSpace: "nowrap",
                }),
            )}
            onClick={onClick}
            role="treeitem"
        >
            {icon && (
                <span
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        flexShrink: 0,
                        color: active ? "primary" : "neutral/40",
                    })}
                >
                    {icon}
                </span>
            )}
            <span
                className={css({
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    minWidth: 0,
                })}
            >
                {label}
            </span>
        </div>
    )
}
