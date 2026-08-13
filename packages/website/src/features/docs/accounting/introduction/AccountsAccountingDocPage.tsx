import { Fragment } from "react"
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
import { accountClasses } from "../resources/accounts/accountsData.js"

export function AccountsAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Les comptes comptables"
                description="Comprendre l'organisation du plan comptable"
            />
            <WhatIsAnAccountSection />
            <AccountFamiliesSection />
            <AccountClassesSection />
            <HowAccountsWorkSection />
            <AccountNumberingSection />
            <MinimalAndOptionalAccountsSection />
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

function WhatIsAnAccountSection() {
    return (
        <DocSection title="Qu'est-ce qu'un compte ?">
            <DocParagraph>
                Un{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "compte",
                    }}
                >
                    compte
                </DocLink>{" "}
                est une catégorie qui regroupe des opérations de même nature. Chaque compte possède un numéro et un
                intitulé qui permettent de l'identifier. Par exemple, le compte 512 - Banques regroupe toutes les
                opérations transitant par votre compte bancaire.
            </DocParagraph>
            <DocParagraph>
                En France, les comptes sont organisés selon le{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "plan-comptable-general-pcg",
                    }}
                >
                    Plan Comptable Général (PCG)
                </DocLink>
                , qui définit une structure commune à toutes les organisations. Le PCG est aujourd'hui défini par le
                règlement n°2014-03 de l'Autorité des Normes Comptables (ANC).
                <DocSourceRef n={1} />
            </DocParagraph>

            <DocTip variant="info">
                Le premier Plan Comptable Général a été adopté en France en 1943, puis maintenu après la Seconde Guerre
                mondiale pour servir d'outil de planification économique lors de la reconstruction. Il a été révisé en
                1947, 1957, puis profondément refondu en 1982.
                <DocSourceRef n={2} /> L'ANC, créée par ordonnance en 2009, est aujourd'hui l'organisme chargé de le
                faire évoluer.
                <DocSourceRef n={3} />
            </DocTip>
        </DocSection>
    )
}

function AccountFamiliesSection() {
    return (
        <DocSection title="Deux grandes familles de comptes">
            <DocParagraph>
                Pour bien comprendre le fonctionnement des comptes, il est utile de distinguer deux grandes familles :
                les{" "}
                <strong>
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "comptes-d-operations",
                        }}
                    >
                        comptes d'opérations
                    </DocLink>
                </strong>{" "}
                et les{" "}
                <strong>
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "comptes-d-agents",
                        }}
                    >
                        comptes d'agents
                    </DocLink>
                </strong>
                .
            </DocParagraph>

            <DocDefinition term="Comptes d'opérations">
                <DocParagraph>
                    Ces comptes enregistrent les opérations économiques du point de vue de l'entreprise : achats,
                    ventes, charges, produits. Ils décrivent ce que fait l'entreprise.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Comptes d'agents">
                <DocParagraph>
                    Ces comptes enregistrent les relations avec les tiers du point de vue de ces tiers : clients,
                    fournisseurs, banque, caisse, État. Ils décrivent qui doit quoi à qui.
                </DocParagraph>
            </DocDefinition>

            <DocExample title="Point de vue des comptes d'agents">
                <DocParagraph>Le compte Clients est tenu du point de vue des clients :</DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        <Fragment key="debit">
                            Quand un client vous doit de l'argent - le compte est <strong>débité</strong> (sa dette
                            augmente)
                        </Fragment>,
                        <Fragment key="credit">
                            Quand il vous paye - le compte est <strong>crédité</strong> (sa dette diminue)
                        </Fragment>,
                    ]}
                />
                <DocParagraph>Le compte Fournisseurs est tenu du point de vue des fournisseurs :</DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        <Fragment key="credit">
                            Quand vous leur devez de l'argent - le compte est <strong>crédité</strong> (leur créance
                            augmente)
                        </Fragment>,
                        <Fragment key="debit">
                            Quand vous les payez - le compte est <strong>débité</strong> (leur créance diminue)
                        </Fragment>,
                    ]}
                />
            </DocExample>

            <DocParagraph>
                Cette distinction explique pourquoi les comptes d'{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "actif",
                    }}
                >
                    actif
                </DocLink>{" "}
                (Banque, Caisse, Clients) augmentent au{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "debit",
                    }}
                >
                    débit
                </DocLink>
                , tandis que les comptes de{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "passif",
                    }}
                >
                    passif
                </DocLink>{" "}
                (Fournisseurs, Capital) augmentent au{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "credit",
                    }}
                >
                    crédit
                </DocLink>{" "}
                : on adopte toujours le point de vue de l'agent concerné.
            </DocParagraph>
        </DocSection>
    )
}

