import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import type { Styles } from "../../../../styled-system/css/css"
import { css } from "../../../utilities/cn.js"
import { usePopoverContext } from "./popoverContext.js"

// ---------------------------------------------------------------------------
// CSS anchor positioning rules - injected once by PopoverContent renders.
// Uses data attributes so we cover all side/align combos with a stylesheet.
// ---------------------------------------------------------------------------

const ANCHOR_CSS = `
[data-popover-content][data-side="bottom"][data-align="start"] {
    position: fixed; position-anchor: var(--pos-anchor);
    top: calc(anchor(bottom) + var(--pos-side-offset, 4px));
    left: calc(anchor(left) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="bottom"][data-align="center"] {
    position: fixed; position-anchor: var(--pos-anchor);
    top: calc(anchor(bottom) + var(--pos-side-offset, 4px));
    left: anchor(center);
    translate: -50% 0;
}
[data-popover-content][data-side="bottom"][data-align="end"] {
    position: fixed; position-anchor: var(--pos-anchor);
    top: calc(anchor(bottom) + var(--pos-side-offset, 4px));
    right: calc(anchor(right) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="top"][data-align="start"] {
    position: fixed; position-anchor: var(--pos-anchor);
    bottom: calc(anchor(top) + var(--pos-side-offset, 4px));
    left: calc(anchor(left) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="top"][data-align="center"] {
    position: fixed; position-anchor: var(--pos-anchor);
    bottom: calc(anchor(top) + var(--pos-side-offset, 4px));
    left: anchor(center);
    translate: -50% 0;
}
[data-popover-content][data-side="top"][data-align="end"] {
    position: fixed; position-anchor: var(--pos-anchor);
    bottom: calc(anchor(top) + var(--pos-side-offset, 4px));
    right: calc(anchor(right) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="right"][data-align="start"] {
    position: fixed; position-anchor: var(--pos-anchor);
    left: calc(anchor(right) + var(--pos-side-offset, 4px));
    top: calc(anchor(top) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="right"][data-align="center"] {
    position: fixed; position-anchor: var(--pos-anchor);
    left: calc(anchor(right) + var(--pos-side-offset, 4px));
    top: anchor(center);
    translate: 0 -50%;
}
[data-popover-content][data-side="right"][data-align="end"] {
    position: fixed; position-anchor: var(--pos-anchor);
    left: calc(anchor(right) + var(--pos-side-offset, 4px));
    bottom: calc(anchor(bottom) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="left"][data-align="start"] {
    position: fixed; position-anchor: var(--pos-anchor);
    right: calc(anchor(left) + var(--pos-side-offset, 4px));
    top: calc(anchor(top) + var(--pos-align-offset, 0px));
}
[data-popover-content][data-side="left"][data-align="center"] {
    position: fixed; position-anchor: var(--pos-anchor);
    right: calc(anchor(left) + var(--pos-side-offset, 4px));
    top: anchor(center);
    translate: 0 -50%;
}
[data-popover-content][data-side="left"][data-align="end"] {
    position: fixed; position-anchor: var(--pos-anchor);
    right: calc(anchor(left) + var(--pos-side-offset, 4px));
    bottom: calc(anchor(bottom) + var(--pos-align-offset, 0px));
}
`

export function PopoverContent(props: {
    children?: ReactNode
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    sideOffset?: number
    alignOffset?: number
    className?: Styles
}) {
    const { isOpen, anchorName } = usePopoverContext()
    const side = props.side ?? "bottom"
    const align = props.align ?? "start"
    const sideOffset = props.sideOffset ?? 4
    const alignOffset = props.alignOffset ?? 0

    if (!isOpen || typeof document === "undefined") return null

    return createPortal(
        <>
            <style>{ANCHOR_CSS}</style>
            <div
                data-popover-content=""
                data-side={side}
                data-align={align}
                style={
                    {
                        "--pos-anchor": anchorName,
                        "--pos-side-offset": `${sideOffset}px`,
                        "--pos-align-offset": `${alignOffset}px`,
                        zIndex: 50,
                        minWidth: "anchor-size(width)",
                    } as React.CSSProperties
                }
                className={css(
                    {
                        backgroundColor: "white",
                        borderRadius: "lg",
                        boxShadow: "md",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        gap: "0.5rem",
                        border: "1px solid",
                        borderColor: "neutral/10",
                    },
                    props.className,
                )}
            >
                {props.children}
            </div>
        </>,
        document.body,
    )
}
