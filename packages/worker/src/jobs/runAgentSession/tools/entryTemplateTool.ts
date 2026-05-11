import { entryTemplateDefinitions, generateId, models } from "@arrhes/application-metadata"
import { toolDefinition } from "@tanstack/ai"
import { and, eq } from "drizzle-orm"
import type { sqlClient } from "#src/clients/sqlClient.js"
import type { ToolResultStore } from "../buildWorkerTools.js"

type DB = ReturnType<typeof sqlClient>

export function buildEntryTemplateTool(parameters: {
    db: DB
    idOrganization: string
    toolResultStore: ToolResultStore
}) {
    const { db, idOrganization, toolResultStore } = parameters

    const templateKeys = entryTemplateDefinitions.map((t) => t.key)

    return toolDefinition({
        name: "apply_entry_template",
        description: `Appliquer un modèle d'écriture comptable prédéfini. Crée automatiquement une écriture complète (entrée + lignes débit/crédit) en une seule opération. Modèles disponibles : ${entryTemplateDefinitions.map((t) => `"${t.key}" (${t.label})`).join(", ")}. Utilise les numéros de compte (ex: "68112") au lieu des identifiants — la résolution est automatique.`,
        inputSchema: {
            type: "object",
            properties: {
                templateKey: {
                    type: "string",
                    enum: templateKeys,
                    description: "La clé du modèle à utiliser.",
                },
                idYear: {
                    type: "string",
                    description: "L'identifiant de l'exercice fiscal.",
                },
                idJournal: {
                    type: "string",
                    description: "L'identifiant du journal (optionnel).",
                },
                idFile: {
                    type: "string",
                    description: "L'identifiant du fichier/pièce justificative (optionnel).",
                },
                date: {
                    type: "string",
                    description: "La date de l'écriture (format ISO).",
                },
                templateInput: {
                    type: "object",
                    description:
                        "Les paramètres spécifiques au modèle. Pour 'amortization' : { assetLabel, originalPrice, currentYear, totalYears, idDotationAccount (numéro de compte ex: '68112'), idAmortizationAccount (numéro de compte ex: '2818') }.",
                },
            },
            required: [
                "templateKey",
                "idYear",
                "date",
                "templateInput",
            ],
        },
    }).server(async (args) => {
        const { templateKey, idYear, idJournal, idFile, date, templateInput } = args as {
            templateKey: string
            idYear: string
            idJournal?: string
            idFile?: string
            date: string
            templateInput: Record<string, unknown>
        }

        const template = entryTemplateDefinitions.find((t) => t.key === templateKey)
        if (!template) {
            return {
                error: `Modèle inconnu : "${templateKey}". Modèles disponibles : ${templateKeys.join(", ")}`,
            }
        }

        // Resolve account numbers to IDs for fields ending with "Account"
        const resolvedInput = {
            ...templateInput,
        }
        const accounts = await db
            .select()
            .from(models.account)
            .where(and(eq(models.account.idOrganization, idOrganization), eq(models.account.idYear, idYear)))

        for (const [key, value] of Object.entries(resolvedInput)) {
            if (key.toLowerCase().includes("account") && typeof value === "string") {
                // Check if the value looks like an account number (not a nanoid)
                const isAccountNumber = /^\d+$/.test(value)
                if (isAccountNumber) {
                    const account = accounts.find((a) => a.number === value)
                    if (!account) {
                        return {
                            error: `Compte "${value}" introuvable dans le plan comptable de cet exercice.`,
                        }
                    }
                    resolvedInput[key] = account.id
                }
            }
        }

        // Run the template's createEntries function
        const result = template.createEntries(resolvedInput)

        // Create entry + lines in a transaction
        const now = new Date().toISOString()
        const createdEntry = await db.transaction(async (tx) => {
            const [entry] = await tx
                .insert(models.entry)
                .values({
                    id: generateId(),
                    idOrganization,
                    idYear,
                    idJournal: idJournal ?? null,
                    idFile: idFile ?? null,
                    label: result.label,
                    date,
                    createdAt: now,
                    lastUpdatedAt: null,
                    createdBy: null,
                    lastUpdatedBy: null,
                } as any)
                .returning()

            if (result.entryLines.length > 0) {
                await tx.insert(models.entryLine).values(
                    result.entryLines.map((line) => ({
                        id: generateId(),
                        idOrganization,
                        idYear,
                        idEntry: entry.id,
                        idAccount: line.idAccount,
                        isComputedForJournalReport: line.isComputedForJournalReport,
                        isComputedForLedgerReport: line.isComputedForLedgerReport,
                        isComputedForBalanceReport: line.isComputedForBalanceReport,
                        isComputedForBalanceSheetReport: line.isComputedForBalanceSheetReport,
                        isComputedForIncomeStatementReport: line.isComputedForIncomeStatementReport,
                        label: line.label,
                        debit: line.debit,
                        credit: line.credit,
                        createdAt: now,
                        lastUpdatedAt: null,
                        createdBy: null,
                        lastUpdatedBy: null,
                    })),
                )
            }

            return entry
        })

        toolResultStore.set("apply_entry_template", createdEntry)
        return {
            entry: createdEntry,
            linesCreated: result.entryLines.length,
            templateUsed: template.label,
        }
    })
}
