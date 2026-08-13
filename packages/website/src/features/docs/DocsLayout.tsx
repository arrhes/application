import { css } from "@comptasse/ui/utilities/cn.js"
import { Outlet } from "@tanstack/react-router"
import { useRef } from "react"
import { useDocScrollRestoration } from "./useDocScrollRestoration.js"

export function DocsLayout() {
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    useDocScrollRestoration(scrollContainerRef)

    return (
        <div
            className={css({
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                overflow: "hidden",
            })}
        >
            <div
                ref={scrollContainerRef}
                className={css({
                    flex: 1,
                    overflowY: "auto",
                    padding: {
                        base: "1rem",
                        md: "2rem",
                    },
                })}
            >
                <Outlet />
            </div>
        </div>
    )
}
