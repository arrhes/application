import { css } from "@comptasse/ui/utilities/cn.js"
import { Outlet } from "@tanstack/react-router"

export function DocsLayout() {
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
