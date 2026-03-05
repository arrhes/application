export type DefaultRecord = {
    label: string
    date: string
    rows: Array<DefaultRow>
}

export type DefaultRow = {
    accountNumber: number
    label: string
    debit: number
    credit: number
}

export const defaultRecords2022: Array<DefaultRecord> = [
    {
        label: "Location d'un nom de domaine",
        date: "2021-11-23T11:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Location nom de domaine",
                debit: 56.15,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 11.23,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 11.23,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Namecheap",
                debit: 0,
                credit: 56.15,
            },
        ],
    },
    {
        label: "Paiement Namecheap",
        date: "2021-11-23T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Namecheap",
                debit: 56.15,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Emile Sabatier",
                debit: 0,
                credit: 56.15,
            },
        ],
    },
    {
        label: "Location d'un VPS",
        date: "2021-11-25T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 53.52,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 10.7,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 64.22,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2021-11-25T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 64.22,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Emile Sabatier",
                debit: 0,
                credit: 64.22,
            },
        ],
    },
    {
        label: "Location d'un nom de domaine",
        date: "2021-12-02T11:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Location nom de domaine",
                debit: 6.99,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 1.4,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur OVHcloud",
                debit: 0,
                credit: 8.39,
            },
        ],
    },
    {
        label: "Paiement OVHcloud",
        date: "2021-12-02T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur OVHcloud",
                debit: 8.39,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Adrian Millon",
                debit: 0,
                credit: 8.39,
            },
        ],
    },
    {
        label: "Ouverture du compte Qonto",
        date: "2021-12-05T11:00:00.000Z",
        rows: [
            {
                accountNumber: 627,
                label: "Services bancaires Qonto",
                debit: 149,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 29.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 178.8,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2021-12-05T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 178.8,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Adrian Millon",
                debit: 0,
                credit: 178.8,
            },
        ],
    },
    {
        label: "Justification numérique création",
        date: "2021-12-29T11:00:00.000Z",
        rows: [
            {
                accountNumber: 6231,
                label: "Justification numérique création",
                debit: 194,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 38.8,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur REGIEPRO",
                debit: 0,
                credit: 232.8,
            },
        ],
    },
    {
        label: "Paiement REGIEPRO",
        date: "2021-12-29T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur REGIEPRO",
                debit: 232.8,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Adrian Millon",
                debit: 0,
                credit: 232.8,
            },
        ],
    },
    {
        label: "Immatriculation au greffe",
        date: "2022-01-03T11:00:00.000Z",
        rows: [
            {
                accountNumber: 6227,
                label: "Immatriculation",
                debit: 49.05,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 9.81,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Tribunal de Commerce de Paris",
                debit: 0,
                credit: 58.86,
            },
        ],
    },
    {
        label: "Paiement Tribunal de Commerce de Paris",
        date: "2022-01-03T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Tribunal de Commerce de Paris",
                debit: 58.86,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Adrian Millon",
                debit: 0,
                credit: 58.86,
            },
        ],
    },
    {
        label: "Versement du capital",
        date: "2022-01-07T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4561,
                label: "Associé Adrian Millon",
                debit: 501,
                credit: 0,
            },
            {
                accountNumber: 4561,
                label: "Associé Emile Sabatier",
                debit: 499,
                credit: 0,
            },
            {
                accountNumber: 1012,
                label: "Promesse de versement de capital",
                debit: 0,
                credit: 1000,
            },
            {
                accountNumber: 1012,
                label: "Capital non versé",
                debit: 1000,
                credit: 0,
            },
            {
                accountNumber: 1013,
                label: "Comptabilisation du versement",
                debit: 0,
                credit: 1000,
            },
            {
                accountNumber: 4561,
                label: "Versement du capital",
                debit: 0,
                credit: 1000,
            },
            {
                accountNumber: 512,
                label: "Versement du capital par les associés",
                debit: 1000,
                credit: 0,
            },
        ],
    },
    {
        label: "Facturation Paris 1",
        date: "2022-01-10T11:00:00.000Z",
        rows: [
            {
                accountNumber: 706,
                label: "FACTURE#202201-0001",
                debit: 0,
                credit: 1560,
            },
            {
                accountNumber: 4457,
                label: "TVA due",
                debit: 0,
                credit: 312,
            },
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 1872,
                credit: 0,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2022-01-16T11:00:00.000Z",
        rows: [
            {
                accountNumber: 6256,
                label: "Note de repas Café de l'Industrie",
                debit: 45.45,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 4.55,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Café de l'Industrie",
                debit: 0,
                credit: 50,
            },
        ],
    },
    {
        label: "Paiement Café de l'Industrie",
        date: "2022-01-16T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Café de l'Industrie",
                debit: 50,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Café de l'Industrie",
                debit: 0,
                credit: 50,
            },
        ],
    },
    {
        label: "Location d'un serveur email",
        date: "2022-01-16T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement serveur email",
                debit: 5.4,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 1.08,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 1.08,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Zoho",
                debit: 0,
                credit: 5.4,
            },
        ],
    },
    {
        label: "Paiement Zoho",
        date: "2022-01-16T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Zoho",
                debit: 5.4,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Zoho",
                debit: 0,
                credit: 5.4,
            },
        ],
    },
    {
        label: "Remboursement Emile Sabatier",
        date: "2022-01-20T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4551,
                label: "Compte associés Emile Sabatier",
                debit: 120.37,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Versement à l'associé Emile Sabatier",
                debit: 0,
                credit: 120.37,
            },
        ],
    },
    {
        label: "Remboursement Adrian Millon",
        date: "2022-01-20T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4551,
                label: "Compte associés Adrian Millon",
                debit: 478.85,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Versement à l'associé Adrian Millon",
                debit: 0,
                credit: 478.85,
            },
        ],
    },
    {
        label: "Paiement Paris 1",
        date: "2022-01-27T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 0,
                credit: 1872,
            },
            {
                accountNumber: 512,
                label: "Paiement de la facture",
                debit: 1872,
                credit: 0,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2022-02-27T11:00:00.000Z",
        rows: [
            {
                accountNumber: 6256,
                label: "Note de repas Mother Goose",
                debit: 46.36,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 4.64,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Mother Goose",
                debit: 0,
                credit: 51,
            },
        ],
    },
    {
        label: "Paiement Mother Goose",
        date: "2022-02-27T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Mother Goose",
                debit: 51,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Mother Goose",
                debit: 0,
                credit: 51,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2022-06-22T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6256,
                label: "Note de repas Restram'sun",
                debit: 12.32,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 0.68,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Restram'sun",
                debit: 0,
                credit: 13,
            },
        ],
    },
    {
        label: "Paiement Restram'sun",
        date: "2022-06-22T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Restram'sun",
                debit: 13,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Restram'sun",
                debit: 0,
                credit: 13,
            },
        ],
    },
    {
        label: "Repas client",
        date: "2022-06-22T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6257,
                label: "Note de repas L'écritoire",
                debit: 7.73,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 0.77,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur L'écritoire",
                debit: 0,
                credit: 8.5,
            },
        ],
    },
    {
        label: "Paiement L'écritoire",
        date: "2022-06-22T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur L'écritoire",
                debit: 8.5,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement L'écritoire",
                debit: 0,
                credit: 8.5,
            },
        ],
    },
    {
        label: "Location serveur email",
        date: "2022-08-29T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement serveur email",
                debit: 23.76,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 4.75,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 28.51,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2022-08-29T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 28.51,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 28.51,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2022-09-04T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6256,
                label: "Note de repas Pères Populaires",
                debit: 30.91,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 3.09,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Pères Populaires",
                debit: 0,
                credit: 34,
            },
        ],
    },
    {
        label: "Paiement Les Pères Populaires",
        date: "2022-09-04T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Les Pères Populaires",
                debit: 34,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Les Pères Populaires",
                debit: 0,
                credit: 34,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2022-09-04T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6256,
                label: "Note de repas New Golden Sushis",
                debit: 43.27,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 4.33,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur New Golden Sushis",
                debit: 0,
                credit: 47.6,
            },
        ],
    },
    {
        label: "Paiement New Golden Sushis",
        date: "2022-09-04T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur New Golden Sushis",
                debit: 47.6,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement New Golden Sushis",
                debit: 0,
                credit: 47.6,
            },
        ],
    },
    {
        label: "Facturation Paris 1",
        date: "2022-10-17T10:00:00.000Z",
        rows: [
            {
                accountNumber: 706,
                label: "FACTURE#202210-0003",
                debit: 0,
                credit: 630,
            },
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 756,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due",
                debit: 0,
                credit: 126,
            },
        ],
    },
    {
        label: "Facturation Paris 1",
        date: "2022-10-17T10:00:00.000Z",
        rows: [
            {
                accountNumber: 706,
                label: "FACTURE#202210-0001",
                debit: 0,
                credit: 2358,
            },
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 2829.6,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due",
                debit: 0,
                credit: 471.6,
            },
        ],
    },
    {
        label: "Facturation Paris 1",
        date: "2022-10-17T10:00:00.000Z",
        rows: [
            {
                accountNumber: 706,
                label: "FACTURE#202210-0002",
                debit: 0,
                credit: 690,
            },
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 828,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due",
                debit: 0,
                credit: 138,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2022-10-23T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6256,
                label: "Note de repas Café Solférino",
                debit: 6,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 0.6,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Café Solférino",
                debit: 0,
                credit: 6.6,
            },
        ],
    },
    {
        label: "Paiement Café Solférino",
        date: "2022-10-23T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Café Solférino",
                debit: 6.6,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Café Solférino",
                debit: 0,
                credit: 6.6,
            },
        ],
    },
    {
        label: "Achat de matériel informatique",
        date: "2022-10-26T10:00:00.000Z",
        rows: [
            {
                accountNumber: 2183,
                label: "Clavier",
                debit: 20.79,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 4.16,
                credit: 0,
            },
            {
                accountNumber: 4041,
                label: "Fournisseur Amazon",
                debit: 0,
                credit: 24.95,
            },
            {
                accountNumber: 2183,
                label: "Écran",
                debit: 137.42,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 27.48,
                credit: 0,
            },
            {
                accountNumber: 4041,
                label: "Fournisseur Amazon",
                debit: 0,
                credit: 164.9,
            },
            {
                accountNumber: 2183,
                label: "Support d'écran",
                debit: 35.46,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 7.09,
                credit: 0,
            },
            {
                accountNumber: 4041,
                label: "Fournisseur CT Global via Amazon",
                debit: 0,
                credit: 42.55,
            },
        ],
    },
    {
        label: "Paiement Amazon",
        date: "2022-10-26T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4041,
                label: "Fournisseur Amazon",
                debit: 232.4,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Amazon",
                debit: 0,
                credit: 232.4,
            },
        ],
    },
    {
        label: "Paiement Paris 1",
        date: "2022-10-31T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 0,
                credit: 756,
            },
            {
                accountNumber: 512,
                label: "Paiement de la facture",
                debit: 756,
                credit: 0,
            },
        ],
    },
    {
        label: "Paiement Paris 1",
        date: "2022-10-31T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 0,
                credit: 2829.6,
            },
            {
                accountNumber: 512,
                label: "Paiement de la facture",
                debit: 2829.6,
                credit: 0,
            },
        ],
    },
    {
        label: "Location d'un VPS",
        date: "2022-11-08T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 76.32,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 15.26,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 91.58,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2022-11-08T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 91.58,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 91.58,
            },
        ],
    },
    {
        label: "Location d'un nom de domaine",
        date: "2022-11-08T11:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Location nom de domaine",
                debit: 120.69,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 24.14,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 24.14,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Namecheap",
                debit: 0,
                credit: 120.69,
            },
        ],
    },
    {
        label: "Paiement Namecheap",
        date: "2022-11-08T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Namecheap",
                debit: 120.69,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Namecheap",
                debit: 0,
                credit: 120.69,
            },
        ],
    },
    {
        label: "Paiement Paris 1",
        date: "2022-11-15T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4111,
                label: "DGFIP Paris 1",
                debit: 0,
                credit: 828,
            },
            {
                accountNumber: 512,
                label: "Paiement de la facture",
                debit: 828,
                credit: 0,
            },
        ],
    },
    {
        label: "Repas associés",
        date: "2022-11-19T11:00:00.000Z",
        rows: [
            {
                label: "Note de repas Cantine Diderot",
                accountNumber: 6256,
                debit: 40,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 4,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Cantine Diderot",
                debit: 0,
                credit: 44,
            },
        ],
    },
    {
        label: "Paiement Cantine Diderot",
        date: "2022-11-19T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Cantine Diderot",
                debit: 44,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Cantine Diderot",
                debit: 0,
                credit: 44,
            },
        ],
    },
    {
        label: "Cashback de Qonto",
        date: "2022-11-29T11:00:00.000Z",
        rows: [
            {
                accountNumber: 768,
                label: "Cashback Qonto",
                debit: 0,
                credit: 2.2,
            },
            {
                accountNumber: 512,
                label: "Versement",
                debit: 2.2,
                credit: 0,
            },
        ],
    },
    {
        label: "Location d'un nom de domaine",
        date: "2022-12-02T11:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Location nom de domaine",
                debit: 6.99,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 1.4,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur OVHcloud",
                debit: 0,
                credit: 8.39,
            },
        ],
    },
    {
        label: "Paiement OVHcloud",
        date: "2022-12-02T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur OVHcloud",
                debit: 8.39,
                credit: 0,
            },
            {
                accountNumber: 4551,
                label: "Compte associés Adrian Millon",
                debit: 0,
                credit: 8.39,
            },
        ],
    },
    {
        label: "Remboursement Adrian Millon",
        date: "2022-12-23T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4551,
                label: "Compte associés Adrian",
                debit: 8.39,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Versement à l'associé Adrian Millon",
                debit: 0,
                credit: 8.39,
            },
        ],
    },
    {
        label: "Dotation aux amortissements du matériel informatique",
        date: "2022-12-31T10:00:00.000Z",
        rows: [
            {
                accountNumber: 68112,
                label: "Dotation clavier",
                debit: 0.75,
                credit: 0,
            },
            {
                accountNumber: 2818,
                label: "Amortissement clavier",
                debit: 0,
                credit: 0.75,
            },
            {
                accountNumber: 68112,
                label: "Dotation écran",
                debit: 4.97,
                credit: 0,
            },
            {
                accountNumber: 2818,
                label: "Amortissement écran",
                debit: 0,
                credit: 4.97,
            },
            {
                accountNumber: 68112,
                label: "Dotation support écran",
                debit: 1.28,
                credit: 0,
            },
            {
                accountNumber: 2818,
                label: "Amortissement support écran",
                debit: 0,
                credit: 1.28,
            },
        ],
    },
    {
        label: "Calcul de la TVA",
        date: "2022-12-31T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4457,
                label: "TVA due",
                debit: 1047.6,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible",
                debit: 0,
                credit: 173.31,
            },
            {
                accountNumber: 44551,
                label: "TVA à décaisser",
                debit: 0,
                credit: 874.29,
            },
        ],
    },
    {
        label: "Calcul de l'impôt sur les sociétés",
        date: "2022-12-31T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6951,
                label: "Solde d'impôts sur les sociétés",
                debit: 638.89,
                credit: 0,
            },
            {
                accountNumber: 444,
                label: "Solde d'impôts sur les sociétés",
                debit: 0,
                credit: 638.89,
            },
        ],
    },
]
