import { type ComponentPropsWithRef, cloneElement, isValidElement, type ReactElement } from "react"
import { useContextMenu } from "./ContextMenuRoot.js"

type ContextMenuTriggerProps = ComponentPropsWithRef<"div"> & {
    asChild?: boolean
}

export function ContextMenuTrigger({ children, asChild, ...props }: ContextMenuTriggerProps) {
    const ctx = useContextMenu()

    function handleContextMenu(e: React.MouseEvent) {
        e.preventDefault()
        ctx?.openMenu(e.clientX, e.clientY)
    }

    if (asChild && isValidElement(children)) {
        const child = children as ReactElement<Record<string, unknown>>
        return cloneElement(child, {
            ...child.props,
            onContextMenu: (e: React.MouseEvent) => {
                handleContextMenu(e)
                ;(child.props.onContextMenu as ((e: React.MouseEvent) => void) | undefined)?.(e)
            },
        })
    }

    return (
        <div
            {...props}
            onContextMenu={handleContextMenu}
        >
            {children}
        </div>
    )
}
