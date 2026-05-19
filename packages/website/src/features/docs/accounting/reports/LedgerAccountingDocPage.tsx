import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.js"
import { DocExample } from "../../../../components/document/DocExample.js"
import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocLink } from "../../../../components/document/DocLink.js"
import { DocList } from "../../../../components/document/DocList.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.js"
import { DocSources } from "../../../../components/document/DocSources.js"
import { DocTable } from "../../../../components/document/DocTable.js"
import { DocTip } from "../../../../components/document/DocTip.js"

export function LedgerAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Le grand livre"
                description="Détail de tous les mouvements compte par compte"
            />

            <DocSection title="Définition">
                <DocDefinition term="Grand livre">
                    Document qui reprend l'ensemble des comptes de l'organisation avec le détail de tous leurs
                    mouvements. C'est la vue par compte de la comptabilité, là où le journal offre une vue
                    chronologique.
                </DocDefinition>

                <DocParagraph>
                    Le grand livre
                    <DocSourceRef n={1} /> et le{" "}
                    <DocLink to="/documentation/comptabilité/documents/journal">journal</DocLink> contiennent exactement
                    les mêmes informations, mais présentées différemment. Le journal classe les écritures par date ; le
                    grand livre les classe par{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "compte",
                        }}
                    >
                        compte
                    </DocLink>
                    .
                </DocParagraph>

                <DocParagraph>
                    Bien que le grand livre ne soit pas explicitement mentionné comme document obligatoire au même titre
                    que le journal, il est indispensable en pratique
                    <DocSourceRef n={2} /> : c'est lui qui permet de justifier le solde de chaque compte et donc de
                    construire la <DocLink to="/documentation/comptabilité/documents/balance">balance</DocLink>, le{" "}
                    <DocLink to="/documentation/comptabilité/documents/bilan">bilan</DocLink> et le{" "}
                    <DocLink to="/documentation/comptabilité/documents/compte-de-résultat">compte de résultat</DocLink>.
                    Il fait partie des documents pouvant être exigés lors d'un contrôle fiscal.
                </DocParagraph>
            </DocSection>

            <DocSection title="Structure du grand livre">
                <DocParagraph>
                    Pour chaque compte, le grand livre affiche l'ensemble des mouvements avec leur date, leur libellé,
                    les montants au{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "debit",
                        }}
                    >
                        débit
                    </DocLink>{" "}
                    et au{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{
                            term: "credit",
                        }}
                    >
                        crédit
                    </DocLink>
                    , ainsi que le solde progressif.
                </DocParagraph>

                <DocExample title="Extrait du grand livre - Compte 512 Banque">
                    <DocTable
                        headers={[
                            "Date",
                            "Libellé",
                            "Débit",
                            "Crédit",
                            "Solde",
                        ]}
                        rows={[
                            [
                                "",
                                "Solde à l'ouverture",
                                "",
                                "",
                                "3 000 Db",
                            ],
                            [
                                "03/01",
                                "Encaissement facture n°001",
                                "1 200",
                                "",
                                "4 200 Db",
                            ],
                            [
                                "20/01",
                                "Paiement loyer janvier",
                                "",
                                "800",
                                "3 400 Db",
                            ],
                            [
                                "25/01",
                                "Paiement fournisseur Martin",
                                "",
                                "180",
                                "3 220 Db",
                            ],
                            [
                                "31/01",
                                "Encaissement facture n°002",
                                "2 500",
                                "",
                                "5 720 Db",
                            ],
                        ]}
                    />
                    <p
                        className={css({
                            marginTop: "2",
                            fontSize: "xs",
                            color: "neutral/60",
                        })}
                    >
                        Le solde progressif permet de suivre l'évolution du compte au fil des opérations.
                    </p>
                </DocExample>

                <DocExample title="Extrait du grand livre - Compte 401 Fournisseurs">
                    <DocTable
                        headers={[
                            "Date",
                            "Libellé",
                            "Débit",
                            "Crédit",
                            "Solde",
                        ]}
                        rows={[
                            [
                                "",
                                "Solde à l'ouverture",
                                "",
                                "",
                                "500 Cr",
                            ],
                            [
                                "15/01",
                                "Facture papeterie",
                                "",
                                "180",
                                "680 Cr",
                            ],
                            [
                                "25/01",
                                "Règlement fournisseur Martin",
                                "180",
                                "",
                                "500 Cr",
                            ],
                            [
                                "28/01",
                                "Facture hébergement web",
                                "",
                                "120",
                                "620 Cr",
                            ],
                        ]}
                    />
                    <p
                        className={css({
                            marginTop: "2",
                            fontSize: "xs",
                            color: "neutral/60",
                        })}
                    >
                        Le solde créditeur indique que l'organisation doit encore 620 euros à ses fournisseurs.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Journal et grand livre : deux vues complémentaires">
                <DocParagraph>
                    Le journal et le grand livre sont les deux faces d'une même réalité. Le journal répond à la question
                    « que s'est-il passé à telle date ? », tandis que le grand livre répond à « quelle est la situation
                    de tel compte ? ».
                </DocParagraph>

                <DocList
                    items={[
                        "Le journal est organisé par date : il permet de reconstituer l'historique chronologique",
                        "Le grand livre est organisé par compte : il permet d'analyser chaque compte individuellement",
                        "La balance résume le grand livre en ne conservant que les totaux et soldes de chaque compte",
                    ]}
                />
            </DocSection>

            <DocSection title="Utilité pratique">
                <DocParagraph>Le grand livre est indispensable pour :</DocParagraph>

                <DocList
                    items={[
                        "Vérifier le détail des opérations d'un compte (par exemple retrouver les factures impayées d'un client)",
                        "Préparer les rapprochements bancaires (comparer le grand livre du compte 512 avec le relevé de banque)",
                        "Justifier les soldes de la balance lors des contrôles",
                        "Analyser l'évolution d'un poste de charges ou de produits sur une période",
                    ]}
                />
            </DocSection>

            <DocSection title="Le grand livre auxiliaire">
                <DocParagraph>
                    Certains comptes collectifs regroupent de nombreux tiers : le compte 411 (Clients) ou le compte 401
                    (Fournisseurs), par exemple. Pour suivre chaque tiers individuellement, on tient un{" "}
                    <strong>grand livre auxiliaire</strong>, qui détaille les mouvements par sous-compte (un par client
                    ou par fournisseur).
                </DocParagraph>

                <DocDefinition term="Grand livre auxiliaire">
                    Déclinaison du grand livre qui détaille un compte collectif (clients, fournisseurs) en sous-comptes
                    individuels. Il permet de connaître le solde dû par chaque tiers sans consulter les écritures une
                    par une.
                </DocDefinition>

                <DocTip variant="tip">
                    Le total du grand livre auxiliaire doit toujours correspondre au solde du compte collectif dans le
                    grand livre général. Cette vérification est un contrôle important lors de la clôture.
                </DocTip>
            </DocSection>

            <DocSection title="Le rapprochement bancaire">
                <DocParagraph>
                    Le grand livre du compte 512 (Banque) est l'outil central du <strong>rapprochement bancaire</strong>
                    . Cette opération consiste à comparer, ligne par ligne, les mouvements enregistrés dans la
                    comptabilité avec ceux figurant sur le relevé de banque.
                </DocParagraph>

                <DocParagraph>
                    Des écarts sont normaux : un chèque émis peut être enregistré en comptabilité mais pas encore
                    encaissé par le bénéficiaire, ou inversement, un prélèvement peut apparaître sur le relevé bancaire
                    avant d'être saisi dans les comptes. Le rapprochement bancaire permet d'identifier et d'expliquer
                    ces décalages.
                </DocParagraph>

                <DocTip variant="info">
                    Le rapprochement bancaire doit être effectué régulièrement (idéalement chaque mois). C'est un outil
                    de contrôle interne essentiel qui permet de détecter les erreurs de saisie, les opérations oubliées
                    ou les mouvements non autorisés.
                </DocTip>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes génère automatiquement le grand livre à partir de vos écritures. Vous pouvez le consulter
                    compte par compte ou le télécharger dans sa totalité. Consultez le guide sur les{" "}
                    <DocLink to="/documentation/dashboard/documents">rapports</DocLink> pour en savoir plus.
                </DocParagraph>
            </DocSection>

            <DocSources
                sources={[
                    {
                        label: "Grand livre - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Grand_livre",
                    },
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                ]}
            />
        </DocRoot>
    )
}
