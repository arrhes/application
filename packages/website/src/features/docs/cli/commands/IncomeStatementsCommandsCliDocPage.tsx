import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"

export function IncomeStatementsCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Comptes de résultat"
                description="Gérer la structure du compte de résultat et les calculs d'un exercice : arrhes income-statements."
            />

            <DocSection title="Vue d'ensemble">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes income-statements list <idYear>"}</DocCode>,
                            "Liste les nœuds du compte de résultat",
                        ],
                        [
                            <DocCode key="0">{"arrhes income-statements get <idYear> <idIncomeStatement>"}</DocCode>,
                            "Détails d'un nœud",
                        ],
                        [
                            <DocCode key="0">{"arrhes income-statements create <idYear>"}</DocCode>,
                            "Crée un nœud",
                        ],
                        [
                            <DocCode key="0">{"arrhes income-statements update <idYear> <idIncomeStatement>"}</DocCode>,
                            "Modifie un nœud",
                        ],
                        [
                            <DocCode key="0">{"arrhes income-statements delete <idYear> <idIncomeStatement>"}</DocCode>,
                            "Supprime un nœud",
                        ],
                        [
                            <DocCode key="0">{"arrhes income-statements computations list <idYear>"}</DocCode>,
                            "Liste les calculs",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes income-statements computations get <idYear> <idComputation>"}
                            </DocCode>,
                            "Détails d'un calcul",
                        ],
                        [
                            <DocCode key="0">{"arrhes income-statements computations create <idYear>"}</DocCode>,
                            "Crée un calcul",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes income-statements computations update <idYear> <idComputation>"}
                            </DocCode>,
                            "Modifie un calcul",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes income-statements computations delete <idYear> <idComputation>"}
                            </DocCode>,
                            "Supprime un calcul",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes income-statements list">
                <DocCodeBlock>arrhes income-statements list year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements get">
                <DocCodeBlock>arrhes income-statements get year_xyz is_abc</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements create">
                <DocParagraph>
                    Crée un nœud de compte de résultat. Le parent est facultatif (nœud racine si absent).
                </DocParagraph>
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--label <libellé>",
                            "Oui",
                            "Libellé du nœud",
                        ],
                        [
                            "--parent <id>",
                            "Non",
                            "ID du nœud parent",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes income-statements create year_xyz --label "Produits d'exploitation"</DocCodeBlock>
                <DocCodeBlock>
                    arrhes income-statements create year_xyz --parent is_root --label "Chiffre d'affaires"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements update">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--label <libellé>",
                            "Non",
                            "Libellé du nœud",
                        ],
                        [
                            "--parent <id>",
                            "Non",
                            "ID du nœud parent",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes income-statements update year_xyz is_abc --label "Charges d'exploitation"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements delete">
                <DocCodeBlock>arrhes income-statements delete year_xyz is_abc</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements computations list">
                <DocCodeBlock>arrhes income-statements computations list year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements computations get">
                <DocCodeBlock>arrhes income-statements computations get year_xyz cmp_abc</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements computations create">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--label <libellé>",
                            "Oui",
                            "Libellé du calcul",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes income-statements computations create year_xyz --label "Résultat d'exploitation"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements computations update">
                <DocTable
                    headers={[
                        "Option",
                        "Requis",
                        "Description",
                    ]}
                    rows={[
                        [
                            "--label <libellé>",
                            "Non",
                            "Libellé du calcul",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes income-statements computations update year_xyz cmp_abc --label "Résultat net"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes income-statements computations delete">
                <DocCodeBlock>arrhes income-statements computations delete year_xyz cmp_abc</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
