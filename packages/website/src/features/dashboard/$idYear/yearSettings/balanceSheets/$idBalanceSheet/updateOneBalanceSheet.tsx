import {
    readAllBalanceSheetsRouteDefinition,
    readOneBalanceSheetRouteDefinition,
    updateOneBalanceSheetRouteDefinition,
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
import { InputText } from "../../../../../../components/inputs/inputText.tsx"
import { InputToggle } from "../../../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"
import { BalanceSheetsSelect } from "../balanceSheetSelect.tsx"

export function UpdateOneBalanceSheet(props: {
    balanceSheet: v.InferOutput<typeof returnedSchemas.balanceSheet>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier la ligne de bilan" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneBalanceSheetRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.balanceSheet,
                            idBalanceSheet: props.balanceSheet.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Modifier la ligne de bilan",
                        }}
                        onSubmit={async (data) => {
                            const updateBalanceSheetResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneBalanceSheetRouteDefinition,
                                body: data,
                            })
                            if (updateBalanceSheetResponse.ok === false) {
                                toast({ title: "Impossible de modifier la ligne de bilan", variant: "error" })
                                return false
                            }

                            toast({ title: "Ligne de bilan modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllBalanceSheetsRouteDefinition,
                                    body: {
                                        idYear: props.balanceSheet.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneBalanceSheetRouteDefinition,
                                    body: {
                                        idBalanceSheet: props.balanceSheet.id,
                                        idYear: props.balanceSheet.idYear,
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
                                                tooltip="Le numéro qui définit la ligne de bilan ajoutée."
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
                                                tooltip="Le libellé qui définit la ligne de bilan ajoutée."
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
                                    name="idBalanceSheetParent"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Ligne de bilan parent"
                                                tooltip="La ligne de bilan parent de la ligne créée."
                                            />
                                            <FormControl>
                                                <BalanceSheetsSelect
                                                    idOrganization={props.balanceSheet.idOrganization}
                                                    idYear={props.balanceSheet.idYear}
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    side={null}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="side"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Côté du bilan ?" />
                                            <FormControl>
                                                <InputToggle
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    options={[
                                                        { label: "Actif", value: "asset" },
                                                        { label: "Passif", value: "liability" },
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
