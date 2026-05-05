import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"

export function BillingDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Facturation"
                description="Comprendre la facturation et visualiser les factures XML depuis Arrhes"
            />

            <DocSection title="Tarification des services">
                <DocParagraph>
                    Le détail des services payants est disponible sur la page
                    <DocLink to="/documentation/tarifs"> Tarifs</DocLink>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Visualiser un fichier XML">
                <DocParagraph>
                    Depuis votre dashboard, ouvrez une facture puis utilisez la vue XML pour vérifier la conformité et
                    le rendu de la facture. Les actions de téléchargement sont accessibles directement depuis
                    l'interface de facturation de l'organisation.
                </DocParagraph>
            </DocSection>

            <DocSection title="Téléchargements XML et PDF">
                <DocParagraph>
                    Depuis le dashboard, chaque facture générée propose des actions de téléchargement aux formats XML et
                    PDF.
                </DocParagraph>
                <DocList
                    items={[
                        "XML: format source UBL pour archivage, échange et intégration",
                        "PDF: version lisible pour partage interne et impression",
                        "Si une facture n'est pas encore générée, les téléchargements sont indisponibles",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
