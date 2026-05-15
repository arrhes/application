import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconLink } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocHeader } from "../../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../../components/document/DocSection.js"
import { DocTable } from "../../../../../components/document/DocTable.js"
import { LinkButton } from "../../../../../components/LinkButton.js"
import { DataError } from "../../../components/DataError.js"
import { getScenarioAccounts, getScenarioById } from "./scenariosData.js"

export function ScenarioResourcesAccountingDocPage() {
    const { scenario: id } = useParams({
        strict: false,
    }) as {
        scenario: string
    }
    const scenario = getScenarioById(id)

    if (!scenario) {
        return (
            <DocRoot>
                <DocHeader
                    title="Scénario introuvable"
                    description="Ce scénario n'existe pas."
                />
                <LinkButton to="/documentation/comptabilité/ressources/scénarios">
                    <ButtonOutlineContent
                        leftIcon={<IconArrowLeft />}
                        text="Retour aux scénarios"
                    />
                </LinkButton>
            </DocRoot>
        )
    }

    const accounts = getScenarioAccounts(scenario)

    return (
        <DocRoot>
            <LinkButton to="/documentation/comptabilité/ressources/scénarios">
                <ButtonOutlineContent
                    leftIcon={<IconArrowLeft />}
                    text="Retour aux scénarios"
                />
            </LinkButton>

            <DocHeader
                title={scenario.title}
                description={undefined}
            />

            <DocParagraph>{scenario.description}</DocParagraph>

            {scenario.examples.map((example, index) => (
                <DocSection
                    key={example.description}
                    title={scenario.examples.length > 1 ? `Exemple ${index + 1}` : "Exemple d'écriture"}
                >
                    <DocParagraph>{example.description}</DocParagraph>
                    <DocTable
                        headers={[
                            "Compte",
                            "Intitulé",
                            "Débit",
                            "Crédit",
                        ]}
                        rows={example.entry.rows}
                    />
                </DocSection>
            ))}

            <DocSection title="Comptes concernés">
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.25rem",
                    })}
                >
                    {accounts.map((account) => (
                        <LinkButton
                            key={account.number}
                            to="/documentation/comptabilité/ressources/comptes/$account"
                            params={{
                                account: account.slug,
                            }}
                        >
                            <ButtonOutlineContent
                                leftIcon={<IconLink />}
                                text={`${account.number} - ${account.label}`}
                            />
                        </LinkButton>
                    ))}
                </div>
            </DocSection>

            <DataError />
        </DocRoot>
    )
}