function AccountClassesSection() {
    return (
        <DocSection title="Les classes de comptes">
            <DocParagraph>
                Les comptes sont regroupés en 8 classes, numérotées de 1 à 8.
                <DocSourceRef n={1} /> Le premier chiffre du numéro de compte indique sa classe.
            </DocParagraph>

            <DocTable
                headers={[
                    "Classe",
                    "Intitulé",
                    "Type",
                ]}
                rows={accountClasses.map((c) => [
                    String(c.number),
                    c.label,
                    c.type,
                ])}
            />

            <DocParagraph>
                Les classes 1 à 5 concernent le{" "}
                <strong>
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "bilan",
                        }}
                    >
                        bilan
                    </DocLink>
                </strong>{" "}
                (ce que vous possédez et ce que vous devez). Les classes 6 et 7 concernent le{" "}
                <strong>
                    <DocLink
                        to="/documentation/comptabilité/ressources/glossaire/$term"
                        params={{
                            term: "compte-de-résultat",
                        }}
                    >
                        compte de résultat
                    </DocLink>
                </strong>{" "}
                (ce que vous dépensez et ce que vous gagnez).
            </DocParagraph>

            <DocTip variant="info">
                La classe 9, autrefois réservée à la comptabilité analytique, a été supprimée du PCG. La comptabilité
                analytique est désormais tenue librement par les entreprises en dehors du plan de comptes officiel.
            </DocTip>
        </DocSection>
    )
}

function HowAccountsWorkSection() {
    return (
        <DocSection title="Comment fonctionne un compte ?">
            <DocParagraph>
                Selon le type de compte, les mouvements au débit et au crédit ont des significations différentes :
            </DocParagraph>

            <DocTable
                headers={[
                    "Type de compte",
                    "Débit (+)",
                    "Crédit (-)",
                ]}
                rows={[
                    [
                        "Actif (ce que vous avez)",
                        "Augmentation",
                        "Diminution",
                    ],
                    [
                        "Passif (ce que vous devez)",
                        "Diminution",
                        "Augmentation",
                    ],
                    [
                        "Charges (dépenses)",
                        "Augmentation",
                        "Diminution",
                    ],
                    [
                        "Produits (recettes)",
                        "Diminution",
                        "Augmentation",
                    ],
                ]}
            />

            <DocExample title="Fonctionnement concret">
                <DocParagraph>
                    Quand vous recevez de l'argent sur votre compte bancaire : le compte 512 - Banques est un compte
                    d'actif, une augmentation se traduit donc par un <strong>débit</strong>
                </DocParagraph>
                <DocParagraph>
                    Quand vous payez une facture depuis ce compte : une diminution se traduit par un{" "}
                    <strong>crédit</strong>
                </DocParagraph>
            </DocExample>
        </DocSection>
    )
}

function AccountNumberingSection() {
    return (
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
                    "Pour les classes de bilan (1 à 5), un numéro se terminant par 9 indique un compte de dépréciation ou de sens contraire (ex : 491 = Dépréciation des comptes clients)",
                ]}
            />

            <DocExample title="Lecture d'un numéro de compte">
                <DocParagraph>
                    Le compte <strong>60611</strong> se décompose ainsi :
                </DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        <Fragment key="c6">
                            <strong>6</strong> = Classe 6 (Charges)
                        </Fragment>,
                        <Fragment key="c60">
                            <strong>60</strong> = Achats
                        </Fragment>,
                        <Fragment key="c606">
                            <strong>606</strong> = Achats non stockés de matières et fournitures
                        </Fragment>,
                        <Fragment key="c6061">
                            <strong>6061</strong> = Fournitures non stockables
                        </Fragment>,
                        <Fragment key="c60611">
                            <strong>60611</strong> = Eau, énergie
                        </Fragment>,
                    ]}
                />
            </DocExample>
        </DocSection>
    )
}

function MinimalAndOptionalAccountsSection() {
    return (
        <DocSection title="Comptes du système minimal et comptes facultatifs">
            <DocParagraph>Le PCG distingue deux catégories de comptes selon leur caractère obligatoire :</DocParagraph>

            <DocDefinition term="Comptes du système minimal">
                <DocParagraph>
                    Ces comptes constituent le socle obligatoire du plan comptable. Ils doivent être utilisés par toutes
                    les entités, quelle que soit leur taille. Ils couvrent les opérations courantes et permettent
                    d'établir les documents de synthèse essentiels.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Comptes facultatifs">
                <DocParagraph>
                    Ces comptes offrent un niveau de détail supplémentaire. Leur utilisation est optionnelle et dépend
                    des besoins de l'entité et de la complexité de son activité. Ils permettent un suivi plus fin de
                    certaines opérations.
                </DocParagraph>
            </DocDefinition>
        </DocSection>
    )
}
