import { useParams } from "@tanstack/react-router"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { getAccount, getAccountBySlug, getDirectChildren } from "./accountsData.js"
import { AccountDataError } from "./components/accountDataError.js"
import { AccountInfoCard } from "./components/accountInfoCard.js"
import { AccountNotFound } from "./components/accountNotFound.js"
import { AccountPageHeader } from "./components/accountPageHeader.js"
import { ChildrenListSection } from "./components/childrenListSection.js"
import { DebitCreditSection } from "./components/debitCreditSection.js"
import { JournalEntryExamples } from "./components/journalEntryExamples.js"
import { ParentAccountSection } from "./components/parentAccountSection.js"
import { PracticalUsageSection } from "./components/practicalUsageSection.js"
import { SummaryAccountBanner } from "./components/summaryAccountBanner.js"

export function AccountAccountingDocPage() {
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
            <AccountPageHeader entry={entry} />

            <AccountInfoCard entry={entry} />

            {isSummary ? (
                <>
                    <SummaryAccountBanner entry={entry} />

                    {parentAccount && <ParentAccountSection parentAccount={parentAccount} />}

                    <ChildrenListSection children={children} />
                </>
            ) : (
                <>
                    <JournalEntryExamples entry={entry} />
                    <DebitCreditSection entry={entry} />
                    {parentAccount && <ParentAccountSection parentAccount={parentAccount} />}
                    {children.length > 0 && <ChildrenListSection children={children} />}
                    <PracticalUsageSection entry={entry} />
                </>
            )}

            <AccountDataError />
        </DocRoot>
    )
}
