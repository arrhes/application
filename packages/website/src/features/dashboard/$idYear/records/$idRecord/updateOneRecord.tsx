import {
    readAllFilesRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllRecordLabelsRouteDefinition,
    readAllRecordsRouteDefinition,
    readOneRecordRouteDefinition,
    updateOneRecordRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
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
import { InputDataCombobox } from "../../../../../components/inputs/inputDataCombobox.tsx"
import { InputDate } from "../../../../../components/inputs/inputDate.tsx"
import { InputText } from "../../../../../components/inputs/inputText.tsx"
import { Drawer } from "../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function UpdateOneRecord(props: {
    record: v.InferOutput<typeof returnedSchemas.record>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier une écriture" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneRecordRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.record,
                            idRecord: props.record.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPencil />,
                            text: "Modifier l'écriture",
                        }}
                        onSubmit={async (data) => {
                            const updateRecordResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneRecordRouteDefinition,
                                body: data,
                            })
                            if (updateRecordResponse.ok === false) {
                                toast({ title: "Impossible de modifier l'écriture", variant: "error" })
                                return false
                            }

                            toast({ title: "Écriture modifiée avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllRecordsRouteDefinition,
                                    body: {
                                        idYear: props.record.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneRecordRouteDefinition,
                                    body: {
                                        idYear: props.record.idYear,
                                        idRecord: props.record.id,
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
                                            <FormLabel label="Libellé" isRequired={true} />
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
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Date" isRequired={true} />
                                            <FormControl>
                                                <InputDate value={field.value} onChange={field.onChange} />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idJournal"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Journal" isRequired={false} />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllJournalsRouteDefinition}
                                                    body={{
                                                        idYear: props.record.idYear,
                                                    }}
                                                    placeholder="Sélectionner un journal"
                                                    getOption={(journal) => ({
                                                        key: journal.id,
                                                        label: `(${journal.code}) ${journal.label}`,
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idRecordLabel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Catégorie" isRequired={false} />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllRecordLabelsRouteDefinition}
                                                    body={{
                                                        idYear: props.record.idYear,
                                                    }}
                                                    placeholder="Sélectionner une catégorie"
                                                    getOption={(recordLabel) => ({
                                                        key: recordLabel.id,
                                                        label: `${recordLabel.label}`,
                                                    })}
                                                />
                                            </FormControl>
                                            <FormError />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="idFile"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel label="Pièce justificative" isRequired={false} />
                                            <FormControl>
                                                <InputDataCombobox
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    routeDefinition={readAllFilesRouteDefinition}
                                                    body={{
                                                        idYear: props.record.idYear,
                                                    }}
                                                    placeholder="Sélectionner une pièce justificative"
                                                    getOption={(file) => ({
                                                        key: file.id,
                                                        label: file.reference ?? "",
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
