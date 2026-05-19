import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function OrgCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Organisation"
                description="Consulter et modifier les informations de l'organisation configurée : arrhes org."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes org get</DocCode>,
                            "Affiche les détails de l'organisation",
                        ],
                        [
                            <DocCode key="0">arrhes org update</DocCode>,
                            "Modifie les informations de l'organisation",
                        ],
                        [
                            <DocCode key="0">arrhes org delete</DocCode>,
                            "Supprime l'organisation et toutes ses données",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes org get">
                <DocParagraph>
                    Retourne les informations de l'organisation active (nom, email, SIREN, etc.).
                </DocParagraph>
                <DocCodeBlock>arrhes org get</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes org update">
                <DocParagraph>
                    Modifie les informations de l'organisation. Toutes les options sont facultatives.
                </DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--name <nom>",
                            "Non",
                            "Nom de l'organisation",
                        ],
                        [
                            "--email <email>",
                            "Non",
                            "Email de contact de l'organisation",
                        ],
                        [
                            "--siren <siren>",
                            "Non",
                            "Numéro SIREN de l'organisation",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes org update --name "Ma Société"</DocCodeBlock>
                <DocCodeBlock>arrhes org update --email contact@example.com --siren 123456789</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes org delete">
                <DocParagraph>
                    Supprime l'organisation active et toutes ses données de façon irréversible. Nécessite le rôle
                    administrateur.
                </DocParagraph>
                <DocCodeBlock>arrhes org delete</DocCodeBlock>
                <DocTip variant="warning">
                    La suppression est irréversible et supprime tous les exercices, écritures et fichiers associés.
                </DocTip>
            </DocSection>
        </DocRoot>
    )
}
