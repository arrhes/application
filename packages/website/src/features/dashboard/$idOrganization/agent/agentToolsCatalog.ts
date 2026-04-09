export interface AgentToolDefinition {
    name: string
    labelFr: string
    descriptionFr: string
}

export const agentToolsCatalog: AgentToolDefinition[] = [
    {
        name: "read_all_years",
        labelFr: "Lister les exercices fiscaux",
        descriptionFr:
            "Lister tous les exercices fiscaux de l'organisation. Retourne les identifiants (id), labels, dates de début et fin.",
    },
    { name: "create_one_year", labelFr: "Créer un exercice fiscal", descriptionFr: "Créer un nouvel exercice fiscal." },

    {
        name: "create_one_entry",
        labelFr: "Créer une écriture comptable",
        descriptionFr: "Créer une nouvelle écriture comptable.",
    },
    {
        name: "create_one_entry_from_template",
        labelFr: "Créer une écriture depuis un modèle",
        descriptionFr: "Créer une écriture comptable à partir d'un modèle.",
    },
    {
        name: "read_all_entries",
        labelFr: "Lister les écritures",
        descriptionFr: "Lister toutes les écritures comptables de l'exercice.",
    },
    { name: "read_one_entry", labelFr: "Lire une écriture", descriptionFr: "Lire le détail d'une écriture comptable." },
    {
        name: "update_one_entry",
        labelFr: "Modifier une écriture",
        descriptionFr: "Modifier une écriture comptable existante.",
    },
    { name: "delete_one_entry", labelFr: "Supprimer une écriture", descriptionFr: "Supprimer une écriture comptable." },
    {
        name: "duplicate_one_entry",
        labelFr: "Dupliquer une écriture",
        descriptionFr: "Dupliquer une écriture comptable existante.",
    },
    {
        name: "compute_one_entry",
        labelFr: "Calculer une écriture",
        descriptionFr: "Calculer les totaux d'une écriture comptable.",
    },

    {
        name: "create_one_entry_line",
        labelFr: "Créer une ligne d'écriture",
        descriptionFr: "Créer une nouvelle ligne d'écriture comptable.",
    },
    {
        name: "read_all_entry_lines",
        labelFr: "Lister les lignes d'écriture",
        descriptionFr: "Lister toutes les lignes d'une écriture comptable.",
    },
    {
        name: "read_one_entry_line",
        labelFr: "Lire une ligne d'écriture",
        descriptionFr: "Lire le détail d'une ligne d'écriture.",
    },
    {
        name: "update_one_entry_line",
        labelFr: "Modifier une ligne d'écriture",
        descriptionFr: "Modifier une ligne d'écriture comptable.",
    },
    {
        name: "update_many_entry_lines",
        labelFr: "Modifier plusieurs lignes d'écriture",
        descriptionFr: "Modifier plusieurs lignes d'écriture en une seule opération.",
    },
    {
        name: "delete_one_entry_line",
        labelFr: "Supprimer une ligne d'écriture",
        descriptionFr: "Supprimer une ligne d'écriture comptable.",
    },

    {
        name: "read_all_entry_tags",
        labelFr: "Lister les étiquettes des écritures",
        descriptionFr: "Lister toutes les étiquettes associées aux écritures.",
    },
    {
        name: "add_one_entry_tag",
        labelFr: "Ajouter une étiquette à une écriture",
        descriptionFr: "Ajouter une étiquette à une écriture.",
    },
    {
        name: "remove_one_entry_tag",
        labelFr: "Retirer une étiquette d'une écriture",
        descriptionFr: "Retirer une étiquette d'une écriture.",
    },

    {
        name: "create_one_account",
        labelFr: "Créer un compte",
        descriptionFr: "Créer un nouveau compte dans le plan comptable.",
    },
    {
        name: "read_all_accounts",
        labelFr: "Lister les comptes",
        descriptionFr: "Lister tous les comptes du plan comptable.",
    },
    { name: "read_one_account", labelFr: "Lire un compte", descriptionFr: "Lire le détail d'un compte." },
    {
        name: "update_one_account",
        labelFr: "Modifier un compte",
        descriptionFr: "Modifier un compte du plan comptable.",
    },
    {
        name: "delete_one_account",
        labelFr: "Supprimer un compte",
        descriptionFr: "Supprimer un compte du plan comptable.",
    },

    { name: "create_one_journal", labelFr: "Créer un journal", descriptionFr: "Créer un nouveau journal comptable." },
    {
        name: "read_all_journals",
        labelFr: "Lister les journaux",
        descriptionFr: "Lister tous les journaux comptables.",
    },
    { name: "read_one_journal", labelFr: "Lire un journal", descriptionFr: "Lire le détail d'un journal." },
    { name: "update_one_journal", labelFr: "Modifier un journal", descriptionFr: "Modifier un journal comptable." },
    { name: "delete_one_journal", labelFr: "Supprimer un journal", descriptionFr: "Supprimer un journal comptable." },

    { name: "create_one_tag", labelFr: "Créer une étiquette", descriptionFr: "Créer une nouvelle étiquette." },
    { name: "read_all_tags", labelFr: "Lister les étiquettes", descriptionFr: "Lister toutes les étiquettes." },
    { name: "read_one_tag", labelFr: "Lire une étiquette", descriptionFr: "Lire le détail d'une étiquette." },
    { name: "update_one_tag", labelFr: "Modifier une étiquette", descriptionFr: "Modifier une étiquette." },
    { name: "delete_one_tag", labelFr: "Supprimer une étiquette", descriptionFr: "Supprimer une étiquette." },

    {
        name: "create_one_balance_sheet",
        labelFr: "Créer un poste de bilan",
        descriptionFr: "Créer un nouveau poste de bilan.",
    },
    {
        name: "read_all_balance_sheets",
        labelFr: "Lister les postes de bilan",
        descriptionFr: "Lister tous les postes de bilan.",
    },
    {
        name: "read_one_balance_sheet",
        labelFr: "Lire un poste de bilan",
        descriptionFr: "Lire le détail d'un poste de bilan.",
    },
    {
        name: "update_one_balance_sheet",
        labelFr: "Modifier un poste de bilan",
        descriptionFr: "Modifier un poste de bilan.",
    },
    {
        name: "delete_one_balance_sheet",
        labelFr: "Supprimer un poste de bilan",
        descriptionFr: "Supprimer un poste de bilan.",
    },

    {
        name: "create_one_income_statement",
        labelFr: "Créer un poste du compte de résultat",
        descriptionFr: "Créer un nouveau poste du compte de résultat.",
    },
    {
        name: "read_all_income_statements",
        labelFr: "Lister les postes du compte de résultat",
        descriptionFr: "Lister tous les postes du compte de résultat.",
    },
    {
        name: "read_one_income_statement",
        labelFr: "Lire un poste du compte de résultat",
        descriptionFr: "Lire le détail d'un poste du compte de résultat.",
    },
    {
        name: "update_one_income_statement",
        labelFr: "Modifier un poste du compte de résultat",
        descriptionFr: "Modifier un poste du compte de résultat.",
    },
    {
        name: "delete_one_income_statement",
        labelFr: "Supprimer un poste du compte de résultat",
        descriptionFr: "Supprimer un poste du compte de résultat.",
    },

    { name: "create_one_computation", labelFr: "Créer un calcul", descriptionFr: "Créer un nouveau calcul." },
    { name: "read_all_computations", labelFr: "Lister les calculs", descriptionFr: "Lister tous les calculs." },
    { name: "read_one_computation", labelFr: "Lire un calcul", descriptionFr: "Lire le détail d'un calcul." },
    { name: "update_one_computation", labelFr: "Modifier un calcul", descriptionFr: "Modifier un calcul." },
    { name: "delete_one_computation", labelFr: "Supprimer un calcul", descriptionFr: "Supprimer un calcul." },
    {
        name: "create_one_computation_income_statement",
        labelFr: "Associer un poste à un calcul",
        descriptionFr: "Associer un poste du compte de résultat à un calcul.",
    },
    {
        name: "read_all_computation_income_statements",
        labelFr: "Lister les associations calcul/poste",
        descriptionFr: "Lister les associations compte de résultat / calcul.",
    },
    {
        name: "read_one_computation_income_statement",
        labelFr: "Lire une association calcul/poste",
        descriptionFr: "Lire le détail d'une association.",
    },
    {
        name: "update_one_computation_income_statement",
        labelFr: "Modifier une association calcul/poste",
        descriptionFr: "Modifier une association compte de résultat / calcul.",
    },
    {
        name: "delete_one_computation_income_statement",
        labelFr: "Supprimer une association calcul/poste",
        descriptionFr: "Supprimer une association.",
    },

    { name: "create_one_file", labelFr: "Créer un fichier", descriptionFr: "Créer un nouveau fichier." },
    { name: "read_all_files", labelFr: "Lister les fichiers", descriptionFr: "Lister tous les fichiers." },
    { name: "read_one_file", labelFr: "Lire un fichier", descriptionFr: "Lire le détail d'un fichier." },
    { name: "update_one_file", labelFr: "Modifier un fichier", descriptionFr: "Modifier un fichier." },
    { name: "delete_one_file", labelFr: "Supprimer un fichier", descriptionFr: "Supprimer un fichier." },

    { name: "create_one_folder", labelFr: "Créer un dossier", descriptionFr: "Créer un nouveau dossier." },
    { name: "read_all_folders", labelFr: "Lister les dossiers", descriptionFr: "Lister tous les dossiers." },
    { name: "read_one_folder", labelFr: "Lire un dossier", descriptionFr: "Lire le détail d'un dossier." },
    { name: "update_one_folder", labelFr: "Modifier un dossier", descriptionFr: "Modifier un dossier." },
    { name: "delete_one_folder", labelFr: "Supprimer un dossier", descriptionFr: "Supprimer un dossier." },

    {
        name: "read_all_documents",
        labelFr: "Lister les documents générés",
        descriptionFr: "Lister tous les documents générés.",
    },
    { name: "read_one_document", labelFr: "Lire un document", descriptionFr: "Lire le détail d'un document." },
    {
        name: "generate_balance_sheet_report_document",
        labelFr: "Générer un rapport de bilan",
        descriptionFr: "Générer un rapport de bilan.",
    },
    {
        name: "generate_income_statement_report_document",
        labelFr: "Générer un rapport de résultat",
        descriptionFr: "Générer un rapport du compte de résultat.",
    },

    {
        name: "read_one_year",
        labelFr: "Lire l'exercice courant",
        descriptionFr: "Lire les informations de l'exercice courant.",
    },
    {
        name: "update_one_year",
        labelFr: "Modifier l'exercice",
        descriptionFr: "Modifier les paramètres de l'exercice.",
    },
    { name: "close_year", labelFr: "Clôturer l'exercice", descriptionFr: "Clôturer l'exercice." },
    { name: "open_year", labelFr: "Rouvrir l'exercice", descriptionFr: "Rouvrir l'exercice." },
    { name: "settle_balance_sheet", labelFr: "Lettrer le bilan", descriptionFr: "Lettrer le bilan." },
    {
        name: "settle_income_statement",
        labelFr: "Lettrer le compte de résultat",
        descriptionFr: "Lettrer le compte de résultat.",
    },

    {
        name: "search_documentation",
        labelFr: "Rechercher dans la documentation",
        descriptionFr:
            "Rechercher des informations dans la documentation d'Arrhes (comptabilité, guides et glossaire).",
    },
    {
        name: "process_array",
        labelFr: "Traiter un tableau",
        descriptionFr:
            "Compter, trier, filtrer, extraire, rechercher, sommer ou obtenir des valeurs uniques à partir d'un tableau.",
    },
]

const agentToolsCatalogByName = new Map(agentToolsCatalog.map((tool) => [tool.name, tool]))

export function getAgentToolDefinitionByName(toolName?: string): AgentToolDefinition | undefined {
    if (!toolName) return undefined
    return agentToolsCatalogByName.get(toolName)
}

export function getAgentToolLabel(toolName?: string): string {
    return getAgentToolDefinitionByName(toolName)?.labelFr ?? toolName ?? "outil"
}
