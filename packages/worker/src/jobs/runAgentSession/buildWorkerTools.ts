import type { JSONSchema } from "@tanstack/ai"
import { toolDefinition } from "@tanstack/ai"
import { toJsonSchema } from "@valibot/to-json-schema"
import type * as v from "valibot"
import type { sqlClient } from "#src/clients/sqlClient.js"
import type { ToolCategory } from "./toolCategories.js"

type DB = ReturnType<typeof sqlClient>
export type ToolResultStore = Map<string, unknown>

// Tool descriptions - same as API
const toolDescriptions: Record<string, string> = {
    "read-all-years": "Lister tous les exercices fiscaux de l'organisation.",
    "create-one-year": "Creer un nouvel exercice fiscal.",
    "create-one-entry": "Creer une nouvelle ecriture comptable.",
    "create-one-entry-from-template": "Creer une ecriture comptable a partir d'un modele.",
    "read-all-entries": "Lister toutes les ecritures comptables de l'exercice.",
    "read-one-entry": "Lire le detail d'une ecriture comptable.",
    "update-one-entry": "Modifier une ecriture comptable existante.",
    "delete-one-entry": "Supprimer une ecriture comptable.",
    "duplicate-one-entry": "Dupliquer une ecriture comptable existante.",
    "compute-one-entry": "Calculer les totaux d'une ecriture comptable.",
    "create-one-entry-line": "Creer une nouvelle ligne d'ecriture comptable.",
    "read-all-entry-lines": "Lister toutes les lignes d'une ecriture comptable.",
    "read-one-entry-line": "Lire le detail d'une ligne d'ecriture.",
    "update-one-entry-line": "Modifier une ligne d'ecriture comptable.",
    "update-many-entry-lines": "Modifier plusieurs lignes d'ecriture en une seule operation.",
    "delete-one-entry-line": "Supprimer une ligne d'ecriture comptable.",
    "read-all-entry-tags": "Lister toutes les etiquettes associees aux ecritures.",
    "add-one-entry-tag": "Ajouter une etiquette a une ecriture.",
    "remove-one-entry-tag": "Retirer une etiquette d'une ecriture.",
    "create-one-account": "Creer un nouveau compte dans le plan comptable.",
    "read-all-accounts": "Lister tous les comptes du plan comptable.",
    "read-one-account": "Lire le detail d'un compte.",
    "update-one-account": "Modifier un compte du plan comptable.",
    "delete-one-account": "Supprimer un compte du plan comptable.",
    "create-one-journal": "Creer un nouveau journal comptable.",
    "read-all-journals": "Lister tous les journaux comptables.",
    "read-one-journal": "Lire le detail d'un journal.",
    "update-one-journal": "Modifier un journal comptable.",
    "delete-one-journal": "Supprimer un journal comptable.",
    "create-one-tag": "Creer une nouvelle etiquette.",
    "read-all-tags": "Lister toutes les etiquettes.",
    "read-one-tag": "Lire le detail d'une etiquette.",
    "update-one-tag": "Modifier une etiquette.",
    "delete-one-tag": "Supprimer une etiquette.",
    "create-one-balance-sheet": "Creer un nouveau poste de bilan.",
    "read-all-balance-sheets": "Lister tous les postes de bilan.",
    "read-one-balance-sheet": "Lire le detail d'un poste de bilan.",
    "update-one-balance-sheet": "Modifier un poste de bilan.",
    "delete-one-balance-sheet": "Supprimer un poste de bilan.",
    "create-one-income-statement": "Creer un nouveau poste du compte de resultat.",
    "read-all-income-statements": "Lister tous les postes du compte de resultat.",
    "read-one-income-statement": "Lire le detail d'un poste du compte de resultat.",
    "update-one-income-statement": "Modifier un poste du compte de resultat.",
    "delete-one-income-statement": "Supprimer un poste du compte de resultat.",
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
    "create-one-file": "Creer un nouveau fichier.",
    "read-all-files": "Lister tous les fichiers.",
    "read-one-file": "Lire le detail d'un fichier.",
    "update-one-file": "Modifier un fichier.",
    "delete-one-file": "Supprimer un fichier.",
    "create-one-folder": "Creer un nouveau dossier.",
    "read-all-folders": "Lister tous les dossiers.",
    "read-one-folder": "Lire le detail d'un dossier.",
    "update-one-folder": "Modifier un dossier.",
    "delete-one-folder": "Supprimer un dossier.",
    "read-all-documents": "Lister tous les documents generes.",
    "read-one-document": "Lire le detail d'un document.",
    "generate-balance-sheet-report-document": "Generer un rapport de bilan.",
    "generate-income-statement-report-document": "Generer un rapport du compte de resultat.",
    "read-one-year": "Lire les informations de l'exercice courant.",
    "update-one-year": "Modifier les parametres de l'exercice.",
    "close-year": "Cloturer l'exercice.",
    "open-year": "Rouvrir l'exercice.",
    "settle-balance-sheet": "Lettrer le bilan.",
    "settle-income-statement": "Lettrer le compte de resultat.",
}

