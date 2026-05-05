import { DocSection } from "../../../../../components/document/docSection.js"
import { DocTable } from "../../../../../components/document/docTable.js"
import type { AccountEntry } from "../accountsData.js"

export function DebitCreditSection(props: { entry: AccountEntry }) {
    const { entry } = props

    return (
        <DocSection title="Fonctionnement">
            <DocTable
                headers={["Mouvement", "Signification"]}
                rows={[
                    ["Débit", entry.debitMeaning],
                    ["Crédit", entry.creditMeaning],
                ]}
            />
        </DocSection>
    )
}
