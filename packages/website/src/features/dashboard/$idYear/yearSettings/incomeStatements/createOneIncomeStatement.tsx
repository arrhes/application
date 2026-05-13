import {
    createOneIncomeStatementRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../components/forms/formRoot.tsx"
import { InputDataCombobox } from "../../../../../components/inputDataCombobox.tsx"
import { useTabs } from "../../../../../contexts/tabs/tabsContext.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function CreateOneIncomeStatement(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
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
                    "Ajouter une nouvelle ligne de compte de résultat",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={createOneIncomeStatementRouteDefinition.schemas.body}
                            defaultValues={{
                                idYear: props.idYear,
                                idIncomeStatementParent: null,
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Ajouter la ligne de compte de résultat",
                            }}
                            onSubmit={async (data) => {
                                const createIncomeStatementResponse = await getResponseBodyFromAPI({
                                    routeDefinition: createOneIncomeStatementRouteDefinition,
                                    body: data,
                                })
                                if (createIncomeStatementResponse.ok === false) {
                                    toast({
                                        title: "Impossible d'ajouter la ligne de compte de résultat",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Ligne de compte de résultat ajouté avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await invalidateData({
                                    routeDefinition: readAllIncomeStatementsRouteDefinition,
                                    body: {
                                        idYear: props.idYear,
                                    },
                                })

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
                                                            idYear: props.idYear,
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
