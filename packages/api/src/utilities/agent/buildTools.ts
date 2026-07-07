import type { JSONSchema } from "@tanstack/ai"
import { toolDefinition } from "@tanstack/ai"
import { toJsonSchema } from "@valibot/to-json-schema"
import type * as v from "valibot"
import type { ToolCategory } from "./toolCategories.js"
import { getCachedYearData, type YearDataCache } from "./yearDataCache.js"

// Tool descriptions in French, keyed by route path suffix
const toolDescriptions: Record<string, string> = {
    // Years
    "read-all-years":
        "Lister tous les exercices fiscaux de l'organisation. Retourne les identifiants (id), labels, dates de debut et fin.",
    "create-one-year": "Creer un nouvel exercice fiscal.",
    // Entries
    "create-one-entry": "Creer une nouvelle ecriture comptable.",
    "create-one-entry-from-template": "Creer une ecriture comptable a partir d'un modele.",
    "read-all-entries": "Lister toutes les ecritures comptables de l'exercice.",
    "read-one-entry": "Lire le detail d'une ecriture comptable.",
    "update-one-entry": "Modifier une ecriture comptable existante.",
    "delete-one-entry": "Supprimer une ecriture comptable.",
    "duplicate-one-entry": "Dupliquer une ecriture comptable existante.",
    "compute-one-entry": "Calculer les totaux d'une ecriture comptable.",
    // Entry Lines
    "create-one-entry-line": "Creer une nouvelle ligne d'ecriture comptable.",
    "read-all-entry-lines": "Lister toutes les lignes d'une ecriture comptable.",
    "read-one-entry-line": "Lire le detail d'une ligne d'ecriture.",
    "update-one-entry-line": "Modifier une ligne d'ecriture comptable.",
    "update-many-entry-lines": "Modifier plusieurs lignes d'ecriture en une seule operation.",
    "delete-one-entry-line": "Supprimer une ligne d'ecriture comptable.",
    // Entry Tags
    "read-all-entry-tags": "Lister toutes les etiquettes associees aux ecritures.",
    "add-one-entry-tag": "Ajouter une etiquette a une ecriture.",
    "remove-one-entry-tag": "Retirer une etiquette d'une ecriture.",
    // Accounts
    "create-one-account": "Creer un nouveau compte dans le plan comptable.",
    "read-all-accounts": "Lister tous les comptes du plan comptable.",
    "read-one-account": "Lire le detail d'un compte.",
    "update-one-account": "Modifier un compte du plan comptable.",
    "delete-one-account": "Supprimer un compte du plan comptable.",
    // Journals
    "create-one-journal": "Creer un nouveau journal comptable.",
    "read-all-journals": "Lister tous les journaux comptables.",
    "read-one-journal": "Lire le detail d'un journal.",
    "update-one-journal": "Modifier un journal comptable.",
    "delete-one-journal": "Supprimer un journal comptable.",
    // Tags
    "create-one-tag": "Creer une nouvelle etiquette.",
    "read-all-tags": "Lister toutes les etiquettes.",
    "read-one-tag": "Lire le detail d'une etiquette.",
    "update-one-tag": "Modifier une etiquette.",
    "delete-one-tag": "Supprimer une etiquette.",
    // Balance Sheets
    "create-one-balance-sheet": "Creer un nouveau poste de bilan.",
    "read-all-balance-sheets": "Lister tous les postes de bilan.",
    "read-one-balance-sheet": "Lire le detail d'un poste de bilan.",
    "update-one-balance-sheet": "Modifier un poste de bilan.",
    "delete-one-balance-sheet": "Supprimer un poste de bilan.",
    // Income Statements
    "create-one-income-statement": "Creer un nouveau poste du compte de resultat.",
    "read-all-income-statements": "Lister tous les postes du compte de resultat.",
    "read-one-income-statement": "Lire le detail d'un poste du compte de resultat.",
    "update-one-income-statement": "Modifier un poste du compte de resultat.",
    "delete-one-income-statement": "Supprimer un poste du compte de resultat.",
    // Computations
    "create-one-computation": "Creer un nouveau calcul.",
    "read-all-computations": "Lister tous les calculs.",
    "read-one-computation": "Lire le detail d'un calcul.",
    "update-one-computation": "Modifier un calcul.",
    "delete-one-computation": "Supprimer un calcul.",
    "create-one-computation-income-statement": "Associer un poste du compte de resultat a un calcul.",
    "read-all-computation-income-statements": "Lister les associations compte de resultat / calcul.",
    "read-one-computation-income-statement": "Lire le detail d'une association.",
    "update-one-computation-income-statement": "Modifier une association compte de resultat / calcul.",
    "delete-one-computation-income-statement": "Supprimer une association.",
    // Files
    "create-one-file": "Creer un nouveau fichier.",
    "read-all-files": "Lister tous les fichiers.",
    "read-one-file": "Lire le detail d'un fichier.",
    "update-one-file": "Modifier un fichier.",
    "delete-one-file": "Supprimer un fichier.",
    // Folders
    "create-one-folder": "Creer un nouveau dossier.",
    "read-all-folders": "Lister tous les dossiers.",
    "read-one-folder": "Lire le detail d'un dossier.",
    "update-one-folder": "Modifier un dossier.",
    "delete-one-folder": "Supprimer un dossier.",
    // Reports
    "read-all-documents": "Lister tous les documents generes.",
    "read-one-document": "Lire le detail d'un document.",
    "generate-balance-sheet-report-document": "Generer un rapport de bilan.",
    "generate-income-statement-report-document": "Generer un rapport du compte de resultat.",
    // Year General
    "read-one-year": "Lire les informations de l'exercice courant.",
    "update-one-year": "Modifier les parametres de l'exercice.",
    "close-year": "Cloturer l'exercice.",
    "open-year": "Rouvrir l'exercice.",
    "settle-balance-sheet": "Lettrer le bilan.",
    "settle-income-statement": "Lettrer le compte de resultat.",
    // Signed URLs (excluded from agent - file upload/download is not useful for LLM)
}

