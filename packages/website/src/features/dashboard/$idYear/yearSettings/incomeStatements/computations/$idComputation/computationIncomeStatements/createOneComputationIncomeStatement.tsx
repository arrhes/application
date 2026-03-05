import {
    createOneComputationIncomeStatementRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../../../components/forms/formRoot.tsx"
import { InputDataCombobox } from "../../../../../../../../components/inputs/inputDataCombobox.tsx"
import { InputToggle } from "../../../../../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../utilities/invalidateData.ts"

export function CreateOneComputationIncomeStatement(props: {
    computation: v.InferOutput<typeof returnedSchemas.computation>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Ajouter un nouveau terme au calcul" />
                <Drawer.Body>
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
                                toast({ title: "Impossible d'ajouter le terme du calcul", variant: "error" })
                                return false
                            }

                            toast({ title: "Terme du calcul ajouté avec succès", variant: "success" })
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
