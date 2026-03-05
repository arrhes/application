import { css } from "@arrhes/ui/utilities/cn.js"
import { Outlet } from "@tanstack/react-router"
import { useDeviceDetect } from "../utilities/useDeviceDetect.js"

export function RootLayout() {
    const { isMobile } = useDeviceDetect()

    if (isMobile === true) {
        ;<div
            className={css({
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "warning/5",
                padding: "4",
            })}
        >
            <span className={css({ color: "warning" })}>
                La plateforme n'est pas encore disponible sur mobile.
                <br />
                Veuillez utiliser un ordinateur ou passer votre navigateur mobile en mode ordinateur.
            </span>
        </div>
    }
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
