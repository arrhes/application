import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import { css } from "../../../utilities/cn.js"

type ToastViewportProps = {
    children: ReactNode
}

export function ToastViewport(props: ToastViewportProps) {
    return createPortal(
        <div
            className={css({
                position: "fixed",
                bottom: "0",
                right: "0",
                zIndex: "100",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1rem",
                width: "100%",
                maxWidth: "sm",
                pointerEvents: "none",
            })}
        >
            {props.children}
        </div>,
        document.body,
    )
}
