export type DefaultComputation = {
    number: number
    label: string
    incomeStatements: {
        number: number
        operation: "plus" | "minus"
    }[]
}

export const defaultComputations: DefaultComputation[] = [
    {
        number: 1,
        label: "Résultat d'exploitation",
        incomeStatements: [
            {
                number: 1,
                operation: "plus",
            },
            {
                number: 2,
                operation: "minus",
            },
        ],
    },
    {
        number: 2,
        label: "Résultat financier",
        incomeStatements: [
            {
                number: 5,
                operation: "plus",
            },
            {
                number: 6,
                operation: "minus",
            },
        ],
    },
    {
        number: 3,
        label: "Résultat courant avant impôts",
        incomeStatements: [
            {
                number: 1,
                operation: "plus",
            },
            {
                number: 2,
                operation: "minus",
            },
            {
                number: 3,
                operation: "plus",
            },
            {
                number: 4,
                operation: "minus",
            },
            {
                number: 5,
                operation: "plus",
            },
            {
                number: 6,
                operation: "minus",
            },
        ],
    },
    {
        number: 4,
        label: "Résultat exceptionnel",
        incomeStatements: [
            {
                number: 7,
                operation: "plus",
            },
            {
                number: 8,
                operation: "minus",
            },
        ],
    },
    {
        number: 5,
        label: "Total des produits",
        incomeStatements: [
            {
                number: 1,
                operation: "plus",
            },
            {
                number: 3,
                operation: "plus",
            },
            {
                number: 5,
                operation: "plus",
            },
            {
                number: 7,
                operation: "plus",
            },
        ],
    },
    {
        number: 6,
        label: "Total des charges",
        incomeStatements: [
            {
                number: 2,
                operation: "plus",
            },
            {
                number: 4,
                operation: "plus",
            },
            {
                number: 6,
                operation: "plus",
            },
            {
                number: 8,
                operation: "plus",
            },
            {
                number: 9,
                operation: "plus",
            },
            {
                number: 10,
                operation: "plus",
            },
        ],
    },
    {
        number: 7,
        label: "Résultat net",
        incomeStatements: [
            {
                number: 1,
                operation: "plus",
            },
            {
                number: 2,
                operation: "minus",
            },
            {
                number: 3,
                operation: "plus",
            },
            {
                number: 4,
                operation: "minus",
            },
            {
                number: 5,
                operation: "plus",
            },
            {
                number: 6,
                operation: "minus",
            },
            {
                number: 7,
                operation: "plus",
            },
            {
                number: 8,
                operation: "minus",
            },
            {
                number: 9,
                operation: "minus",
            },
            {
                number: 10,
                operation: "minus",
            },
        ],
    },
]
