import { DocCode } from "../../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../../components/document/DocCodeBlock.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function FichiersCommandsCliDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Stockage"
                description="Lister, consulter, enregistrer, modifier, supprimer des fichiers et générer des liens de téléchargement. Les dossiers sont gérés via le sous-groupe arrhes files folders."
            />

            <DocSection title="Vue d'ensemble - fichiers">
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes files list --year <id>"}</DocCode>,
                            "Liste les fichiers d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes files get <idFile> --year <id>"}</DocCode>,
                            "Détails d'un fichier",
                        ],
                        [
                            <DocCode key="0">
                                {"arrhes files create --year <id> --name <nom> --reference <réf> --hash <hash>"}
                            </DocCode>,
                            "Enregistre un fichier",
                        ],
                        [
                            <DocCode key="0">{"arrhes files update <idFile> --year <id>"}</DocCode>,
                            "Modifie un fichier",
                        ],
                        [
                            <DocCode key="0">{"arrhes files delete <idFile> --year <id>"}</DocCode>,
                            "Supprime un fichier",
                        ],
                        [
                            <DocCode key="0">{"arrhes files download-url <idFile> --year <id>"}</DocCode>,
                            "Génère une URL de téléchargement",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes files list">
                <DocCodeBlock>arrhes files list --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files get">
                <DocCodeBlock>arrhes files get file_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files create">
                <DocParagraph>Enregistre les métadonnées d'un fichier dans l'exercice.</DocParagraph>
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
                            "--name <nom>",
                            "Oui",
                            "Nom du fichier (avec extension)",
                        ],
                        [
                            "--reference <réf>",
                            "Oui",
                            "Numéro de référence du fichier",
                        ],
                        [
                            "--hash <hash>",
                            "Oui",
                            "Hash SHA-256 du fichier",
                        ],
                        [
                            "--folder <id>",
                            "Non",
                            "Identifiant du dossier parent",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    {
                        "arrhes files create --year year_xyz \\\n  --name facture-2025-001.pdf --reference FA-001 --hash abc123..."
                    }
                </DocCodeBlock>
                <DocTip variant="info">
                    Pour uploader physiquement un fichier, utilisez les routes API de génération d'URL signée
                    disponibles dans la documentation API.
                </DocTip>
            </DocSection>

            <DocSection title="arrhes files update">
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
                            "Nouveau nom du fichier",
                        ],
                        [
                            "--reference <réf>",
                            "Non",
                            "Nouvelle référence",
                        ],
                        [
                            "--date <date>",
                            "Non",
                            "Date du fichier (YYYY-MM-DD)",
                        ],
                        [
                            "--folder <id>",
                            "Non",
                            "Nouveau dossier parent",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes files update file_abc --year year_xyz --name facture-corrigee.pdf</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files delete">
                <DocCodeBlock>arrhes files delete file_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files download-url">
                <DocParagraph>
                    Génère une URL signée temporaire pour télécharger le fichier. L'URL est affichée dans la sortie
                    standard.
                </DocParagraph>
                <DocCodeBlock>arrhes files download-url file_abc --year year_xyz</DocCodeBlock>
                <DocCodeBlock>
                    {'URL=$(arrhes files download-url file_abc --year year_xyz)\ncurl -o facture.pdf "$URL"'}
                </DocCodeBlock>
            </DocSection>

            <DocSection title="Vue d'ensemble - dossiers">
                <DocParagraph>
                    Les dossiers sont gérés via le sous-groupe <DocCode>arrhes files folders</DocCode>.
                </DocParagraph>
                <DocTable
                    headers={[
                        "Commande",
                        "Description",
                    ]}
                    rows={[
                        [
                            <DocCode key="0">{"arrhes files folders list --year <id>"}</DocCode>,
                            "Liste les dossiers d'un exercice",
                        ],
                        [
                            <DocCode key="0">{"arrhes files folders get <idFolder> --year <id>"}</DocCode>,
                            "Détails d'un dossier",
                        ],
                        [
                            <DocCode key="0">{"arrhes files folders create --year <id> --name <nom>"}</DocCode>,
                            "Crée un dossier",
                        ],
                        [
                            <DocCode key="0">{"arrhes files folders update <idFolder> --year <id>"}</DocCode>,
                            "Modifie un dossier",
                        ],
                        [
                            <DocCode key="0">{"arrhes files folders delete <idFolder> --year <id>"}</DocCode>,
                            "Supprime un dossier",
                        ],
                    ]}
                />
            </DocSection>

            <DocSection title="arrhes files folders list">
                <DocCodeBlock>arrhes files folders list --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files folders get">
                <DocCodeBlock>arrhes files folders get folder_abc --year year_xyz</DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files folders create">
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
                            "--name <nom>",
                            "Oui",
                            "Nom du dossier",
                        ],
                        [
                            "--parent <id>",
                            "Non",
                            "Identifiant du dossier parent",
                        ],
                    ]}
                />
                <DocCodeBlock>arrhes files folders create --year year_xyz --name "Factures fournisseurs"</DocCodeBlock>
                <DocCodeBlock>
                    arrhes files folders create --year year_xyz --name "Mars 2025" --parent folder_abc
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files folders update">
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
                            "Nouveau nom",
                        ],
                        [
                            "--parent <id>",
                            "Non",
                            "Nouveau dossier parent",
                        ],
                    ]}
                />
                <DocCodeBlock>
                    arrhes files folders update folder_abc --year year_xyz --name "Factures achats"
                </DocCodeBlock>
            </DocSection>

            <DocSection title="arrhes files folders delete">
                <DocParagraph>Supprime un dossier vide.</DocParagraph>
                <DocCodeBlock>arrhes files folders delete folder_abc --year year_xyz</DocCodeBlock>
            </DocSection>
        </DocRoot>
    )
}
