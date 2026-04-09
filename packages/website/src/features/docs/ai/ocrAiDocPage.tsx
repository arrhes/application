import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocList } from "../../../components/document/docList.tsx"
import { DocParagraph } from "../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocSection } from "../../../components/document/docSection.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"

export function OcrAiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="OCR"
                description="Reconnaissance optique de caractères pour l'extraction automatique de données comptables."
            />

            <DocSection title="Fonctionnalité à venir">
                <DocParagraph>
                    La reconnaissance optique de caractères (OCR) permettra d'extraire automatiquement les données
                    comptables depuis des documents scannés : factures, reçus, relevés bancaires et autres pièces
                    justificatives.
                </DocParagraph>
                <DocTip variant="info">
                    Cette fonctionnalité est actuellement en cours de développement. Elle sera disponible dans une
                    prochaine mise à jour de l'assistant IA.
                </DocTip>
            </DocSection>

            <DocSection title="Cas d'usage prévus">
                <DocParagraph>L'OCR pourra être utilisé pour :</DocParagraph>
                <DocList
                    items={[
                        "Extraire les montants, dates et libellés depuis des factures numérisées",
                        "Pré-remplir les écritures comptables à partir de pièces justificatives",
                        "Associer automatiquement les fichiers importés aux écritures correspondantes",
                    ]}
                />
            </DocSection>

            <DocTip variant="tip">
                En attendant l'OCR, vous pouvez utiliser l'assistant IA pour{" "}
                <DocLink to="/documentation/dashboard/assistant/outils">créer des écritures</DocLink> manuellement via
                des commandes en langage naturel.
            </DocTip>
        </DocRoot>
    )
}
