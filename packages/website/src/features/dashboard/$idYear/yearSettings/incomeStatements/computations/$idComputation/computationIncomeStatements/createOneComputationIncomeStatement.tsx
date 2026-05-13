import {
    createOneComputationIncomeStatementRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputToggle, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../../../components/forms/formRoot.tsx"
import { InputDataCombobox } from "../../../../../../../../components/inputDataCombobox.tsx"
import { useTabs } from "../../../../../../../../contexts/tabs/tabsContext.tsx"
import { getResponseBodyFromAPI } from "../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"

export function CreateOneComputationIncomeStatement(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
    children: JSX.Element
}) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={css({
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            })}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Ajouter un nouveau terme au calcul",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={createOneComputationIncomeStatementRouteDefinition.schemas.body}
                            defaultValues={{
                                idYear: props.computation.idYear,
                                operation: "plus",
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Ajouter le terme du calcul",
                            }}
                            onSubmit={async (data) => {
                                const createComputationIncomeStatementResponse = await getResponseBodyFromAPI({
                                    routeDefinition: createOneComputationIncomeStatementRouteDefinition,
                                    body: data,
                                })
                                if (createComputationIncomeStatementResponse.ok === false) {
                                    toast({
                                        title: "Impossible d'ajouter le terme du calcul",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Terme du calcul ajouté avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await invalidateData({
                                    routeDefinition: readAllComputationIncomeStatementsRouteDefinition,
                                    body: {
                                        idYear: props.computation.idYear,
                                    },
                                })

                                closeTab(r.current)
                            }}
                        >
                            {(form) => (
                                <Fragment>
                                    <FormField
                                        control={form.control}
                                        name="idIncomeStatement"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Poste du compte de résultat"
                                                    tooltip="Le poste du compte de résultat à utiliser pour cette opération."
                                                    isRequired
                                                />
                                                <FormControl>
                                                    <InputDataCombobox
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        routeDefinition={readAllIncomeStatementsRouteDefinition}
                                                        body={{
                                                            idYear: props.computation.idYear,
                                                        }}
                                                        placeholder="Sélectionner un poste du compte de résultat"
                                                        getOption={(incomeStatement) => ({
                                                            key: incomeStatement.id,
                                                            label: `${incomeStatement.number} - ${incomeStatement.label}`,
                                                        })}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="operation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Opération"
                                                    tooltip="L'opération à effectuer avec cette ligne de compte de résultat."
                                                    isRequired
                                                />
                                                <FormControl>
                                                    <InputToggle
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        options={[
                                                            {
                                                                label: "Addition",
                                                                value: "plus",
                                                            },
                                                            {
                                                                label: "Soustraction",
                                                                value: "minus",
                                                            },
                                                        ]}
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
