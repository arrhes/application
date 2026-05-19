import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"

export function LibellesCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Libellés"
                description="Lister, consulter, créer, modifier et supprimer des libellés (tags) d'écriture."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes tags list --year <id>"}</DocCode>,
                            "Liste les libellés d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes tags get <idTag> --year <id>"}</DocCode>,
                            "Détails d'un libellé",
                        ],
                        [
                            <DocCode key="0">{"arrhes tags create --year <id> --label <libellé>"}</DocCode>,
                            "Crée un libellé",
                        ],
                        [
                            <DocCode key="0">{"arrhes tags update <idTag> --year <id>"}</DocCode>,
                            "Modifie un libellé",
                        ],
                        [
                            <DocCode key="0">{"arrhes tags delete <idTag> --year <id>"}</DocCode>,
                            "Supprime un libellé",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes tags list">
                <DocCodeBlock>arrhes tags list --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes tags get">
                <DocCodeBlock>arrhes tags get tag_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes tags create">
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
                            "--label <libellé>",
                            "Oui",
                            "Libellé du tag",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes tags create --year year_xyz --label "Investissement"</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes tags update">
                <DocCodeBlock>
                    arrhes tags update tag_abc --year year_xyz --label "Investissement matériel"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes tags delete">
                <DocParagraph>
                    Supprime un libellé. Les écritures associées conservent leurs autres libellés.
                </DocParagraph>
                <DocCodeBlock>arrhes tags delete tag_abc --year year_xyz</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