/**
 * Extract a tool name from a route path.
 * e.g. "/auth/create-one-tag" -> "create_one_tag"
 */
function routePathToToolName(path: string): string {
    const suffix = path.split("/").pop() ?? path
    return suffix.replace(/-/g, "_")
}

/**
 * Recursively unwrap Valibot wrapper schemas that `@valibot/to-json-schema@1.2.0`
 * cannot handle (non_nullable, non_nullish, non_optional).
 * These wrappers have a `wrapped` property containing the inner schema.
 *
 * Also fixes `pipe` schemas that contain multiple `kind: "schema"` items
 * (e.g. `v.pipe(v.string(), v.custom(...))`) - `v.custom()` has `kind: "schema"`
 * in Valibot, making the pipe incompatible with `toJsonSchema`. We strip extra
 * schema-kind items, keeping only the first schema + validation/transformation actions.
 */
function unwrapSchema(schema: any): any {
    if (!schema || typeof schema !== "object") return schema

    const unsupportedWrappers = new Set([
        "non_nullable",
        "non_nullish",
        "non_optional",
    ])

    // Unwrap wrapper schemas
    if (unsupportedWrappers.has(schema.type) && schema.wrapped) {
        return unwrapSchema(schema.wrapped)
    }

    // Fix pipe schemas with multiple schema-kind items (e.g. v.pipe(v.string(), v.custom(...)))
    // @valibot/to-json-schema@1.2.0 throws "A pipe with multiple schemas cannot be converted"
    // when it encounters more than one item with kind === "schema" in the pipe array.
    // v.custom() has kind: "schema" (not "validation"), so we strip it.
    // NOTE: v.pipe() sets the schema's `type` to the first item's type (e.g. "string"),
    // not "pipe" - so we check for the `pipe` array property directly.
    if (Array.isArray(schema.pipe)) {
        let foundFirstSchema = false
        const filteredPipe = schema.pipe.filter((item: any) => {
            if (item.kind === "schema") {
                if (foundFirstSchema) return false // strip extra schema-kind items
                foundFirstSchema = true
            }
            return true
        })
        if (filteredPipe.length !== schema.pipe.length) {
            return unwrapSchema({
                ...schema,
                pipe: filteredPipe,
            })
        }
    }

    // For object schemas, recursively unwrap entries
    if (schema.type === "object" && schema.entries) {
        const newEntries: Record<string, any> = {}
        for (const [key, value] of Object.entries(schema.entries)) {
            newEntries[key] = unwrapSchema(value)
        }
        return {
            ...schema,
            entries: newEntries,
        }
    }

    // For array/set schemas with an item sub-schema
    if (schema.item) {
        return {
            ...schema,
            item: unwrapSchema(schema.item),
        }
    }

    // For union/intersect schemas with options
    if (schema.options && Array.isArray(schema.options)) {
        return {
            ...schema,
            options: schema.options.map(unwrapSchema),
        }
    }

    // For optional/nullable/nullish schemas
    if (schema.wrapped) {
        return {
            ...schema,
            wrapped: unwrapSchema(schema.wrapped),
        }
    }

    return schema
}

