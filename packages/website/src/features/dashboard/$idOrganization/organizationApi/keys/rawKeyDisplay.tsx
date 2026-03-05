import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { useState } from "react"
import { toast } from "../../../../../contexts/toasts/useToast.ts"

export function RawKeyDisplay(props: { rawKey: string; onClose: () => void }) {
    const [copied, setCopied] = useState(false)

    async function handleCopy() {
        await navigator.clipboard.writeText(props.rawKey)
        setCopied(true)
        toast({ title: "Clé copiée" })
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className={css({ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" })}>
            <div className={css({ display: "flex", flexDirection: "column", gap: "0.5rem" })}>
                <span className={css({ fontSize: "sm", fontWeight: "medium", color: "neutral" })}>Votre clé API</span>
                <span className={css({ fontSize: "xs", color: "neutral/60" })}>
                    Copiez cette clé maintenant. Elle ne sera plus affichée.
                </span>
            </div>
            <div
                className={css({
                    padding: "0.75rem",
                    backgroundColor: "neutral/5",
                    borderRadius: "0.5rem",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                })}
            >
                <span
                    className={css({
                        fontFamily: "monospace",
                        fontSize: "xs",
                        wordBreak: "break-all",
                        color: "neutral",
                    })}
                >
                    {props.rawKey}
                </span>
                <Button onClick={handleCopy}>
                    <ButtonGhostContent
                        leftIcon={copied ? <IconCheck /> : <IconCopy />}
                        // text={copied ? "Copié" : "Copier"}
                    />
                </Button>
            </div>
            <div className={css({ display: "flex", gap: "0.5rem", justifyContent: "end" })}>
                <Button onClick={props.onClose}>
                    <ButtonPlainContent text="Fermer" />
                </Button>
            </div>
        </div>
    )
}
