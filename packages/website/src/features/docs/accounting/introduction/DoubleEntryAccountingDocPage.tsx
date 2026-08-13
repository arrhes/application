import { css } from "@comptasse/ui/utilities/cn.js"
import { DocDefinition } from "../../../../components/document/DocDefinition.tsx"
import { DocExample } from "../../../../components/document/DocExample.tsx"
import { DocHeader } from "../../../../components/document/DocHeader.tsx"
import { DocLink } from "../../../../components/document/DocLink.tsx"
import { DocList } from "../../../../components/document/DocList.tsx"
import { DocParagraph } from "../../../../components/document/DocParagraph.tsx"
import { DocRoot } from "../../../../components/document/DocRoot.tsx"
import { DocSection } from "../../../../components/document/DocSection.tsx"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.tsx"
import { DocSources } from "../../../../components/document/DocSources.tsx"
import { DocTable } from "../../../../components/document/DocTable.tsx"
import { DocTip } from "../../../../components/document/DocTip.tsx"

export function DoubleEntryAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="La partie double"
                description="Le principe fondamental de la comptabilité moderne"
            />
            <DoubleEntryPrincipleSection />
            <EssentialVocabularySection />
            <DocSources
                sources={[
                    {
                        label: "Luca Pacioli - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Luca_Pacioli",
                    },
                    {
                        label: "Comptabilité en partie double - Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Comptabilit%C3%A9_en_partie_double",
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

function DoubleEntryPrincipleSection() {
    return (
        <DocSection title="Le principe de la partie double">
            <DocParagraph>
                La vie d'une organisation est faite d'opérations économiques : achats, ventes, encaissements, paiements,
                etc. Une opération est un événement qui modifie la situation financière de l'organisation. Cette
                opération peut autant traduire un flux réel d'argent (ex : paiement d'une facture) qu'un flux virtuel à
                venir, comme la reconnaissance d'une créance ou d'une dette (ex : émission d'une facture).
            </DocParagraph>
            <DocParagraph>
                Le principe de la partie double est le fondement de toute comptabilité moderne, codifié par Luca Pacioli
                en 1494.
                <DocSourceRef n={1} /> Il repose sur une idée simple : chaque opération de l'organisation est un flux
                qui a une <strong>origine</strong> et une <strong>destination</strong> . Origine et destination sont par
                définition d'un même montant : le flux est équilibré. La comptabilité garantit ainsi que chaque
                mouvement (argent, matériaux, service, etc.) est correctement enregistré et équilibré.
                <DocSourceRef n={2} />
            </DocParagraph>
            <DocParagraph>
                Concrètement, chaque opération de l'organisation est notée dans ce qu'on appelle un{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "journal",
                    }}
                >
                    journal
                </DocLink>
                , sous la forme d'une{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "ecriture-comptable",
                    }}
                >
                    écriture
                </DocLink>
                . Une écriture comporte au moins deux lignes. Chaque ligne fait correspondre ce qu'on appelle un{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "compte",
                    }}
                >
                    compte
                </DocLink>
                , à un montant, soit au{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "debit",
                    }}
                >
                    débit
                </DocLink>
                , soit au{" "}
                <DocLink
                    to="/documentation/comptabilité/ressources/glossaire/$term"
                    params={{
                        term: "credit",
                    }}
                >
                    crédit
                </DocLink>
                . Peu importe le nombre de lignes, la somme des montants débités doit toujours être égale à la somme des
                montants crédités. C'est ce qui garantit l'équilibre permanent de la comptabilité.
                <DocSourceRef n={3} />
            </DocParagraph>

            <DocExample>
                <p>Voici deux écritures extraites du journal, correspondant à deux opérations de l'organisation :</p>
                <p
                    className={css({
                        marginTop: "2",
                    })}
                >
                    Achat en espèces de fournitures de bureau pour la somme de 100,00€.
                </p>
                <DocTable
                    headers={[
                        "Date",
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "15/01",
                            "6064 - Fournitures administratives",
                            "Achat fournitures bureau",
                            "100,00€",
                            "-",
                        ],
                        [
                            "15/01",
                            "530 - Caisse",
                            "Achat fournitures bureau",
                            "-",
                            "100,00€",
                        ],
                    ]}
                />
                <p>
                    Vente d'une prestation de service pour 1500,00€ : le client paie 500,00€ par virement, le reste est
                    dû à 30 jours.
                </p>
                <DocTable
                    headers={[
                        "Date",
                        "Compte",
                        "Libellé",
                        "Débit",
                        "Crédit",
                    ]}
                    rows={[
                        [
                            "22/01",
                            "512 - Banque",
                            "Vente prestation - part encaissée",
                            "500,00€",
                            "-",
                        ],
                        [
                            "22/01",
                            "411 - Clients",
                            "Vente prestation - part à recevoir",
                            "1000,00€",
                            "-",
                        ],
                        [
                            "22/01",
                            "706 - Prestations de services",
                            "Vente prestation",
                            "-",
                            "1500,00€",
                        ],
                    ]}
                />
                <p
                    className={css({
                        marginTop: "3",
                        fontWeight: "medium",
                    })}
                >
                    Pour chaque écriture, on a bien le total des débits qui est égal au total des crédits.
                </p>
            </DocExample>

            <DocTip variant="info">
                Grâce à ce principe, toute erreur d'enregistrement crée un déséquilibre entre débits et crédits, ce qui
                la rend immédiatement détectable. C'est aussi un outil de prévention de la fraude : la falsification
                d'une écriture sans altérer l'équilibre global est extrêmement difficile. Enfin, la partie double permet
                d'enregistrer des opérations futures (dettes, créances) et pas seulement des mouvements d'argent
                effectifs.
            </DocTip>
        </DocSection>
    )
}

