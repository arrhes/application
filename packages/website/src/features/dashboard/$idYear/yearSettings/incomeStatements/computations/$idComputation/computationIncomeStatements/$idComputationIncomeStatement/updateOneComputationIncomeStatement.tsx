import {
    readAllComputationIncomeStatementsRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readOneComputationIncomeStatementRouteDefinition,
    updateOneComputationIncomeStatementRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../../../../components/forms/formRoot.tsx"
import { InputDataCombobox } from "../../../../../../../../../components/inputs/inputDataCombobox.tsx"
import { InputToggle } from "../../../../../../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../../utilities/invalidateData.ts"

export function UpdateOneComputationIncomeStatement(props: {
    computationIncomeStatement: v.InferOutput<typeof returnedSchemas.computationIncomeStatement>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier le terme du calcul" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneComputationIncomeStatementRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.computationIncomeStatement,
                            idComputationIncomeStatement: props.computationIncomeStatement.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Modifier le terme du calcul",
                        }}
                        onSubmit={async (data) => {
                            const updateComputationIncomeStatementResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneComputationIncomeStatementRouteDefinition,
                                body: data,
                            })
                            if (updateComputationIncomeStatementResponse.ok === false) {
                                toast({ title: "Impossible de modifier le terme du calcul", variant: "error" })
                                return false
                            }

                            toast({ title: "Terme du calcul modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllComputationIncomeStatementsRouteDefinition,
                                    body: {
                                        idYear: props.computationIncomeStatement.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneComputationIncomeStatementRouteDefinition,
                                    body: {
                                        idComputationIncomeStatement: props.computationIncomeStatement.id,
                                        idYear: props.computationIncomeStatement.idYear,
                                    },
                                }),
                            ])

                            setOpen(false)
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
                                                        idYear: props.computationIncomeStatement.idYear,
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
                                                        { label: "Addition", value: "plus" },
                                                        { label: "Soustraction", value: "minus" },
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
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
