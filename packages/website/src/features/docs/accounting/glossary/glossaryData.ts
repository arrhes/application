import type { ValidRoutes } from "../../../../routes/applicationRouter.js"

export interface GlossaryTerm {
    term: string
    slug: string
    definition: string
    relatedTerms?: string[]
    relatedPages?: { label: string; path: ValidRoutes }[]
}

function toSlug(term: string): string {
    return term
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

function defineTerm(
    term: string,
    definition: string,
    options?: { relatedTerms?: string[]; relatedPages?: { label: string; path: ValidRoutes }[] },
): GlossaryTerm {
    return {
        term,
        slug: toSlug(term),
        definition,
        relatedTerms: options?.relatedTerms,
        relatedPages: options?.relatedPages,
    }
}

export const glossaryTerms: GlossaryTerm[] = [
    defineTerm(
        "Actif",
        "Partie gauche du bilan. Regroupe tout ce que l'organisation possède : immobilisations, stocks, créances clients, trésorerie. Les comptes d'actif augmentent au débit et diminuent au crédit.",
        {
            relatedTerms: ["Bilan", "Passif", "Débit", "Crédit"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Amortissement",
        "Constatation comptable de la dépréciation d'un bien immobilisé au fil du temps (usure, obsolescence). Il est enregistré chaque année comme une charge dans le compte de résultat.",
        {
            relatedTerms: ["Immobilisations (classe 2)", "Charges (classe 6)", "Compte de résultat"],
        },
    ),
    defineTerm(
        "Annexe",
        "Document obligatoire qui complète le bilan et le compte de résultat avec des informations complémentaires : méthodes comptables utilisées, engagements hors bilan, détails sur certains postes.",
        {
            relatedTerms: ["Bilan", "Compte de résultat"],
            relatedPages: [{ label: "Les documents", path: "/documentation/comptabilité/documents" }],
        },
    ),
    defineTerm(
        "Balance",
        "Liste de tous les comptes avec leurs totaux débit, crédit et solde. Outil de contrôle essentiel : le total des soldes débiteurs doit toujours égaler le total des soldes créditeurs.",
        {
            relatedTerms: ["Débit", "Crédit", "Solde", "Compte"],
            relatedPages: [{ label: "Les documents", path: "/documentation/comptabilité/documents" }],
        },
    ),
    defineTerm(
        "Bénéfice",
        "Résultat positif d'un exercice. Peut être calculé par le patrimoine (patrimoine final - patrimoine initial) ou par les opérations (produits - charges). Les deux méthodes doivent donner le même résultat.",
        {
            relatedTerms: ["Perte", "Résultat", "Exercice comptable", "Compte de résultat"],
        },
    ),
    defineTerm(
        "Bilan",
        "Photographie du patrimoine de l'organisation à une date donnée. Il montre ce que l'organisation possède (actif) et comment elle l'a financé (passif). L'actif doit toujours être égal au passif.",
        {
            relatedTerms: ["Actif", "Passif", "Capitaux propres"],
            relatedPages: [{ label: "Les documents", path: "/documentation/comptabilité/documents" }],
        },
    ),
    defineTerm(
        "Capital",
        "Apports initiaux des associés ou fondateurs. Fait partie des capitaux propres au passif du bilan. Il est assimilé à une dette de l'entreprise envers ses propriétaires.",
        {
            relatedTerms: ["Capitaux propres", "Passif", "Bilan"],
        },
    ),
    defineTerm(
        "Capitaux propres",
        "Ensemble des ressources appartenant aux propriétaires de l'organisation : capital, réserves, report à nouveau et résultat de l'exercice. Ils figurent au passif du bilan.",
        {
            relatedTerms: ["Capital", "Réserves", "Report à nouveau", "Résultat", "Passif"],
        },
    ),
    defineTerm(
        "Charges (classe 6)",
        "Toutes les dépenses de l'exercice : achats, services extérieurs, impôts, salaires, charges financières. Les comptes de charges sont débités quand ils augmentent.",
        {
            relatedTerms: ["Produits (classe 7)", "Compte de résultat", "Débit"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Classe de compte",
        "Regroupement des comptes par nature, numérotés de 1 à 8. Classes 1 à 5 : comptes de bilan. Classes 6 et 7 : comptes de gestion (résultat). Classe 8 : comptes spéciaux (hors bilan). Le premier chiffre du numéro de compte indique sa classe.",
        {
            relatedTerms: ["Compte", "Plan Comptable Général (PCG)"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Compte",
        "Catégorie qui regroupe des opérations de même nature. Chaque compte possède un numéro et un intitulé définis par le Plan Comptable Général.",
        {
            relatedTerms: ["Plan Comptable Général (PCG)", "Classe de compte", "Débit", "Crédit"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Compte de résultat",
        "Document de synthèse qui compare les produits aux charges sur un exercice pour déterminer le résultat (bénéfice ou perte). Construit à partir des comptes d'opérations (classes 6 et 7).",
        {
            relatedTerms: ["Charges (classe 6)", "Produits (classe 7)", "Bénéfice", "Perte", "Exercice comptable"],
            relatedPages: [{ label: "Les documents", path: "/documentation/comptabilité/documents" }],
        },
    ),
    defineTerm(
        "Comptes d'agents",
        "Comptes qui enregistrent les relations avec les tiers (clients, fournisseurs, banque, État) du point de vue de ces tiers. Ils décrivent qui doit quoi à qui.",
        {
            relatedTerms: ["Comptes d'opérations", "Compte", "Actif", "Passif"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Comptes d'opérations",
        "Comptes qui enregistrent les opérations économiques du point de vue de l'entreprise : achats, ventes, charges, produits. Ils décrivent ce que fait l'entreprise.",
        {
            relatedTerms: ["Comptes d'agents", "Charges (classe 6)", "Produits (classe 7)"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Crédit",
        "Côté droit d'un compte. Du latin credere (croire) : en échange d'une sortie d'argent, le caissier reçoit une pièce justificative. Pour les comptes de passif et de produits, un crédit représente une augmentation.",
        {
            relatedTerms: ["Débit", "Passif", "Produits (classe 7)", "Partie double"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Débit",
        "Côté gauche d'un compte. Du latin debere (devoir) : le caissier doit pouvoir rendre l'argent entré dans sa caisse. Pour les comptes d'actif et de charges, un débit représente une augmentation.",
        {
            relatedTerms: ["Crédit", "Actif", "Charges (classe 6)", "Partie double"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Écriture comptable",
        "Enregistrement d'une opération économique dans les comptes. Comprend une date, un libellé, un numéro de pièce et les comptes mouvementés. Respecte toujours le principe de la partie double.",
        {
            relatedTerms: ["Partie double", "Journal", "Pièce justificative"],
            relatedPages: [{ label: "Les écritures", path: "/documentation/comptabilité/écritures" }],
        },
    ),
    defineTerm(
        "Exercice comptable",
        "Période de 12 mois (généralement l'année civile) pendant laquelle on enregistre les opérations. À la fin, on établit les documents de synthèse (bilan, compte de résultat).",
        {
            relatedTerms: ["Bilan", "Compte de résultat"],
            relatedPages: [{ label: "Les documents", path: "/documentation/comptabilité/documents" }],
        },
    ),
    defineTerm(
        "Grand livre",
        "Liste de tous les comptes avec le détail de leurs mouvements. Permet de vérifier l'historique et le solde progressif de chaque compte.",
        {
            relatedTerms: ["Compte", "Journal", "Balance"],
            relatedPages: [{ label: "Les documents", path: "/documentation/comptabilité/documents" }],
        },
    ),
    defineTerm(
        "Immobilisations (classe 2)",
        "Biens destinés à rester durablement dans l'organisation : terrains, bâtiments, matériel, véhicules, logiciels. Figurent à l'actif du bilan.",
        {
            relatedTerms: ["Actif", "Amortissement", "Bilan"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Journal",
        "Registre chronologique de toutes les écritures comptables. A une valeur juridique et constitue une preuve en cas de contrôle. Les écritures ne doivent jamais y être effacées.",
        {
            relatedTerms: ["Écriture comptable", "Journaux auxiliaires"],
            relatedPages: [{ label: "Les écritures", path: "/documentation/comptabilité/écritures" }],
        },
    ),
    defineTerm(
        "Journaux auxiliaires",
        "Journaux spécialisés par type d'opération : journal des achats (HA), des ventes (VE), de banque (BQ), de caisse (CA), des opérations diverses (OD). Ils facilitent l'organisation et le contrôle.",
        {
            relatedTerms: ["Journal", "Écriture comptable"],
            relatedPages: [{ label: "Les écritures", path: "/documentation/comptabilité/écritures" }],
        },
    ),
    defineTerm(
        "Organisation",
        "Terme générique désignant toute entité qui tient une comptabilité : entreprise, association, collectivité, etc. Dans Arrhes, une organisation correspond à l'entité pour laquelle vous gérez la comptabilité.",
        {
            relatedPages: [
                { label: "Introduction", path: "/documentation/comptabilité/introduction" },
                { label: "Organisations (Dashboard)", path: "/documentation/dashboard/organisations" },
            ],
        },
    ),
    defineTerm(
        "Partie double",
        "Principe fondamental : chaque opération comptable affecte au moins deux comptes. L'un est débité, l'autre est crédité. Le total des débits doit toujours être égal au total des crédits.",
        {
            relatedTerms: ["Débit", "Crédit", "Écriture comptable"],
            relatedPages: [{ label: "Introduction", path: "/documentation/comptabilité/introduction" }],
        },
    ),
    defineTerm(
        "Passif",
        "Partie droite du bilan. Regroupe les ressources de l'organisation : capitaux propres, emprunts, dettes fournisseurs, dettes fiscales. Les comptes de passif augmentent au crédit et diminuent au débit.",
        {
            relatedTerms: ["Bilan", "Actif", "Capitaux propres", "Crédit"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Perte",
        "Résultat négatif d'un exercice, quand les charges sont supérieures aux produits. La perte diminue les capitaux propres au bilan.",
        {
            relatedTerms: ["Bénéfice", "Résultat", "Charges (classe 6)", "Capitaux propres"],
        },
    ),
    defineTerm(
        "Pièce justificative",
        "Document qui prouve la réalité d'une opération (facture, relevé bancaire, ticket de caisse...). Chaque écriture comptable doit être justifiée par une pièce.",
        {
            relatedTerms: ["Écriture comptable", "Journal"],
            relatedPages: [{ label: "Les écritures", path: "/documentation/comptabilité/écritures" }],
        },
    ),
    defineTerm(
        "Plan Comptable Général (PCG)",
        "Référentiel français qui définit la structure commune des comptes pour toutes les organisations. Il organise les comptes en 8 classes numérotées.",
        {
            relatedTerms: ["Compte", "Classe de compte"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Produits (classe 7)",
        "Toutes les recettes de l'exercice : ventes, prestations de services, subventions, produits financiers, cotisations. Les comptes de produits sont crédités quand ils augmentent.",
        {
            relatedTerms: ["Charges (classe 6)", "Compte de résultat", "Crédit"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Report à nouveau",
        "Résultat de l'exercice précédent en attente d'affectation (mise en réserve ou distribution aux associés).",
        {
            relatedTerms: ["Résultat", "Réserves", "Capitaux propres"],
        },
    ),
    defineTerm(
        "Réserves",
        "Bénéfices des années passées qui ont été conservés dans l'entreprise et non distribués aux associés. Font partie des capitaux propres.",
        {
            relatedTerms: ["Capitaux propres", "Bénéfice", "Report à nouveau"],
        },
    ),
    defineTerm(
        "Résultat",
        "Différence entre les produits et les charges d'un exercice. Positif = bénéfice (ou excédent pour une association). Négatif = perte (ou déficit). Le résultat figure dans les capitaux propres du bilan.",
        {
            relatedTerms: ["Bénéfice", "Perte", "Compte de résultat", "Capitaux propres"],
        },
    ),
    defineTerm(
        "Solde",
        "Différence entre le total des débits et le total des crédits d'un compte. Un compte est débiteur si les débits sont supérieurs aux crédits, créditeur dans le cas contraire.",
        {
            relatedTerms: ["Débit", "Crédit", "Balance"],
        },
    ),
    defineTerm(
        "Stocks (classe 3)",
        "Marchandises, matières premières et produits finis en attente de vente ou d'utilisation. Figurent à l'actif circulant du bilan.",
        {
            relatedTerms: ["Actif", "Bilan"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "Tiers (classe 4)",
        "Personnes ou organismes avec lesquels l'organisation a des relations financières : clients, fournisseurs, État, organismes sociaux. Le solde indique ce qu'on vous doit ou ce que vous devez.",
        {
            relatedTerms: ["Comptes d'agents", "Actif", "Passif"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "TVA collectée (compte 4457)",
        "TVA facturée sur les ventes, que vous devez reverser à l'État. Le compte est crédité quand la TVA collectée augmente.",
        {
            relatedTerms: ["TVA déductible (compte 4456)", "Crédit", "Tiers (classe 4)"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
    defineTerm(
        "TVA déductible (compte 4456)",
        "TVA payée sur les achats, que l'État vous doit ou que vous pouvez déduire de la TVA collectée. Le compte est débité quand la TVA déductible augmente.",
        {
            relatedTerms: ["TVA collectée (compte 4457)", "Débit", "Tiers (classe 4)"],
            relatedPages: [{ label: "Les comptes", path: "/documentation/comptabilité/comptes" }],
        },
    ),
]

export function getGlossaryTermBySlug(slug: string): GlossaryTerm | undefined {
    return glossaryTerms.find((t) => t.slug === slug)
}

export function getGlossaryTermsByLetter(): Map<string, GlossaryTerm[]> {
    const grouped = new Map<string, GlossaryTerm[]>()
    for (const term of glossaryTerms) {
        const letter = term.term[0].toUpperCase()
        const existing = grouped.get(letter)
        if (existing) {
            existing.push(term)
        } else {
            grouped.set(letter, [term])
        }
    }
    return grouped
}

export function searchGlossaryTerms(query: string): GlossaryTerm[] {
    if (!query.trim()) return glossaryTerms
    const normalized = query
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
    return glossaryTerms.filter((t) => {
        const termNormalized = t.term
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        const defNormalized = t.definition
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
        return termNormalized.includes(normalized) || defNormalized.includes(normalized)
    })
}
