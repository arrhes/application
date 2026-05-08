import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconLink } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocTable } from "../../../../components/document/docTable.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { AccountDataError } from "../accounts/components/accountDataError.js"
import { getScenarioAccounts, getScenarioBySlug } from "./scenariosData.js"

export function ScenarioAccountingDocPage() {
    const { scenario: slug } = useParams({ strict: false }) as { scenario: string }
    const scenario = getScenarioBySlug(slug)

    if (!scenario) {
        return (
            <DocRoot>
                <DocHeader title="Scénario introuvable" description="Ce scénario n'existe pas." />
                <LinkButton to="/documentation/comptabilité/scénarios">
                    <ButtonOutlineContent leftIcon={<IconArrowLeft />} text="Retour aux scénarios" />
                </LinkButton>
            </DocRoot>
        )
    }

    const accounts = getScenarioAccounts(scenario)

    return (
        <DocRoot>
            <LinkButton to="/documentation/comptabilité/scénarios">
                <ButtonOutlineContent leftIcon={<IconArrowLeft />} text="Retour aux scénarios" />
            </LinkButton>

            <DocHeader
                title={scenario.title}
                description={undefined}
            />

            <DocParagraph>{scenario.description}</DocParagraph>

            <DocSection title="Contexte">
                <DocParagraph>{scenario.exampleText}</DocParagraph>
            </DocSection>

            <DocSection title="Exemple d'écriture">
                <DocTable headers={["Compte", "Intitulé", "Débit", "Crédit"]} rows={scenario.journalRows} />
            </DocSection>

            <DocSection title="Comptes concernés">
                <div
                    className={css({
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem",
                    })}
                >
                    {accounts.map((account) => (
                        <LinkButton
                            key={account.number}
                            to="/documentation/comptabilité/comptes/liste/$account"
                            params={{ account: account.slug }}
                        >
                            <ButtonOutlineContent
                                leftIcon={<IconLink />}
                                text={`${account.number} - ${account.label}`}
                            />
                        </LinkButton>
                    ))}
                </div>
            </DocSection>

            <AccountDataError />
        </DocRoot>
    )
}
