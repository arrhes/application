import { css } from "@arrhes/ui/utilities/cn.js"
import { Outlet } from "@tanstack/react-router"

export function RootLayout() {
    return (
        <div
            className={css({
                position: "relative",
                minHeight: "100dvh",
                width: "100%",
                maxWidth: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                overflowX: "hidden",
                overflowY: "auto",
            })}
        >
            <Outlet />
        </div>
    )
}
