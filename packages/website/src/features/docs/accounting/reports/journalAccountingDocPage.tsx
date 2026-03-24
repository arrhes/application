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

export function JournalAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Le journal" description="Registre chronologique de toutes les écritures comptables" />

            <DocSection title="Définition">
                <DocDefinition term="Journal comptable">
                    Registre dans lequel sont inscrites, par ordre chronologique, toutes les écritures comptables de
                    l'organisation. Chaque écriture y est enregistrée avec sa date, ses comptes mouvementés, ses
                    montants et un libellé explicatif.
                </DocDefinition>

                <DocParagraph>
                    Le journal est le point d'entrée de la comptabilité
                    <DocSourceRef n={1} /> : c'est ici que chaque opération est enregistrée pour la première fois. Il
                    constitue la trace originale et chronologique de l'ensemble des{" "}
                    <DocLink to="/documentation/comptabilité/écritures">écritures</DocLink> passées au cours d'un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "exercice-comptable" }}>
                        exercice comptable
                    </DocLink>
                    .
                </DocParagraph>
            </DocSection>

            <DocSection title="Structure d'un journal">
                <DocParagraph>
                    Chaque ligne du journal représente un mouvement comptable. Une{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "ecriture-comptable" }}>
                        écriture comptable
                    </DocLink>{" "}
                    comprend toujours au moins deux lignes (un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "debit" }}>
                        débit
                    </DocLink>{" "}
                    et un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "credit" }}>
                        crédit
                    </DocLink>
                    ), conformément au principe de la{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "partie-double" }}>
                        partie double
                    </DocLink>
                    .
                </DocParagraph>

                <DocExample title="Extrait de journal">
                    <DocTable
                        headers={["Date", "Compte", "Libellé", "Débit", "Crédit"]}
                        rows={[
                            ["03/01", "411 - Clients", "Facture n°001 - Client Dupont", "1 200", ""],
                            ["", "706 - Prestations de services", "Facture n°001 - Client Dupont", "", "1 000"],
                            ["", "4457 - TVA collectée", "Facture n°001 - Client Dupont", "", "200"],
                            ["", "", "", "", ""],
                            ["10/01", "512 - Banque", "Règlement facture n°001", "1 200", ""],
                            ["", "411 - Clients", "Règlement facture n°001", "", "1 200"],
                            ["", "", "", "", ""],
                            ["15/01", "606 - Achats de fournitures", "Achat papeterie", "150", ""],
                            ["", "4456 - TVA déductible", "Achat papeterie", "", "30"],
                            ["", "401 - Fournisseurs", "Achat papeterie", "", "180"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        Chaque écriture est équilibrée : le total des débits est égal au total des crédits.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les journaux auxiliaires">
                <DocParagraph>
                    En pratique, pour des raisons d'organisation, les écritures ne sont pas toutes enregistrées dans un
                    seul journal. On utilise des <strong>journaux auxiliaires</strong> spécialisés, chacun dédié à un
                    type d'opération. Cela permet de répartir le travail et de vérifier plus facilement les opérations.
                </DocParagraph>

                <DocDefinition term="Journal des achats (HA)">
                    Enregistre toutes les factures fournisseurs reçues. On y trouve les achats à crédit avant leur
                    règlement.
                </DocDefinition>
                <DocDefinition term="Journal des ventes (VE)">
                    Enregistre toutes les factures clients émises. On y trouve les ventes à crédit avant leur
                    encaissement.
                </DocDefinition>
                <DocDefinition term="Journal de banque (BQ)">
                    Enregistre tous les mouvements du compte bancaire : encaissements, décaissements, virements.
                </DocDefinition>
                <DocDefinition term="Journal de caisse (CA)">
                    Enregistre tous les mouvements d'espèces : recettes et dépenses en liquide.
                </DocDefinition>
                <DocDefinition term="Journal des opérations diverses (OD)">
                    Enregistre les opérations qui ne rentrent pas dans les autres journaux : salaires, amortissements,
                    régularisations, écritures de clôture.
                </DocDefinition>

                <DocParagraph>
                    L'ensemble de ces journaux auxiliaires forme le <strong>journal général</strong>, qui centralise
                    toutes les écritures de l'exercice. Cette organisation permet de répartir le travail de saisie et
                    facilite les contrôles.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le journal centralisateur">
                <DocParagraph>
                    Lorsqu'une organisation utilise des journaux auxiliaires, elle doit tenir un{" "}
                    <strong>journal centralisateur</strong> (ou livre-journal). Ce document récapitule chaque mois les
                    totaux de chaque journal auxiliaire, créant ainsi un enregistrement unique et synthétique de toutes
                    les opérations.
                </DocParagraph>

                <DocParagraph>
                    Le journal centralisateur est le document qui a valeur juridique : c'est lui qui est visé par les
                    obligations légales. Les journaux auxiliaires en sont les documents préparatoires.
                </DocParagraph>

                <DocTip variant="info">
                    Lorsqu'une opération concerne plusieurs journaux auxiliaires (par exemple, un virement de la caisse
                    vers la banque), on utilise un <strong>compte de virements internes</strong> (classe 58) pour
                    assurer la liaison entre les deux journaux sans créer de double enregistrement.
                </DocTip>
            </DocSection>

            <DocSection title="Le journal des À-Nouveaux">
                <DocParagraph>
                    En début d'exercice, les soldes des comptes de{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "bilan" }}>
                        bilan
                    </DocLink>{" "}
                    (classes 1 à 5) doivent être repris de l'exercice précédent. Cette reprise s'effectue par des
                    écritures d'ouverture enregistrées dans un journal particulier : le{" "}
                    <strong>journal des À-Nouveaux (AN)</strong>.
                </DocParagraph>

                <DocDefinition term="Journal des À-Nouveaux">
                    Journal spécial qui enregistre les écritures de report des soldes de l'exercice précédent vers le
                    nouvel exercice. Il porte les soldes de tous les comptes de bilan non soldés.
                </DocDefinition>

                <DocParagraph>
                    Les comptes de{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "charges-classe-6" }}>
                        charges
                    </DocLink>{" "}
                    et de{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "produits-classe-7" }}>
                        produits
                    </DocLink>{" "}
                    (classes 6 et 7) ne sont pas reportés : ils sont remis à zéro car ils ne concernent qu'un seul
                    exercice. Le{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "resultat" }}>
                        résultat
                    </DocLink>{" "}
                    de l'exercice précédent est affecté aux{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "report-a-nouveau" }}>
                        reports à nouveau
                    </DocLink>{" "}
                    ou aux{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "reserves" }}>
                        réserves
                    </DocLink>
                    .
                </DocParagraph>
            </DocSection>

            <DocSection title="Obligations légales">
                <DocParagraph>
                    Le journal est un document obligatoire. Plusieurs textes encadrent sa tenue :
                </DocParagraph>

                <DocList
                    items={[
                        <>
                            Le Code de commerce impose la tenue d'un livre-journal à toute personne ayant la qualité de
                            commerçant
                            <DocSourceRef n={2} />
                        </>,
                        "Le Code Général des Impôts (CGI) reprend cette obligation pour les besoins fiscaux",
                        <>
                            Le Plan Comptable Général (PCG) définit les règles de forme du journal
                            <DocSourceRef n={3} />
                        </>,
                        "L'article R.123-173 du Code de commerce autorise la tenue du journal sur support informatique, à condition de garantir l'authenticité et l'intégrité des écritures",
                    ]}
                />

                <DocParagraph>
                    Le journal doit être conservé pendant <strong>10 ans</strong> (obligation comptable) et peut être
                    exigé en cas de contrôle fiscal, de litige commercial ou de procédure judiciaire.
                </DocParagraph>

                <DocTip variant="tip">
                    Le journal doit être tenu sans blanc ni rature. En comptabilité informatisée, les écritures validées
                    ne peuvent pas être supprimées : toute correction se fait par une écriture de contrepassation. Cette
                    règle d'irréversibilité garantit la fiabilité de la piste d'audit.
                </DocTip>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes génère automatiquement le journal à partir de vos{" "}
                    <DocLink to="/documentation/comptabilité/écritures">écritures</DocLink>. Chaque saisie est datée,
                    numérotée et classée dans le journal approprié. Consultez le guide sur les{" "}
                    <DocLink to="/documentation/dashboard/documents">rapports</DocLink> pour apprendre à exporter et
                    consulter votre journal.
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/comptabilité/documents/grand-livre" label="Le grand livre" />

            <DocSources
                sources={[
                    {
                        label: "Journal (comptabilité) — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Journal_(comptabilit%C3%A9)",
                    },
                    {
                        label: "Code de commerce, Article L123-12 — Légifrance",
                        url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006219316",
                    },
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                ]}
            />
        </DocRoot>
    )
}
