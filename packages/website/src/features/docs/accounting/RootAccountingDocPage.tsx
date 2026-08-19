import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocList } from "../../../components/document/DocList.tsx"
import { DocParagraph } from "../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocSection } from "../../../components/document/DocSection.tsx"

export function RootAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Cours de comptabilité"
                description="Apprenez les bases de la comptabilité, étape par étape."
            />

            <DocSection title="À propos de ce cours">
                <DocParagraph>
                    Ce cours est conçu pour ceux qui souhaitent comprendre les fondamentaux de la comptabilité
                    française. Il peut également servir de rappel aux avertis. Chaque page contient des définitions
                    claires et des exemples concrets pour faciliter l'apprentissage.
                </DocParagraph>

                <DocParagraph>
                    Aucun prérequis n'est nécessaire : les notions sont introduites progressivement, des concepts les
                    plus basiques jusqu'aux documents de synthèse.
                </DocParagraph>
            </DocSection>

            <DocSection title="Ce que vous allez apprendre">
                <DocList
                    items={[
                        "Les principes fondamentaux de la comptabilité (partie double, débit/crédit, exercice comptable)",
                        "L'organisation des comptes selon le Plan Comptable Général",
                        "Comment enregistrer des écritures comptables",
                        "Les documents comptables de synthèse (bilan, compte de résultat, balance, journal, grand livre, annexe)",
                    ]}
                />
            </DocSection>
        </DocRoot>
    )
}
