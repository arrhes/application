import { DocCode } from "../../../components/document/DocCode.tsx"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocLink } from "../../../components/document/DocLink.tsx"
import { DocList } from "../../../components/document/DocList.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"
import { DocTip } from "../../../components/document/DocTip.tsx"

export function OcrAiDocPage() {
    return (
        <>
            <DocHeader
                title="OCR"
                description="Reconnaissance optique de caractères pour l'extraction automatique de données comptables."
            />

            <DocSection title="Présentation">
                <DocParagraph>
                    La fonctionnalité OCR permet d'extraire automatiquement le texte depuis un document source (image ou
                    PDF) et de créer un nouveau fichier au format Markdown dans votre espace de stockage.
                </DocParagraph>
                <DocParagraph>
                    L'OCR est disponible depuis l'interface de stockage et via l'outil assistant{" "}
                    <DocCode>ocr_file</DocCode>.
                </DocParagraph>
            </DocSection>

            <DocSection title="Cas d'usage">
                <DocParagraph>L'OCR peut être utilisé pour :</DocParagraph>
                <DocList
                    items={[
                        "Extraire rapidement le texte d'une facture numérisée",
                        "Rendre un document scanné exploitable dans l'assistant IA",
                        "Conserver une version texte d'un justificatif dans le dossier de l'exercice",
                    ]}
                />
            </DocSection>

            <DocSection title="Limites et conditions">
                <DocList
                    items={[
                        "Fonctionnalité réservée au plan Avancé",
                        "Formats supportés: image/* et application/pdf",
                        "Quota mensuel: 1000 pages OCR par organisation",
                    ]}
                />
            </DocSection>

            <DocTip variant="tip">
                Pour voir la liste complète des capacités de l'assistant, consultez la page{" "}
                <DocLink to="/documentation/guide/assistant/outils">Outils</DocLink>.
            </DocTip>
        </>
    )
}
