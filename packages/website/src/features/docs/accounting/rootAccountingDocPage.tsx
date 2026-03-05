import { ButtonOutlineContent } from "@arrhes/ui"
import { IconChevronRight } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

export function RootAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Comptabilité" description="Apprenez les bases de la comptabilité française." />

            <LinkButton to="/documentation/comptabilité/comptes">
                <ButtonOutlineContent text="Commencer directement" rightIcon={<IconChevronRight />} />
            </LinkButton>
        </DocRoot>
    )
}
