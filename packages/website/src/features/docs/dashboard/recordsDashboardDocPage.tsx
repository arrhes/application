import { css } from "@arrhes/ui/utilities/cn.js"
import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTable } from "../../../components/document/docTable.js"

export function RecordsDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Saisir des écritures" description="Enregistrer vos opérations comptables dans Arrhes" />

            <DocSection title="Accéder à la saisie">
                <DocParagraph>
                    Pour saisir une écriture, accédez à votre exercice comptable puis cliquez sur l'onglet Écritures.
                    Vous verrez la liste des écritures existantes et un bouton pour en ajouter une nouvelle.
                </DocParagraph>
            </DocSection>

            <DocSection title="Créer une écriture">
                <DocParagraph>Chaque écriture comptable nécessite les informations suivantes :</DocParagraph>
                <DocList
                    items={[
                        "Date : la date de l'opération (ne peut pas être en dehors de l'exercice)",
                        "Journal : le type d'opération (Achats, Ventes, Banque...)",
                        "Libellé : une description claire de l'opération",
                        "Lignes : les comptes mouvementés avec leurs montants",
                    ]}
                />

                <DocExample title="Étapes de saisie">
                    <DocList
                        items={[
                            "Cliquez sur Nouvelle écriture",
                            "Sélectionnez le journal (ex : Banque)",
                            "Choisissez la date de l'opération",
                            "Entrez un libellé descriptif (ex : Achat fournitures Papeterie Martin)",
                            "Ajoutez les lignes d'écriture (comptes et montants)",
                            "Vérifiez que l'équilibre débit = crédit est respecté",
                            "Enregistrez l'écriture",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Les lignes d'écriture">
                <DocParagraph>
                    Chaque ligne d'écriture correspond à un compte mouvementé. Vous devez indiquer :
                </DocParagraph>
                <DocList
                    items={[
                        "Le compte (vous pouvez le rechercher par numéro ou par nom)",
                        "Le montant au débit OU au crédit (jamais les deux)",
                    ]}
                />
                <DocParagraph>
                    Rappel : comme expliqué dans le cours sur les{" "}
                    <DocLink to="/documentation/comptabilité/écritures">écritures comptables</DocLink>, le total des
                    débits doit toujours être égal au total des crédits.
                </DocParagraph>

                <DocExample title="Écriture de paiement fournisseur">
                    <p className={css({ mb: "3" })}>Vous payez une facture de 500 euros par virement bancaire :</p>
                    <DocTable
                        headers={["Compte", "Débit", "Crédit"]}
                        rows={[
                            ["401000 - Fournisseurs", "500,00", ""],
                            ["512000 - Banque", "", "500,00"],
                        ]}
                    />
                    <p className={css({ marginTop: "3", fontSize: "xs", color: "neutral/60" })}>
                        Explication : la dette fournisseur diminue (débit d'un compte de passif), la banque diminue
                        (crédit d'un compte d'actif).
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Joindre un justificatif">
                <DocParagraph>
                    Chaque écriture devrait être justifiée par une pièce (facture, relevé bancaire, ticket...). Arrhes
                    vous permet de joindre des fichiers numériques à vos écritures.
                </DocParagraph>
                <DocList
                    items={[
                        "Formats acceptés : PDF, images (JPG, PNG)",
                        "Taille maximale : 50 Mo par fichier",
                        "Vous pouvez joindre plusieurs fichiers à une même écriture",
                    ]}
                />
                <DocExample title="Ajouter une pièce jointe">
                    <DocList
                        items={[
                            "Ouvrez l'écriture concernée",
                            "Cliquez sur Ajouter une pièce jointe",
                            "Sélectionnez le fichier sur votre ordinateur",
                            "Le fichier est automatiquement associé à l'écriture",
                        ]}
                    />
                </DocExample>
            </DocSection>

            <DocSection title="Modifier ou supprimer une écriture">
                <DocParagraph>
                    Vous pouvez modifier ou supprimer une écriture tant que l'exercice n'est pas clôturé. Pour cela,
                    ouvrez l'écriture et utilisez les boutons correspondants.
                </DocParagraph>
                <DocParagraph>
                    <strong>Attention :</strong> en comptabilité, il est généralement préférable de passer une écriture
                    de correction plutôt que de supprimer une écriture erronée. Cela permet de garder une trace de
                    l'erreur et de sa correction.
                </DocParagraph>
            </DocSection>

            <DocSection title="Rechercher des écritures">
                <DocParagraph>
                    La liste des écritures peut être filtrée et triée selon plusieurs critères :
                </DocParagraph>
                <DocList
                    items={["Par date (période)", "Par journal", "Par compte", "Par libellé (recherche textuelle)"]}
                />
                <DocParagraph>Utilisez les filtres en haut de la liste pour affiner votre recherche.</DocParagraph>
            </DocSection>

            <DocSection title="Conseils pratiques">
                <DocList
                    items={[
                        "Saisissez vos écritures régulièrement (idéalement chaque semaine) pour ne pas accumuler de retard",
                        "Utilisez des libellés clairs et cohérents pour faciliter les recherches",
                        "Numérisez et joignez vos justificatifs au fur et à mesure",
                        "Vérifiez régulièrement vos soldes bancaires avec vos relevés",
                    ]}
                />
            </DocSection>

            <DocNextPage to="/documentation/dashboard/stockage" label="Espace de stockage" />
        </DocRoot>
    )
}