function unwrapSchema(schema: any): any {
    if (!schema || typeof schema !== "object") return schema
    const unsupportedWrappers = new Set([
        "non_nullable",
        "non_nullish",
        "non_optional",
    ])
    if (unsupportedWrappers.has(schema.type) && schema.wrapped) return unwrapSchema(schema.wrapped)
    if (Array.isArray(schema.pipe)) {
        let foundFirstSchema = false
        const filteredPipe = schema.pipe.filter((item: any) => {
            if (item.kind === "schema") {
                if (foundFirstSchema) return false
                foundFirstSchema = true
            }
            return true
        })
        if (filteredPipe.length !== schema.pipe.length)
            return unwrapSchema({
                ...schema,
                pipe: filteredPipe,
            })
    }
    if (schema.type === "object" && schema.entries) {
        const newEntries: Record<string, any> = {}
        for (const [key, value] of Object.entries(schema.entries)) newEntries[key] = unwrapSchema(value)
        return {
            ...schema,
            entries: newEntries,
        }
    }
    if (schema.item)
        return {
            ...schema,
            item: unwrapSchema(schema.item),
        }
    if (schema.options && Array.isArray(schema.options))
        return {
            ...schema,
            options: schema.options.map(unwrapSchema),
        }
    if (schema.wrapped)
        return {
            ...schema,
            wrapped: unwrapSchema(schema.wrapped),
        }
    return schema
}

// Per-route fields the LLM should never see (handled by server-side defaults)
const hiddenFieldsByRoute: Record<string, string[]> = {
    "create-one-entry-line": [
        "isComputedForJournalReport",
        "isComputedForLedgerReport",
        "isComputedForBalanceReport",
        "isComputedForBalanceSheetReport",
        "isComputedForIncomeStatementReport",
    ],
}

function bodySchemaToJsonSchema(
    bodySchema: v.ObjectSchema<v.ObjectEntries, undefined>,
    pathSuffix?: string,
): JSONSchema {
    const unwrappedSchema = unwrapSchema(bodySchema)
    const jsonSchema = toJsonSchema(unwrappedSchema) as {
        type: string
        properties?: Record<string, unknown>
        required?: string[]
    }
    const fieldsToRemove = [
        "idOrganization",
        ...(pathSuffix ? (hiddenFieldsByRoute[pathSuffix] ?? []) : []),
    ]
    if (jsonSchema.properties) {
        for (const field of fieldsToRemove) delete jsonSchema.properties[field]
    }
    if (jsonSchema.required) jsonSchema.required = jsonSchema.required.filter((r) => !fieldsToRemove.includes(r))
    return jsonSchema as JSONSchema
}

export function buildWorkerTools(parameters: {
    categories: ToolCategory[]
    db: DB
    idOrganization: string
    executeRoute: (pathSuffix: string, body: Record<string, unknown>) => Promise<unknown>
    toolResultStore: ToolResultStore
}) {
    const tools = []

    for (const category of parameters.categories) {
        if (!category.routeDefinitions) continue
        for (const routeDef of category.routeDefinitions) {
            const name = routeDef.name as string
            if (!name) continue

            const description = toolDescriptions[name] ?? `Executer l'action ${name.replace(/-/g, " ")}.`
            const inputSchema = bodySchemaToJsonSchema(
                routeDef.schemas.body as v.ObjectSchema<v.ObjectEntries, undefined>,
                name,
            )

            const def = toolDefinition({
                name,
                description,
                inputSchema,
            })
            const serverTool = def.server(async (args) => {
                const body = args as Record<string, unknown>
                const result = await parameters.executeRoute(name, {
                    ...body,
                    idOrganization: parameters.idOrganization,
                })
                parameters.toolResultStore.set(name, result)
                return result
            })
            tools.push(serverTool)
        }
    }

    return tools
}
