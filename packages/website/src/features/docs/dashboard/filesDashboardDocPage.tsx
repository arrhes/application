import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTip } from "../../../components/document/docTip.js"

export function FilesDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Votre espace de stockage"
                description="Gérer vos pièces justificatives et documents numériques"
            />

            <DocSection title="Pourquoi numériser vos documents ?">
                <DocParagraph>
                    Chaque <DocLink to="/documentation/comptabilité/écritures">écriture comptable</DocLink> doit être
                    justifiée par une pièce (facture, relevé bancaire, ticket de caisse...). Arrhes vous permet de
                    stocker ces documents numériquement, directement associés à vos écritures, pour un archivage
                    sécurisé et une consultation rapide.
                </DocParagraph>
                <DocParagraph>
                    La numérisation de vos justificatifs facilite les contrôles, les échanges avec votre
                    expert-comptable et la recherche de documents en cas de besoin.
                </DocParagraph>
            </DocSection>

            <DocSection title="Formats et limites">
                <DocParagraph>Arrhes accepte les formats de fichiers suivants pour les pièces jointes :</DocParagraph>
                <DocList
                    items={[
                        "PDF : idéal pour les factures et documents officiels",
                        "Images (JPG, PNG) : pratique pour les tickets et reçus photographiés",
                        "Taille maximale : 50 Mo par fichier",
                        "Plusieurs fichiers peuvent être associés à une même écriture",
                    ]}
                />
            </DocSection>

            <DocSection title="Ajouter une pièce jointe">
                <DocParagraph>
                    Les pièces jointes sont associées directement aux écritures comptables. Vous pouvez les ajouter lors
                    de la <DocLink to="/documentation/dashboard/écritures">saisie d'une écriture</DocLink> ou
                    ultérieurement.
                </DocParagraph>
                <DocExample title="Étapes pour joindre un document">
                    <DocList
                        items={[
                            "Ouvrez l'écriture concernée",
                            "Cliquez sur Ajouter une pièce jointe",
                            "Sélectionnez le fichier depuis votre ordinateur",
                            "Le fichier est téléversé et automatiquement associé à l'écriture",
                            "Vous pouvez ajouter d'autres fichiers si nécessaire",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Consulter et gérer vos fichiers">
                <DocParagraph>
                    Depuis une écriture, vous pouvez visualiser, télécharger ou supprimer les pièces jointes associées.
                    Les fichiers PDF et images peuvent être prévisualisés directement dans l'application.
                </DocParagraph>
                <DocList
                    items={[
                        "Cliquez sur une pièce jointe pour la prévisualiser",
                        "Utilisez le bouton de téléchargement pour récupérer le fichier original",
                        "Supprimez une pièce jointe si elle a été ajoutée par erreur",
                    ]}
                />
            </DocSection>

            <DocSection title="Organisation et bonnes pratiques">
                <DocList
                    items={[
                        "Numérisez vos justificatifs au fur et à mesure pour ne pas accumuler de retard",
                        "Nommez clairement vos fichiers avant de les téléverser (ex : facture-fournisseur-2024-01.pdf)",
                        "Vérifiez que le document est lisible avant de le joindre",
                        "Conservez les originaux papier pendant la durée légale de conservation",
                    ]}
                />
            </DocSection>

            <DocTip variant="info">
                La conservation des pièces justificatives est une obligation légale. Arrhes vous aide à organiser vos
                documents numériquement, mais pensez également à conserver vos originaux papier conformément à la
                réglementation.
            </DocTip>

            <DocNextPage to="/documentation/dashboard/documents" label="Documents de synthèse" />
        </DocRoot>
    )
}
