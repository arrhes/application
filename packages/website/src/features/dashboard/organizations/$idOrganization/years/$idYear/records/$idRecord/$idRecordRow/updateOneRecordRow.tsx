import {
    readAllAccountsRouteDefinition,
    readAllRecordRowsRouteDefinition,
    readOneRecordRowRouteDefinition,
    updateOneRecordRowRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
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
import { InputPrice } from "../../../../../../../../../components/inputs/inputNumber.tsx"
import { InputText } from "../../../../../../../../../components/inputs/inputText.tsx"
import { InputToggle } from "../../../../../../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../../../../utilities/invalidateData.ts"

export function UpdateOneRecordRow(props: {
    recordRow: v.InferOutput<typeof returnedSchemas.recordRow>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier un mouvement" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneRecordRowRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.recordRow,
                            idRecordRow: props.recordRow.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPencil />,
                            text: "Modifier le mouvement",
                        }}
                        onSubmit={async (data) => {
                            const updateRecordRowResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneRecordRowRouteDefinition,
                                body: data,
                            })
                            if (updateRecordRowResponse.ok === false) {
                                toast({ title: "Impossible de modifier le mouvement", variant: "error" })
                                return false
                            }

                            toast({ title: "Mouvement modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllRecordRowsRouteDefinition,
                                    body: {
                                        idYear: props.recordRow.idYear,
                                        idRecord: props.recordRow.idRecord,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readAllRecordRowsRouteDefinition,
                                    body: {
                                        idYear: props.recordRow.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneRecordRowRouteDefinition,
                                    body: {
                                        idYear: props.recordRow.idYear,
                                        idRecordRow: props.recordRow.id,
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
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Libellé" isRequired={false} />
                                            <FormControl>
                                                <InputText
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    autoFocus={true}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idAccount"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Compte" isRequired={true} />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllAccountsRouteDefinition}
                                                    body={{
                                                        idYear: props.recordRow.idYear,
                                                    }}
                                                    placeholder="Sélectionner un compte"
                                                    getOption={(journal) => ({
                                                        key: journal.id,
                                                        label: `${journal.number} - ${journal.label}`,
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                        gap: "1",
                                    })}
                                >
                                    <FormField
                                        control={form.control}
                                        name="debit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel label="Débit" isRequired={false} />
                                                <FormControl>
                                                    <InputPrice value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="credit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel label="Crédit" isRequired={false} />
                                                <FormControl>
                                                    <InputPrice value={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div
                                    className={css({
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <FormLabel label="Mouvement ajouté aux calculs ?" isRequired={false} />
                                    <div
                                        className={css({
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            alignItems: "flex-start",
                                            flexWrap: "wrap",
                                            gap: "0.5rem",
                                        })}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="isComputedForJournalReport"
                                            render={({ field }) => (
                                                <FormItem className={css({ width: "fit-content" })}>
                                                    <FormLabel label="Journal" isRequired={true} />
                                                    <FormControl>
                                                        <InputToggle
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            options={[
                                                                { value: true, label: "Oui" },
                                                                { value: false, label: "Non" },
                                                            ]}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isComputedForLedgerReport"
                                            render={({ field }) => (
                                                <FormItem className={css({ width: "fit-content" })}>
                                                    <FormLabel label="Grand-livre" isRequired={true} />
                                                    <FormControl>
                                                        <InputToggle
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            options={[
                                                                { value: true, label: "Oui" },
                                                                { value: false, label: "Non" },
                                                            ]}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isComputedForBalanceReport"
                                            render={({ field }) => (
                                                <FormItem className={css({ width: "fit-content" })}>
                                                    <FormLabel label="Balance" isRequired={true} />
                                                    <FormControl>
                                                        <InputToggle
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            options={[
                                                                { value: true, label: "Oui" },
                                                                { value: false, label: "Non" },
                                                            ]}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isComputedForBalanceSheetReport"
                                            render={({ field }) => (
                                                <FormItem className={css({ width: "fit-content" })}>
                                                    <FormLabel label="Bilan" isRequired={true} />
                                                    <FormControl>
                                                        <InputToggle
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            options={[
                                                                { value: true, label: "Oui" },
                                                                { value: false, label: "Non" },
                                                            ]}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isComputedForIncomeStatementReport"
                                            render={({ field }) => (
                                                <FormItem className={css({ width: "fit-content" })}>
                                                    <FormLabel label="Compte de résultat" isRequired={true} />
                                                    <FormControl>
                                                        <InputToggle
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            options={[
                                                                { value: true, label: "Oui" },
                                                                { value: false, label: "Non" },
                                                            ]}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        )}
                    </FormRoot>
                </Drawer.Body>
            </Drawer.Content>
        </Drawer.Root>
    )
}
