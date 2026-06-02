import { DocHeader } from "../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../components/document/DocSection.js"
import { DocSourceRef } from "../../../../components/document/DocSourceRef.js"
import { DocSources } from "../../../../components/document/DocSources.js"
import { DocTip } from "../../../../components/document/DocTip.js"
import { accountClasses } from "../resources/accounts/accountsData.js"

// ── Class descriptions & tips ──────────────────────────────────────────────

interface ClassInfo {
    description: string
    tips: Array<{
        variant: "tip" | "info"
        children: string
    }>
}

const classInfos: Record<number, ClassInfo> = {
    1: {
        description:
            "Les comptes de la classe 1 enregistrent les ressources durables de l'entreprise : le capital social, les réserves, le résultat de l'exercice, les subventions d'investissement, les provisions pour risques et charges, ainsi que les emprunts et dettes à long terme. Ces comptes figurent au passif du bilan et reflètent les moyens de financement permanents de l'entreprise.",
        tips: [
            {
                variant: "info",
                children:
                    "Les comptes de la classe 1 constituent le « haut du bilan » côté passif. Ils représentent l'origine des financements à long terme, qu'ils soient propres (capital, réserves) ou empruntés (emprunts, dettes financières).",
            },
            {
                variant: "tip",
                children:
                    "Le compte 108 - Compte de l'exploitant est spécifique aux entreprises individuelles. Il enregistre les apports et retraits personnels de l'exploitant, jouant un rôle similaire au capital dans les sociétés.",
            },
        ],
    },
    2: {
        description:
            "Les comptes de la classe 2 enregistrent les actifs destinés à rester durablement dans l'entreprise : immobilisations incorporelles (brevets, logiciels, fonds de commerce), immobilisations corporelles (terrains, constructions, matériel), immobilisations financières (participations, prêts), ainsi que leurs amortissements et dépréciations. Ces comptes figurent à l'actif du bilan.",
        tips: [
            {
                variant: "info",
                children:
                    "Les amortissements (comptes 28) et les dépréciations (comptes 29) viennent en déduction de la valeur brute des immobilisations pour donner leur valeur nette comptable au bilan.",
            },
            {
                variant: "tip",
                children:
                    "Un bien est comptabilisé en immobilisation s'il est destiné à servir de façon durable l'activité de l'entreprise. Les biens de faible valeur (généralement inférieurs à 500 € HT) peuvent être comptabilisés directement en charges.",
            },
        ],
    },
    3: {
        description:
            "Les comptes de la classe 3 enregistrent les biens et services achetés ou produits par l'entreprise, destinés à être vendus ou consommés : matières premières, marchandises, produits en cours de fabrication, produits finis et en-cours de production de services. Ces comptes figurent à l'actif du bilan et sont évalués en fin d'exercice lors de l'inventaire.",
        tips: [
            {
                variant: "info",
                children:
                    "La variation de stock en fin d'exercice donne lieu à des écritures de régularisation. Un stock final supérieur au stock initial vient diminuer les charges (ou augmenter les produits pour les produits finis), et inversement.",
            },
            {
                variant: "tip",
                children:
                    "Les comptes 39 enregistrent les dépréciations de stocks lorsque la valeur actuelle d'un stock est inférieure à son coût d'entrée. Cette dépréciation est réversible, contrairement à un amortissement.",
            },
        ],
    },
    4: {
        description:
            "Les comptes de la classe 4 enregistrent les créances et les dettes liées aux relations avec les tiers : fournisseurs, clients, personnel, organismes sociaux, État (impôts et taxes, TVA), associés, débiteurs et créditeurs divers. Selon le solde, ces comptes figurent à l'actif (créances) ou au passif (dettes) du bilan.",
        tips: [
            {
                variant: "info",
                children:
                    "Les comptes de TVA (4456 et 4457) jouent un rôle central dans la gestion fiscale. Le compte 4456 enregistre la TVA payée sur les achats (déductible), tandis que le compte 4457 enregistre la TVA facturée sur les ventes (collectée).",
            },
            {
                variant: "tip",
                children:
                    "Les comptes de la classe 4 sont dits « bilatéraux » : ils peuvent présenter un solde débiteur (créance) ou créditeur (dette). En fin d'exercice, il faut veiller à ne pas compenser les soldes et à présenter séparément les créances et les dettes au bilan.",
            },
        ],
    },
    5: {
        description:
            "Les comptes de la classe 5 enregistrent les opérations liées à la trésorerie de l'entreprise : comptes bancaires, caisse, valeurs mobilières de placement, instruments financiers à court terme et virements internes. Ces comptes figurent à l'actif du bilan et permettent de suivre la liquidité immédiate de l'entreprise.",
        tips: [
            {
                variant: "info",
                children:
                    "Le compte 512 - Banque est l'un des comptes les plus utilisés en comptabilité. Il doit être rapproché régulièrement avec les relevés bancaires pour vérifier la concordance entre la comptabilité et la banque.",
            },
            {
                variant: "tip",
                children:
                    "Le compte 580 - Virements internes est un compte de passage utilisé pour les transferts entre comptes financiers (par exemple, un retrait de la banque vers la caisse). Il doit toujours avoir un solde nul en fin de période.",
            },
        ],
    },
    6: {
        description:
            "Les comptes de la classe 6 enregistrent les charges de l'exercice : achats de marchandises et de matières premières, services extérieurs, impôts et taxes, charges de personnel, charges financières (intérêts), dotations aux amortissements et provisions, ainsi que les charges exceptionnelles. Ces comptes figurent dans le compte de résultat et viennent diminuer le résultat de l'exercice.",
        tips: [
            {
                variant: "info",
                children:
                    "La structure de la classe 6 suit la logique du compte de résultat : les comptes 60 à 65 concernent les charges d'exploitation, les comptes 66 les charges financières, et les comptes 67 les charges exceptionnelles. Les comptes 68 enregistrent les dotations aux amortissements, dépréciations et provisions.",
            },
            {
                variant: "tip",
                children:
                    "Les charges sont enregistrées au débit des comptes de la classe 6. Pour annuler ou réduire une charge, on passe l'écriture au crédit du même compte (par exemple, lors d'un avoir reçu d'un fournisseur).",
            },
        ],
    },
    7: {
        description:
            "Les comptes de la classe 7 enregistrent les produits de l'exercice : ventes de marchandises, production vendue et stockée, subventions d'exploitation, produits financiers (intérêts, dividendes), reprises sur amortissements et provisions, ainsi que les produits exceptionnels. Ces comptes figurent dans le compte de résultat et viennent augmenter le résultat de l'exercice.",
        tips: [
            {
                variant: "info",
                children:
                    "La structure de la classe 7 est symétrique à celle de la classe 6 : les comptes 70 à 75 concernent les produits d'exploitation, les comptes 76 les produits financiers, et les comptes 77 les produits exceptionnels. Les comptes 78 enregistrent les reprises sur amortissements, dépréciations et provisions.",
            },
            {
                variant: "tip",
                children:
                    "Le compte 701 - Ventes de produits finis et le compte 707 - Ventes de marchandises sont à distinguer : le premier concerne les biens fabriqués par l'entreprise, le second les biens achetés et revendus en l'état.",
            },
        ],
    },
    8: {
        description:
            "Les comptes de la classe 8 enregistrent les opérations particulières qui ne figurent ni au bilan ni au compte de résultat : engagements hors bilan (cautions, avals, garanties) et contributions volontaires en nature dans les associations (bénévolat, dons en nature, mises à disposition gratuites). Ces comptes sont présentés dans l'annexe des comptes annuels.",
        tips: [
            {
                variant: "info",
                children:
                    "Les comptes 80 à 809 retracent les engagements hors bilan (donnés, reçus et réciproques). Ils fonctionnent en partie double grâce au compte 809 - Contrepartie des engagements. Ces informations sont obligatoirement mentionnées dans l'annexe.",
            },
            {
                variant: "tip",
                children:
                    "Les comptes 86 et 87 sont spécifiques aux associations. Ils permettent de valoriser les contributions volontaires en nature (bénévolat, dons en nature) au pied du compte de résultat, offrant une image plus fidèle des ressources réellement mobilisées par l'association.",
            },
        ],
    },
}

// ── Main page ──────────────────────────────────────────────────────────────

export function ClassesAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Les classes de comptes"
                description="Les 8 classes du Plan Comptable Général"
            />

            <DocParagraph>
                Le Plan Comptable Général organise les comptes en 8 classes.
                <DocSourceRef n={1} /> Les classes 1 à 5 concernent les comptes de bilan, les classes 6 et 7 les comptes
                de résultat, et la classe 8 les comptes spéciaux.
            </DocParagraph>

            {accountClasses.map((cls) => {
                const info = classInfos[cls.number]
                if (!info) return null
                return (
                    <DocSection
                        key={cls.number}
                        title={`Classe ${cls.number} - ${cls.label}`}
                    >
                        <DocParagraph>{info.description}</DocParagraph>
                        {info.tips.map((tip) => (
                            <DocTip
                                key={`${tip.variant}-${String(tip.children)}`}
                                variant={tip.variant}
                            >
                                {tip.children}
                            </DocTip>
                        ))}
                    </DocSection>
                )
            })}

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
                ]}
            />
        </DocRoot>
    )
}
