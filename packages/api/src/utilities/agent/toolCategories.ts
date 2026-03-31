import {
    // Years (organization-level)
    readAllYearsRouteDefinition,
    createOneYearRouteDefinition,
    // Entries
    createOneEntryRouteDefinition,
    createOneEntryFromTemplateRouteDefinition,
    readAllEntriesRouteDefinition,
    readOneEntryRouteDefinition,
    updateOneEntryRouteDefinition,
    deleteOneEntryRouteDefinition,
    duplicateOneEntryRouteDefinition,
    computeOneEntryRouteDefinition,
    // Entry Lines
    createOneEntryLineRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readOneEntryLineRouteDefinition,
    updateOneEntryLineRouteDefinition,
    updateManyEntryLinesRouteDefinition,
    deleteOneEntryLineRouteDefinition,
    // Entry Tags
    readAllEntryTagsRouteDefinition,
    addOneEntryTagRouteDefinition,
    removeOneEntryTagRouteDefinition,
    // Accounts
    createOneAccountRouteDefinition,
    readAllAccountsRouteDefinition,
    readOneAccountRouteDefinition,
    updateOneAccountRouteDefinition,
    deleteOneAccountRouteDefinition,
    // Journals
    createOneJournalRouteDefinition,
    readAllJournalsRouteDefinition,
    readOneJournalRouteDefinition,
    updateOneJournalRouteDefinition,
    deleteOneJournalRouteDefinition,
    // Tags
    createOneTagRouteDefinition,
    readAllTagsRouteDefinition,
    readOneTagRouteDefinition,
    updateOneTagRouteDefinition,
    deleteOneTagRouteDefinition,
    // Balance Sheets
    createOneBalanceSheetRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
    deleteOneBalanceSheetRouteDefinition,
    // Income Statements
    createOneIncomeStatementRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readOneIncomeStatementRouteDefinition,
    updateOneIncomeStatementRouteDefinition,
    deleteOneIncomeStatementRouteDefinition,
    // Computations
    createOneComputationRouteDefinition,
    readAllComputationsRouteDefinition,
    readOneComputationRouteDefinition,
    updateOneComputationRouteDefinition,
    deleteOneComputationRouteDefinition,
    // Computation Income Statements
    createOneComputationIncomeStatementRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readOneComputationIncomeStatementRouteDefinition,
    updateOneComputationIncomeStatementRouteDefinition,
    deleteOneComputationIncomeStatementRouteDefinition,
    // Files
    createOneFileRouteDefinition,
    readAllFilesRouteDefinition,
    readOneFileRouteDefinition,
    updateOneFileRouteDefinition,
    deleteOneFileRouteDefinition,
    // Folders
    createOneFolderRouteDefinition,
    readAllFoldersRouteDefinition,
    readOneFolderRouteDefinition,
    updateOneFolderRouteDefinition,
    deleteOneFolderRouteDefinition,
    // Reports
    readAllDocumentsRouteDefinition,
    readOneDocumentRouteDefinition,
    generateBalanceSheetReportDocumentRouteDefinition,
    generateIncomeStatementReportDocumentRouteDefinition,
    // Year General
    readOneYearRouteDefinition,
    updateOneYearRouteDefinition,
    closeYearRouteDefinition,
    openYearRouteDefinition,
    settleBalanceSheetRouteDefinition,
    settleIncomeStatementRouteDefinition,
} from "@arrhes/application-metadata"

export interface ToolCategory {
    name: string
    description: string
    routeDefinitions?: ReadonlyArray<{ path: string; schemas: { body: unknown; return: unknown } }>
}

