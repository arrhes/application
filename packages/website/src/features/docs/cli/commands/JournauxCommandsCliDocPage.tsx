import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"

export function JournauxCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Journaux"
                description="Lister, consulter, créer, modifier et supprimer des journaux comptables."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes journals list --year <id>"}</DocCode>,
                            "Liste les journaux d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes journals get <idJournal> --year <id>"}</DocCode>,
                            "Détails d'un journal",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes journals create --year <id> --code <code> --label <libellé>"}
                            </DocCode>,
                            "Crée un journal",
                        ],
                        [
                            <DocCode key="0">{"arrhes journals update <idJournal> --year <id>"}</DocCode>,
                            "Modifie un journal",
                        ],
                        [
                            <DocCode key="0">{"arrhes journals delete <idJournal> --year <id>"}</DocCode>,
                            "Supprime un journal",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes journals list">
                <DocCodeBlock>arrhes journals list --year year_xyz</DocCodeBlock>
                <DocCodeBlock>{"arrhes journals list --year year_xyz | jq '.[].code'"}</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes journals get">
                <DocCodeBlock>arrhes journals get jrn_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes journals create">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--year <id>",
                            "Oui",
                            "Identifiant de l'exercice",
                        ],
                        [
                            "--code <code>",
                            "Oui",
                            "Code du journal (ex : ACH, VTE, BQ)",
                        ],
                        [
                            "--label <libellé>",
                            "Oui",
                            "Libellé du journal",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes journals create --year year_xyz --code ACH --label "Achats"</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes journals update">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--code <code>",
                            "Non",
                            "Nouveau code",
                        ],
                        [
                            "--label <libellé>",
                            "Non",
                            "Nouveau libellé",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes journals update jrn_abc --year year_xyz --label "Achats fournisseurs"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes journals delete">
                <DocParagraph>
                    Supprime un journal. Cette action échoue si des écritures y sont encore rattachées.
                </DocParagraph>
                <DocCodeBlock>arrhes journals delete jrn_abc --year year_xyz</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
