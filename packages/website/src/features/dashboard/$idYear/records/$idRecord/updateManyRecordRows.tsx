import {
    readAllRecordRowsRouteDefinition,
    updateManyRecordRowsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import { type JSX, useState } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/formControl.tsx"
import { FormError } from "../../../../../components/forms/formError.tsx"
import { FormField } from "../../../../../components/forms/formField.tsx"
import { FormItem } from "../../../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../../../components/forms/formRoot.tsx"
import { InputText } from "../../../../../components/inputs/inputText.tsx"
import { InputToggle } from "../../../../../components/inputs/inputToggle.tsx"
import { Drawer } from "../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function UpdateManyRecordRows(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier tous les mouvements" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateManyRecordRowsRouteDefinition.schemas.body}
                        defaultValues={{
                            idYear: props.record.idYear,
                            idRecord: props.record.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPencil />,
                            text: "Modifier les mouvements",
                        }}
                        onSubmit={async (data) => {
                            const updateManyRecordRowsResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateManyRecordRowsRouteDefinition,
                                body: data,
                            })
                            if (updateManyRecordRowsResponse.ok === false) {
                                toast({ title: "Impossible de modifier les mouvements", variant: "error" })
                                return false
                            }

                            toast({ title: "Mouvements modifiés avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllRecordRowsRouteDefinition,
                                    body: {
                                        idYear: props.record.idYear,
                                        idRecord: props.record.id,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readAllRecordRowsRouteDefinition,
                                    body: {
                                        idYear: props.record.idYear,
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
