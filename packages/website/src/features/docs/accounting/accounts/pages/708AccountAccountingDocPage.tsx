import { DocLink } from "../../../../../components/document/docLink.js"
import { DocRoot } from "../../../../../components/document/docRoot.js"
import { DocSources } from "../../../../../components/document/docSources.js"
import { DocTip } from "../../../../../components/document/docTip.js"
import { getAccount, getAccountBySlug, getDirectChildren } from "../accountsData.js"
import { AccountInfoCard } from "../components/accountInfoCard.js"
import { AccountPageHeader } from "../components/accountPageHeader.js"
import { ChildrenListSection } from "../components/childrenListSection.js"
import { DebitCreditSection } from "../components/debitCreditSection.js"
import { JournalEntryExamples } from "../components/journalEntryExamples.js"
import { ParentAccountSection } from "../components/parentAccountSection.js"
import { PracticalUsageSection } from "../components/practicalUsageSection.js"

export function Account708AccountingDocPage() {
    const entry = getAccountBySlug("708")
    if (!entry) return null

    const parentAccount = getAccount("70")
    const children = getDirectChildren("708")

    return (
        <DocRoot>
            <AccountPageHeader entry={entry} />

            <AccountInfoCard entry={entry} />

            <JournalEntryExamples entry={entry} />

            <DebitCreditSection entry={entry} debitMeaning="Diminution" creditMeaning="Augmentation" />

            {parentAccount && <ParentAccountSection parentAccount={parentAccount} />}

            <ChildrenListSection children={children} />

            <PracticalUsageSection entry={entry} debitMeaning="Diminution" creditMeaning="Augmentation" />

            <DocTip variant="tip">
                Pour approfondir le fonctionnement des comptes, consultez le{" "}
                <DocLink to="/documentation/comptabilité/comptes">cours sur les comptes</DocLink> et la page sur{" "}
                <DocLink to="/documentation/comptabilité/écritures">les écritures comptables</DocLink>.
            </DocTip>

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-francaises/reglementation-comptable/recueil-des-normes-comptables-francaises",
                    },
                    {
                        label: "Plan comptable général (France) — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Plan_comptable_g%C3%A9n%C3%A9ral_(France)",
                    },
                ]}
            />
        </DocRoot>
    )
}
