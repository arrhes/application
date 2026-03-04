import {
    readAllIncomeStatementsRouteDefinition,
    readOneIncomeStatementRouteDefinition,
    updateOneIncomeStatementRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../../components/forms/formRoot.tsx"
import { InputDataCombobox } from "../../../../../../components/inputs/inputDataCombobox.tsx"
import { InputText } from "../../../../../../components/inputs/inputText.tsx"
import { Drawer } from "../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneIncomeStatement(props: {
    incomeStatement: v.InferOutput<typeof returnedSchemas.incomeStatement>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier la ligne de compte de résultat" />
                <Drawer.Body>
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

                            toast({ title: "Ligne de compte de résultat modifiée avec succès", variant: "success" })
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

                            setOpen(false)
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
                                                <InputText value={field.value} onChange={field.onChange} />
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
                                                <InputText value={field.value} onChange={field.onChange} autoFocus />
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
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
