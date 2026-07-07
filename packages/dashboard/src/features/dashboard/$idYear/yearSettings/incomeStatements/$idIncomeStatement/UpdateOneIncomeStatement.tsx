import {
    readAllIncomeStatementsRouteDefinition,
    readOneIncomeStatementRouteDefinition,
    updateOneIncomeStatementRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import type { ComponentProps, JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../../components/forms/FormRoot.tsx"
import { InputDataCombobox } from "../../../../../../components/InputDataCombobox.tsx"
import { useTabs } from "../../../../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneIncomeStatement(props: {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    children: JSX.Element
    className?: ComponentProps<typeof Button>["className"]
}) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={css.raw(
                {
                    padding: "0",
                    border: "none",
                    backgroundColor: "transparent",
                    width: "fit-content",
                    height: "fit-content",
                },
                props.className,
            )}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Modifier la ligne de compte de résultat",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={updateOneIncomeStatementRouteDefinition.schemas.body}
                            defaultValues={{
                                ...props.incomeStatement,
                                idIncomeStatement: props.incomeStatement.id,
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Modifier la ligne de compte de résultat",
                            }}
                            onSubmit={async (data) => {
                                const updateIncomeStatementResponse = await getResponseBodyFromAPI({
                                    routeDefinition: updateOneIncomeStatementRouteDefinition,
                                    body: data,
                                })
                                if (updateIncomeStatementResponse.ok === false) {
                                    toast({
                                        title: "Impossible de modifier la ligne de compte de résultat",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Ligne de compte de résultat modifiée avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await Promise.all([
                                    invalidateData({
                                        routeDefinition: readAllIncomeStatementsRouteDefinition,
                                        body: {
                                            idYear: props.incomeStatement.idYear,
                                        },
                                    }),
                                    invalidateData({
                                        routeDefinition: readOneIncomeStatementRouteDefinition,
                                        body: {
                                            idIncomeStatement: props.incomeStatement.id,
                                            idYear: props.incomeStatement.idYear,
                                        },
                                    }),
                                ])

                                closeTab(r.current)
                            }}
                        >
                            {(form) => (
                                <Fragment>
                                    <FormField
                                        control={form.control}
                                        name="number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Numéro"
                                                    tooltip="Le numéro qui définit la ligne de compte de résultat ajoutée."
                                                    isRequired
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="label"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Libellé"
                                                    tooltip="Le libellé qui définit la ligne de compte de résultat ajoutée."
                                                    isRequired
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        autoFocus
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="idIncomeStatementParent"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Ligne de compte de résultat parent"
                                                    tooltip="La ligne de compte de résultat parent de la ligne créée."
                                                />
                                                <FormControl>
                                                    <InputDataCombobox
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        routeDefinition={readAllIncomeStatementsRouteDefinition}
                                                        body={{
                                                            idYear: props.incomeStatement.idYear,
                                                        }}
                                                        placeholder="Sélectionner une ligne de compte de résultat"
                                                        getOption={(incomeStatement) => ({
                                                            key: incomeStatement.id,
                                                            label: `(${incomeStatement.number}) ${incomeStatement.label}`,
                                                        })}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                </Fragment>
                            )}
                        </FormRoot>
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
