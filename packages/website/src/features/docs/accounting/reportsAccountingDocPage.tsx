import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../components/document/docDefinition.js"
import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTable } from "../../../components/document/docTable.js"

export function ReportsAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Les documents comptables" description="Les états de synthèse et leur signification" />

            <DocSection title="Les documents de synthèse">
                <DocParagraph>
                    À la fin de chaque exercice comptable, les écritures sont agrégées pour produire des documents de
                    synthèse. Ces documents offrent une vision globale de la situation financière et des performances de
                    l'organisation.
                </DocParagraph>
                <DocParagraph>
                    Les deux documents principaux sont le <strong>bilan</strong> et le{" "}
                    <strong>compte de résultat</strong>. Ils sont complémentaires et se lisent ensemble.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le calcul du bénéfice">
                <DocParagraph>
                    Le bénéfice (ou la perte) d'une entreprise peut être calculé de deux manières équivalentes, ce qui
                    constitue un contrôle fondamental de la comptabilité :
                </DocParagraph>

                <DocDefinition
                    term="Par le patrimoine"
                    definition="Bénéfice = Patrimoine à la fin - Patrimoine au début. Si l'entreprise possède plus à la fin qu'au début, elle s'est enrichie."
                />
                <DocDefinition
                    term="Par les opérations"
                    definition="Bénéfice = Produits - Charges. La somme de ce qu'on a gagné moins la somme de ce qu'on a dépensé."
                />

                <DocParagraph>
                    Ces deux calculs doivent donner le même résultat. C'est la cohérence entre le bilan (patrimoine) et
                    le compte de résultat (opérations) qui garantit l'exactitude de la comptabilité.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le bilan">
                <DocDefinition
                    term="Bilan"
                    definition="Photographie du patrimoine de l'organisation à une date donnée. Il montre ce que l'organisation possède (actif) et comment elle l'a financé (passif)."
                />

                <DocParagraph>
                    Le bilan est construit à partir des <strong>soldes des comptes d'agents</strong> :
                </DocParagraph>
                <DocList
                    items={[
                        "Les soldes débiteurs forment l'actif (ce que les agents nous doivent : banque, clients...)",
                        "Les soldes créditeurs forment le passif (ce que nous devons aux agents : fournisseurs, État, propriétaires...)",
                    ]}
                />

                <DocTable
                    headers={["ACTIF (ce que l'on a)", "PASSIF (comment c'est financé)"]}
                    rows={[
                        ["Actif immobilisé (biens durables)", "Capitaux propres (apports, réserves, résultat)"],
                        ["Actif circulant (stocks, créances)", "Dettes (emprunts, fournisseurs)"],
                        ["Trésorerie (banque, caisse)", ""],
                    ]}
                />

                <DocParagraph>
                    L'équation fondamentale du bilan est : <strong>Actif = Passif + Résultat</strong>. Le résultat vient
                    équilibrer le bilan : un bénéfice augmente le passif (les capitaux propres), une perte le diminue.
                </DocParagraph>

                <DocExample title="Lecture simplifiée d'un bilan">
                    <p className={css({ fontSize: "sm" })}>Une association présente le bilan suivant :</p>
                    <div
                        className={css({
                            display: "grid",
                            gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
                            gap: "4",
                            marginTop: "3",
                        })}
                    >
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>ACTIF</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Matériel informatique : 2 000</li>
                                <li>Banque : 5 000</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 7 000</li>
                            </ul>
                        </div>
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>PASSIF</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Fonds associatifs : 6 000</li>
                                <li>Dettes fournisseurs : 1 000</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 7 000</li>
                            </ul>
                        </div>
                    </div>
                    <p className={css({ marginTop: "3", fontSize: "xs", color: "neutral/60" })}>
                        L'association possède 7 000 euros de biens, financés par ses fonds propres et une dette.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Le compte de résultat">
                <DocDefinition
                    term="Compte de résultat"
                    definition="Film de l'activité sur une période. Il compare les produits (ce qu'on gagne) aux charges (ce qu'on dépense) pour déterminer le résultat (bénéfice ou perte)."
                />

                <DocParagraph>
                    Le compte de résultat est construit à partir des <strong>comptes d'opérations</strong> (classes 6 et
                    7). Il répond à la question : l'entreprise a-t-elle gagné ou perdu de l'argent sur la période ?
                </DocParagraph>

                <DocList
                    items={[
                        "Produits - Charges = Résultat",
                        "Si Produits > Charges : bénéfice (ou excédent pour une association)",
                        "Si Produits < Charges : perte (ou déficit)",
                    ]}
                />

                <DocExample title="Compte de résultat simplifié">
                    <div
                        className={css({
                            display: "grid",
                            gridTemplateColumns: { base: "1fr", sm: "1fr 1fr" },
                            gap: "4",
                        })}
                    >
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>CHARGES</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Achats : 3 000</li>
                                <li>Loyer : 6 000</li>
                                <li>Salaires : 20 000</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 29 000</li>
                            </ul>
                        </div>
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>PRODUITS</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Ventes : 25 000</li>
                                <li>Subventions : 8 000</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 33 000</li>
                            </ul>
                        </div>
                    </div>
                    <p className={css({ marginTop: "3", fontWeight: "medium", color: "success" })}>
                        Résultat = 33 000 - 29 000 = 4 000 euros (bénéfice)
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les capitaux propres">
                <DocParagraph>
                    Les capitaux propres représentent ce que l'entreprise doit à ses propriétaires. Ils comprennent
                    plusieurs éléments :
                </DocParagraph>

                <DocDefinition
                    term="Capital"
                    definition="Apports initiaux des associés ou fondateurs. Il reste généralement stable sauf augmentation ou réduction de capital."
                />
                <DocDefinition
                    term="Réserves"
                    definition="Bénéfices des années passées qui ont été conservés dans l'entreprise (non distribués aux associés)."
                />
                <DocDefinition
                    term="Report à nouveau"
                    definition="Résultat de l'exercice précédent en attente d'affectation (mise en réserve ou distribution)."
                />
                <DocDefinition
                    term="Résultat de l'exercice"
                    definition="Bénéfice ou perte de l'année en cours, tel que calculé par le compte de résultat."
                />

                <DocExample title="Affectation du résultat">
                    <p className={css({ fontSize: "sm" })}>
                        Une entreprise réalise un bénéfice de 10 000 euros. Les associés décident :
                    </p>
                    <ul className={css({ marginTop: "2", ml: "4", fontSize: "sm", color: "neutral/70" })}>
                        <li>Distribution de dividendes : 4 000 euros (versés aux associés)</li>
                        <li>Mise en réserve : 6 000 euros (conservés dans l'entreprise)</li>
                    </ul>
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        Les réserves augmentent de 6 000 euros, renforçant les capitaux propres.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="La balance : document de contrôle">
                <DocDefinition
                    term="Balance"
                    definition="Liste de tous les comptes avec leur solde (débiteur ou créditeur). C'est l'outil de contrôle essentiel de la comptabilité."
                />

                <DocParagraph>La balance vérifie plusieurs équilibres :</DocParagraph>
                <DocList
                    items={[
                        "Total des débits = Total des crédits (principe de la partie double)",
                        "Total des soldes débiteurs = Total des soldes créditeurs",
                        "Les comptes d'actif ont généralement un solde débiteur",
                        "Les comptes de passif ont généralement un solde créditeur",
                    ]}
                />

                <DocExample title="Extrait de balance">
                    <DocTable
                        headers={["Compte", "Intitulé", "Débit", "Crédit", "Solde"]}
                        rows={[
                            ["101", "Capital", "", "10 000", "10 000 Cr"],
                            ["411", "Clients", "5 000", "3 000", "2 000 Db"],
                            ["401", "Fournisseurs", "2 000", "4 000", "2 000 Cr"],
                            ["512", "Banque", "15 000", "8 000", "7 000 Db"],
                            ["606", "Achats fournitures", "1 000", "", "1 000 Db"],
                            ["706", "Prestations", "", "4 000", "4 000 Cr"],
                        ]}
                    />
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        Total débits = Total crédits. La balance est équilibrée.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les autres documents">
                <DocDefinition
                    term="Grand livre"
                    definition="Liste de tous les comptes avec le détail de leurs mouvements. Permet de vérifier le détail de chaque compte."
                />
                <DocDefinition
                    term="Journal"
                    definition="Liste chronologique de toutes les écritures passées. Permet de retrouver l'historique des opérations."
                />
                <DocDefinition
                    term="Annexe"
                    definition="Document obligatoire qui complète le bilan et le compte de résultat avec des informations complémentaires (méthodes comptables, engagements hors bilan...)."
                />

                <DocParagraph>
                    Ces documents intermédiaires sont utilisés tout au long de l'année pour contrôler la comptabilité et
                    préparer les documents de synthèse.
                </DocParagraph>
            </DocSection>

            <DocSection title="Le lien entre bilan et compte de résultat">
                <DocParagraph>
                    Le résultat du compte de résultat vient s'ajouter aux capitaux propres du bilan. C'est ce qui fait
                    le lien entre les deux documents :
                </DocParagraph>
                <DocList
                    items={[
                        "Un bénéfice augmente les capitaux propres (l'organisation s'est enrichie)",
                        "Une perte diminue les capitaux propres (l'organisation s'est appauvrie)",
                    ]}
                />

                <DocParagraph>On peut aussi exprimer le résultat comme la variation du patrimoine net :</DocParagraph>
                <DocExample title="Vérification par le patrimoine">
                    <p className={css({ fontWeight: "semibold" })}>
                        Résultat = Variation des créances - Variation des dettes
                    </p>
                    <p className={css({ marginTop: "2", fontSize: "sm", color: "neutral/70" })}>
                        Si les créances (ce qu'on possède) ont augmenté de 5 000 euros et les dettes de 2 000 euros, le
                        résultat est de 3 000 euros : l'entreprise s'est enrichie de la différence.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Arrhes génère automatiquement tous ces documents à partir de vos écritures. Consultez le guide sur
                    les <DocLink to="/documentation/dashboard/documents">rapports</DocLink> pour apprendre à générer et
                    interpréter ces documents dans le logiciel.
                </DocParagraph>
            </DocSection>

            {/* <DocTip variant="success">
                Félicitations ! Vous avez terminé le cours de comptabilité. Vous maîtrisez maintenant
                les concepts fondamentaux pour utiliser Arrhes efficacement.
            </DocTip> */}

            <DocNextPage to="/documentation/comptabilité/glossaire" label="Glossaire comptable" />
        </DocRoot>
    )
}