export const toolCategories: ToolCategory[] = [
    {
        name: "years",
        description:
            "Gestion des exercices fiscaux : lister tous les exercices de l'organisation et en creer de nouveaux. Necessaire pour obtenir les identifiants d'exercice (idYear) utilises par tous les autres outils.",
        routeDefinitions: [readAllYearsRouteDefinition, createOneYearRouteDefinition],
    },
    {
        name: "entries",
        description:
            "Gestion des écritures comptables : créer, lire, modifier, supprimer, dupliquer et calculer des écritures.",
        routeDefinitions: [
            createOneEntryRouteDefinition,
            createOneEntryFromTemplateRouteDefinition,
            readAllEntriesRouteDefinition,
            readOneEntryRouteDefinition,
            updateOneEntryRouteDefinition,
            deleteOneEntryRouteDefinition,
            duplicateOneEntryRouteDefinition,
            computeOneEntryRouteDefinition,
        ],
    },
    {
        name: "entryLines",
        description:
            "Gestion des lignes d'écritures comptables : créer, lire, modifier et supprimer des lignes au sein d'une écriture.",
        routeDefinitions: [
            createOneEntryLineRouteDefinition,
            readAllEntryLinesRouteDefinition,
            readOneEntryLineRouteDefinition,
            updateOneEntryLineRouteDefinition,
            updateManyEntryLinesRouteDefinition,
            deleteOneEntryLineRouteDefinition,
        ],
    },
    {
        name: "entryTags",
        description: "Gestion des étiquettes sur les écritures : lire, ajouter et retirer des étiquettes.",
        routeDefinitions: [
            readAllEntryTagsRouteDefinition,
            addOneEntryTagRouteDefinition,
            removeOneEntryTagRouteDefinition,
        ],
    },
    {
        name: "accounts",
        description: "Gestion du plan comptable : créer, lire, modifier et supprimer des comptes du plan comptable.",
        routeDefinitions: [
            createOneAccountRouteDefinition,
            readAllAccountsRouteDefinition,
            readOneAccountRouteDefinition,
            updateOneAccountRouteDefinition,
            deleteOneAccountRouteDefinition,
        ],
    },
    {
        name: "journals",
        description: "Gestion des journaux comptables : créer, lire, modifier et supprimer des journaux.",
        routeDefinitions: [
            createOneJournalRouteDefinition,
            readAllJournalsRouteDefinition,
            readOneJournalRouteDefinition,
            updateOneJournalRouteDefinition,
            deleteOneJournalRouteDefinition,
        ],
    },
    {
        name: "tags",
        description: "Gestion des étiquettes : créer, lire, modifier et supprimer des étiquettes.",
        routeDefinitions: [
            createOneTagRouteDefinition,
            readAllTagsRouteDefinition,
            readOneTagRouteDefinition,
            updateOneTagRouteDefinition,
            deleteOneTagRouteDefinition,
        ],
    },
    {
        name: "balanceSheets",
        description: "Gestion des bilans : créer, lire, modifier et supprimer des postes de bilan.",
        routeDefinitions: [
            createOneBalanceSheetRouteDefinition,
            readAllBalanceSheetsRouteDefinition,
            readOneBalanceSheetRouteDefinition,
            updateOneBalanceSheetRouteDefinition,
            deleteOneBalanceSheetRouteDefinition,
        ],
    },
    {
        name: "incomeStatements",
        description:
            "Gestion des comptes de résultat : créer, lire, modifier et supprimer des postes du compte de résultat.",
        routeDefinitions: [
            createOneIncomeStatementRouteDefinition,
            readAllIncomeStatementsRouteDefinition,
            readOneIncomeStatementRouteDefinition,
            updateOneIncomeStatementRouteDefinition,
            deleteOneIncomeStatementRouteDefinition,
        ],
    },
    {
        name: "computations",
        description:
            "Gestion des calculs et rubriques du compte de résultat : créer, lire, modifier et supprimer des calculs et leurs associations.",
        routeDefinitions: [
            createOneComputationRouteDefinition,
            readAllComputationsRouteDefinition,
            readOneComputationRouteDefinition,
            updateOneComputationRouteDefinition,
            deleteOneComputationRouteDefinition,
            createOneComputationIncomeStatementRouteDefinition,
            readAllComputationIncomeStatementsRouteDefinition,
            readOneComputationIncomeStatementRouteDefinition,
            updateOneComputationIncomeStatementRouteDefinition,
            deleteOneComputationIncomeStatementRouteDefinition,
        ],
    },
    {
        name: "files",
        description: "Gestion des fichiers et pièces justificatives : créer, lire, modifier et supprimer des fichiers.",
        routeDefinitions: [
            createOneFileRouteDefinition,
            readAllFilesRouteDefinition,
            readOneFileRouteDefinition,
            updateOneFileRouteDefinition,
            deleteOneFileRouteDefinition,
        ],
    },
    {
        name: "folders",
        description: "Gestion des dossiers de classement : créer, lire, modifier et supprimer des dossiers.",
        routeDefinitions: [
            createOneFolderRouteDefinition,
            readAllFoldersRouteDefinition,
            readOneFolderRouteDefinition,
            updateOneFolderRouteDefinition,
            deleteOneFolderRouteDefinition,
        ],
    },
    {
        name: "reports",
        description: "Gestion des rapports : lire les documents, générer des rapports de bilan et de résultat.",
        routeDefinitions: [
            readAllDocumentsRouteDefinition,
            readOneDocumentRouteDefinition,
            generateBalanceSheetReportDocumentRouteDefinition,
            generateIncomeStatementReportDocumentRouteDefinition,
        ],
    },
    {
        name: "yearGeneral",
        description:
            "Gestion générale de l'exercice : lire, modifier, ouvrir, clôturer l'exercice, lettrer le bilan et le compte de résultat.",
        routeDefinitions: [
            readOneYearRouteDefinition,
            updateOneYearRouteDefinition,
            closeYearRouteDefinition,
            openYearRouteDefinition,
            settleBalanceSheetRouteDefinition,
            settleIncomeStatementRouteDefinition,
        ],
    },
    {
        name: "documentation",
        description:
            "Recherche dans la documentation d'Arrhes : concepts comptables (partie double, bilan, compte de résultat), plan comptable général (PCG), glossaire, guides d'utilisation, fonctionnement de l'application.",
    },
]
