import { cloneElement, isValidElement, type ReactElement } from "react"
import { usePopoverContext } from "./popoverContext.js"

export function PopoverClose(props: { children: ReactElement; asChild?: boolean }) {
    const { setOpen } = usePopoverContext()

    function closePopover() {
        setOpen(false)
    }

    if (props.asChild && isValidElement(props.children)) {
        const child = props.children as ReactElement<Record<string, unknown>>
        return cloneElement(child, {
            ...child.props,
            onClick: (e: React.MouseEvent) => {
                if (typeof child.props.onClick === "function") {
                    child.props.onClick(e)
                }
                closePopover()
            },
        })
    }

    return (
        <button
            type="button"
            onClick={closePopover}
        >
            {props.children}
        </button>
    )
}
