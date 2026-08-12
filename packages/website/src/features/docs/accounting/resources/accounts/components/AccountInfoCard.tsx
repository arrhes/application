import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBookmark } from "@tabler/icons-react"
import type { AccountEntry } from "../accountsData.js"
import { InfoRow } from "./InfoRow.js"

export function AccountInfoCard(props: { entry: AccountEntry }) {
    const { entry } = props

    return (
        <div
            className={css({
                padding: "1.5rem",
                borderRadius: "lg",
                backgroundColor: "white",
                border: "1px solid",
                borderColor: "neutral/15",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            <div
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                <IconBookmark
                    size={12}
                    className={css({
                        stroke: "neutral/50",
                        flexShrink: 0,
                    })}
                />
                <span
                    className={css({
                        fontSize: "xs",
                        fontWeight: "medium",
                        color: "neutral/50",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    })}
                >
                    Fiche du compte
                </span>
            </div>

            <div
                className={css({
                    display: "grid",
                    gridTemplateColumns: {
                        base: "1fr",
                        md: "1fr 1fr",
                    },
                    gap: "0.75rem",
                })}
            >
                <InfoRow
                    label="Numéro"
                    value={entry.number}
                />
                <InfoRow
                    label="Intitulé"
                    value={entry.label}
                />
                <InfoRow
                    label="Classe"
                    value={`${entry.classNumber} - ${entry.className}`}
                />
                <InfoRow
                    label="Type"
                    value={entry.type === "bilan" ? "Bilan" : "Résultat"}
                />
                <InfoRow
                    label="Position"
                    value={entry.side.charAt(0).toUpperCase() + entry.side.slice(1)}
                />
                <InfoRow
                    label="Système"
                    value={entry.isOptional ? "Facultatif" : "Minimal"}
                />
            </div>

            {entry.description && (
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral",
                        lineHeight: "1.75",
                        borderTop: "1px solid",
                        borderTopColor: "neutral/10",
                        paddingTop: "1rem",
                    })}
                >
                    {entry.description}
                </p>
            )}
        </div>
    )
}
