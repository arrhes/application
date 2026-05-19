import { Kbd } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"

export function DashboardDefaultPage() {
    return (
        <div
            className={css({
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                padding: "3rem 1rem",
                color: "neutral/500",
                textAlign: "center",
            })}
        >
            <p
                className={css({
                    fontSize: "1rem",
                    fontWeight: "500",
                    color: "neutral/700",
                })}
            >
                Aucun onglet ouvert
            </p>
            <p
                className={css({
                    maxWidth: "300px",
                    fontSize: "0.875rem",
                    lineHeight: "1.6",
                })}
            >
                Ouvrez un nouvel onglet avec le raccourci clavier <Kbd>Ctrl+K</Kbd> ou la barre de recherche en haut de
                la page.
            </p>
        </div>
    )
}
