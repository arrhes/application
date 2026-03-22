import type { AccountEntry } from "../accountsData.js"

export function extractAmount(text: string): string | null {
    const match = text.match(/([\d\s]+(?:\.\d+)?)\s*€/)
    if (!match) return null
    const raw = match[1].trim().replace(/\s/g, " ")
    return `${raw},00`
}

export function formatAmount(amount: string | null): string {
    return amount ?? "X"
}

export function getExampleJournalEntry(entry: AccountEntry, exampleText: string): { rows: string[][] } {
    const amount = formatAmount(extractAmount(exampleText))
    const { counterpart, side, number, label } = entry

    // Determine which side the current account goes on
    const currentIsDebit = side === "actif" || side === "charge" || side === "actif ou passif"

    if (currentIsDebit) {
        return {
            rows: [
                [number, label, amount, ""],
                [counterpart.number, counterpart.label, "", amount],
            ],
        }
    }

    return {
        rows: [
            [counterpart.number, counterpart.label, amount, ""],
            [number, label, "", amount],
        ],
    }
}
