import { css } from "@arrhes/ui/utilities/cn.js"
import { DocParagraph } from "../../../../../components/document/docParagraph.js"
import { DocSection } from "../../../../../components/document/docSection.js"
import { DocTable } from "../../../../../components/document/docTable.js"
import { DocTip } from "../../../../../components/document/docTip.js"
import type { AccountEntry } from "../accountsData.js"
import { getJournalExample, getUsageTips } from "./accountUtilities.js"

export function PracticalUsageSection(props: { entry: AccountEntry; debitMeaning: string; creditMeaning: string }) {
    const { entry } = props
    const example = getJournalExample(entry)
    const tips = getUsageTips(entry)

    return (
        <DocSection title="Utilisation pratique">
            <DocParagraph>{example.description}</DocParagraph>

            <div
                className={css({
                    padding: "1rem",
                    borderRadius: "lg",
                    backgroundColor: "information/5",
                    border: "1px solid",
                    borderColor: "information/10",
                })}
            >
                <span
                    className={css({
                        fontSize: "xs",
                        fontWeight: "semibold",
                        color: "information",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.75rem",
                        display: "block",
                    })}
                >
                    Schéma d'écriture type
                </span>
                <DocTable headers={["Compte", "Intitulé", "Débit", "Crédit"]} rows={example.rows} />
            </div>

            {tips.length > 0 && (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {tips.map((tip) => (
                        <DocTip key={tip} variant="tip">
                            {tip}
                        </DocTip>
                    ))}
                </div>
            )}
        </DocSection>
    )
}
