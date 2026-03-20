import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft } from "@tabler/icons-react"
import { DocHeader } from "../../../../../components/document/docHeader.js"
import { DocRoot } from "../../../../../components/document/docRoot.js"
import { LinkButton } from "../../../../../components/linkButton.js"

export function AccountNotFound() {
    return (
        <DocRoot>
            <DocHeader title="Compte introuvable" description="Ce compte n'existe pas dans le plan comptable." />
            <LinkButton to="/documentation/comptabilité/comptes/liste">
                <span
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        fontSize: "sm",
                        color: "primary",
                    })}
                >
                    <IconArrowLeft size={16} />
                    Retour au plan comptable
                </span>
            </LinkButton>
        </DocRoot>
    )
}
