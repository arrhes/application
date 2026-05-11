import { ButtonOutlineContent, FormatNull } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconCornerDownRight } from "@tabler/icons-react"
import { DocSection } from "../../../../../../components/document/docSection.js"
import { LinkButton } from "../../../../../../components/linkButton.js"
import type { AccountEntry } from "../accountsData.js"

export function ChildrenListSection(props: { children: AccountEntry[] }) {
    return (
        <DocSection title="Comptes enfants">
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                })}
            >
                {props.children.length === 0 ? (
                    <FormatNull text="Pas de compte enfant" />
                ) : (
                    props.children.map((child) => (
                        <LinkButton
                            key={child.slug}
                            to="/documentation/comptabilité/ressources/comptes/$account"
                            params={{ account: child.slug }}
                        >
                            <ButtonOutlineContent leftIcon={<IconCornerDownRight />} text={undefined}>
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <span
                                        className={css({
                                            fontSize: "0.875rem",
                                            lineHeight: "1rem",
                                            fontFamily: "mono",
                                            fontWeight: "bold",
                                            color: "primary",
                                            fontStyle: child.isOptional ? "italic" : "normal",
                                        })}
                                    >
                                        {child.number}
                                    </span>
                                    <span
                                        className={css({
                                            fontSize: "0.875rem",
                                            lineHeight: "1rem",
                                            color: child.isOptional ? "neutral/50" : "neutral",
                                            fontStyle: child.isOptional ? "italic" : "normal",
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
                            </ButtonOutlineContent>
                        </LinkButton>
                    ))
                )}
            </div>
        </DocSection>
    )
}
