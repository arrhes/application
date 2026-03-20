import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft } from "@tabler/icons-react"
import { DocHeader } from "../../../../../components/document/docHeader.js"
import { LinkButton } from "../../../../../components/linkButton.js"
import type { AccountEntry } from "../accountsData.js"

export function AccountPageHeader(props: { entry: AccountEntry }) {
    const { entry } = props

    return (
        <div>
            <LinkButton to="/documentation/comptabilité/comptes/liste">
                <span
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "sm",
                        color: "primary",
                        fontWeight: "medium",
                        textDecoration: "underline",
                        textDecorationColor: "primary/30",
                        textUnderlineOffset: "2px",
                        _hover: { textDecorationColor: "primary" },
                        transition: "all 0.15s",
                        mb: "4",
                    })}
                >
                    <IconArrowLeft size={14} />
                    Plan comptable
                </span>
            </LinkButton>
            <DocHeader
                title={`${entry.number} - ${entry.label}`}
                description={`Classe ${entry.classNumber} - ${entry.className}`}
            />
        </div>
    )
}
