import { css } from "@comptasse/ui/utilities/cn.js"
import { Outlet } from "@tanstack/react-router"
import { AppSidebar } from "./docs/AppSidebar.tsx"

export function RootLayout() {
    return (
        <div
            className={css({
                width: "100%",
                height: "100vh",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "stretch",
                backgroundColor: "background",
                overflow: "hidden",
            })}
        >
            <AppSidebar />

            {/* Main content */}
            <div
                className={css({
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                    overflow: "hidden",
                    backgroundColor: "white",
                })}
            >
                <div
                    className={css({
                        flex: 1,
                        overflowY: "auto",
                    })}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
