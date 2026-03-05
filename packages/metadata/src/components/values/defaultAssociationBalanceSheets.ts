import type { DefaultBalanceSheet } from "./defaultBalanceSheet.js"

export const defaultAssociationBalanceSheets: DefaultBalanceSheet[] = [
    {
        side: "asset",
        number: 1,
        label: "Actif immobilisé",
        numberParent: undefined,
        accounts: [],
    },
    {
        side: "asset",
        number: 11,
        label: "Immobilisations incorporelles",
        numberParent: 1,
        accounts: [],
    },
    {
        side: "asset",
        number: 111,
        label: "Frais d'établissement",
        numberParent: 11,
        accounts: [
            {
                number: 201,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2011,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2012,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 20121,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 20122,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2013,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2801,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2901,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 112,
        label: "Frais de recherche et développement",
        numberParent: 11,
        accounts: [
            {
                number: 203,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2803,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2903,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 113,
        label: "Donations temporaires d'usufruit",
        numberParent: 11,
        accounts: [
            {
                number: 204,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2804,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 114,
        label: "Concessions, brevets, licences, marques, procédés, solutions informatiques, droits et valeurs similaires",
        numberParent: 11,
        accounts: [
            {
                number: 205,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2805,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2905,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 115,
        label: "Fonds commercial",
        numberParent: 11,
        accounts: [
            {
                number: 207,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2807,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2907,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 116,
        label: "Immobilisations incorporelles en cours, avances et acomptes",
        numberParent: 11,
        accounts: [
            {
                number: 232,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 237,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2932,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 117,
        label: "Autres immobilisations incorporelles",
        numberParent: 11,
        accounts: [
            {
                number: 206,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 208,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2081,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2806,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2808,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2906,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2908,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 29081,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 12,
        label: "Immobilisations corporelles",
        numberParent: 1,
        accounts: [],
    },
    {
        side: "asset",
        number: 121,
        label: "Terrains",
        numberParent: 12,
        accounts: [
            {
                number: 211,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2111,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2112,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2113,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2114,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2115,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 212,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2911,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2812,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2912,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 122,
        label: "Constructions",
        numberParent: 12,
        accounts: [
            {
                number: 213,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2131,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2135,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2138,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 214,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2813,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2814,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2913,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2914,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 123,
        label: "Installations techniques, matériel et outillage industriels",
        numberParent: 12,
        accounts: [
            {
                number: 215,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2151,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 21511,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 21514,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2153,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 21531,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 21534,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2154,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2155,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2157,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2815,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2915,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 124,
        label: "Immobilisations corporelles en cours, avances et acomptes",
        numberParent: 12,
        accounts: [
            {
                number: 231,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 238,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2931,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 125,
        label: "Autres immbolisations corporelles",
        numberParent: 12,
        accounts: [
            {
                number: 218,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2181,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2182,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2183,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2184,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2185,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2186,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2187,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2818,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 28187,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2918,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 29187,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 13,
        label: "Biens reçus par legs ou donations destinés à être cédés",
        numberParent: 1,
        accounts: [
            {
                number: 240,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 294,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 14,
        label: "Immobilisations financières",
        numberParent: 1,
        accounts: [],
    },
    {
        side: "asset",
        number: 141,
        label: "Participations et créances rattachées",
        numberParent: 14,
        accounts: [
            {
                number: 261,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2611,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2618,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 262,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 266,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2661,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2961,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2962,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2966,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 267,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2671,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2674,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2675,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2676,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2677,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2678,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 268,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2681,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2688,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2967,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2968,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 142,
        label: "Autres titres immobilisés",
        numberParent: 14,
        accounts: [
            {
                number: 271,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2711,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2718,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 272,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2721,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2722,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 27682,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 277,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2771,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2772,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2971,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2972,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 273,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2973,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 143,
        label: "Prêts",
        numberParent: 14,
        accounts: [
            {
                number: 274,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2741,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2742,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2743,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2748,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 27684,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2974,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 144,
        label: "Autres immobilisations financières",
        numberParent: 14,
        accounts: [
            {
                number: 275,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2751,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2755,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2761,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 27685,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 27688,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 2975,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 2976,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 2,
        label: "Actif circulant",
        numberParent: undefined,
        accounts: [],
    },
    {
        side: "asset",
        number: 21,
        label: "Stocks et en-cours",
        numberParent: 2,
        accounts: [
            {
                number: 31,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 32,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 321,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 322,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3221,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3222,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3223,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3224,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3225,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 326,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3261,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3265,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3267,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 391,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 392,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 33,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 331,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 335,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 34,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 341,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 345,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 393,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 394,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 35,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 351,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 355,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 358,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3581,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3585,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 3586,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 395,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 37,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 397,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4091,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 22,
        label: "Créances",
        numberParent: 2,
        accounts: [],
    },
    {
        side: "asset",
        number: 221,
        label: "Créances clients, usagers et comptes rattachés",
        numberParent: 22,
        accounts: [
            {
                number: 411,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4111,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4117,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 413,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 416,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 418,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4181,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4188,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 491,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 222,
        label: "Créances reçues par legs ou donations",
        numberParent: 22,
        accounts: [
            {
                number: 461,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 223,
        label: "Autres créances",
        numberParent: 22,
        accounts: [
            {
                number: 4096,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4097,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 40971,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 40974,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4098,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 425,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 439,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 441,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 442,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4421,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4422,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4423,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 444,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4455,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44551,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44558,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4456,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44562,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44563,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44566,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44567,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44568,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4457,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44571,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44578,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44581,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44583,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 44586,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 451,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 455,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 456,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4561,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 45611,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 45615,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4563,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4564,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4566,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4567,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 458,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4581,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4588,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 462,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 465,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 467,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 478,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4781,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 495,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4951,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4955,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4958,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 496,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4962,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4965,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 4967,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 23,
        label: "Valeurs mobilières de placement",
        numberParent: 2,
        accounts: [
            {
                number: 502,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5021,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5022,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 503,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5031,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5035,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 504,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 505,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 506,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5061,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5065,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 507,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 508,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5081,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5082,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5088,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 590,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 5903,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 5904,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 5906,
                flow: "credit",
                isAmortization: true,
            },
            {
                number: 5908,
                flow: "credit",
                isAmortization: true,
            },
        ],
    },
    {
        side: "asset",
        number: 24,
        label: "Instruments de trésorerie",
        numberParent: 2,
        accounts: [
            {
                number: 52,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 521,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 522,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 523,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 524,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 25,
        label: "Disponibilités",
        numberParent: 2,
        accounts: [
            {
                number: 511,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5111,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5112,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5113,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5114,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 512,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5121,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5124,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 517,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 518,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5181,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 5188,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 53,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 26,
        label: "Charges constatées d'avance",
        numberParent: 2,
        accounts: [
            {
                number: 486,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 3,
        label: "Frais d'émission des emprunts",
        numberParent: undefined,
        accounts: [
            {
                number: 481,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 4,
        label: "Primes de remboursement des emprunts",
        numberParent: undefined,
        accounts: [
            {
                number: 169,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "asset",
        number: 5,
        label: "Écarts de conversion et différences d'évaluation - Actif",
        numberParent: undefined,
        accounts: [
            {
                number: 474,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4741,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4742,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4746,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 476,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4761,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4762,
                flow: "debit",
                isAmortization: false,
            },
            {
                number: 4768,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 1,
        label: "Fonds propres",
        numberParent: undefined,
        accounts: [],
    },
    {
        side: "liability",
        number: 11,
        label: "Fonds propres sans droit de reprise",
        numberParent: 1,
        accounts: [
            {
                number: 102,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1021,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1022,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1023,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 10231,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 10232,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1024,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 12,
        label: "Fonds propres avec droit de reprise",
        numberParent: 1,
        accounts: [
            {
                number: 103,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1032,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1034,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 13,
        label: "Écarts de réévaluation",
        numberParent: 1,
        accounts: [
            {
                number: 105,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1051,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1052,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 14,
        label: "Réserves",
        numberParent: 1,
        accounts: [],
    },
    {
        side: "liability",
        number: 141,
        label: "Réserves statutaires ou contractuelles",
        numberParent: 14,
        accounts: [
            {
                number: 1062,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1063,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 142,
        label: "Réserves pour projet de l'entité",
        numberParent: 14,
        accounts: [],
    },
    {
        side: "liability",
        number: 143,
        label: "Autres réserves",
        numberParent: 14,
        accounts: [
            {
                number: 1064,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1068,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 15,
        label: "Report à nouveau",
        numberParent: 1,
        accounts: [
            {
                number: 11,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 110,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 119,
                flow: "debit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 16,
        label: "Excédent ou déficit de l'exercice",
        numberParent: 1,
        accounts: [
            {
                number: 12,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 120,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1209,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 129,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 17,
        label: "Fonds propres consomptibles",
        numberParent: 1,
        accounts: [
            {
                number: 108,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1081,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1082,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 18,
        label: "Subventions d'investissement",
        numberParent: 1,
        accounts: [
            {
                number: 13,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 131,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 139,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 19,
        label: "Provisions réglementées",
        numberParent: 1,
        accounts: [
            {
                number: 14,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 143,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 145,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 148,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 2,
        label: "Fonds reportés et dédiés",
        numberParent: undefined,
        accounts: [],
    },
    {
        side: "liability",
        number: 21,
        label: "Fonds reportés liés aux legs ou donations",
        numberParent: 2,
        accounts: [
            {
                number: 191,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1911,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1912,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 22,
        label: "Fonds dédiés",
        numberParent: 2,
        accounts: [
            {
                number: 194,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 195,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 196,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 3,
        label: "Provisions",
        numberParent: undefined,
        accounts: [],
    },
    {
        side: "liability",
        number: 31,
        label: "Provisions pour risques",
        numberParent: 3,
        accounts: [
            {
                number: 151,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1511,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1512,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1514,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1515,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1516,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1518,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 32,
        label: "Provisions pour charges",
        numberParent: 3,
        accounts: [
            {
                number: 152,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 4,
        label: "Dettes",
        numberParent: undefined,
        accounts: [],
    },
    {
        side: "liability",
        number: 41,
        label: "Emprunts obligataires et assimilés",
        numberParent: 4,
        accounts: [
            {
                number: 161,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1618,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 163,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1631,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1638,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 42,
        label: "Emprunts et dettes auprès des établissements de crédit",
        numberParent: 4,
        accounts: [
            {
                number: 164,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1648,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 511,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 512,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 517,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 518,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 519,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 5191,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 5193,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 5198,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 53,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 43,
        label: "Emprunts et dettes financières diverses",
        numberParent: 4,
        accounts: [
            {
                number: 162,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 165,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1651,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1655,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1658,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 166,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1661,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1662,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1668,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1671,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 16718,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1674,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 16748,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1675,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 16758,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 168,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1681,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1685,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1687,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 1688,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 17,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 44,
        label: "Dettes fournisseurs et comptes rattachés",
        numberParent: 4,
        accounts: [
            {
                number: 401,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4011,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4017,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 403,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4081,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4088,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 45,
        label: "Dettes des legs ou donations",
        numberParent: 4,
        accounts: [
            {
                number: 466,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 46,
        label: "Dettes fiscales et sociales",
        numberParent: 4,
        accounts: [
            {
                number: 421,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 422,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 424,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4246,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4248,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 426,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 427,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 428,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4282,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4284,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4286,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 431,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 437,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 438,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4382,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4386,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 441,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 442,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4421,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4422,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4423,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 444,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4452,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4455,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44551,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44558,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4456,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44562,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44563,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44566,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44567,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44568,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4457,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44571,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44578,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4458,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44584,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44587,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 446,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 447,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4481,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44811,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 44812,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4482,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 449,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 47,
        label: "Dettes sur immobilisations et comptes rattachés",
        numberParent: 4,
        accounts: [
            {
                number: 269,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 279,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 404,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4041,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4047,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 405,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4084,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 48,
        label: "Autres dettes",
        numberParent: 4,
        accounts: [
            {
                number: 171,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 174,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 178,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 181,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 186,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 187,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 188,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4191,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4196,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4197,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4198,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 451,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 455,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4551,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4558,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 457,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4562,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 45621,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 45625,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 464,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 468,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4681,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 509,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 49,
        label: "Instruments de trésorerie",
        numberParent: 4,
        accounts: [
            {
                number: 521,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 522,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 523,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 524,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 410,
        label: "Produits constatés d'avance",
        numberParent: 4,
        accounts: [
            {
                number: 487,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4871,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
    {
        side: "liability",
        number: 5,
        label: "Écarts de conversion et différences d'évaluation - Passif",
        numberParent: undefined,
        accounts: [
            {
                number: 475,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4751,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4752,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4756,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 477,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4771,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4772,
                flow: "credit",
                isAmortization: false,
            },
            {
                number: 4778,
                flow: "credit",
                isAmortization: false,
            },
        ],
    },
]
