import { css, cx } from "@arrhes/ui/utilities/cn.js"
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
            <button
                type="button"
                onClick={handleCopy}
                aria-label="Copier le code"
                className={cx(
                    css({
                        position: "absolute",
                        top: "0.375rem",
                        right: "0.375rem",
                        width: "1.75rem",
                        height: "1.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "sm",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.15s",
                        _hover: {
                            backgroundColor: "neutral/10",
                            color: "neutral",
                        },
                    }),
                    copied
                        ? css({
                              backgroundColor: "success/10",
                              color: "success",
                          })
                        : css({
                              backgroundColor: "transparent",
                              color: "neutral/40",
                          }),
                )}
            >
                {copied ? (
                    <IconCheck
                        width={13}
                        height={13}
                    />
                ) : (
                    <IconCopy
                        width={13}
                        height={13}
                    />
                )}
            </button>
        </div>
    )
}