function EssentialVocabularySection() {
    return (
        <DocSection title="Vocabulaire essentiel">
            <DocDefinition term="Écriture">
                <DocParagraph>
                    Une écriture comptable est l'enregistrement d'une opération économique dans les comptes de
                    l'organisation. Elle se compose d'une date, d'un libellé décrivant l'opération, et d'au moins deux
                    lignes : chaque ligne associe un compte à un montant, inscrit au débit ou au crédit.
                </DocParagraph>
                <DocParagraph>
                    Le total des débits d'une écriture est toujours égal au total de ses crédits : c'est le principe de
                    la partie double appliqué à chaque opération. Une écriture doit être justifiée par une pièce
                    justificative (facture, relevé bancaire, ticket de caisse, etc.).
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Compte">
                <DocParagraph>
                    Un compte est un registre qui suit l'évolution d'un élément précis du patrimoine ou de l'activité de
                    l'organisation. Son montant est modifié à chaque fois qu'il est impliqué dans une opération
                    comptable (i.e. d'une écriture), soit au débit, soit au crédit. On dit que le compte est mouvementé
                    (par l'écriture).
                </DocParagraph>
                <DocParagraph>Chaque compte a un numéro et un intitulé qui précisent ce qu'il suit.</DocParagraph>
                <DocParagraph>Il existe quatre grands types de comptes :</DocParagraph>
                <DocList
                    variant="hyphen"
                    items={[
                        "les comptes d'actif (ce que l'organisation possède),",
                        "de passif (ce qu'elle doit),",
                        "de charges (ce qu'elle dépense)",
                        "et de produits (ce qu'elle gagne).",
                    ]}
                />
                <DocParagraph>
                    Par exemple, le compte « Banque » (numéro 512) suit l'argent disponible sur le compte bancaire. Le
                    compte « Fournisseurs » (numéro 401) suit les dettes envers les fournisseurs. Le compte « Ventes »
                    (numéro 706) suit le montant des ventes réalisées.
                </DocParagraph>
                <DocLink
                    to="/documentation/comptabilité/ressources/comptes"
                    buttonProps={{
                        text: "Voir la liste des comptes",
                    }}
                />
            </DocDefinition>
            <DocDefinition term="Débit">
                <DocParagraph>
                    Débiter un compte, c'est enregistrer que ce compte est la destination d'un flux. Les ressources vont
                    vers ce compte.
                </DocParagraph>
                <DocParagraph>Exemples :</DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        "Actif : un client paie par virement, l'argent arrive sur le compte bancaire, on débite le compte 512 - Banques.",
                        "Passif : l'organisation rembourse une partie de son emprunt, le remboursement est dirigé vers la dette pour la réduire, on débite le compte 164 - Emprunt",
                        "Produits : un client retourne un article, l'annulation est dirigée vers le compte de ventes pour le réduire, on débite le compte 706 - Ventes.",
                        "Charges : l'organisation reçoit des matières premières, la charge augmente, on débite le compte 601 - Achats stockés.",
                    ]}
                />
                <DocParagraph>Actif (ex : 512 - Banque) -</DocParagraph>
                <DocParagraph>Charges (ex : 601) - .</DocParagraph>
                <DocParagraph>Passif (ex : 164) - .</DocParagraph>
                <DocParagraph>
                    Produits (ex : 706) - un client retourne un article, l'annulation est dirigée vers le compte de
                    ventes pour le réduire, on débite le compte 706 - Ventes.
                </DocParagraph>
            </DocDefinition>
            <DocDefinition term="Crédit">
                <DocParagraph>
                    Créditer un compte, c'est enregistrer que ce compte est l'origine d'un flux. Les ressources partent
                    de ce compte.
                </DocParagraph>
                <DocParagraph>Exemples :</DocParagraph>
                <DocList
                    variant="bullet"
                    items={[
                        "Actif : l'organisation paie en espèces, l'argent part de la caisse, on crédite le compte 53 - Caisse.",
                        "Passif : l'organisation contracte un emprunt, la dette est la source des fonds reçus, on crédite le compte 164 - Emprunt.",
                        "Produits : l'organisation réalise une vente, le revenu est la source de la valeur créée, on crédite le compte 706 - Ventes.",
                        "Charges : le fournisseur accorde un avoir, la charge est annulée, on crédite le compte 601.",
                    ]}
                />
            </DocDefinition>
            <DocDefinition term="Solde">
                <DocParagraph>
                    Le solde d'un compte résume en un seul chiffre tout ce qui y est entré et sorti. C'est la différence
                    entre le total de ses débits et le total de ses crédits. Si les débits sont supérieurs, le solde est
                    débiteur. Dans le cas contraire, il est créditeur.
                </DocParagraph>
            </DocDefinition>
        </DocSection>
    )
}
