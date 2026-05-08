import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconMasksTheater } from "@tabler/icons-react"
import { DocParagraph } from "../../../../../components/document/docParagraph.js"
import { DocSection } from "../../../../../components/document/docSection.js"
import { LinkButton } from "../../../../../components/linkButton.js"
import { getScenariosByAccountNumber } from "../../scenarios/scenariosData.js"
import type { AccountEntry } from "../accountsData.js"

export function AccountScenariosSection(props: { entry: AccountEntry }) {
    const { entry } = props
    const scenarios = getScenariosByAccountNumber(entry.number)

    return (
        <DocSection title="Scénarios liés">
            {scenarios.length === 0 ? (
                <DocParagraph>
                    Aucun scénario n'est encore lié à ce compte.
                </DocParagraph>
            ) : (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                    })}
                >
                    {scenarios.map((scenario) => (
                        <LinkButton
                            key={scenario.slug}
                            to="/documentation/comptabilité/scénarios/$scenario"
                            params={{ scenario: scenario.slug }}
                        >
                            <ButtonOutlineContent
                                leftIcon={<IconMasksTheater />}
                                text={scenario.title}
                            />
                        </LinkButton>
                    ))}
                </div>
            )}
        </DocSection>
    )
}
