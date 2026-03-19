import { DocHeader } from "../../../../components/document/docHeader.tsx"
import { DocLink } from "../../../../components/document/docLink.tsx"
import { DocList } from "../../../../components/document/docList.tsx"
import { DocNextPage } from "../../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../../components/document/docRoot.tsx"
import { DocSection } from "../../../../components/document/docSection.tsx"
import { DocTip } from "../../../../components/document/docTip.tsx"

export function RootAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Cours de comptabilité"
                description="Apprenez les bases de la comptabilité française, étape par étape."
            />

            <DocSection title="À propos de ce cours">
                <DocParagraph>
                    Ce cours est conçu pour les débutants qui souhaitent comprendre les fondamentaux de la comptabilité
                    française. Il peut également servir de rappel aux professionnels. Chaque page contient des exemples
                    concrets et des définitions claires pour faciliter l'apprentissage.
                </DocParagraph>

                <DocParagraph>
                    Aucun prérequis n'est nécessaire : les notions sont introduites progressivement, des concepts les
                    plus simples jusqu'aux documents de synthèse.
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

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes est un logiciel de comptabilité conçu pour les petites structures et les associations
                    françaises. Ce cours reprend les mêmes concepts que ceux utilisés dans le logiciel. En le suivant,
                    vous comprendrez comment <DocLink to="/documentation/dashboard/démarrage">utiliser Arrhes</DocLink>{" "}
                    efficacement.
                </DocParagraph>
            </DocSection>

            <DocTip variant="tip">
                Les pages se suivent dans un ordre logique. Utilisez le bouton en bas de chaque page pour passer à la
                suivante, ou naviguez librement via le menu latéral.
            </DocTip>

            <DocNextPage to="/documentation/comptabilité/introduction" label="Introduction à la comptabilité" />
        </DocRoot>
    )
}
