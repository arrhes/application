import { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { IconCalculator } from "@tabler/icons-react"
import { useEffect, useRef } from "react"
import { FormProvider, useForm } from "react-hook-form"
import * as v from "valibot"
import { FormControl } from "../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../components/forms/formLabel.tsx"
import { InputDataCombobox } from "../../../../../components/inputs/inputDataCombobox.tsx"
import { InputPrice } from "../../../../../components/inputs/inputNumber.tsx"
import { InputText } from "../../../../../components/inputs/inputText.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"
import type { RecordTemplateFormProps } from "./recordTemplates.tsx"

const DEFAULT_TOTAL_YEARS = "3"

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

const amortizationTemplateSchema = v.pipe(
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
        ["currentYear"],
    ),
)

type AmortizationTemplateFormValues = v.InferOutput<typeof amortizationTemplateSchema>

export function AmortizationTemplateForm(props: RecordTemplateFormProps) {
    const { form: parentForm, onTemplateReadyChange } = props

    const templateForm = useForm<AmortizationTemplateFormValues>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: {
            assetLabel: "",
            originalPrice: "",
            currentYear: DEFAULT_TOTAL_YEARS,
            totalYears: DEFAULT_TOTAL_YEARS,
            idDotationAccount: "",
            idAmortizationAccount: "",
        },
        resolver: valibotResolver(amortizationTemplateSchema),
    })

    const accountsResponse = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    const accounts = accountsResponse.data ?? []

    const defaultsAppliedRef = useRef(false)

    useEffect(() => {
        if (defaultsAppliedRef.current || accounts.length === 0) return
        defaultsAppliedRef.current = true

        const dotationAccount = accounts.find((account) => account.number === "68112")
        const amortizationAccount = accounts.find((account) => account.number === "2818")

        if (dotationAccount) templateForm.setValue("idDotationAccount", dotationAccount.id)
        if (amortizationAccount) templateForm.setValue("idAmortizationAccount", amortizationAccount.id)
    }, [accounts, templateForm.setValue])

    const isReadyRef = useRef(false)

    function invalidateRows() {
        if (isReadyRef.current) {
            isReadyRef.current = false
            parentForm.setValue("rows", [])
            onTemplateReadyChange(false)
        }
    }

    async function computeAndSetRows() {
        const isValid = await templateForm.trigger()
        if (!isValid) {
            parentForm.setValue("rows", [])
            isReadyRef.current = false
            onTemplateReadyChange(false)
            return
        }

        const data = templateForm.getValues()
        const price = Number.parseFloat(data.originalPrice)
        const total = Number.parseInt(data.totalYears, 10)
        const annualAmount = (price / total).toFixed(2)

        const rows = [
            {
                idAccount: data.idDotationAccount,
                label: `Dotation ${data.assetLabel}`.trim(),
                debit: annualAmount,
                credit: "0",
                isComputedForJournalReport: true,
                isComputedForLedgerReport: true,
                isComputedForBalanceReport: true,
                isComputedForBalanceSheetReport: true,
                isComputedForIncomeStatementReport: true,
            },
            {
                idAccount: data.idAmortizationAccount,
                label: `Amortissement ${data.assetLabel}`.trim(),
                debit: "0",
                credit: annualAmount,
                isComputedForJournalReport: true,
                isComputedForLedgerReport: true,
                isComputedForBalanceReport: true,
                isComputedForBalanceSheetReport: true,
                isComputedForIncomeStatementReport: true,
            },
        ]

        parentForm.setValue("rows", rows)
        isReadyRef.current = true
        onTemplateReadyChange(true)
    }

    return (
        <FormProvider {...templateForm}>
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <FormField
                    control={templateForm.control}
                    name="assetLabel"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Libellé de l'immobilisation" isRequired={true} />
                            <FormControl>
                                <InputText
                                    value={field.value}
                                    onChange={(value) => {
                                        const label = value ?? ""
                                        field.onChange(label)
                                        parentForm.setValue("label", `Dotation aux amortissements - ${label}`)
                                        invalidateRows()
                                    }}
                                    placeholder="Ex : Ordinateur portable"
                                    autoFocus={false}
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
                <FormField
                    control={templateForm.control}
                    name="originalPrice"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Prix d'origine (HT)" isRequired={true} />
                            <FormControl>
                                <InputPrice
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value ?? "")
                                        invalidateRows()
                                    }}
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
                <FormField
                    control={templateForm.control}
                    name="currentYear"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Année en cours" isRequired={true} />
                            <FormControl>
                                <InputPrice
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value ?? "")
                                        invalidateRows()
                                    }}
                                    placeholder="Ex : 2"
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
                <FormField
                    control={templateForm.control}
                    name="totalYears"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Nombre d'années de l'amortissement" isRequired={true} />
                            <FormControl>
                                <InputPrice
                                    value={field.value}
                                    onChange={(value) => {
                                        field.onChange(value ?? "")
                                        invalidateRows()
                                    }}
                                    placeholder="Ex : 3"
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
                <FormField
                    control={templateForm.control}
                    name="idDotationAccount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Compte de dotation" isRequired={true} />
                            <FormControl>
                                <InputDataCombobox
                                    value={field.value || null}
                                    onChange={(value) => {
                                        field.onChange(value ?? "")
                                        invalidateRows()
                                    }}
                                    routeDefinition={readAllAccountsRouteDefinition}
                                    body={{
                                        idYear: props.idYear,
                                    }}
                                    placeholder="Ex : 68112"
                                    getOption={(account) => ({
                                        key: account.id,
                                        label: `${account.number} - ${account.label}`,
                                    })}
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
                <FormField
                    control={templateForm.control}
                    name="idAmortizationAccount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Compte d'amortissement" isRequired={true} />
                            <FormControl>
                                <InputDataCombobox
                                    value={field.value || null}
                                    onChange={(value) => {
                                        field.onChange(value ?? "")
                                        invalidateRows()
                                    }}
                                    routeDefinition={readAllAccountsRouteDefinition}
                                    body={{
                                        idYear: props.idYear,
                                    }}
                                    placeholder="Ex : 2818"
                                    getOption={(account) => ({
                                        key: account.id,
                                        label: `${account.number} - ${account.label}`,
                                    })}
                                />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
                <Button onClick={computeAndSetRows}>
                    <ButtonOutlineContent leftIcon={<IconCalculator />} text="Calculer les mouvements" />
                </Button>
                {parentForm.watch("rows")?.length > 0 ? (
                    <div
                        className={css({
                            width: "100%",
                            padding: "2",
                            backgroundColor: "white",
                            borderRadius: "sm",
                            border: "1px solid",
                            borderColor: "neutral/10",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1",
                        })}
                    >
                        <span
                            className={css({
                                fontSize: "xs",
                                fontWeight: "semibold",
                                color: "neutral/50",
                            })}
                        >
                            Mouvements générés
                        </span>
                        {(parentForm.watch("rows") as Array<{ label?: string; debit?: string; credit?: string }>).map(
                            (row, index) => (
                                <div
                                    key={`row_${index}`}
                                    className={css({
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        fontSize: "sm",
                                    })}
                                >
                                    <span className={css({ color: "neutral" })}>{row.label}</span>
                                    <span className={css({ color: "neutral", fontWeight: "medium" })}>
                                        {Number(row.debit) > 0 ? `${row.debit} (débit)` : `${row.credit} (crédit)`}
                                    </span>
                                </div>
                            ),
                        )}
                    </div>
                ) : null}
            </div>
        </FormProvider>
    )
}
