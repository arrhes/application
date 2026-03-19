import { DocHeader } from "../../../../components/document/docHeader.tsx"
import { DocLink } from "../../../../components/document/docLink.tsx"
import { DocList } from "../../../../components/document/docList.tsx"
import { DocNextPage } from "../../../../components/document/docNextPage.tsx"
import { DocParagraph } from "../../../../components/document/docParagraph.tsx"
import { DocRoot } from "../../../../components/document/docRoot.tsx"
import { DocSection } from "../../../../components/document/docSection.tsx"
import { DocSources } from "../../../../components/document/docSources.tsx"

export function RootAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Cours de comptabilité"
                description="Apprenez les bases de la comptabilité française, étape par étape."
            />

            <DocSection title="À propos de ce cours">
                <DocParagraph>
                    Ce cours est conçu pour ceux qui souhaitent comprendre les fondamentaux de la comptabilité
                    française. Il peut également servir de rappel aux professionnels. Chaque page contient des
                    définitions claires et des exemples concrets pour faciliter l'apprentissage.
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
                    Arrhes est un logiciel de comptabilité conçu pour les entreprises et les associations françaises. Ce
                    cours reprend des concepts directement utilisés dans le logiciel. En le suivant, vous comprendrez
                    comment <DocLink to="/documentation/dashboard/démarrage">utiliser Arrhes</DocLink> efficacement.
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/comptabilité/introduction" label="Introduction à la comptabilité" />

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-francaises/reglementation-comptable/recueil-des-normes-comptables-francaises",
                    },
                    {
                        label: "Comptabilité — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Comptabilit%C3%A9",
                    },
                ]}
            />
        </DocRoot>
    )
}
