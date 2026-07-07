import type { ToolCategory } from "./toolCategories.js"

export interface AgentSkill {
    name: string
    description: string
    instructions: string
    toolCategories: string[]
}

export const agentSkillNames = [
    "years",
    "entries",
    "accounts",
    "journals",
    "tags",
    "balance_sheets",
    "income_statements",
    "files",
    "data_analysis",
] as const

export type AgentSkillName = (typeof agentSkillNames)[number]

const agentSkills: Record<AgentSkillName, AgentSkill> = {
    years: {
        name: "years",
        description: "Gestion des exercices fiscaux : lister, créer, modifier, clôturer, rouvrir un exercice.",
        instructions: `## Compétence : Exercices fiscaux

Tu peux lister, créer et gérer les exercices fiscaux, ainsi que modifier les paramètres de l'exercice courant (clôture, réouverture, lettrage bilan/résultat).

Règles :
- La clôture d'exercice est une opération critique - prévenir l'utilisateur avant d'agir.
- Toujours appeler read_all_years en début de conversation si aucun exercice n'est pré-sélectionné.`,
        toolCategories: [
            "years",
            "yearGeneral",
        ],
    },
    entries: {
        name: "entries",
        description:
            "Gestion des écritures comptables et de leurs lignes : création, modification, suppression, duplication, étiquetage.",
        instructions: `## Compétence : Écritures comptables

Tu peux créer, modifier, supprimer et dupliquer des écritures comptables, gérer leurs lignes (débit/crédit) et leurs étiquettes.

Règles critiques :
- TOUJOURS vérifier les doublons avant de créer une écriture (read_all_entries + process_array filter par date ET label).
- Après avoir créé une écriture, créer IMMÉDIATEMENT au moins deux lignes (débit + crédit) avant toute autre action.
- Pour create_one_entry_line, fournir uniquement : idYear, idEntry, idAccount, et optionnellement label, debit, credit.
- Vérifier l'équilibre débit/crédit avant de valider.
- Ne JAMAIS créer toutes les écritures d'abord pour ajouter les lignes ensuite.`,
        toolCategories: [
            "entries",
            "entryLines",
            "entryTags",
        ],
    },
    accounts: {
        name: "accounts",
        description: "Gestion du plan comptable : créer, lire, modifier et supprimer des comptes.",
        instructions: `## Compétence : Plan comptable

Tu peux gérer les comptes du plan comptable de l'organisation.

Règles :
- Respecter la nomenclature du Plan Comptable Général (PCG) pour les numéros de compte.
- Ne pas supprimer un compte s'il est utilisé par des écritures existantes.`,
        toolCategories: [
            "accounts",
        ],
    },
    journals: {
        name: "journals",
        description: "Gestion des journaux comptables : créer, lire, modifier et supprimer des journaux.",
        instructions: `## Compétence : Journaux comptables

Tu peux gérer les journaux comptables de l'organisation (achats, ventes, banque, opérations diverses, etc.).

Règles :
- Ne pas supprimer un journal s'il est utilisé par des écritures existantes.
- Chaque journal doit avoir un code unique et un libellé clair.`,
        toolCategories: [
            "journals",
        ],
    },
    tags: {
        name: "tags",
        description:
            "Gestion des étiquettes : créer, lire, modifier et supprimer des étiquettes pour classer les écritures.",
        instructions: `## Compétence : Étiquettes

Tu peux gérer les étiquettes utilisées pour classer et catégoriser les écritures comptables.

Règles :
- Les étiquettes servent à organiser les écritures par projet, catégorie ou autre critère transversal.`,
        toolCategories: [
            "tags",
        ],
    },
    balance_sheets: {
        name: "balance_sheets",
        description: "Gestion des bilans : créer, lire, modifier et supprimer des postes de bilan, lettrage du bilan.",
        instructions: `## Compétence : Bilans

Tu peux gérer les postes de bilan (actif/passif) et générer des rapports de bilan.

Règles :
- Vérifier la cohérence actif/passif du bilan.
- Le lettrage du bilan est une opération critique.`,
        toolCategories: [
            "balanceSheets",
        ],
    },
    income_statements: {
        name: "income_statements",
        description:
            "Gestion des comptes de résultat, calculs et rubriques : postes du compte de résultat, associations aux calculs, génération de rapports.",
        instructions: `## Compétence : Comptes de résultat et calculs

Tu peux gérer les postes du compte de résultat, les calculs/rubriques et leurs associations, et générer des rapports.

Règles :
- Les calculs/rubriques doivent être correctement associés aux postes du compte de résultat.
- Vérifier la cohérence entre bilan et compte de résultat.`,
        toolCategories: [
            "incomeStatements",
            "computations",
            "reports",
        ],
    },
    files: {
        name: "files",
        description:
            "Gestion des fichiers, dossiers et documents : import, organisation, lecture, suppression, traitement OCR.",
        instructions: `## Compétence : Fichiers et documents

Tu peux gérer les fichiers et dossiers de l'organisation, les pièces justificatives et les documents générés.

Règles :
- Organiser les fichiers dans des dossiers appropriés.
- Identifier clairement le contenu extrait par OCR et signaler ce qui n'a pas pu être lu.
- Quand tu crées une écriture à partir d'un fichier importé, utiliser le paramètre idFile pour associer le fichier à l'écriture.`,
        toolCategories: [
            "files",
            "folders",
        ],
    },
    data_analysis: {
        name: "data_analysis",
        description:
            "Analyse de données financières : requêtes, agrégations, tendances, comparaisons, ratios sur les données comptables via process_array.",
        instructions: `## Compétence : Analyse de données

Tu peux analyser les données comptables : requêtes, agrégations, tendances et comparaisons.

Règles :
- Toujours utiliser process_array pour compter, trier, filtrer ou calculer - ne jamais le faire manuellement.
- Présenter les résultats avec des chiffres précis et des tableaux markdown quand c'est pertinent.
- Utiliser sort_and_slice au lieu de sort + slice séparés.`,
        toolCategories: [],
    },
}

export function getAgentSkill(name: string): AgentSkill | undefined {
    return agentSkills[name as AgentSkillName]
}

export function getAgentSkills(names: string[]): AgentSkill[] {
    return names.map((n) => agentSkills[n as AgentSkillName]).filter(Boolean)
}

/**
 * Collect unique tool category names from a set of skills.
 */
export function getToolCategoriesFromSkills(skills: AgentSkill[], allCategories: ToolCategory[]): ToolCategory[] {
    const categoryNames = new Set(skills.flatMap((s) => s.toolCategories))
    return allCategories.filter((c) => categoryNames.has(c.name))
}

/**
 * Build the skills section of a subagent's system prompt.
 */
export function buildSkillInstructions(skills: AgentSkill[]): string {
    if (skills.length === 0) return ""
    return skills.map((s) => s.instructions).join("\n\n")
}
