export type DefaultJournal = {
    code: string
    label: string
}

export const defaultJournals: DefaultJournal[] = [
    {
        code: "VT",
        label: "Ventes",
    },
    {
        code: "AC",
        label: "Achats",
    },
    {
        code: "BQ",
        label: "Banque",
    },
    {
        code: "OD",
        label: "Opérations diverses",
    },
    {
        code: "AN",
        label: "À-nouveaux",
    },
]
