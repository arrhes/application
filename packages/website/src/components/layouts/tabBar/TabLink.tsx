import { css } from "@arrhes/ui/utilities/cn.js"
import { IconExternalLink } from "@tabler/icons-react"
import type { ReactNode } from "react"
import type { OpenTabArgs } from "../../../contexts/tabs/tabDefinitions.js"
import { useTabs } from "../../../contexts/tabs/useTabs.js"
import { ContextMenu } from "../../overlays/contextMenu/contextMenu.js"

type TabLinkProps = {
    args: OpenTabArgs
    children: ReactNode
}

/**
 * Wraps any clickable element with tab-navigation behaviour:
 * - Left-click  → navigate (replace current tab, or new tab if Ctrl/Meta held)
 * - Right-click → context menu with "Ouvrir" / "Ouvrir dans un nouvel onglet"
 *
 * The child element should NOT have its own openTab onClick; TabLink provides it.
 */
export function TabLink({ args, children }: TabLinkProps) {
    const { openTab } = useTabs()

    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger
                className={css({
                    display: "contents",
                })}
                onClick={() => openTab(args)}
            >
                {children}
            </ContextMenu.Trigger>
            <ContextMenu.Content>
                <ContextMenu.Item
                    leftIcon={<IconExternalLink />}
                    onClick={() => openTab(args)}
                >
                    Ouvrir
                </ContextMenu.Item>
                <ContextMenu.Item
                    leftIcon={<IconExternalLink />}
                    onClick={() =>
                        openTab(args, {
                            newTab: true,
                        })
                    }
                >
                    Ouvrir dans un nouvel onglet
                </ContextMenu.Item>
            </ContextMenu.Content>
        </ContextMenu.Root>
    )
}
