import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocSection } from "../../../../../components/document/docSection.js"
import { LinkButton } from "../../../../../components/linkButton.js"
import type { AccountEntry } from "../accountsData.js"

export function ParentAccountSection(props: { parentAccount: AccountEntry }) {
    const { parentAccount } = props

    return (
        <DocSection title="Compte parent">
            <LinkButton
                to="/documentation/comptabilité/comptes/liste/$account"
                params={{ account: parentAccount.slug }}
            >
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "sm",
                        color: "primary",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "md",
                        border: "1px solid",
                        borderColor: "primary/20",
                        backgroundColor: "primary/5",
                        _hover: { backgroundColor: "primary/10" },
                        transition: "all 0.15s",
                        width: "fit-content",
                    })}
                >
                    <IconChevronRight
                        size={14}
                        className={css({ stroke: "primary/50", flexShrink: 0, transform: "rotate(180deg)" })}
                    />
                    <span className={css({ fontFamily: "mono", fontWeight: "bold" })}>{parentAccount.number}</span>
                    <span>{parentAccount.label}</span>
                </div>
            </LinkButton>
        </DocSection>
    )
}
