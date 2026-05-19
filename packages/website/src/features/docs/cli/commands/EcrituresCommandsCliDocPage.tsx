import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function EcrituresCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Écritures"
                description="Créer, consulter, modifier, dupliquer, extourner et supprimer des écritures comptables."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes entries list --year <id>"}</DocCode>,
                            "Liste les écritures d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries get <idEntry> --year <id>"}</DocCode>,
                            "Détails d'une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries create --year <id> --journal <id>"}</DocCode>,
                            "Crée une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries update <idEntry> --year <id>"}</DocCode>,
                            "Modifie une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries duplicate <idEntry> --year <id>"}</DocCode>,
                            "Duplique une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries reverse <idEntry> --year <id>"}</DocCode>,
                            "Extourne une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries delete <idEntry> --year <id>"}</DocCode>,
                            "Supprime une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries compute <idEntry> --year <id>"}</DocCode>,
                            "Calcule les totaux d'une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries lines list <idEntry> --year <id>"}</DocCode>,
                            "Liste les lignes d'une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries lines get <idEntry> <idEntryLine> --year <id>"}</DocCode>,
                            "Détails d'une ligne",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes entries lines create <idEntry> --year <id> --account <id>"}
                            </DocCode>,
                            "Crée une ligne d'écriture",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes entries lines update <idEntry> <idEntryLine> --year <id>"}
                            </DocCode>,
                            "Modifie une ligne",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes entries lines delete <idEntry> <idEntryLine> --year <id>"}
                            </DocCode>,
                            "Supprime une ligne",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries tags add <idEntry> --year <id> --tag <id>"}</DocCode>,
                            "Ajoute un libellé à une écriture",
                        ],
                        [
                            <DocCode key="0">{"arrhes entries tags remove <idEntry> <idTag> --year <id>"}</DocCode>,
                            "Retire un libellé",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes entries list">
                <DocCodeBlock>arrhes entries list --year year_xyz</DocCodeBlock>
                <DocCodeBlock>{"arrhes entries list --year year_xyz | jq '.[].label'"}</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries get">
                <DocCodeBlock>arrhes entries get entry_123 --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries create">
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
                            "--journal <id>",
                            "Oui",
                            "Identifiant du journal",
                        ],
                        [
                            "--label <libellé>",
                            "Non",
                            "Libellé de l'écriture",
                        ],
                        [
                            "--date <date>",
                            "Non",
                            "Date au format YYYY-MM-DD (défaut : aujourd'hui)",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    {
                        'arrhes entries create \\\n  --year year_xyz \\\n  --journal AC \\\n  --label "Facture fournisseur" \\\n  --date 2025-03-15'
                    }
                </DocCodeBlock>
                <DocTip variant="info">
                    Utilisez <DocCode>arrhes journals list --year &lt;id&gt;</DocCode> pour retrouver les identifiants
                    de journaux disponibles dans un exercice.
                </DocTip>
            </DocSection>

            <DocSection title="arrhes entries update">
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
                            "Non",
                            "Nouveau libellé",
                        ],
                        [
                            "--date <date>",
                            "Non",
                            "Nouvelle date (YYYY-MM-DD)",
                        ],
                        [
                            "--journal <id>",
                            "Non",
                            "Nouveau journal",
                        ],
                        [
                            "--file <id>",
                            "Non",
                            "Pièce justificative associée",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes entries update entry_123 --year year_xyz --label "Libellé corrigé"</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries duplicate">
                <DocParagraph>Crée une copie de l'écriture avec les mêmes lignes.</DocParagraph>
                <DocCodeBlock>arrhes entries duplicate entry_123 --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries reverse">
                <DocParagraph>
                    Crée une écriture d'extourne (contrepartie) pour annuler l'écriture d'origine.
                </DocParagraph>
                <DocCodeBlock>arrhes entries reverse entry_123 --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries delete">
                <DocParagraph>Supprime définitivement une écriture et ses lignes d'écriture associées.</DocParagraph>
                <DocCodeBlock>arrhes entries delete entry_123 --year year_xyz</DocCodeBlock>
                <DocTip variant="warning">
                    La suppression est irréversible. L'ensemble des lignes d'écriture liées sera également supprimé.
                </DocTip>
            </DocSection>

            <DocSection title="arrhes entries compute">
                <DocParagraph>Calcule les totaux (débit / crédit) d'une écriture.</DocParagraph>
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
                    ]}
                />
                <DocCodeBlock>arrhes entries compute entry_123 --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries lines list">
                <DocCodeBlock>arrhes entries lines list entry_123 --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries lines get">
                <DocCodeBlock>arrhes entries lines get entry_123 line_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries lines create">
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
                            "--account <id>",
                            "Oui",
                            "Identifiant du compte",
                        ],
                        [
                            "--label <libellé>",
                            "Non",
                            "Libellé de la ligne",
                        ],
                        [
                            "--debit <montant>",
                            "Non",
                            "Montant au débit",
                        ],
                        [
                            "--credit <montant>",
                            "Non",
                            "Montant au crédit",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes entries lines create entry_123 --year year_xyz --account acc_xyz --debit 1000
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries lines update">
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
                            "Non",
                            "Nouveau libellé",
                        ],
                        [
                            "--debit <montant>",
                            "Non",
                            "Nouveau montant au débit",
                        ],
                        [
                            "--credit <montant>",
                            "Non",
                            "Nouveau montant au crédit",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes entries lines update entry_123 line_abc --year year_xyz --debit 1500</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries lines delete">
                <DocCodeBlock>arrhes entries lines delete entry_123 line_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries tags add">
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
                            "--tag <id>",
                            "Oui",
                            "Identifiant du libellé",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes entries tags add entry_123 --year year_xyz --tag tag_abc</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes entries tags remove">
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
                    ]}
                />
                <DocCodeBlock>arrhes entries tags remove entry_123 tag_abc --year year_xyz</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
