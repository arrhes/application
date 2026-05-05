import { css } from "@arrhes/ui/utilities/cn.js"
import { IconSparkles } from "@tabler/icons-react"
import { DocSection } from "../../../../../components/document/docSection.js"
import { DocTable } from "../../../../../components/document/docTable.js"
import { DocTip } from "../../../../../components/document/docTip.js"
import type { AccountEntry } from "../accountsData.js"
import { getExampleJournalEntry } from "./accountUtilities.js"

export function JournalEntryExamples(props: { entry: AccountEntry }) {
    const { entry } = props

    if (!entry.examples || entry.examples.length === 0) return null

    return (
        <DocSection title="Exemples d'écritures">
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
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem",
                })}
            >
                {entry.examples.map((example) => {
                    const journalEntry = getExampleJournalEntry(entry, example)
                    return (
                        <div
                            key={example}
                            className={css({
                                borderRadius: "lg",
                                border: "1px solid",
                                borderColor: "success/15",
                                overflow: "hidden",
                                padding: "1rem",
                                backgroundColor: "success/5",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            })}
                        >
                            <div
                                className={css({
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: "0.5rem",
                                })}
                            >
                                <IconSparkles
                                    size={14}
                                    className={css({
                                        stroke: "success",
                                        flexShrink: 0,
                                        position: "relative",
                                        top: "0.125rem",
                                    })}
                                />
                                <span
                                    className={css({
                                        fontSize: "sm",
                                        color: "neutral/80",
                                        lineHeight: "1.6",
                                    })}
                                >
                                    {example}
                                </span>
                            </div>
                            <DocTable headers={["Compte", "Intitulé", "Débit", "Crédit"]} rows={journalEntry.rows} />
                        </div>
                    )
                })}
            </div>
        </DocSection>
    )
}
