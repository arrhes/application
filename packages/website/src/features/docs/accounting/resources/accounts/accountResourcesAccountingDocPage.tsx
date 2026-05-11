import { ButtonOutlineContent, LinkButton } from "@arrhes/ui"
import { IconArrowLeft } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocHeader } from "../../../../../components/document/docHeader.js"
import { DocRoot } from "../../../../../components/document/docRoot.js"
import { DataError } from "../../../components/DataError.js"
import { getAccount, getAccountBySlug, getDirectChildren } from "./accountsData.js"
import { AccountInfoCard } from "./components/accountInfoCard.js"
import { AccountNotFound } from "./components/accountNotFound.js"
import { AccountScenariosSection } from "./components/accountScenariosSection.js"
import { ChildrenListSection } from "./components/childrenListSection.js"
import { DebitCreditSection } from "./components/debitCreditSection.js"
import { ParentAccountSection } from "./components/parentAccountSection.js"
import { SummaryAccountBanner } from "./components/summaryAccountBanner.js"

export function AccountResourcesAccountingDocPage() {
    const { account: slug } = useParams({ strict: false }) as { account: string }
    const entry = getAccountBySlug(slug)

    if (!entry) {
        return <AccountNotFound />
    }

    const parentAccount = entry.parent ? getAccount(entry.parent) : null
    const children = getDirectChildren(entry.number)
    const isSummary = entry.number.length <= 2

    return (
        <DocRoot>
            <LinkButton to="/documentation/comptabilité/ressources/comptes">
                <ButtonOutlineContent leftIcon={<IconArrowLeft />} text="Retour aux comptes" />
            </LinkButton>

            <DocHeader
                title={`${entry.number} - ${entry.label}`}
                description={`Classe ${entry.classNumber} - ${entry.className}`}
            />

            <AccountInfoCard entry={entry} />

            {isSummary ? (
                <>
                    <SummaryAccountBanner entry={entry} />

                    {parentAccount && <ParentAccountSection parentAccount={parentAccount} />}

                    <ChildrenListSection children={children} />
                </>
            ) : (
                <>
                    <AccountScenariosSection entry={entry} />
                    <DebitCreditSection entry={entry} />
                    {parentAccount && <ParentAccountSection parentAccount={parentAccount} />}
                    <ChildrenListSection children={children} />
                </>
            )}

            <DataError />
        </DocRoot>
    )
}
