import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"

export function YearsDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Gérer les exercices" description="Configuration et administration de vos exercices" />

            <DocSection title="Les exercices comptables">
                <DocParagraph>
                    Chaque organisation contient un ou plusieurs exercices comptables. Un exercice représente une
                    période (généralement 12 mois) pendant laquelle vous enregistrez vos opérations.
                </DocParagraph>
                <DocParagraph>
                    Pour comprendre ce qu'est un exercice comptable, consultez la page sur les{" "}
                    <DocLink to="/documentation/comptabilité">principes fondamentaux</DocLink>.
                </DocParagraph>
                <DocList
                    items={[
                        "Vous ne pouvez avoir qu'un seul exercice en cours à la fois",
                        "Les exercices clôturés ne peuvent plus être modifiés",
                        "À la clôture, le résultat est reporté dans l'exercice suivant",
                    ]}
                />
            </DocSection>

            <DocSection title="Configuration du plan comptable">
                <DocParagraph>
                    Le plan comptable est la liste des comptes disponibles pour saisir vos écritures. Arrhes crée
                    automatiquement un plan comptable standard, mais vous pouvez le personnaliser.
                </DocParagraph>
                <DocExample title="Ajouter un compte">
                    <DocList
                        items={[
                            "Accédez à l'exercice concerné",
                            "Allez dans Paramètres → Comptes",
                            "Cliquez sur « Ajouter un compte »",
                            "Définissez le numéro et l'intitulé du compte",
                            "Enregistrez",
                        ]}
                    />
                    <DocParagraph>
                        Pour comprendre la numérotation des comptes, consultez la page sur les{" "}
                        <DocLink to="/documentation/comptabilité/comptes">comptes comptables</DocLink>.
                    </DocParagraph>
                </DocExample>
            </DocSection>

            <DocSection title="Les journaux">
                <DocParagraph>
                    Les journaux permettent de classer vos écritures par type d'opération. Des journaux par défaut sont
                    créés automatiquement (Achats, Ventes, Banque, Caisse, Opérations diverses).
                </DocParagraph>
                <DocParagraph>
                    Vous pouvez créer des journaux supplémentaires si nécessaire (ex : un journal par compte bancaire si
                    vous en avez plusieurs).
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/dashboard/écritures" label="Saisir des écritures" />
        </DocRoot>
    )
}
