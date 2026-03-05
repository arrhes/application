import { css } from "@arrhes/ui/utilities/cn.js"

export function ErrorPage() {
    return (
        <div
            className={css({
                minWidth: "100%",
                width: "100%",
                maxWidth: "100%",
                minH: "100%",
                height: "100%",
                maxH: "100%",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            })}
        >
            <p className={css({ color: "error", fontSize: "sm" })}>Erreur</p>
        </div>
    )
}
