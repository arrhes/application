import { type ReactElement, cloneElement, isValidElement } from "react"
import { usePopoverContext } from "./popoverRoot.js"

export function PopoverClose(props: {
    children: ReactElement
    asChild?: boolean
}) {
    const { setOpen } = usePopoverContext()

    function handleClick() {
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
                handleClick()
            },
        })
    }

    return (
        <button type="button" onClick={handleClick}>
            {props.children}
        </button>
    )
}
