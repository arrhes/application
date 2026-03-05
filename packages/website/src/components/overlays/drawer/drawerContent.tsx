import { css, cx } from "@arrhes/ui/utilities/cn.js"
import { type JSX, useCallback, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useDrawerContext } from "./drawerRoot.js"

export function DrawerContent(props: { children: JSX.Element | JSX.Element[]; className?: string }) {
    const { open, setOpen } = useDrawerContext()
    const [mounted, setMounted] = useState(false)
    const [visible, setVisible] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    // Mount when open becomes true, then trigger visible for animations
    useEffect(() => {
        if (open) {
            setMounted(true)
            // Trigger animation on next frame after mount
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setVisible(true)
                })
            })
        } else {
            setVisible(false)
            const timer = setTimeout(() => {
                setMounted(false)
            }, 200)
            return () => clearTimeout(timer)
        }
    }, [open])

    // Handle Escape key
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setOpen(false)
            }
        },
        [setOpen],
    )

    useEffect(() => {
        if (mounted) {
            document.addEventListener("keydown", handleKeyDown)
            // Prevent body scroll when drawer is open
            const originalOverflow = document.body.style.overflow
            document.body.style.overflow = "hidden"
            return () => {
                document.removeEventListener("keydown", handleKeyDown)
                document.body.style.overflow = originalOverflow
            }
        }
    }, [mounted, handleKeyDown])

    if (!mounted) return null

    return createPortal(
        <>
            {/* Overlay */}
            <div
                className={cx(
                    css({
                        position: "fixed",
                        zIndex: "10",
                        inset: "0",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "neutral/10",
                        transition: "opacity 0.2s ease",
                    }),
                    visible ? css({ opacity: 1 }) : css({ opacity: 0 }),
                )}
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />
            {/* Content */}
            <div
                ref={contentRef}
                role="dialog"
                aria-modal="true"
                className={cx(
                    css({
                        position: "fixed",
                        zIndex: "10",
                        top: "1rem",
                        right: "1rem",
                        bottom: "1rem",
                        minWidth: "100%",
                        width: "100%",
                        maxWidth: "calc(100% - 2rem)",
                        height: "calc(100% - 2rem)",
                        overflowY: "auto",
                        backgroundColor: "white",
                        borderRadius: "lg",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                        md: {
                            minWidth: "md",
                            maxWidth: "md",
                        },
                    }),
                    visible
                        ? css({
                              opacity: 1,
                              transform: "scale(1)",
                          })
                        : css({
                              opacity: 0,
                              transform: "scale(0.96)",
                          }),
                    props.className,
                )}
            >
                {props.children}
            </div>
        </>,
        document.body,
    )
}
