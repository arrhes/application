import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/docDefinition.js"
import { DocExample } from "../../../../components/document/docExample.js"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocLink } from "../../../../components/document/docLink.js"
import { DocList } from "../../../../components/document/docList.js"
import { DocNextPage } from "../../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocSourceRef } from "../../../../components/document/docSourceRef.js"
import { DocSources } from "../../../../components/document/docSources.js"
import { DocTable } from "../../../../components/document/docTable.js"
import { DocTip } from "../../../../components/document/docTip.js"

export function FecAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Le Fichier des Écritures Comptables (FEC)"
                description="Export normé des écritures comptables requis par l'administration fiscale"
            />

            <DocSection title="Définition">
                <DocDefinition term="Fichier des Écritures Comptables (FEC)">
                    Fichier dématérialisé contenant l'ensemble des écritures comptables d'un exercice, dans un format
                    normé imposé par l'administration fiscale française. Il doit être remis en cas de contrôle fiscal
                    informatisé.
                </DocDefinition>

                <DocParagraph>
                    Le FEC a été instauré par l'article L.47 A-I du Livre des Procédures Fiscales
                    <DocSourceRef n={1} />, applicable depuis le 1er janvier 2014. Toute organisation tenant une
                    comptabilité informatisée doit être en mesure de produire ce fichier sur demande du vérificateur.
                </DocParagraph>

                <DocParagraph>
                    Pour en savoir plus sur le FEC et ses spécificités, consultez{" "}
                    <a
                        href="https://fec.arrhes.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={css({
                            fontSize: "sm",
                            color: "primary",
                            fontWeight: "medium",
                            textDecoration: "underline",
                            textDecorationColor: "primary/30",
                            textUnderlineOffset: "2px",
                            _hover: { textDecorationColor: "primary" },
                            transition: "all 0.15s",
                        })}
                    >
                        fec.arrhes.com
                    </a>
                    .
                </DocParagraph>
            </DocSection>

            <DocSection title="Structure du fichier">
                <DocParagraph>
                    Le FEC est un fichier texte tabulé (séparateur tabulation) encodé en UTF-8 avec BOM. La première
                    ligne contient les en-têtes normés. Chaque ligne suivante représente un mouvement comptable (une
                    ligne d'
                    <DocLink to="/documentation/comptabilité/écritures">écriture</DocLink>).
                </DocParagraph>

                <DocParagraph>Le fichier comporte 18 colonnes obligatoires :</DocParagraph>

                <DocExample title="Colonnes du FEC">
                    <DocTable
                        headers={["Colonne", "Description"]}
                        rows={[
                            ["JournalCode", "Code du journal"],
                            ["JournalLib", "Libellé du journal"],
                            ["EcritureNum", "Numéro séquentiel de l'écriture"],
                            ["EcritureDate", "Date de l'écriture (AAAAMMJJ)"],
                            ["CompteNum", "Numéro de compte"],
                            ["CompteLib", "Libellé du compte"],
                            ["CompAuxNum", "Numéro de compte auxiliaire"],
                            ["CompAuxLib", "Libellé du compte auxiliaire"],
                            ["PieceRef", "Référence de la pièce justificative"],
                            ["PieceDate", "Date de la pièce justificative"],
                            ["EcritureLib", "Libellé de l'écriture"],
                            ["Debit", "Montant au débit"],
                            ["Credit", "Montant au crédit"],
                            ["EcritureLet", "Lettrage de l'écriture"],
                            ["DateLet", "Date de lettrage"],
                            ["ValidDate", "Date de validation"],
                            ["Montantdevise", "Montant en devise"],
                            ["Idevise", "Identifiant de la devise"],
                        ]}
                    />
                </DocExample>

                <DocTip variant="info">
                    Les montants utilisent la virgule comme séparateur décimal (ex. : 1234,50). Les dates sont au format
                    AAAAMMJJ sans séparateur. Ces conventions sont imposées par le cahier des charges du FEC
                    <DocSourceRef n={2} />.
                </DocTip>
            </DocSection>

            <DocSection title="Nom du fichier">
                <DocParagraph>
                    Le nom du fichier FEC suit une convention stricte : <strong>[SIREN]FEC[AAAAMMJJ].txt</strong>, où le
                    SIREN est le numéro d'identification de l'organisation et la date correspond à la date de clôture de
                    l'exercice.
                </DocParagraph>

                <DocExample title="Exemple de nom de fichier">
                    <p className={css({ fontSize: "sm", color: "neutral/70" })}>
                        Pour une organisation dont le SIREN est 123456789, avec un exercice clos au 31 décembre 2024 :
                    </p>
                    <p className={css({ marginTop: "2", fontSize: "sm", fontWeight: "medium" })}>
                        123456789FEC20241231.txt
                    </p>
                </DocExample>

                <DocTip variant="warning">
                    Si le numéro SIREN n'est pas renseigné dans les paramètres de l'organisation, le nom du fichier ne
                    sera pas conforme aux exigences de l'administration fiscale.
                </DocTip>
            </DocSection>

            <DocSection title="Qui est concerné ?">
                <DocParagraph>
                    L'obligation de présenter un FEC s'applique à toute organisation qui tient sa comptabilité de
                    manière informatisée, quelle que soit sa taille ou sa forme juridique
                    <DocSourceRef n={1} />. Cela comprend :
                </DocParagraph>

                <DocList
                    items={[
                        "Les sociétés commerciales (SARL, SAS, SA, etc.)",
                        "Les entreprises individuelles soumises à un régime réel d'imposition",
                        "Les associations et organismes à but non lucratif tenant une comptabilité informatisée",
                        "Les professions libérales relevant des BNC avec comptabilité informatisée",
                    ]}
                />

                <DocParagraph>
                    Seules les micro-entreprises (régime micro-BIC ou micro-BNC) sont dispensées, car elles ne tiennent
                    pas de comptabilité en partie double.
                </DocParagraph>
            </DocSection>

            <DocSection title="Sanctions">
                <DocParagraph>
                    Le défaut de présentation du FEC lors d'un contrôle fiscal peut entraîner des sanctions
                    significatives :
                </DocParagraph>

                <DocList
                    items={[
                        "Une amende de 5 000 euros par exercice vérifié",
                        "Le rejet de la comptabilité et une taxation d'office par l'administration",
                        "L'impossibilité de s'opposer aux rectifications proposées par le vérificateur",
                    ]}
                />

                <DocTip variant="tip">
                    Il est recommandé de vérifier régulièrement que votre FEC est conforme, sans attendre un contrôle
                    fiscal. Arrhes génère le FEC à partir de vos écritures validées.
                </DocTip>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes permet d'exporter le FEC directement depuis la page des{" "}
                    <DocLink to="/documentation/comptabilité/écritures">écritures</DocLink> de l'exercice. L'export
                    respecte le format normé (tabulation, encodage UTF-8 avec BOM, colonnes obligatoires) et nomme
                    automatiquement le fichier à partir du SIREN de l'organisation.
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/comptabilité/documents/annexe" label="L'annexe comptable" />

            <DocSources
                sources={[
                    {
                        label: "Article L47 A - Livre des procédures fiscales - Légifrance",
                        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027804775",
                    },
                    {
                        label: "FEC : Fichier des Écritures Comptables - fec.arrhes.com",
                        url: "https://fec.arrhes.com",
                    },
                    {
                        label: "Bulletin Officiel des Finances Publiques (BOFiP) - CF-IOR-60-40-20",
                        url: "https://bofip.impots.gouv.fr/bofip/9028-PGP.html",
                    },
                ]}
            />
        </DocRoot>
    )
}
