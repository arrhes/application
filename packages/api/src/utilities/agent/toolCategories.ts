import {
    addOneEntryTagRouteDefinition,
    closeYearRouteDefinition,
    computeOneEntryRouteDefinition,
    // Accounts
    createOneAccountRouteDefinition,
    // Balance Sheets
    createOneBalanceSheetRouteDefinition,
    // Computation Income Statements
    createOneComputationIncomeStatementRouteDefinition,
    // Computations
    createOneComputationRouteDefinition,
    createOneEntryFromTemplateRouteDefinition,
    // Entry Lines
    createOneEntryLineRouteDefinition,
    // Entries
    createOneEntryRouteDefinition,
    // Files
    createOneFileRouteDefinition,
    // Folders
    createOneFolderRouteDefinition,
    // Income Statements
    createOneIncomeStatementRouteDefinition,
    // Journals
    createOneJournalRouteDefinition,
    // Tags
    createOneTagRouteDefinition,
    createOneYearRouteDefinition,
    deleteOneAccountRouteDefinition,
    deleteOneBalanceSheetRouteDefinition,
    deleteOneComputationIncomeStatementRouteDefinition,
    deleteOneComputationRouteDefinition,
    deleteOneEntryLineRouteDefinition,
    deleteOneEntryRouteDefinition,
    deleteOneFileRouteDefinition,
    deleteOneFolderRouteDefinition,
    deleteOneIncomeStatementRouteDefinition,
    deleteOneJournalRouteDefinition,
    deleteOneTagRouteDefinition,
    duplicateOneEntryRouteDefinition,
    generateBalanceSheetXmlRouteDefinition,
    generateIncomeStatementXmlRouteDefinition,
    openYearRouteDefinition,
    readAllAccountsRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    // Entry Tags
    readAllEntryTagsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllTagsRouteDefinition,
    // Years (organization-level)
    readAllYearsRouteDefinition,
    readOneAccountRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    readOneComputationIncomeStatementRouteDefinition,
    readOneComputationRouteDefinition,
    readOneEntryLineRouteDefinition,
    readOneEntryRouteDefinition,
    readOneFileRouteDefinition,
    readOneFolderRouteDefinition,
    readOneIncomeStatementRouteDefinition,
    readOneJournalRouteDefinition,
    readOneTagRouteDefinition,
    // Year General
    readOneYearRouteDefinition,
    removeOneEntryTagRouteDefinition,
    settleBalanceSheetRouteDefinition,
    settleIncomeStatementRouteDefinition,
    updateManyEntryLinesRouteDefinition,
    updateOneAccountRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
    updateOneComputationIncomeStatementRouteDefinition,
    updateOneComputationRouteDefinition,
    updateOneEntryLineRouteDefinition,
    updateOneEntryRouteDefinition,
    updateOneFileRouteDefinition,
    updateOneFolderRouteDefinition,
    updateOneIncomeStatementRouteDefinition,
    updateOneJournalRouteDefinition,
    updateOneTagRouteDefinition,
    updateOneYearRouteDefinition,
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
        description: "Gestion des rapports : générer des rapports de bilan et de résultat.",
        routeDefinitions: [generateBalanceSheetXmlRouteDefinition, generateIncomeStatementXmlRouteDefinition],
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
            "Recherche dans la documentation d'Arrhes : concepts comptables généraux (partie double, bilan, compte de résultat, plan comptable général), glossaire des termes comptables, guides d'utilisation du dashboard et de l'assistant IA, documentation de l'API, et modes d'emploi pour toutes les fonctionnalités de l'application.",
    },
]
