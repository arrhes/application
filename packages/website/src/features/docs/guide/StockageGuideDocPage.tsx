import {
    createOneFileRouteDefinition,
    createOneFolderRouteDefinition,
    deleteOneFileRouteDefinition,
    deleteOneFolderRouteDefinition,
    downloadFileRouteDefinition,
    ocrFileRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readOneFileRouteDefinition,
    readOneFolderRouteDefinition,
    updateOneFileRouteDefinition,
    updateOneFolderRouteDefinition,
} from "@comptasse/application-metadata/routes"
import { DocCode } from "../../../components/document/DocCode.js"
import { DocCodeBlock } from "../../../components/document/DocCodeBlock.js"
import { DocExample } from "../../../components/document/DocExample.js"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocImplementationTabs } from "../../../components/document/DocImplementationTabs.js"
import { DocList } from "../../../components/document/DocList.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../components/document/DocRoot.js"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocTable } from "../../../components/document/DocTable.js"
import { DocTip } from "../../../components/document/DocTip.js"

export function StockageGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Stockage de fichiers"
                description="Organiser les pièces justificatives et documents"
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    Comptasse permet de stocker des fichiers liés à une organisation ou à des écritures comptables. Les
                    fichiers sont rangés dans des dossiers hiérarchiques.
                </DocParagraph>
                <DocList
                    items={[
                        "Chaque fichier appartient à une organisation.",
                        "Les dossiers permettent d'organiser les pièces par exercice, type ou projet.",
                        "Un fichier peut être rattaché à une écriture comme pièce justificative.",
                    ]}
                />
            </DocSection>

            <DocSection title="Implémentation">
                <DocImplementationTabs
                    dashboard={
                        <>
                            <DocParagraph>
                                Depuis un exercice, ouvrez l'onglet « Fichiers ». Vous pouvez créer des dossiers,
                                téléverser des fichiers et les lier aux écritures.
                            </DocParagraph>
                            <DocExample title="Téléverser une facture">
                                <DocList
                                    items={[
                                        "Créez un dossier (ex. Factures 2025)",
                                        "Glissez-déposez le fichier ou cliquez sur Téléverser",
                                        "Sélectionnez l'écriture associée si nécessaire",
                                        "Validez pour enregistrer le fichier",
                                    ]}
                                />
                            </DocExample>
                            <DocTip variant="info">
                                Les formats acceptés sont PDF, JPG et PNG, avec une taille maximale de 50 Mo.
                            </DocTip>
                        </>
                    }
                    api={
                        <>
                            <DocParagraph>
                                Les fichiers et dossiers sont stockés au niveau de l'organisation. Les fichiers peuvent
                                être rattachés à une écriture ou laissés libres.
                            </DocParagraph>
                            <DocSection
                                title="Fichiers"
                                depth={1}
                            >
                                <DocRouteRequest routeDefinition={createOneFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllFilesRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={downloadFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={ocrFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneFileRouteDefinition} />
                            </DocSection>
                            <DocSection
                                title="Dossiers"
                                depth={1}
                            >
                                <DocRouteRequest routeDefinition={createOneFolderRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllFoldersRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneFolderRouteDefinition} />
                                <DocRouteRequest routeDefinition={updateOneFolderRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneFolderRouteDefinition} />
                            </DocSection>
                        </>
                    }
                    cli={
                        <>
                            <DocTable
                                headers={[
                                    "Commande",
                                    "Description",
                                ]}
                                rows={[
                                    [
                                        <DocCode key="0">{"comptasse files list --year <id>"}</DocCode>,
                                        "Liste les fichiers",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse files upload --year <id> --file <chemin>"}
                                        </DocCode>,
                                        "Téléverse un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse files get <idFile> --year <id>"}</DocCode>,
                                        "Affiche un fichier",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse files update <idFile> --year <id> --name <nom>"}
                                        </DocCode>,
                                        "Modifie un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse files download <idFile> --year <id>"}</DocCode>,
                                        "Télécharge un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse files ocr <idFile> --year <id>"}</DocCode>,
                                        "Lance la reconnaissance OCR d'un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse files delete <idFile> --year <id>"}</DocCode>,
                                        "Supprime un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"comptasse files folders list --year <id>"}</DocCode>,
                                        "Liste les dossiers",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse files folders create --year <id> --name <nom>"}
                                        </DocCode>,
                                        "Crée un dossier",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"comptasse files folders delete <idFolder> --year <id>"}
                                        </DocCode>,
                                        "Supprime un dossier",
                                    ],
                                ]}
                            />
                            <DocExample title="Téléverser une pièce justificative">
                                <DocCodeBlock>
                                    comptasse files upload ./facture-2025-03.pdf --year 1 --folder 12
                                </DocCodeBlock>
                            </DocExample>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