/**
 * Convert a Valibot body schema to a JSON Schema, removing idOrganization
 * (auto-injected by the agent and should not be provided by the LLM).
 */
function bodySchemaToJsonSchema(bodySchema: v.ObjectSchema<v.ObjectEntries, undefined>): JSONSchema {
    // Unwrap schemas unsupported by @valibot/to-json-schema@1.2.0
    const unwrappedSchema = unwrapSchema(bodySchema)
    const jsonSchema = toJsonSchema(unwrappedSchema) as {
        type: string
        properties?: Record<string, unknown>
        required?: string[]
    }

    // Remove auto-injected fields
    const fieldsToRemove = [
        "idOrganization",
    ]

    if (jsonSchema.properties) {
        for (const field of fieldsToRemove) {
            delete jsonSchema.properties[field]
        }
    }

    if (jsonSchema.required) {
        jsonSchema.required = jsonSchema.required.filter((r) => !fieldsToRemove.includes(r))
    }

    return jsonSchema as JSONSchema
}

// Paths to exclude from agent tools (signed URLs are not useful for LLM)
const excludedPathSuffixes = [
    "generate-file-get-signed-url",
    "generate-file-put-signed-url",
    "generate-document-get-signed-url",
    "delete-one-year", // Too dangerous for agent
]

/**
 * A store that captures tool results during a single chat() execution.
 * Keyed by tool name (e.g. "read_all_entries"), stores the last result
 * from each tool so `process_array` can reference them without the LLM
 * having to re-send the entire array in its arguments.
 */
export type ToolResultStore = Map<string, unknown>

export function buildToolsFromCategories(parameters: {
    categories: ToolCategory[]
    executeRoute: (path: string, body: Record<string, unknown>) => Promise<unknown>
    yearDataCache?: YearDataCache
    toolResultStore?: ToolResultStore
}) {
    const tools = []

    for (const category of parameters.categories) {
        if (!category.routeDefinitions) continue
        for (const routeDef of category.routeDefinitions) {
            const path = routeDef.path as string
            const pathSuffix = path.split("/").pop() ?? ""

            // Skip excluded routes
            if (excludedPathSuffixes.includes(pathSuffix)) {
                continue
            }

            const toolName = routePathToToolName(path)
            const description = toolDescriptions[pathSuffix] ?? `Executer l'action ${pathSuffix.replace(/-/g, " ")}.`
            const inputSchema = bodySchemaToJsonSchema(
                routeDef.schemas.body as v.ObjectSchema<v.ObjectEntries, undefined>,
            )

            const def = toolDefinition({
                name: toolName,
                description,
                inputSchema,
            })

            const serverTool = def.server(async (args) => {
                const body = args as Record<string, unknown>

                // Check year data cache for read-all tools
                let result: unknown
                if (parameters.yearDataCache) {
                    const cached = getCachedYearData({
                        cache: parameters.yearDataCache,
                        path,
                        body,
                    })
                    if (cached !== undefined) {
                        result = cached
                    }
                }

                if (result === undefined) {
                    result = await parameters.executeRoute(path, body)
                }

                // Store result so process_array can reference it by tool name
                if (parameters.toolResultStore) {
                    parameters.toolResultStore.set(toolName, result)
                }

                return result
            })

            tools.push(serverTool)
        }
    }

    return tools
}
