import type { DefaultRecord } from "./records2022.js"

export const defaultRecords2023: Array<DefaultRecord> = [
    {
        label: "Abonnement Qonto (janvier)",
        date: "2023-01-05T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 7.54,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.5,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 9.04,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-01-05T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 9.04,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 9.04,
            },
        ],
    },
    {
        label: "Abonnement Zoho",
        date: "2023-01-16T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Zoho",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 2.16,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 2.16,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Zoho",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Paiement Zoho",
        date: "2023-01-16T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Zoho",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Zoho",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Abonnement Qonto (février)",
        date: "2023-02-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 9,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-02-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Abonnement Qonto (mars)",
        date: "2023-03-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 9,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-03-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Affectation réserve légale",
        date: "2022-12-31T10:00:00.000Z",
        rows: [
            {
                accountNumber: 120,
                label: "Affectation depuis le compte de résultat",
                debit: 100,
                credit: 0,
            },
            {
                accountNumber: 1061,
                label: "Affectation vers la réserve légale",
                debit: 0,
                credit: 100,
            },
        ],
    },
    {
        label: "Affectation autres réserves",
        date: "2022-12-31T10:00:00.000Z",
        rows: [
            {
                accountNumber: 120,
                label: "Affectation depuis le compte de résultat",
                debit: 181.02,
                credit: 0,
            },
            {
                accountNumber: 1068,
                label: "Affectation vers les autres réserves",
                debit: 0,
                credit: 181.02,
            },
        ],
    },
    {
        label: "Affectation vers le report à nouveau",
        date: "2022-12-31T10:00:00.000Z",
        rows: [
            {
                accountNumber: 120,
                label: "Affectation depuis le compte de résultat",
                debit: 3339.38,
                credit: 0,
            },
            {
                accountNumber: 110,
                label: "Affectation vers le report à nouveau",
                debit: 0,
                credit: 3339.38,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2023-03-18T11:00:00.000Z",
        rows: [
            {
                accountNumber: 6251,
                label: "Repas d'associés",
                debit: 58.9,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 7.5,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Pères populaire",
                debit: 0,
                credit: 66.4,
            },
        ],
    },
    {
        label: "Paiement Pères Populaire",
        date: "2023-03-18T11:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Pères Populaire",
                debit: 66.4,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Pères Populaire",
                debit: 0,
                credit: 66.4,
            },
        ],
    },
    {
        label: "Abonnement Qonto (avril)",
        date: "2023-04-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 9,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-04-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Dépôt des comptes",
        date: "2023-04-05T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6227,
                label: "Dépôt des comptes",
                debit: 42.59,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.42,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 0,
                credit: 45.01,
            },
        ],
    },
    {
        label: "Paiement INPI",
        date: "2023-04-05T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 45.01,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement INPI",
                debit: 0,
                credit: 45.01,
            },
        ],
    },
    {
        label: "Dépôt des comptes",
        date: "2023-04-20T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6227,
                label: "Dépôt des comptes",
                debit: 2.1,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 0.42,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 0,
                credit: 2.52,
            },
        ],
    },
    {
        label: "Paiement INPI",
        date: "2023-04-20T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 2.52,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement INPI",
                debit: 0,
                credit: 2.52,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2023-04-28T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6251,
                label: "Repas d'associés",
                debit: 6.36,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 0.64,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Felicità",
                debit: 0,
                credit: 7,
            },
        ],
    },
    {
        label: "Paiement Felicità",
        date: "2023-04-28T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Felicità",
                debit: 7,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Felicità",
                debit: 0,
                credit: 7,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2023-04-28T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6251,
                label: "Repas d'associés",
                debit: 4,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 0.4,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Felicità",
                debit: 0,
                credit: 4.4,
            },
        ],
    },
    {
        label: "Paiement Felicità",
        date: "2023-04-28T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Felicità",
                debit: 4.4,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Felicità",
                debit: 0,
                credit: 4.4,
            },
        ],
    },
    {
        label: "Abonnement Qonto (mai)",
        date: "2023-05-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 9,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-05-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Abonnement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 39.48,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 7.9,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 47.38,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 47.38,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 47.38,
            },
        ],
    },
    {
        label: "Abonnement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Renouvellement domaine Hostinger",
                debit: 7.99,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.6,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 9.59,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 9.59,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 9.59,
            },
        ],
    },
    {
        label: "Abonnement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 23.76,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 4.75,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 28.51,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
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
        label: "Abonnement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 23.76,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 4.75,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 28.51,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-05-19T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
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
        label: "Abonnement Scalingo",
        date: "2023-06-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scalingo",
                debit: 3.27,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 0.66,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 0,
                credit: 3.93,
            },
        ],
    },
    {
        label: "Paiement Scalingo",
        date: "2023-06-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 3.93,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scalingo",
                debit: 0,
                credit: 3.93,
            },
        ],
    },
    {
        label: "Abonnement Qonto (juin)",
        date: "2023-06-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 9,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-06-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 10.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 10.8,
            },
        ],
    },
    {
        label: "Remboursement INPI",
        date: "2023-06-15T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6227,
                label: "Remboursement INPI",
                debit: 0,
                credit: 39.36,
            },
            {
                accountNumber: 44571,
                label: "TVA due",
                debit: 0,
                credit: 1.77,
            },
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 41.13,
                credit: 0,
            },
        ],
    },
    {
        label: "Remboursement INPI",
        date: "2023-06-15T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 0,
                credit: 41.13,
            },
            {
                accountNumber: 512,
                label: "Remboursement INPI",
                debit: 1.16,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Remboursement INPI",
                debit: 13.4,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Remboursement INPI",
                debit: 5.45,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Remboursement INPI",
                debit: 18.6,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Remboursement INPI",
                debit: 2.52,
                credit: 0,
            },
        ],
    },
    {
        label: "Paiement Impôts sur les sociétés",
        date: "2023-06-18T10:00:00.000Z",
        rows: [
            {
                accountNumber: 444,
                label: "Impôts sur les sociétés exercice précédent",
                debit: 639,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Impôts sur les sociétés",
                debit: 0,
                credit: 639,
            },
        ],
    },
    {
        label: "Paiement TVA",
        date: "2023-06-18T10:00:00.000Z",
        rows: [
            {
                accountNumber: 44551,
                label: "TVA exercice précédent",
                debit: 874,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement de la TVA",
                debit: 0,
                credit: 874,
            },
        ],
    },
    {
        label: "Dépôt des comptes",
        date: "2023-06-22T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6227,
                label: "Dépôt des comptes",
                debit: 42.59,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.42,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 0,
                credit: 45.01,
            },
        ],
    },
    {
        label: "Paiement INPI",
        date: "2023-06-22T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 45.01,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement INPI",
                debit: 0,
                credit: 45.01,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2023-06-30T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6251,
                label: "Repas d'associés",
                debit: 4,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 0.4,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Felicità",
                debit: 0,
                credit: 4.4,
            },
        ],
    },
    {
        label: "Paiement Felicità",
        date: "2023-06-30T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Felicità",
                debit: 4.4,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Felicità",
                debit: 0,
                credit: 4.4,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2023-06-30T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6251,
                label: "Repas d'associés",
                debit: 39.64,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 3.96,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur La Halte",
                debit: 0,
                credit: 43.6,
            },
        ],
    },
    {
        label: "Paiement La Halte",
        date: "2023-06-30T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur La Halte",
                debit: 43.6,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement La Halte",
                debit: 0,
                credit: 43.6,
            },
        ],
    },
    {
        label: "Abonnement Scalingo",
        date: "2023-07-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scalingo",
                debit: 31.78,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 6.36,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 0,
                credit: 38.14,
            },
        ],
    },
    {
        label: "Paiement Scalingo",
        date: "2023-07-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 38.14,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scalingo",
                debit: 0,
                credit: 38.14,
            },
        ],
    },
    {
        label: "Abonnement Qonto (juillet)",
        date: "2023-07-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 11,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.2,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-07-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 13.2,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Domaine Hostinger",
        date: "2023-07-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Renouvellement domaine Hostinger",
                debit: 10.16,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 2.03,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 2.03,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 10.16,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-07-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 10.16,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 10.16,
            },
        ],
    },
    {
        label: "Domaine Hostinger",
        date: "2023-07-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Renouvellement domaine Hostinger",
                debit: 10.16,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 2.03,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 2.03,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 10.16,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-07-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 10.16,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 10.16,
            },
        ],
    },
    {
        label: "Domaine Hostinger",
        date: "2023-07-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Renouvellement domaine Hostinger",
                debit: 7.99,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 1.6,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 1.6,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 7.99,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-07-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 7.99,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 7.99,
            },
        ],
    },
    {
        label: "Remboursement domaine Hostinger",
        date: "2023-07-04T10:00:00.000Z",
        rows: [
            {
                accountNumber: 651,
                label: "Renouvellement domaine Hostinger",
                debit: 0,
                credit: 10.16,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 2.03,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 2.03,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 10.16,
                credit: 0,
            },
        ],
    },
    {
        label: "Remboursement Hostinger",
        date: "2023-07-04T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 10.16,
            },
            {
                accountNumber: 512,
                label: "Remboursement Hostinger",
                debit: 10.16,
                credit: 0,
            },
        ],
    },
    {
        label: "Dépôt des comptes",
        date: "2023-07-10T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6227,
                label: "Dépôt des comptes",
                debit: 2.1,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 0.42,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 0,
                credit: 2.52,
            },
        ],
    },
    {
        label: "Paiement INPI",
        date: "2023-07-10T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur INPI",
                debit: 2.52,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement INPI",
                debit: 0,
                credit: 2.52,
            },
        ],
    },
    {
        label: "Pénalités de retard",
        date: "2023-07-26T10:00:00.000Z",
        rows: [
            {
                accountNumber: 678,
                label: "Pénalité de retard",
                debit: 43,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur DGFIP",
                debit: 0,
                credit: 43,
            },
        ],
    },
    {
        label: "Paiement DGFIP",
        date: "2023-07-26T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur DGFIP",
                debit: 43,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement DGFIP",
                debit: 0,
                credit: 43,
            },
        ],
    },
    {
        label: "Abonnement Scalingo",
        date: "2023-08-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scalingo",
                debit: 23.58,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 4.72,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 0,
                credit: 28.3,
            },
        ],
    },
    {
        label: "Paiement Scalingo",
        date: "2023-08-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 28.3,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scalingo",
                debit: 0,
                credit: 28.3,
            },
        ],
    },
    {
        label: "Abonnement Qonto (août)",
        date: "2023-08-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 11,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.2,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Abonnement Qonto (août)",
        date: "2023-08-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 13.2,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Abonnement Brevo",
        date: "2023-08-15T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Brevo",
                debit: 19,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 3.8,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Brevo",
                debit: 0,
                credit: 22.8,
            },
        ],
    },
    {
        label: "Paiement Brevo",
        date: "2023-08-15T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Brevo",
                debit: 22.8,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Brevo",
                debit: 0,
                credit: 22.8,
            },
        ],
    },
    {
        label: "Abonnement Scalingo",
        date: "2023-09-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scalingo",
                debit: 22.32,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 4.46,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 0,
                credit: 26.78,
            },
        ],
    },
    {
        label: "Paiement Scalingo",
        date: "2023-09-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 26.78,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scalingo",
                debit: 0,
                credit: 26.78,
            },
        ],
    },
    {
        label: "Abonnement Qonto (septembre)",
        date: "2023-09-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 11,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.2,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-09-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 13.2,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Repas d'associés",
        date: "2023-09-30T10:00:00.000Z",
        rows: [
            {
                accountNumber: 6251,
                label: "Repas d'associés",
                debit: 27.27,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.73,
                credit: 0,
            },
            {
                accountNumber: 401,
                label: "Fournisseur Vertical",
                debit: 0,
                credit: 30,
            },
        ],
    },
    {
        label: "Paiement Vertical",
        date: "2023-09-30T10:00:00.000Z",
        rows: [
            {
                accountNumber: 401,
                label: "Fournisseur Vertical",
                debit: 30,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Vertical",
                debit: 0,
                credit: 30,
            },
        ],
    },
    {
        label: "Abonnement Qonto (octobre)",
        date: "2023-10-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 11,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.2,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-10-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 13.2,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Abonnement Scalingo",
        date: "2023-10-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scalingo",
                debit: 4.98,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 1,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 0,
                credit: 5.98,
            },
        ],
    },
    {
        label: "Paiement Scalingo",
        date: "2023-10-01T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scalingo",
                debit: 5.98,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scalingo",
                debit: 0,
                credit: 5.98,
            },
        ],
    },
    {
        label: "Abonnement Hostinger",
        date: "2023-10-02T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 83.88,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 16.78,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 16.78,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 83.88,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-10-02T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 83.88,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 83.88,
            },
        ],
    },
    {
        label: "Abonnement Hostinger",
        date: "2023-10-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 83.88,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 16.78,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 16.78,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 83.88,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-10-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 83.88,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 83.88,
            },
        ],
    },
    {
        label: "Abonnement Scaleway",
        date: "2023-10-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scaleway",
                debit: 0.01,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scaleway",
                debit: 0,
                credit: 0.01,
            },
        ],
    },
    {
        label: "Paiement Scaleway",
        date: "2023-10-03T10:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scaleway",
                debit: 0.01,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scaleway",
                debit: 0,
                credit: 0.01,
            },
        ],
    },
    {
        label: "Abonnement Qonto (novembre)",
        date: "2023-11-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 11,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.2,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-11-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 13.2,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Abonnement Scaleway",
        date: "2023-11-02T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scaleway",
                debit: 0.02,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scaleway",
                debit: 0,
                credit: 0.02,
            },
        ],
    },
    {
        label: "Paiement Scaleway",
        date: "2023-11-02T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scaleway",
                debit: 0.02,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scaleway",
                debit: 0,
                credit: 0.02,
            },
        ],
    },
    {
        label: "Abonnement Hostinger",
        date: "2023-11-11T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Hostinger",
                debit: 76.32,
                credit: 0,
            },
            {
                accountNumber: 4456,
                label: "TVA déductible (autoliquidation)",
                debit: 15.26,
                credit: 0,
            },
            {
                accountNumber: 4457,
                label: "TVA due (autoliquidation)",
                debit: 0,
                credit: 15.26,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 0,
                credit: 76.32,
            },
        ],
    },
    {
        label: "Paiement Hostinger",
        date: "2023-11-11T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Hostinger",
                debit: 76.32,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Hostinger",
                debit: 0,
                credit: 76.32,
            },
        ],
    },
    {
        label: "Abonnement Qonto (décembre)",
        date: "2023-12-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Qonto",
                debit: 11,
                credit: 0,
            },
            {
                accountNumber: 44566,
                label: "TVA déductible",
                debit: 2.2,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Paiement Qonto",
        date: "2023-12-01T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Qonto",
                debit: 13.2,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Qonto",
                debit: 0,
                credit: 13.2,
            },
        ],
    },
    {
        label: "Abonnement Scaleway",
        date: "2023-12-04T11:00:00.000Z",
        rows: [
            {
                accountNumber: 613,
                label: "Abonnement Scaleway",
                debit: 0.02,
                credit: 0,
            },
            {
                accountNumber: 4011,
                label: "Fournisseur Scaleway",
                debit: 0,
                credit: 0.02,
            },
        ],
    },
    {
        label: "Paiement Scaleway",
        date: "2023-12-04T11:00:00.000Z",
        rows: [
            {
                accountNumber: 4011,
                label: "Fournisseur Scaleway",
                debit: 0.02,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Scaleway",
                debit: 0,
                credit: 0.02,
            },
        ],
    },
    {
        label: "Achat mobilier de bureau",
        date: "2023-12-08T11:00:00.000Z",
        rows: [
            {
                accountNumber: 2184,
                label: "Acquisition mobilier de bureau",
                debit: 174.99,
                credit: 0,
            },
            {
                accountNumber: 44562,
                label: "TVA déductible",
                debit: 35,
                credit: 0,
            },
            {
                accountNumber: 404,
                label: "Fournisseur Cdiscount",
                debit: 0,
                credit: 209.99,
            },
        ],
    },
    {
        label: "Paiement Cdiscount",
        date: "2023-12-08T11:00:00.000Z",
        rows: [
            {
                accountNumber: 404,
                label: "Fournisseur Cdiscount",
                debit: 209.99,
                credit: 0,
            },
            {
                accountNumber: 512,
                label: "Paiement Cdiscount",
                debit: 0,
                credit: 209.99,
            },
        ],
    },
]
