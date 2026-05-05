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
import { DocTip } from "../../../../components/document/docTip.js"

export function IncomeStatementAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Le compte de résultat"
                description="Film de l'activité sur une période : produits, charges et résultat"
            />

            <DocSection title="Définition">
                <DocDefinition term="Compte de résultat">
                    Document qui récapitule l'ensemble des produits et des charges d'un exercice. La différence entre
                    les deux donne le résultat : bénéfice ou perte.
                </DocDefinition>

                <DocParagraph>
                    Alors que le <DocLink to="/documentation/comptabilité/documents/bilan">bilan</DocLink> est une
                    photographie à un instant donné, le compte de résultat est un <strong>film</strong> : il couvre
                    toute la durée de l'{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "exercice-comptable" }}>
                        exercice comptable
                    </DocLink>
                    . Il répond à la question : l'organisation a-t-elle gagné ou perdu de l'argent sur la période ?
                    <DocSourceRef n={1} />
                </DocParagraph>
            </DocSection>

            <DocSection title="Comment est-il construit ?">
                <DocParagraph>
                    Le compte de résultat est construit à partir des{" "}
                    <strong>
                        <DocLink
                            to="/documentation/comptabilité/glossaire/$term"
                            params={{ term: "comptes-d-operations" }}
                        >
                            comptes d'opérations
                        </DocLink>
                    </strong>{" "}
                    (classes 6 et 7 du{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{ term: "plan-comptable-general-pcg" }}
                    >
                        plan comptable
                    </DocLink>
                    )
                    <DocSourceRef n={2} />. Les comptes de classe 6 enregistrent les{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "charges-classe-6" }}>
                        charges
                    </DocLink>{" "}
                    (ce que l'on dépense), les comptes de classe 7 enregistrent les{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "produits-classe-7" }}>
                        produits
                    </DocLink>{" "}
                    (ce que l'on gagne).
                </DocParagraph>

                <DocList
                    items={[
                        "Produits - Charges = Résultat",
                        "Si Produits > Charges : bénéfice (ou excédent pour une association)",
                        "Si Produits < Charges : perte (ou déficit)",
                    ]}
                />
            </DocSection>

            <DocSection title="Les trois niveaux du résultat">
                <DocParagraph>
                    Le compte de résultat distingue trois catégories d'opérations, ce qui permet d'analyser finement la
                    performance de l'organisation :
                </DocParagraph>

                <DocDefinition term="Résultat d'exploitation">
                    Différence entre les produits et les charges liés à l'activité courante (ventes, achats, salaires,
                    loyer...). C'est l'indicateur principal de la performance opérationnelle.
                </DocDefinition>
                <DocDefinition term="Résultat financier">
                    Différence entre les produits financiers (intérêts reçus, gains de change) et les charges
                    financières (intérêts d'emprunts, pertes de change).
                </DocDefinition>
                <DocDefinition term="Résultat exceptionnel">
                    Différence entre les produits et charges qui ne relèvent ni de l'exploitation ni du financier :
                    cessions d'immobilisations, pénalités, subventions exceptionnelles.
                </DocDefinition>

                <DocParagraph>
                    Le <strong>résultat net</strong> est la somme de ces trois résultats, après déduction de l'impôt sur
                    les bénéfices le cas échéant. On parle aussi de{" "}
                    <strong>Résultat Courant Avant Impôts (RCAI)</strong>, qui correspond à la somme du résultat
                    d'exploitation et du résultat financier, avant prise en compte des éléments exceptionnels et de
                    l'impôt. Le RCAI reflète la performance récurrente de l'entreprise.
                </DocParagraph>

                <DocTip variant="info">
                    La distinction exploitation / financier / exceptionnel est propre au droit comptable français. Les
                    normes IFRS
                    <DocSourceRef n={3} /> n'utilisent pas cette catégorisation et présentent le compte de résultat
                    différemment.
                </DocTip>
            </DocSection>

            <DocSection title="Exemple">
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
                                <li>Achats de marchandises : 3 000</li>
                                <li>Loyer : 6 000</li>
                                <li>Salaires : 20 000</li>
                                <li>Charges sociales : 8 000</li>
                                <li>Amortissements : 1 000</li>
                                <li>Intérêts d'emprunt : 500</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 38 500</li>
                            </ul>
                        </div>
                        <div>
                            <p className={css({ fontWeight: "medium", mb: "1" })}>PRODUITS</p>
                            <ul className={css({ fontSize: "xs", color: "neutral/70" })}>
                                <li>Ventes de marchandises : 25 000</li>
                                <li>Prestations de services : 12 000</li>
                                <li>Subventions : 4 000</li>
                                <li>Intérêts reçus : 100</li>
                                <li className={css({ fontWeight: "semibold", marginTop: "1" })}>Total : 41 100</li>
                            </ul>
                        </div>
                    </div>
                    <p className={css({ marginTop: "3", fontWeight: "medium", color: "success" })}>
                        Résultat = 41 100 - 38 500 = 2 600 euros (bénéfice)
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les Soldes Intermédiaires de Gestion (SIG)">
                <DocParagraph>
                    Pour analyser plus finement la performance d'une entreprise, on calcule des indicateurs
                    intermédiaires appelés <strong>Soldes Intermédiaires de Gestion (SIG)</strong>
                    <DocSourceRef n={4} />. Chaque solde s'obtient en cascade à partir du précédent, permettant de
                    comprendre étape par étape comment se forme le résultat :
                </DocParagraph>

                <DocDefinition term="Marge commerciale">
                    Ventes de marchandises - Coût d'achat des marchandises vendues. Indicateur clé pour les activités de
                    négoce.
                </DocDefinition>
                <DocDefinition term="Valeur ajoutée">
                    Marge commerciale + Production - Consommations intermédiaires. Mesure la richesse créée par
                    l'entreprise grâce à son activité.
                </DocDefinition>
                <DocDefinition term="Excédent Brut d'Exploitation (EBE)">
                    Valeur ajoutée + Subventions d'exploitation - Impôts et taxes - Charges de personnel. Indicateur de
                    la rentabilité opérationnelle avant amortissements et provisions.
                </DocDefinition>

                <DocParagraph>
                    L'EBE est un indicateur particulièrement surveillé car il reflète la capacité de l'entreprise à
                    générer de la richesse par son activité courante, indépendamment de sa politique de financement et
                    d'investissement.
                </DocParagraph>
            </DocSection>

            <DocSection title="Résultat et trésorerie : ne pas confondre">
                <DocParagraph>
                    Une erreur fréquente consiste à assimiler le résultat du compte de résultat à de l'argent gagné ou
                    perdu. En réalité, le compte de résultat ne mesure pas des <strong>flux de trésorerie</strong> mais
                    des <strong>flux d'enrichissement ou d'appauvrissement du patrimoine</strong>.
                </DocParagraph>

                <DocExample title="Résultat positif, trésorerie négative">
                    <p className={css({ fontSize: "sm" })}>
                        Une entreprise facture 50 000 euros de prestations (produits) et engage 30 000 euros de charges.
                        Son résultat est un bénéfice de 20 000 euros.
                    </p>
                    <p className={css({ marginTop: "2", fontSize: "sm" })}>
                        Mais si ses clients n'ont pas encore payé leurs factures, sa trésorerie peut être négative :
                        elle a un bénéfice comptable mais pas d'argent en banque.
                    </p>
                    <p className={css({ marginTop: "2", fontSize: "xs", color: "neutral/60" })}>
                        C'est pourquoi on complète souvent le compte de résultat par un tableau des flux de trésorerie,
                        qui mesure les mouvements réels d'argent.
                    </p>
                </DocExample>

                <DocTip variant="warning">
                    Un bénéfice ne signifie pas que l'entreprise a de l'argent disponible, et une perte ne signifie pas
                    qu'elle n'en a plus. Le résultat mesure la variation du patrimoine, pas celle du compte en banque.
                </DocTip>
            </DocSection>

            <DocSection title="Les capitaux propres">
                <DocParagraph>
                    Les{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "capitaux-propres" }}>
                        capitaux propres
                    </DocLink>{" "}
                    représentent ce que l'entreprise doit à ses propriétaires. Ils comprennent plusieurs éléments :
                </DocParagraph>

                <DocDefinition term="Capital">
                    Apports initiaux des associés ou fondateurs. Il reste généralement stable sauf augmentation ou
                    réduction de capital.
                </DocDefinition>
                <DocDefinition term="Réserves">
                    Bénéfices des années passées qui ont été conservés dans l'entreprise (non distribués aux associés).
                </DocDefinition>
                <DocDefinition term="Report à nouveau">
                    Résultat de l'exercice précédent en attente d'affectation (mise en réserve ou distribution).
                </DocDefinition>
                <DocDefinition term="Résultat de l'exercice">
                    Bénéfice ou perte de l'année en cours, tel que calculé par le compte de résultat.
                </DocDefinition>

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

            <DocSection title="Le lien entre bilan et compte de résultat">
                <DocParagraph>
                    Le résultat du compte de résultat vient s'ajouter aux{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "capitaux-propres" }}>
                        capitaux propres
                    </DocLink>{" "}
                    du bilan. C'est ce qui fait le lien entre les deux documents :
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

                <DocTip variant="tip">
                    Retenez que le bilan répond à « combien vaut l'organisation ? » et le compte de résultat à « comment
                    s'est passée l'année ? ». Les deux documents se rejoignent par le résultat, qui apparaît dans les
                    capitaux propres du bilan.
                </DocTip>
            </DocSection>

            <DocSection title="Compte de résultat des associations">
                <DocParagraph>
                    Les associations utilisent une présentation adaptée. On parle d'<strong>excédent</strong> plutôt que
                    de bénéfice et de <strong>déficit</strong> plutôt que de perte. Certaines lignes sont spécifiques :
                    contributions volontaires en nature, valorisation du bénévolat, emplois des contributions.
                </DocParagraph>

                <DocParagraph>
                    Le principe reste identique : comparer ce que l'association a reçu (cotisations, subventions, dons,
                    produits d'activité) à ce qu'elle a dépensé pour déterminer le résultat de l'exercice.
                </DocParagraph>
            </DocSection>

            <DocNextPage to="/documentation/comptabilité/documents/balance" label="La balance" />

            <DocSources
                sources={[
                    {
                        label: "Compte de résultat - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Compte_de_r%C3%A9sultat",
                    },
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                    {
                        label: "Normes internationales d'information financière (IFRS) - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Normes_internationales_d%27information_financi%C3%A8re",
                    },
                    {
                        label: "Soldes intermédiaires de gestion - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Soldes_interm%C3%A9diaires_de_gestion",
                    },
                ]}
            />
        </DocRoot>
    )
}
