import { Button, ButtonGhostContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { useState } from "react"

export function DocCodeBlock(props: { children: string }) {
    const [copied, setCopied] = useState(false)

    function handleCopy() {
        void navigator.clipboard.writeText(props.children)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div
            className={css({
                position: "relative",
                borderRadius: "md",
                backgroundColor: "neutral/5",
                border: "1px solid",
                borderColor: "neutral/10",
                overflow: "hidden",
            })}
        >
            <pre
                className={css({
                    margin: 0,
                    padding: "0.75rem 1rem",
                    paddingRight: "2.5rem",
                    fontFamily: "mono",
                    fontSize: "xs",
                    color: "neutral",
                    lineHeight: "1.6",
                    overflowX: "auto",
                    whiteSpace: "pre",
                })}
            >
                <code>{props.children}</code>
            </pre>
            <Button
                onClick={handleCopy}
                aria-label="Copier le code"
                className={css.raw({
                    position: "absolute",
                    top: "0.375rem",
                    right: "0.375rem",
                })}
            >
                <ButtonGhostContent leftIcon={copied ? <IconCheck /> : <IconCopy />} />
            </Button>
        </div>
    )
}
