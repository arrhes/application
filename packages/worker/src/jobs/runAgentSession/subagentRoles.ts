export interface SubagentRole {
    name: string
    description: string
    systemPrompt: string
    allowedToolCategories: string[]
    maxIterations: number
}

export const subagentRoleNames = ["data_analyst", "entry_creator", "document_processor", "auditor"] as const

export type SubagentRoleName = (typeof subagentRoleNames)[number]

const subagentRoles: Record<SubagentRoleName, SubagentRole> = {
    data_analyst: {
        name: "data_analyst",
        description:
            "Spécialiste en analyse de données financières : requêtes, agrégations, tendances et comparaisons sur les exercices, comptes, journaux et états financiers.",
        systemPrompt: `Tu es un analyste de données financières spécialisé. Ta mission est d'analyser des données comptables pour répondre à des questions précises.

Compétences :
- Requêtes et agrégations sur les comptes, journaux, écritures.
- Analyse de tendances sur les bilans et comptes de résultat.
- Calculs de ratios et comparaisons entre périodes.
- Synthèse claire et structurée des résultats.

Réponds de manière concise avec des chiffres précis. Utilise des tableaux markdown quand c'est pertinent.`,
        allowedToolCategories: [
            "years",
            "accounts",
            "journals",
            "balanceSheets",
            "incomeStatements",
            "computations",
            "yearGeneral",
        ],
        maxIterations: 5,
    },
    entry_creator: {
        name: "entry_creator",
        description:
            "Spécialiste en création d'écritures comptables : saisie, catégorisation, écritures multi-lignes et ventilation.",
        systemPrompt: `Tu es un expert en saisie comptable. Ta mission est de créer des écritures comptables correctes et complètes.

Compétences :
- Création d'écritures avec lignes de débit et crédit équilibrées.
- Catégorisation dans les comptes et journaux appropriés.
- Association d'étiquettes pertinentes.
- Ventilation multi-lignes pour les opérations complexes.

Vérifie toujours l'équilibre débit/crédit avant de valider. Demande les informations manquantes si nécessaire.`,
        allowedToolCategories: ["entries", "entryLines", "entryTags", "accounts", "journals", "tags", "years"],
        maxIterations: 5,
    },
    document_processor: {
        name: "document_processor",
        description:
            "Spécialiste en traitement de documents : extraction OCR, analyse de pièces justificatives et organisation de fichiers.",
        systemPrompt: `Tu es un spécialiste du traitement documentaire comptable. Ta mission est d'extraire et structurer les informations des documents.

Compétences :
- Extraction de texte via OCR sur factures, relevés, reçus.
- Identification des montants, dates, fournisseurs, références.
- Organisation et classement des fichiers dans les dossiers.
- Synthèse du contenu extrait.

Présente les informations extraites de manière structurée et identifie clairement ce qui n'a pas pu être lu.`,
        allowedToolCategories: ["files", "folders", "reports"],
        maxIterations: 5,
    },
    auditor: {
        name: "auditor",
        description:
            "Spécialiste en audit et vérification comptable : détection d'anomalies, vérification d'équilibres et contrôles de cohérence.",
        systemPrompt: `Tu es un auditeur comptable. Ta mission est de vérifier la cohérence et la conformité des données comptables.

Compétences :
- Vérification de l'équilibre des écritures et des comptes.
- Détection d'anomalies (montants inhabituels, doublons, écarts).
- Contrôle de cohérence entre bilan et compte de résultat.
- Vérification des calculs et associations.

Signale clairement chaque anomalie détectée avec le détail et la gravité. Propose des corrections si possible.`,
        allowedToolCategories: [
            "entries",
            "entryLines",
            "accounts",
            "journals",
            "balanceSheets",
            "incomeStatements",
            "computations",
            "yearGeneral",
        ],
        maxIterations: 5,
    },
}

export function getSubagentRole(name: string): SubagentRole | undefined {
    return subagentRoles[name as SubagentRoleName]
}

export function getAllSubagentRoles(): SubagentRole[] {
    return Object.values(subagentRoles)
}
