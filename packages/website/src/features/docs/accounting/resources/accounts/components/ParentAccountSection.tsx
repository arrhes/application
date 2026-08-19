import { ButtonOutlineContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { IconCornerUpLeft } from "@tabler/icons-react"
import { DocSection } from "../../../../../../components/document/DocSection.js"
import { LinkButton } from "../../../../../../components/LinkButton.js"
import type { AccountEntry } from "../accountsData.js"

export function ParentAccountSection(props: { parentAccount: AccountEntry }) {
    const { parentAccount } = props

    return (
        <DocSection title="Compte parent">
            <LinkButton
                to="/documentation/comptabilité/ressources/comptes/$account"
                params={{
                    account: parentAccount.slug,
                }}
            >
                <ButtonOutlineContent
                    leftIcon={<IconCornerUpLeft />}
                    text={undefined}
                >
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
                            })}
                        >
                            {parentAccount.number}
                        </span>
                        <span
                            className={css({
                                fontSize: "0.875rem",
                                lineHeight: "1rem",
                            })}
                        >
                            {parentAccount.label}
                        </span>
                    </div>
                </ButtonOutlineContent>
            </LinkButton>
        </DocSection>
    )
}
