import { cloneElement, isValidElement, type ReactElement } from "react"
import { usePopoverContext } from "./popoverRoot.js"

export function PopoverTrigger(props: {
    children: ReactElement
    /** When true the child element is used directly as the trigger (no wrapper button). */
    asChild?: boolean
}) {
    const { anchorName, isOpen, setOpen } = usePopoverContext()

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation()
        setOpen(!isOpen)
    }

    if (props.asChild && isValidElement(props.children)) {
        const child = props.children as ReactElement<Record<string, unknown>>
        return cloneElement(child, {
            ...child.props,
            "data-popover-trigger": "",
            style: {
                ...(child.props.style as React.CSSProperties | undefined),
                anchorName,
            },
            onClick: (e: React.MouseEvent) => {
                if (typeof child.props.onClick === "function") {
                    child.props.onClick(e)
                }
                handleClick(e)
            },
        })
    }

    return (
        <button
            type="button"
            data-popover-trigger=""
            style={
                {
                    anchorName,
                } as React.CSSProperties
            }
            onClick={handleClick}
        >
            {props.children}
        </button>
    )
}
