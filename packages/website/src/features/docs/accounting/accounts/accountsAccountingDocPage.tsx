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
import { accountClasses } from "./accountsData.js"

export function AccountsAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader title="Les comptes comptables" description="Comprendre l'organisation du plan comptable" />

            <DocSection title="Qu'est-ce qu'un compte ?">
                <DocParagraph>
                    Un{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "compte" }}>
                        compte
                    </DocLink>{" "}
                    est une catégorie qui regroupe des opérations de même nature. Chaque compte possède un numéro et un
                    intitulé qui permettent de l'identifier. Par exemple, le compte 512 - Banque regroupe toutes les
                    opérations transitant par votre compte bancaire.
                </DocParagraph>
                <DocParagraph>
                    En France, les comptes sont organisés selon le{" "}
                    <DocLink
                        to="/documentation/comptabilité/glossaire/$term"
                        params={{ term: "plan-comptable-general-pcg" }}
                    >
                        Plan Comptable Général (PCG)
                    </DocLink>
                    , qui définit une structure commune à toutes les organisations. Le PCG est aujourd'hui défini par le
                    règlement n°2014-03 de l'Autorité des Normes Comptables (ANC).
                    <DocSourceRef n={1} />
                </DocParagraph>

                <DocTip variant="info">
                    Le premier Plan Comptable Général a été adopté en France en 1943, puis maintenu après la Seconde
                    Guerre mondiale pour servir d'outil de planification économique lors de la reconstruction. Il a été
                    révisé en 1947, 1957, puis profondément refondu en 1982.
                    <DocSourceRef n={2} /> L'ANC, créée par ordonnance en 2009, est aujourd'hui l'organisme chargé de le
                    faire évoluer.
                    <DocSourceRef n={3} />
                </DocTip>
            </DocSection>

            <DocSection title="Deux grandes familles de comptes">
                <DocParagraph>
                    Pour bien comprendre le fonctionnement des comptes, il est utile de distinguer deux grandes familles
                    : les{" "}
                    <strong>
                        <DocLink
                            to="/documentation/comptabilité/glossaire/$term"
                            params={{ term: "comptes-d-operations" }}
                        >
                            comptes d'opérations
                        </DocLink>
                    </strong>{" "}
                    et les{" "}
                    <strong>
                        <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "comptes-d-agents" }}>
                            comptes d'agents
                        </DocLink>
                    </strong>
                    .
                </DocParagraph>

                <DocDefinition term="Comptes d'opérations">
                    Ces comptes enregistrent les opérations économiques du point de vue de l'entreprise : achats,
                    ventes, charges, produits. Ils décrivent ce que fait l'entreprise.
                </DocDefinition>
                <DocDefinition term="Comptes d'agents">
                    Ces comptes enregistrent les relations avec les tiers du point de vue de ces tiers : clients,
                    fournisseurs, banque, caisse, État. Ils décrivent qui doit quoi à qui.
                </DocDefinition>

                <DocExample title="Point de vue des comptes d'agents">
                    <p>Le compte Clients est tenu du point de vue des clients :</p>
                    <ul className={css({ marginTop: "2", ml: "4", fontSize: "sm", spaceY: "1" })}>
                        <li>
                            Quand un client vous doit de l'argent - le compte est <strong>débité</strong> (sa dette
                            augmente)
                        </li>
                        <li>
                            Quand il vous paye - le compte est <strong>crédité</strong> (sa dette diminue)
                        </li>
                    </ul>
                    <p className={css({ marginTop: "3" })}>
                        Le compte Fournisseurs est tenu du point de vue des fournisseurs :
                    </p>
                    <ul className={css({ marginTop: "2", ml: "4", fontSize: "sm", spaceY: "1" })}>
                        <li>
                            Quand vous leur devez de l'argent - le compte est <strong>crédité</strong> (leur créance
                            augmente)
                        </li>
                        <li>
                            Quand vous les payez - le compte est <strong>débité</strong> (leur créance diminue)
                        </li>
                    </ul>
                </DocExample>

                <DocParagraph>
                    Cette distinction explique pourquoi les comptes d'{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "actif" }}>
                        actif
                    </DocLink>{" "}
                    (Banque, Caisse, Clients) augmentent au{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "debit" }}>
                        débit
                    </DocLink>
                    , tandis que les comptes de{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "passif" }}>
                        passif
                    </DocLink>{" "}
                    (Fournisseurs, Capital) augmentent au{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "credit" }}>
                        crédit
                    </DocLink>{" "}
                    : on adopte toujours le point de vue de l'agent concerné.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les classes de comptes">
                <DocParagraph>
                    Les comptes sont regroupés en 8 classes, numérotées de 1 à 8.
                    <DocSourceRef n={1} /> Le premier chiffre du numéro de compte indique sa classe.
                </DocParagraph>

                <DocTable
                    headers={["Classe", "Intitulé", "Type"]}
                    rows={accountClasses.map((c) => [String(c.number), c.label, c.type])}
                />

                <DocParagraph>
                    Les classes 1 à 5 concernent le{" "}
                    <strong>
                        <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "bilan" }}>
                            bilan
                        </DocLink>
                    </strong>{" "}
                    (ce que vous possédez et ce que vous devez). Les classes 6 et 7 concernent le{" "}
                    <strong>
                        <DocLink
                            to="/documentation/comptabilité/glossaire/$term"
                            params={{ term: "compte-de-résultat" }}
                        >
                            compte de résultat
                        </DocLink>
                    </strong>{" "}
                    (ce que vous dépensez et ce que vous gagnez).
                </DocParagraph>

                <DocTip variant="info">
                    La classe 9, autrefois réservée à la comptabilité analytique, a été supprimée du PCG. La
                    comptabilité analytique est désormais tenue librement par les entreprises en dehors du plan de
                    comptes officiel.
                </DocTip>
            </DocSection>

            <DocSection title="Comment fonctionne un compte ?">
                <DocParagraph>
                    Selon le type de compte, les mouvements au débit et au crédit ont des significations différentes :
                </DocParagraph>

                <DocTable
                    headers={["Type de compte", "Débit (+)", "Crédit (-)"]}
                    rows={[
                        ["Actif (ce que vous avez)", "Augmentation", "Diminution"],
                        ["Passif (ce que vous devez)", "Diminution", "Augmentation"],
                        ["Charges (dépenses)", "Augmentation", "Diminution"],
                        ["Produits (recettes)", "Diminution", "Augmentation"],
                    ]}
                />

                <DocExample title="Fonctionnement concret">
                    <p>Quand vous recevez de l'argent sur votre compte bancaire :</p>
                    <p className={css({ marginTop: "2" })}>- Le compte 512 (Banque) est un compte d'actif</p>
                    <p>
                        - Une augmentation se traduit par un <strong>débit</strong>
                    </p>
                    <p className={css({ marginTop: "3" })}>Quand vous payez une facture depuis ce compte :</p>
                    <p className={css({ marginTop: "2" })}>
                        - Une diminution se traduit par un <strong>crédit</strong>
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Le compte État et la TVA">
                <DocParagraph>
                    L'État est traité comme un agent particulier avec plusieurs comptes dans la classe 4. Pour la TVA,
                    on distingue deux comptes principaux :
                </DocParagraph>

                <DocDefinition term="4456 - TVA déductible">
                    TVA payée sur les achats. L'État vous doit cette somme (ou vous pouvez la déduire de la TVA
                    collectée). Le compte est débité quand la TVA déductible augmente.
                </DocDefinition>
                <DocDefinition term="4457 - TVA collectée">
                    TVA facturée sur les ventes. Vous devez cette somme à l'État. Le compte est crédité quand la TVA
                    collectée augmente.
                </DocDefinition>

                <DocExample title="Mécanisme de la TVA">
                    <p>À la fin de la période :</p>
                    <ul className={css({ marginTop: "2", ml: "4", fontSize: "sm", spaceY: "1" })}>
                        <li>Si TVA collectée &gt; TVA déductible - vous devez la différence à l'État</li>
                        <li>Si TVA collectée &lt; TVA déductible - l'État vous doit la différence (crédit de TVA)</li>
                    </ul>
                </DocExample>
            </DocSection>

            <DocSection title="Règles de numérotation des comptes">
                <DocParagraph>
                    Le numéro d'un compte n'est pas choisi au hasard. Le PCG suit des règles de numérotation précises
                    <DocSourceRef n={1} />
                    qui facilitent la lecture et la classification :
                </DocParagraph>

                <DocList
                    items={[
                        "Le premier chiffre indique la classe (1 à 8)",
                        "Le deuxième chiffre indique la catégorie au sein de la classe",
                        "Chaque chiffre supplémentaire affine la nature du compte",
                        "Un numéro se terminant par 0 désigne un compte de regroupement (ex : 41 = Clients, 410 = regroupement)",
                        "Pour les classes de bilan (2 à 5), un numéro se terminant par 9 indique un compte de dépréciation ou de sens contraire (ex : 491 = Dépréciation des comptes clients)",
                    ]}
                />

                <DocExample title="Lecture d'un numéro de compte">
                    <p className={css({ fontSize: "sm" })}>
                        Le compte <strong>60611</strong> se décompose ainsi :
                    </p>
                    <ul className={css({ marginTop: "2", ml: "4", fontSize: "sm", color: "neutral/70" })}>
                        <li>
                            <strong>6</strong> = Classe 6 (Charges)
                        </li>
                        <li>
                            <strong>60</strong> = Achats
                        </li>
                        <li>
                            <strong>606</strong> = Achats non stockés de matières et fournitures
                        </li>
                        <li>
                            <strong>6061</strong> = Fournitures non stockables
                        </li>
                        <li>
                            <strong>60611</strong> = Eau, énergie
                        </li>
                    </ul>
                </DocExample>
            </DocSection>

            <DocSection title="Comptes du système minimal et comptes facultatifs">
                <DocParagraph>
                    Le PCG distingue deux catégories de comptes selon leur caractère obligatoire :
                </DocParagraph>

                <DocDefinition term="Comptes du système minimal">
                    Ces comptes constituent le socle obligatoire du plan comptable. Ils doivent être utilisés par toutes
                    les entités, quelle que soit leur taille. Ils couvrent les opérations courantes et permettent
                    d'établir les documents de synthèse essentiels.
                </DocDefinition>
                <DocDefinition term="Comptes facultatifs">
                    Ces comptes offrent un niveau de détail supplémentaire. Leur utilisation est optionnelle et dépend
                    des besoins de l'entité et de la complexité de son activité. Ils permettent un suivi plus fin de
                    certaines opérations.
                </DocDefinition>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Dans Arrhes, vous pouvez{" "}
                    <DocLink to="/documentation/dashboard/organisations">configurer votre plan comptable</DocLink> selon
                    les besoins de votre{" "}
                    <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "organisation" }}>
                        organisation
                    </DocLink>
                    . Le logiciel propose un plan comptable par défaut adapté aux entreprises et aux associations
                    françaises, que vous pouvez personnaliser.
                </DocParagraph>
            </DocSection>

            <DocNextPage
                to="/documentation/comptabilité/comptes/classes"
                label="Les classes de comptes"
                description="Retenez que le premier chiffre d'un compte indique toujours sa classe. Avec un peu de pratique, vous reconnaîtrez rapidement les comptes courants."
            />

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général - Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
                    },
                    {
                        label: "Plan comptable général (France) - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Plan_comptable_g%C3%A9n%C3%A9ral_(France)",
                    },
                    {
                        label: "Autorité des normes comptables - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Autorit%C3%A9_des_normes_comptables",
                    },
                ]}
            />
        </DocRoot>
    )
}
