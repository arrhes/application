import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCornerDownRight } from "@tabler/icons-react"
import { DocSection } from "../../../../../components/document/docSection.js"
import { LinkButton } from "../../../../../components/linkButton.js"
import type { AccountEntry } from "../accountsData.js"

export function ChildrenListSection(props: { children: AccountEntry[] }) {
    const { children } = props

    if (children.length === 0) return null

    return (
        <DocSection title="Sous-comptes">
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.375rem",
                })}
            >
                {children.map((child) => (
                    <LinkButton
                        key={child.slug}
                        to="/documentation/comptabilité/comptes/liste/$account"
                        params={{ account: child.slug }}
                    >
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "sm",
                                padding: "0.375rem 0.75rem",
                                borderRadius: "md",
                                border: "1px solid",
                                borderColor: "neutral/10",
                                backgroundColor: "white",
                                _hover: {
                                    borderColor: "primary/30",
                                    backgroundColor: "primary/5",
                                },
                                transition: "all 0.15s",
                            })}
                        >
                            <IconCornerDownRight size={14} className={css({ stroke: "neutral/30", flexShrink: 0 })} />
                            <span
                                className={css({
                                    fontFamily: "mono",
                                    fontWeight: "bold",
                                    color: "primary",
                                    fontStyle: child.system === "facultatif" ? "italic" : "normal",
                                })}
                            >
                                {child.number}
                            </span>
                            <span
                                className={css({
                                    color: child.system === "facultatif" ? "neutral/50" : "neutral",
                                    fontStyle: child.system === "facultatif" ? "italic" : "normal",
                                    flex: 1,
                                    minWidth: 0,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                })}
                            >
                                {child.label}
                            </span>
                        </div>
                    </LinkButton>
                ))}
            </div>
        </DocSection>
    )
}
