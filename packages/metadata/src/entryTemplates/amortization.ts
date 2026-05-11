import * as v from "valibot"
import { defineEntryTemplate } from "./defineEntryTemplate.js"

const positiveNumericStringSchema = v.pipe(
    v.string("Ce champ est requis"),
    v.minLength(1, "Ce champ est requis"),
    v.custom<string>((value) => !Number.isNaN(Number(value)) && Number(value) > 0, "Doit être un nombre positif"),
)

const positiveIntegerStringSchema = v.pipe(
    v.string("Ce champ est requis"),
    v.minLength(1, "Ce champ est requis"),
    v.custom<string>((value) => {
        const n = Number(value)
        return Number.isInteger(n) && n > 0
    }, "Doit être un entier positif"),
)

const nonNullableIdSchema = v.pipe(v.string("Ce champ est requis"), v.minLength(1, "Ce champ est requis"))

export const amortizationTemplateSchema = v.pipe(
    v.object({
        assetLabel: v.pipe(v.string("Ce champ est requis"), v.minLength(1, "Ce champ est requis")),
        originalPrice: positiveNumericStringSchema,
        currentYear: positiveIntegerStringSchema,
        totalYears: positiveIntegerStringSchema,
        idDotationAccount: nonNullableIdSchema,
        idAmortizationAccount: nonNullableIdSchema,
    }),
    v.forward(
        v.check(
            (data) => Number.parseInt(data.currentYear, 10) <= Number.parseInt(data.totalYears, 10),
            "L'année en cours ne peut pas dépasser le nombre total d'années",
        ),
        [
            "currentYear",
        ],
    ),
)

export const amortizationTemplate = defineEntryTemplate({
    key: "amortization",
    label: "Dotation aux amortissements (linéaire)",
    description: `Crée une écriture de dotation aux amortissements linéaire pour une immobilisation.
Comptes utilisés :
- Débit : compte de dotation aux amortissements (ex : 68112 - Dotations aux amortissements des immobilisations corporelles)
- Crédit : compte d'amortissement (ex : 2818 - Amortissements des autres immobilisations corporelles)
Calcul : prix d'origine / nombre d'années = dotation annuelle.
Paramètres : libellé de l'immobilisation, prix d'origine HT, année en cours, nombre total d'années, comptes de dotation et d'amortissement.`,
    schema: amortizationTemplateSchema,
    createEntries: (input) => {
        const price = Number.parseFloat(input.originalPrice)
        const total = Number.parseInt(input.totalYears, 10)
        const annualAmount = (price / total).toFixed(2)

        return {
            label: `Dotation aux amortissements - ${input.assetLabel}`,
            entryLines: [
                {
                    idAccount: input.idDotationAccount,
                    label: `Dotation ${input.assetLabel}`.trim(),
                    debit: annualAmount,
                    credit: "0",
                    isComputedForJournalReport: true,
                    isComputedForLedgerReport: true,
                    isComputedForBalanceReport: true,
                    isComputedForBalanceSheetReport: true,
                    isComputedForIncomeStatementReport: true,
                },
                {
                    idAccount: input.idAmortizationAccount,
                    label: `Amortissement ${input.assetLabel}`.trim(),
                    debit: "0",
                    credit: annualAmount,
                    isComputedForJournalReport: true,
                    isComputedForLedgerReport: true,
                    isComputedForBalanceReport: true,
                    isComputedForBalanceSheetReport: true,
                    isComputedForIncomeStatementReport: true,
                },
            ],
        }
    },
})
