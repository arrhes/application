import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../components/document/docDefinition.js"
import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTable } from "../../../components/document/docTable.js"
import { DocTip } from "../../../components/document/docTip.js"

export function AccountsAccountingDocPage() {
    return (
        <div
            className={css({
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            })}
        >
            <DocHeader title="Les comptes comptables" description="Comprendre l'organisation du plan comptable" />

            <DocSection title="Qu'est-ce qu'un compte ?">
                <DocParagraph>
                    Un compte est une catégorie qui regroupe des opérations de même nature. Chaque compte possède un
                    numéro et un intitulé qui permettent de l'identifier. Par exemple, le compte 512 - Banque regroupe
                    toutes les opérations transitant par votre compte bancaire.
                </DocParagraph>
                <DocParagraph>
                    En France, les comptes sont organisés selon le Plan Comptable Général (PCG), qui définit une
                    structure commune à toutes les organisations.
                </DocParagraph>
            </DocSection>

            <DocSection title="Deux grandes familles de comptes">
                <DocParagraph>
                    Pour bien comprendre le fonctionnement des comptes, il est utile de distinguer deux grandes familles
                    : les <strong>comptes d'operations</strong> et les <strong>comptes d'agents</strong>.
                </DocParagraph>

                <DocDefinition
                    term="Comptes d'opérations"
                    definition="Ces comptes enregistrent les opérations économiques du point de vue de l'entreprise : achats, ventes, charges, produits. Ils décrivent ce que fait l'entreprise."
                />
                <DocDefinition
                    term="Comptes d'agents"
                    definition="Ces comptes enregistrent les relations avec les tiers du point de vue de ces tiers : clients, fournisseurs, banque, caisse, État. Ils décrivent qui doit quoi à qui."
                />

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
                    Cette distinction explique pourquoi les comptes d'actif (Banque, Caisse, Clients) augmentent au
                    débit, tandis que les comptes de passif (Fournisseurs, Capital) augmentent au crédit : on adopte
                    toujours le point de vue de l'agent concerné.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les classes de comptes">
                <DocParagraph>
                    Les comptes sont regroupés en 7 classes principales, numérotées de 1 à 7. Le premier chiffre du
                    numéro de compte indique sa classe.
                </DocParagraph>

                <DocTable
                    headers={["Classe", "Intitulé", "Type"]}
                    rows={[
                        ["1", "Comptes de capitaux", "Bilan (passif)"],
                        ["2", "Comptes d'immobilisations", "Bilan (actif)"],
                        ["3", "Comptes de stocks", "Bilan (actif)"],
                        ["4", "Comptes de tiers", "Bilan (actif ou passif)"],
                        ["5", "Comptes financiers", "Bilan (actif)"],
                        ["6", "Comptes de charges", "Résultat"],
                        ["7", "Comptes de produits", "Résultat"],
                    ]}
                />

                <DocParagraph>
                    Les classes 1 à 5 concernent le <strong>bilan</strong> (ce que vous possédez et ce que vous devez).
                    Les classes 6 et 7 concernent le <strong>compte de résultat</strong> (ce que vous dépensez et ce que
                    vous gagnez).
                </DocParagraph>
            </DocSection>

            <DocSection title="Les comptes de bilan (classes 1 à 5)">
                <DocDefinition
                    term="Classe 1 - Capitaux"
                    definition="Capital social, réserves, résultat de l'exercice, emprunts à long terme. Ce sont les ressources durables de l'organisation. Le capital est assimilé à une dette envers les propriétaires."
                />
                <DocDefinition
                    term="Classe 2 - Immobilisations"
                    definition="Biens destinés à rester durablement dans l'organisation : terrains, bâtiments, matériel, véhicules, logiciels..."
                />
                <DocDefinition
                    term="Classe 3 - Stocks"
                    definition="Marchandises, matières premières, produits finis en attente de vente ou d'utilisation."
                />
                <DocDefinition
                    term="Classe 4 - Tiers"
                    definition="Ce que l'on vous doit (clients, avances versées) et ce que vous devez (fournisseurs, dettes sociales et fiscales, TVA)."
                />
                <DocDefinition
                    term="Classe 5 - Financiers"
                    definition="Comptes bancaires, caisse, placements à court terme. Ces comptes sont tenus du point de vue de la banque ou de la caisse."
                />

                <DocExample title="Comptes de la classe 5">
                    <p>Voici quelques comptes financiers courants :</p>
                    <ul className={css({ marginTop: "2", ml: "4", spaceY: "1" })}>
                        <li>512 - Banque (compte courant)</li>
                        <li>530 - Caisse (especes)</li>
                        <li>531 - Caisse centrale</li>
                    </ul>
                    <p className={css({ marginTop: "3", fontSize: "sm", color: "neutral/60" })}>
                        Le compte Banque est tenu du point de vue de la banque : quand elle vous doit de l'argent (votre
                        solde est positif), le compte est débiteur.
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Les comptes de gestion (classes 6 et 7)">
                <DocParagraph>
                    Les comptes de gestion sont des <strong>comptes d'opérations</strong> : ils enregistrent les flux
                    économiques du point de vue de l'entreprise.
                </DocParagraph>

                <DocDefinition
                    term="Classe 6 - Charges"
                    definition="Toutes les dépenses : achats, services extérieurs, impôts, salaires, charges financières... Une charge est débitée car elle représente un emploi de ressources."
                />
                <DocDefinition
                    term="Classe 7 - Produits"
                    definition="Toutes les recettes : ventes, prestations de services, subventions, produits financiers... Un produit est crédité car il représente une ressource."
                />

                <DocExample title="Comptes courants de charges">
                    <ul className={css({ ml: "4", spaceY: "1" })}>
                        <li>601 - Achats de matières premières</li>
                        <li>606 - Achats non stockés (fournitures)</li>
                        <li>613 - Locations</li>
                        <li>626 - Frais postaux et télécommunications</li>
                        <li>641 - Rémunérations du personnel</li>
                    </ul>
                </DocExample>

                <DocExample title="Comptes courants de produits">
                    <ul className={css({ ml: "4", spaceY: "1" })}>
                        <li>701 - Ventes de produits finis</li>
                        <li>706 - Prestations de services</li>
                        <li>740 - Subventions d'exploitation</li>
                        <li>756 - Cotisations (pour les associations)</li>
                    </ul>
                </DocExample>
            </DocSection>

            <DocSection title="Le compte État et la TVA">
                <DocParagraph>
                    L'État est traité comme un agent particulier avec plusieurs comptes dans la classe 4. Pour la TVA,
                    on distingue deux comptes principaux :
                </DocParagraph>

                <DocDefinition
                    term="4456 - TVA déductible"
                    definition="TVA payée sur les achats. L'État vous doit cette somme (ou vous pouvez la déduire de la TVA collectée). Le compte est débité quand la TVA déductible augmente."
                />
                <DocDefinition
                    term="4457 - TVA collectée"
                    definition="TVA facturée sur les ventes. Vous devez cette somme à l'État. Le compte est crédité quand la TVA collectée augmente."
                />

                <DocExample title="Mécanisme de la TVA">
                    <p>À la fin de la période :</p>
                    <ul className={css({ marginTop: "2", ml: "4", fontSize: "sm", spaceY: "1" })}>
                        <li>Si TVA collectée &gt; TVA déductible - vous devez la différence à l'État</li>
                        <li>Si TVA collectée &lt; TVA déductible - l'État vous doit la différence (crédit de TVA)</li>
                    </ul>
                </DocExample>
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

            <DocSection title="Le journal et la balance">
                <DocParagraph>Pour contrôler la comptabilité, deux documents sont essentiels :</DocParagraph>

                <DocDefinition
                    term="Le journal"
                    definition="Enregistrement chronologique de toutes les écritures. Il permet de retracer l'historique des opérations et constitue une preuve juridique."
                />
                <DocDefinition
                    term="La balance"
                    definition="Liste de tous les comptes avec leurs totaux débit, crédit et solde. Elle permet de vérifier l'équilibre global : le total des débits doit égaler le total des crédits."
                />

                <DocParagraph>
                    La balance est un outil de contrôle indispensable : si elle n'est pas équilibrée, c'est qu'une
                    erreur s'est glissée dans les écritures.
                </DocParagraph>
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Dans Arrhes, vous pouvez{" "}
                    <DocLink to="/documentation/dashboard/organisations">configurer votre plan comptable</DocLink> selon
                    les besoins de votre organisation. Le logiciel propose un plan comptable par défaut adapté aux
                    entreprises et aux associations françaises, que vous pouvez personnaliser.
                </DocParagraph>
            </DocSection>

            <DocTip variant="tip">
                Retenez que le premier chiffre d'un compte indique toujours sa classe. Avec un peu de pratique, vous
                reconnaîtrez rapidement les comptes courants.
            </DocTip>

            <DocNextPage to="/documentation/comptabilité/écritures" label="Les écritures comptables" />
        </div>
    )
}
