import { css } from "@arrhes/ui/utilities/cn.js"
import { DocParagraph } from "../../../../../components/document/docParagraph.js"
import { DocSection } from "../../../../../components/document/docSection.js"
import { DocTable } from "../../../../../components/document/docTable.js"
import { DocTip } from "../../../../../components/document/docTip.js"
import type { AccountEntry } from "../accountsData.js"

export function PracticalUsageSection(props: { entry: AccountEntry }) {
    const { entry } = props

    return (
        <DocSection title="Utilisation pratique">
            <DocParagraph>{entry.journalExample.description}</DocParagraph>

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
                <DocTable headers={["Compte", "Intitulé", "Débit", "Crédit"]} rows={entry.journalExample.rows} />
            </div>

            {entry.usageTips.length > 0 && (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {entry.usageTips.map((tip) => (
                        <DocTip key={tip} variant="tip">
                            {tip}
                        </DocTip>
                    ))}
                </div>
            )}
        </DocSection>
    )
}
