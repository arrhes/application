import {
    createOneFileRouteDefinition,
    createOneFolderRouteDefinition,
    deleteOneFileRouteDefinition,
    deleteOneFolderRouteDefinition,
    generateBalanceSheetReportDocumentRouteDefinition,
    generateDocumentGetSignedUrlRouteDefinition,
    generateFileGetSignedUrlRouteDefinition,
    generateFilePutSignedUrlRouteDefinition,
    generateIncomeStatementReportDocumentRouteDefinition,
    readAllDocumentsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readOneDocumentRouteDefinition,
    readOneFileRouteDefinition,
    readOneFolderRouteDefinition,
    updateOneFileRouteDefinition,
    updateOneFolderRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocRouteRequest } from "../../../components/document/docRouteRequest.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function FilesApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Fichiers et documents"
                description="Gestion des fichiers, dossiers, URLs signées et génération de rapports PDF"
            />

            <DocSection title="Fichiers">
                <DocParagraph>
                    Les fichiers sont les pièces justificatives rattachées à un exercice comptable. Le stockage utilise
                    des URLs signées compatibles S3.
                </DocParagraph>
                <DocRouteRequest routeDefinition={createOneFileRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllFilesRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneFileRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneFileRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneFileRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={generateFilePutSignedUrlRouteDefinition}
                    description="Générer une URL signée pour uploader un fichier. Taille maximale : 50 Mo."
                />
                <DocRouteRequest
                    routeDefinition={generateFileGetSignedUrlRouteDefinition}
                    description="Générer une URL signée pour télécharger un fichier."
                />
                <DocTip variant="warning">
                    La taille maximale par fichier est de 50 Mo. Au-delà, l'API retourne une erreur <code>400</code>.
                </DocTip>
            </DocSection>

            <DocSection title="Dossiers">
                <DocParagraph>Les dossiers permettent d'organiser les fichiers au sein d'un exercice.</DocParagraph>
                <DocRouteRequest routeDefinition={createOneFolderRouteDefinition} />
                <DocRouteRequest routeDefinition={readAllFoldersRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneFolderRouteDefinition} />
                <DocRouteRequest routeDefinition={updateOneFolderRouteDefinition} />
                <DocRouteRequest routeDefinition={deleteOneFolderRouteDefinition} />
            </DocSection>

            <DocSection title="Documents et rapports">
                <DocParagraph>
                    Les documents sont des rapports PDF générés à partir des données comptables : bilans et comptes de
                    résultat.
                </DocParagraph>
                <DocRouteRequest routeDefinition={readAllDocumentsRouteDefinition} />
                <DocRouteRequest routeDefinition={readOneDocumentRouteDefinition} />
                <DocRouteRequest
                    routeDefinition={generateBalanceSheetReportDocumentRouteDefinition}
                    description="Générer un rapport de bilan en PDF."
                />
                <DocRouteRequest
                    routeDefinition={generateIncomeStatementReportDocumentRouteDefinition}
                    description="Générer un rapport de compte de résultat en PDF."
                />
                <DocRouteRequest
                    routeDefinition={generateDocumentGetSignedUrlRouteDefinition}
                    description="Générer une URL de téléchargement pour un document."
                />
            </DocSection>
        </DocRoot>
    )
}
