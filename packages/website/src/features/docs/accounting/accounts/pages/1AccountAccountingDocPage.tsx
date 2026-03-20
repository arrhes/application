import { DocLink } from "../../../../../components/document/docLink.js"
import { DocRoot } from "../../../../../components/document/docRoot.js"
import { DocSources } from "../../../../../components/document/docSources.js"
import { DocTip } from "../../../../../components/document/docTip.js"
import { getAccountBySlug, getDirectChildren } from "../accountsData.js"
import { AccountInfoCard } from "../components/accountInfoCard.js"
import { AccountPageHeader } from "../components/accountPageHeader.js"
import { ChildrenListSection } from "../components/childrenListSection.js"
import { SummaryAccountBanner } from "../components/summaryAccountBanner.js"

export function Account1AccountingDocPage() {
    const entry = getAccountBySlug("1")
    if (!entry) return null

    const children = getDirectChildren("1")

    return (
        <DocRoot>
            <AccountPageHeader entry={entry} />

            <AccountInfoCard entry={entry} />

            <SummaryAccountBanner entry={entry} />

            <ChildrenListSection children={children} />

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
