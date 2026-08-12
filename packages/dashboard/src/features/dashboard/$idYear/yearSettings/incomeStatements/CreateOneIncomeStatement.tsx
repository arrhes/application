import {
    createOneIncomeStatementRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
} from "@comptasse/application-metadata/routes"
import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import { Button, InputText, toast } from "@comptasse/ui"
import { IconPlus } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../components/forms/FormRoot.tsx"
import { InputDataCombobox } from "../../../../../components/InputDataCombobox.tsx"
import { useRightPanel } from "../../../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function CreateOneIncomeStatement(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    children: JSX.Element
}) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
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

                closePanel()
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
    )

    return (
        <Button
            className={{
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            }}
            onClick={() => openPanel(form, "Ajouter une ligne de compte de résultat")}
        >
            {props.children}
        </Button>
    )
}
