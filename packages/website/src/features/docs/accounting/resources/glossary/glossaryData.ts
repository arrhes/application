import type { ValidRoutes } from "../../../../../routes/applicationRouter.js"

export interface GlossaryTerm {
    term: string
    englishTranslation: string
    slug: string
    definition: string
    sources: {
        label: string
        url: string
    }[]
    relatedTerms?: string[]
    relatedPages?: {
        label: string
        path: ValidRoutes
    }[]
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
    englishTranslation: string,
    definition: string,
    options?: {
        sources?: {
            label: string
            url: string
        }[]
        relatedTerms?: string[]
        relatedPages?: {
            label: string
            path: ValidRoutes
        }[]
    },
): GlossaryTerm {
    return {
        term,
        englishTranslation,
        slug: toSlug(term),
        definition,
        sources: options?.sources ?? [],
        relatedTerms: options?.relatedTerms,
        relatedPages: options?.relatedPages,
    }
}

export const glossaryTerms: GlossaryTerm[] = [
    defineTerm(
        "Actif",
        "Assets",
        "Partie gauche du bilan. Regroupe tout ce que l'organisation possède : immobilisations, stocks, créances clients, trésorerie. Les comptes d'actif augmentent au débit et diminuent au crédit.",
        {
            sources: [
                {
                    label: "Actif - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Actif_(comptabilité)",
                },
            ],
            relatedTerms: [
                "Bilan",
                "Passif",
                "Débit",
                "Crédit",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Amortissement",
        "Depreciation",
        "Constatation comptable de la dépréciation d'un bien immobilisé au fil du temps (usure, obsolescence). Il est enregistré chaque année comme une charge dans le compte de résultat.",
        {
            sources: [
                {
                    label: "Amortissement comptable - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Amortissement_comptable",
                },
            ],
            relatedTerms: [
                "Immobilisations (classe 2)",
                "Charges (classe 6)",
                "Compte de résultat",
            ],
        },
    ),
    defineTerm(
        "Annexe",
        "Notes to the financial statements",
        "Document obligatoire qui complète le bilan et le compte de résultat avec des informations complémentaires : méthodes comptables utilisées, engagements hors bilan, détails sur certains postes.",
        {
            sources: [
                {
                    label: "Annexe - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Annexe_(comptabilité)",
                },
            ],
            relatedTerms: [
                "Bilan",
                "Compte de résultat",
            ],
            relatedPages: [
                {
                    label: "Les documents",
                    path: "/documentation/comptabilité/documents",
                },
            ],
        },
    ),
    defineTerm(
        "Balance",
        "Trial balance",
        "Liste de tous les comptes avec leurs totaux débit, crédit et solde. Outil de contrôle essentiel : le total des soldes débiteurs doit toujours égaler le total des soldes créditeurs.",
        {
            sources: [
                {
                    label: "Balance comptable - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Balance_comptable",
                },
            ],
            relatedTerms: [
                "Débit",
                "Crédit",
                "Solde",
                "Compte",
            ],
            relatedPages: [
                {
                    label: "Les documents",
                    path: "/documentation/comptabilité/documents",
                },
            ],
        },
    ),
    defineTerm(
        "Bénéfice",
        "Profit",
        "Résultat positif d'un exercice. Peut être calculé par le patrimoine (patrimoine final - patrimoine initial) ou par les opérations (produits - charges). Les deux méthodes doivent donner le même résultat.",
        {
            sources: [
                {
                    label: "Bénéfice - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Bénéfice_(comptabilité)",
                },
            ],
            relatedTerms: [
                "Perte",
                "Résultat",
                "Exercice comptable",
                "Compte de résultat",
            ],
        },
    ),
    defineTerm(
        "Bilan",
        "Balance sheet",
        "Photographie du patrimoine de l'organisation à une date donnée. Il montre ce que l'organisation possède (actif) et comment elle l'a financé (passif). L'actif doit toujours être égal au passif.",
        {
            sources: [
                {
                    label: "Balance sheet - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Balance_sheet",
                },
            ],
            relatedTerms: [
                "Actif",
                "Passif",
                "Capitaux propres",
            ],
            relatedPages: [
                {
                    label: "Les documents",
                    path: "/documentation/comptabilité/documents",
                },
            ],
        },
    ),
    defineTerm(
        "Capital",
        "Capital",
        "Apports initiaux des associés ou fondateurs. Fait partie des capitaux propres au passif du bilan. Il est assimilé à une dette de l'entreprise envers ses propriétaires.",
        {
            sources: [
                {
                    label: "Capital social - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Capital_social_(finance)",
                },
            ],
            relatedTerms: [
                "Capitaux propres",
                "Passif",
                "Bilan",
            ],
        },
    ),
    defineTerm(
        "Capitaux propres",
        "Equity",
        "Ensemble des ressources appartenant aux propriétaires de l'organisation : capital, réserves, report à nouveau et résultat de l'exercice. Ils figurent au passif du bilan.",
        {
            sources: [
                {
                    label: "Equity (finance) - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Equity_(finance)",
                },
            ],
            relatedTerms: [
                "Capital",
                "Réserves",
                "Report à nouveau",
                "Résultat",
                "Passif",
            ],
        },
    ),
    defineTerm(
        "Charges (classe 6)",
        "Expenses (class 6)",
        "Toutes les dépenses de l'exercice : achats, services extérieurs, impôts, salaires, charges financières. Les comptes de charges sont débités quand ils augmentent.",
        {
            sources: [
                {
                    label: "Expense - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Expense",
                },
            ],
            relatedTerms: [
                "Produits (classe 7)",
                "Compte de résultat",
                "Débit",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Classe de compte",
        "Account class",
        "Regroupement des comptes par nature, numérotés de 1 à 8. Classes 1 à 5 : comptes de bilan. Classes 6 et 7 : comptes de gestion (résultat). Classe 8 : comptes spéciaux (hors bilan). Le premier chiffre du numéro de compte indique sa classe.",
        {
            sources: [
                {
                    label: "Chart of accounts - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Chart_of_accounts",
                },
            ],
            relatedTerms: [
                "Compte",
                "Plan Comptable Général (PCG)",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Compte",
        "Account",
        "Catégorie qui regroupe des opérations de même nature. Chaque compte possède un numéro et un intitulé définis par le Plan Comptable Général.",
        {
            sources: [
                {
                    label: "Account (bookkeeping) - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Account_(bookkeeping)",
                },
            ],
            relatedTerms: [
                "Plan Comptable Général (PCG)",
                "Classe de compte",
                "Débit",
                "Crédit",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Compte de résultat",
        "Income statement",
        "Document de synthèse qui compare les produits aux charges sur un exercice pour déterminer le résultat (bénéfice ou perte). Construit à partir des comptes d'opérations (classes 6 et 7).",
        {
            sources: [
                {
                    label: "Income statement - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Income_statement",
                },
            ],
            relatedTerms: [
                "Charges (classe 6)",
                "Produits (classe 7)",
                "Bénéfice",
                "Perte",
                "Exercice comptable",
            ],
            relatedPages: [
                {
                    label: "Les documents",
                    path: "/documentation/comptabilité/documents",
                },
            ],
        },
    ),
    defineTerm(
        "Comptes d'agents",
        "Personal accounts",
        "Comptes qui enregistrent les relations avec les tiers (clients, fournisseurs, banque, État) du point de vue de ces tiers. Ils décrivent qui doit quoi à qui.",
        {
            sources: [
                {
                    label: "Personal account - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Personal_account",
                },
            ],
            relatedTerms: [
                "Comptes d'opérations",
                "Compte",
                "Actif",
                "Passif",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Comptes d'opérations",
        "Nominal accounts",
        "Comptes qui enregistrent les opérations économiques du point de vue de l'entreprise : achats, ventes, charges, produits. Ils décrivent ce que fait l'entreprise.",
        {
            sources: [
                {
                    label: "Nominal account - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Nominal_account",
                },
            ],
            relatedTerms: [
                "Comptes d'agents",
                "Charges (classe 6)",
                "Produits (classe 7)",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Crédit",
        "Credit",
        "Côté droit d'un compte. Du latin credere (croire) : en échange d'une sortie d'argent, le caissier reçoit une pièce justificative. Pour les comptes de passif et de produits, un crédit représente une augmentation.",
        {
            sources: [
                {
                    label: "Debits and credits - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Debits_and_credits",
                },
            ],
            relatedTerms: [
                "Débit",
                "Passif",
                "Produits (classe 7)",
                "Partie double",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Débit",
        "Debit",
        "Côté gauche d'un compte. Du latin debere (devoir) : le caissier doit pouvoir rendre l'argent entré dans sa caisse. Pour les comptes d'actif et de charges, un débit représente une augmentation.",
        {
            sources: [
                {
                    label: "Debits and credits - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Debits_and_credits",
                },
            ],
            relatedTerms: [
                "Crédit",
                "Actif",
                "Charges (classe 6)",
                "Partie double",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Écriture comptable",
        "Journal entry",
        "Enregistrement d'une opération économique dans les comptes. Comprend une date, un libellé, un numéro de pièce et les comptes mouvementés. Respecte toujours le principe de la partie double.",
        {
            sources: [
                {
                    label: "Journal entry - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Journal_entry",
                },
            ],
            relatedTerms: [
                "Partie double",
                "Journal",
                "Pièce justificative",
            ],
            relatedPages: [
                {
                    label: "Les écritures",
                    path: "/documentation/comptabilité/introduction/écritures",
                },
            ],
        },
    ),
    defineTerm(
        "Exercice comptable",
        "Financial year",
        "Période de 12 mois (généralement l'année civile) pendant laquelle on enregistre les opérations. À la fin, on établit les documents de synthèse (bilan, compte de résultat).",
        {
            sources: [
                {
                    label: "Fiscal year - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Fiscal_year",
                },
            ],
            relatedTerms: [
                "Bilan",
                "Compte de résultat",
            ],
            relatedPages: [
                {
                    label: "Les documents",
                    path: "/documentation/comptabilité/documents",
                },
            ],
        },
    ),
    defineTerm(
        "Grand livre",
        "General ledger",
        "Liste de tous les comptes avec le détail de leurs mouvements. Permet de vérifier l'historique et le solde progressif de chaque compte.",
        {
            sources: [
                {
                    label: "General ledger - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/General_ledger",
                },
            ],
            relatedTerms: [
                "Compte",
                "Journal",
                "Balance",
            ],
            relatedPages: [
                {
                    label: "Les documents",
                    path: "/documentation/comptabilité/documents",
                },
            ],
        },
    ),
    defineTerm(
        "Immobilisations (classe 2)",
        "Fixed assets (class 2)",
        "Biens destinés à rester durablement dans l'organisation : terrains, bâtiments, matériel, véhicules, logiciels. Figurent à l'actif du bilan.",
        {
            sources: [
                {
                    label: "Fixed asset - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Fixed_asset",
                },
            ],
            relatedTerms: [
                "Actif",
                "Amortissement",
                "Bilan",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Journal",
        "Journal",
        "Registre chronologique de toutes les écritures comptables. A une valeur juridique et constitue une preuve en cas de contrôle. Les écritures ne doivent jamais y être effacées.",
        {
            sources: [
                {
                    label: "General journal - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/General_journal",
                },
            ],
            relatedTerms: [
                "Écriture comptable",
                "Journaux auxiliaires",
            ],
            relatedPages: [
                {
                    label: "Les écritures",
                    path: "/documentation/comptabilité/introduction/écritures",
                },
            ],
        },
    ),
    defineTerm(
        "Journaux auxiliaires",
        "Subsidiary journals",
        "Journaux spécialisés par type d'opération : journal des achats (HA), des ventes (VE), de banque (BQ), de caisse (CA), des opérations diverses (OD). Ils facilitent l'organisation et le contrôle.",
        {
            sources: [
                {
                    label: "Special journal - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Special_journal",
                },
            ],
            relatedTerms: [
                "Journal",
                "Écriture comptable",
            ],
            relatedPages: [
                {
                    label: "Les écritures",
                    path: "/documentation/comptabilité/introduction/écritures",
                },
            ],
        },
    ),
    defineTerm(
        "Organisation",
        "Organization",
        "Terme générique désignant toute entité qui tient une comptabilité : entreprise, association, collectivité, etc. Dans Comptasse, une organisation correspond à l'entité pour laquelle vous gérez la comptabilité.",
        {
            sources: [
                {
                    label: "Organization - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Organization",
                },
            ],
            relatedPages: [
                {
                    label: "Introduction",
                    path: "/documentation/comptabilité/introduction",
                },
                {
                    label: "Organisations (Dashboard)",
                    path: "/documentation/guide/organisations",
                },
            ],
        },
    ),
    defineTerm(
        "Partie double",
        "Double-entry bookkeeping",
        "Principe fondamental : chaque opération comptable affecte au moins deux comptes. L'un est débité, l'autre est crédité. Le total des débits doit toujours être égal au total des crédits.",
        {
            sources: [
                {
                    label: "Double-entry bookkeeping - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Double-entry_bookkeeping",
                },
            ],
            relatedTerms: [
                "Débit",
                "Crédit",
                "Écriture comptable",
            ],
            relatedPages: [
                {
                    label: "Introduction",
                    path: "/documentation/comptabilité/introduction",
                },
            ],
        },
    ),
    defineTerm(
        "Passif",
        "Liabilities & equity",
        "Partie droite du bilan. Regroupe les ressources de l'organisation : capitaux propres, emprunts, dettes fournisseurs, dettes fiscales. Les comptes de passif augmentent au crédit et diminuent au débit.",
        {
            sources: [
                {
                    label: "Passif - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Passif_(comptabilité)",
                },
            ],
            relatedTerms: [
                "Bilan",
                "Actif",
                "Capitaux propres",
                "Crédit",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Perte",
        "Loss",
        "Résultat négatif d'un exercice, quand les charges sont supérieures aux produits. La perte diminue les capitaux propres au bilan.",
        {
            sources: [
                {
                    label: "Income statement - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Income_statement",
                },
            ],
            relatedTerms: [
                "Bénéfice",
                "Résultat",
                "Charges (classe 6)",
                "Capitaux propres",
            ],
        },
    ),
    defineTerm(
        "Pièce justificative",
        "Supporting document",
        "Document qui prouve la réalité d'une opération (facture, relevé bancaire, ticket de caisse...). Chaque écriture comptable doit être justifiée par une pièce.",
        {
            sources: [
                {
                    label: "Source document - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Source_document",
                },
            ],
            relatedTerms: [
                "Écriture comptable",
                "Journal",
            ],
            relatedPages: [
                {
                    label: "Les écritures",
                    path: "/documentation/comptabilité/introduction/écritures",
                },
            ],
        },
    ),
    defineTerm(
        "Plan Comptable Général (PCG)",
        "General Chart of Accounts",
        "Référentiel français qui définit la structure commune des comptes pour toutes les organisations. Il organise les comptes en 8 classes numérotées.",
        {
            sources: [
                {
                    label: "Chart of accounts - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Chart_of_accounts",
                },
            ],
            relatedTerms: [
                "Compte",
                "Classe de compte",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Produits (classe 7)",
        "Income (class 7)",
        "Toutes les recettes de l'exercice : ventes, prestations de services, subventions, produits financiers, cotisations. Les comptes de produits sont crédités quand ils augmentent.",
        {
            sources: [
                {
                    label: "Income - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Income",
                },
            ],
            relatedTerms: [
                "Charges (classe 6)",
                "Compte de résultat",
                "Crédit",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Report à nouveau",
        "Retained earnings",
        "Résultat de l'exercice précédent en attente d'affectation (mise en réserve ou distribution aux associés).",
        {
            sources: [
                {
                    label: "Retained earnings - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Retained_earnings",
                },
            ],
            relatedTerms: [
                "Résultat",
                "Réserves",
                "Capitaux propres",
            ],
        },
    ),
    defineTerm(
        "Réserves",
        "Reserves",
        "Bénéfices des années passées qui ont été conservés dans l'entreprise et non distribués aux associés. Font partie des capitaux propres.",
        {
            sources: [
                {
                    label: "Reserve (accounting) - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Reserve_(accounting)",
                },
            ],
            relatedTerms: [
                "Capitaux propres",
                "Bénéfice",
                "Report à nouveau",
            ],
        },
    ),
    defineTerm(
        "Résultat",
        "Net result (profit or loss)",
        "Différence entre les produits et les charges d'un exercice. Positif = bénéfice (ou excédent pour une association). Négatif = perte (ou déficit). Le résultat figure dans les capitaux propres du bilan.",
        {
            sources: [
                {
                    label: "Résultat net - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Résultat_net",
                },
            ],
            relatedTerms: [
                "Bénéfice",
                "Perte",
                "Compte de résultat",
                "Capitaux propres",
            ],
        },
    ),
    defineTerm(
        "Solde",
        "Account balance",
        "Différence entre le total des débits et le total des crédits d'un compte. Un compte est débiteur si les débits sont supérieurs aux crédits, créditeur dans le cas contraire.",
        {
            sources: [
                {
                    label: "Balance (accounting) - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Balance_(accounting)",
                },
            ],
            relatedTerms: [
                "Débit",
                "Crédit",
                "Balance",
            ],
        },
    ),
    defineTerm(
        "Stocks (classe 3)",
        "Inventory (class 3)",
        "Marchandises, matières premières et produits finis en attente de vente ou d'utilisation. Figurent à l'actif circulant du bilan.",
        {
            sources: [
                {
                    label: "Inventory - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Inventory",
                },
            ],
            relatedTerms: [
                "Actif",
                "Bilan",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "Tiers (classe 4)",
        "Third parties (class 4)",
        "Personnes ou organismes avec lesquels l'organisation a des relations financières : clients, fournisseurs, État, organismes sociaux. Le solde indique ce qu'on vous doit ou ce que vous devez.",
        {
            sources: [
                {
                    label: "Plan comptable général (France) - Wikipédia",
                    url: "https://fr.wikipedia.org/wiki/Plan_comptable_général_(France)",
                },
            ],
            relatedTerms: [
                "Comptes d'agents",
                "Actif",
                "Passif",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "TVA collectée (compte 4457)",
        "Output VAT (account 4457)",
        "TVA facturée sur les ventes, que vous devez reverser à l'État. Le compte est crédité quand la TVA collectée augmente.",
        {
            sources: [
                {
                    label: "Value-added tax - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Value-added_tax",
                },
            ],
            relatedTerms: [
                "TVA déductible (compte 4456)",
                "Crédit",
                "Tiers (classe 4)",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
        },
    ),
    defineTerm(
        "TVA déductible (compte 4456)",
        "Input VAT (account 4456)",
        "TVA payée sur les achats, que l'État vous doit ou que vous pouvez déduire de la TVA collectée. Le compte est débité quand la TVA déductible augmente.",
        {
            sources: [
                {
                    label: "Value-added tax - Wikipedia",
                    url: "https://en.wikipedia.org/wiki/Value-added_tax",
                },
            ],
            relatedTerms: [
                "TVA collectée (compte 4457)",
                "Débit",
                "Tiers (classe 4)",
            ],
            relatedPages: [
                {
                    label: "Les comptes",
                    path: "/documentation/comptabilité/introduction/comptes",
                },
            ],
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
            grouped.set(letter, [
                term,
            ])
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
        const translationNormalized = t.englishTranslation.toLowerCase()
        return (
            termNormalized.includes(normalized) ||
            defNormalized.includes(normalized) ||
            translationNormalized.includes(normalized)
        )
    })
}
