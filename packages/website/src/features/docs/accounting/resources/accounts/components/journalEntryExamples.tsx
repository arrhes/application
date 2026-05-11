import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMasksTheater } from "@tabler/icons-react"
import { DocSection } from "../../../../../../components/document/docSection.js"
import { DocTable } from "../../../../../../components/document/docTable.js"
import { DocTip } from "../../../../../../components/document/docTip.js"
import { getScenariosByAccountNumber } from "../../scenarios/scenariosData.js"
import type { AccountEntry } from "../accountsData.js"

export function JournalEntryExamples(props: { entry: AccountEntry }) {
    const { entry } = props
    const scenarios = getScenariosByAccountNumber(entry.number)

    if (scenarios.length === 0) return null

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
                {scenarios.flatMap((scenario) =>
                    scenario.examples.map((example) => (
                        <div
                            key={`${scenario.id}-${example.description}`}
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
                                <IconMasksTheater
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
                                    {example.description}
                                </span>
                            </div>
                            <DocTable headers={["Compte", "Intitulé", "Débit", "Crédit"]} rows={example.entry.rows} />
                        </div>
                    )),
                )}
            </div>
        </DocSection>
    )
}
