import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function ExercicesCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Exercices"
                description="Lister, consulter, créer, modifier, supprimer, clôturer et réouvrir des exercices comptables."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">arrhes years list</DocCode>,
                            "Liste les exercices de l'organisation",
                        ],
                        [
                            <DocCode key="0">{"arrhes years get <idYear>"}</DocCode>,
                            "Détails d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years create --start <date> --end <date>"}</DocCode>,
                            "Crée un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years update <idYear>"}</DocCode>,
                            "Modifie un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years delete <idYear>"}</DocCode>,
                            "Supprime un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years close <idYear>"}</DocCode>,
                            "Clôture un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes years open <idYear> --journal-opening <id>"}</DocCode>,
                            "Réouvre un exercice",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes years settle-balance-sheet <idYear> --journal-closing <id>"}
                            </DocCode>,
                            "Solde le bilan",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes years settle-income-statement <idYear> --journal-closing <id>"}
                            </DocCode>,
                            "Solde le compte de résultat",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes years list">
                <DocParagraph>Liste tous les exercices comptables de l'organisation configurée.</DocParagraph>
                <DocCodeBlock>arrhes years list</DocCodeBlock>
                <DocCodeBlock>{"arrhes years list | jq '.[].id'"}</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years get">
                <DocParagraph>Retourne les détails d'un exercice par son identifiant.</DocParagraph>
                <DocCodeBlock>arrhes years get year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years create">
                <DocParagraph>Crée un nouvel exercice dans l'organisation spécifiée.</DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--start <date>",
                            "Oui",
                            "Date de début (YYYY-MM-DD)",
                        ],
                        [
                            "--end <date>",
                            "Oui",
                            "Date de fin (YYYY-MM-DD)",
                        ],
                        [
                            "--label <libellé>",
                            "Non",
                            "Libellé de l'exercice",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes years create --start 2025-01-01 --end 2025-12-31 --label "Exercice 2025"
                </DocCodeBlock>
                <DocTip variant="info">
                    La commande retourne l'objet exercice créé, incluant son identifiant à utiliser dans les commandes{" "}
                    <DocCode key="0">entries</DocCode>, <DocCode>journals</DocCode> et <DocCode>files</DocCode>.
                </DocTip>
            </DocSection>

            <DocSection title="arrhes years update">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--start <date>",
                            "Non",
                            "Nouvelle date de début",
                        ],
                        [
                            "--end <date>",
                            "Non",
                            "Nouvelle date de fin",
                        ],
                        [
                            "--label <libellé>",
                            "Non",
                            "Nouveau libellé",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes years update year_xyz --label "FY 2025"</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years delete">
                <DocParagraph>Supprime définitivement un exercice et toutes ses données.</DocParagraph>
                <DocCodeBlock>arrhes years delete year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years close">
                <DocParagraph>
                    Clôture un exercice. Une fois clôturé, les écritures ne peuvent plus être modifiées.
                </DocParagraph>
                <DocCodeBlock>arrhes years close year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years open">
                <DocParagraph>Réouvre un exercice clôturé. Nécessite un journal d'ouverture.</DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--journal-opening <id>",
                            "Oui",
                            "Identifiant du journal d'ouverture",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes years open year_xyz --journal-opening jrn_abc</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years settle-balance-sheet">
                <DocParagraph>Génère les écritures de solde du bilan dans le journal de clôture spécifié.</DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--journal-closing <id>",
                            "Oui",
                            "Identifiant du journal de clôture",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes years settle-balance-sheet year_xyz --journal-closing jrn_closing</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes years settle-income-statement">
                <DocParagraph>
                    Génère les écritures de solde du compte de résultat dans le journal de clôture spécifié.
                </DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--journal-closing <id>",
                            "Oui",
                            "Identifiant du journal de clôture",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes years settle-income-statement year_xyz --journal-closing jrn_closing</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
