import { type AccountEntry, accountEntries, getAccount } from "../accounts/accountsData.js"
import { getExampleJournalEntry } from "../accounts/components/accountUtilities.js"

export interface ScenarioEntry {
    slug: string
    title: string
    description: string
    exampleText: string
    primaryAccountNumber: string
    primaryAccountLabel: string
    journalRows: string[][]
    accountNumbers: string[]
}

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
}

function toSlug(text: string): string {
    return normalize(text)
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
}

function shorten(text: string, maxLength = 72): string {
    if (text.length <= maxLength) return text
    return `${text.slice(0, maxLength).trim()}...`
}

function unique(values: string[]): string[] {
    return Array.from(new Set(values))
}

function removeTrailingPunctuation(text: string): string {
    return text.trim().replace(/[.!?]+$/g, "")
}


function defineScenario(entry: AccountEntry, exampleText: string, index: number): ScenarioEntry {
    const journalEntry = getExampleJournalEntry(entry, exampleText)
    const rowAccountNumbers = journalEntry.rows.map((row) => row[0]).filter(Boolean)
    const accountNumbers = unique([entry.number, ...rowAccountNumbers])
    const slug = `${entry.slug}-${index + 1}-${toSlug(exampleText).slice(0, 42)}`

    return {
        slug,
        title: shorten(exampleText),
        description: removeTrailingPunctuation(exampleText),
        exampleText,
        primaryAccountNumber: entry.number,
        primaryAccountLabel: entry.label,
        journalRows: journalEntry.rows,
        accountNumbers,
    }
}

export const scenarioEntries: ScenarioEntry[] = accountEntries.flatMap((entry) =>
    (entry.examples ?? []).map((exampleText, index) => defineScenario(entry, exampleText, index)),
)

export function getScenarioBySlug(slug: string): ScenarioEntry | undefined {
    return scenarioEntries.find((entry) => entry.slug === slug)
}

export function getScenariosByAccountNumber(accountNumber: string): ScenarioEntry[] {
    return scenarioEntries.filter((entry) => entry.accountNumbers.includes(accountNumber))
}

export function getScenarioAccounts(entry: ScenarioEntry): AccountEntry[] {
    return entry.accountNumbers
        .map((number) => getAccount(number))
        .filter((account): account is AccountEntry => Boolean(account))
}

export function searchScenarios(query: string): ScenarioEntry[] {
    if (!query.trim()) return scenarioEntries

    const normalizedQuery = normalize(query)

    return scenarioEntries.filter((entry) => {
        const account = getAccount(entry.primaryAccountNumber)
        const titleMatch = normalize(entry.title).includes(normalizedQuery)
        const exampleMatch = normalize(entry.exampleText).includes(normalizedQuery)
        const accountNumberMatch = entry.primaryAccountNumber.includes(normalizedQuery)
        const accountLabelMatch = normalize(entry.primaryAccountLabel).includes(normalizedQuery)
        const relatedAccountLabelMatch = normalize(
            entry.accountNumbers
                .map((number) => getAccount(number)?.label ?? "")
                .join(" "),
        ).includes(normalizedQuery)

        return (
            titleMatch ||
            exampleMatch ||
            accountNumberMatch ||
            accountLabelMatch ||
            relatedAccountLabelMatch ||
            normalize(account?.description ?? "").includes(normalizedQuery)
        )
    })
}
