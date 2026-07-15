import {
    createOneFileRouteDefinition,
    createOneFolderRouteDefinition,
    deleteOneFileRouteDefinition,
    deleteOneFolderRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readOneFileRouteDefinition,
    readOneFolderRouteDefinition,
    updateOneFolderRouteDefinition,
} from "@arrhes/application-metadata/routes"
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
                    Arrhes permet de stocker des fichiers liés à une organisation ou à des écritures comptables. Les
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
                            <DocSection title="Fichiers">
                                <DocRouteRequest routeDefinition={createOneFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={readAllFilesRouteDefinition} />
                                <DocRouteRequest routeDefinition={readOneFileRouteDefinition} />
                                <DocRouteRequest routeDefinition={deleteOneFileRouteDefinition} />
                            </DocSection>
                            <DocSection title="Dossiers">
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
                                        <DocCode key="0">{"arrhes files list --organization <id>"}</DocCode>,
                                        "Liste les fichiers",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes files upload <chemin> --organization <id>"}</DocCode>,
                                        "Téléverse un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes files attach <id> --entry <id>"}</DocCode>,
                                        "Attache un fichier à une écriture",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes files delete <id>"}</DocCode>,
                                        "Supprime un fichier",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes files folders list --organization <id>"}</DocCode>,
                                        "Liste les dossiers",
                                    ],
                                    [
                                        <DocCode key="0">
                                            {"arrhes files folders create --organization <id> --name <nom>"}
                                        </DocCode>,
                                        "Crée un dossier",
                                    ],
                                    [
                                        <DocCode key="0">{"arrhes files folders delete <id>"}</DocCode>,
                                        "Supprime un dossier",
                                    ],
                                ]}
                            />
                            <DocExample title="Téléverser une pièce justificative">
                                <DocCodeBlock>
                                    arrhes files upload ./facture-2025-03.pdf --organization org_abc --folder folder_xyz
                                </DocCodeBlock>
                            </DocExample>
                        </>
                    }
                />
            </DocSection>
        </DocRoot>
    )
}
