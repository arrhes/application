import {
    createOneFileRouteDefinition,
    createOneFolderRouteDefinition,
    deleteOneFileRouteDefinition,
    deleteOneFolderRouteDefinition,
    generateBalanceSheetXmlRouteDefinition,
    generateFileDeleteSignedUrlRouteDefinition,
    generateFileGetSignedUrlRouteDefinition,
    generateFilePutSignedUrlRouteDefinition,
    generateIncomeStatementXmlRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readOneFileRouteDefinition,
    readOneFolderRouteDefinition,
    updateOneFileRouteDefinition,
    updateOneFolderRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocRouteRequest } from "../../../components/document/DocRouteRequest.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"
import { DocTip } from "../../../components/document/DocTip.tsx"

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
                <DocRouteRequest
                    routeDefinition={generateFileDeleteSignedUrlRouteDefinition}
                    description="Générer une URL signée pour supprimer un fichier."
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

            <DocSection title="Rapports XBRL">
                <DocParagraph>
                    Génération de rapports comptables en XBRL (taxonomie ANC française) : bilans et comptes de résultat.
                </DocParagraph>
                <DocRouteRequest
                    routeDefinition={generateBalanceSheetXmlRouteDefinition}
                    description="Générer un bilan en XBRL (conformité française ANC) et retourner l'URL signée."
                />
                <DocRouteRequest
                    routeDefinition={generateIncomeStatementXmlRouteDefinition}
                    description="Générer un compte de résultat en XBRL (conformité française ANC) et retourner l'URL signée."
                />
            </DocSection>
        </DocRoot>
    )
}
