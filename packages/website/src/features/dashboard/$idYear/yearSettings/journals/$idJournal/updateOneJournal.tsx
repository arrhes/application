import {
    readAllJournalsRouteDefinition,
    readOneJournalRouteDefinition,
    updateOneJournalRouteDefinition,
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
import { Drawer } from "../../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../../utilities/invalidateData.ts"

export function UpdateOneJournal(props: {
    journal: v.InferOutput<typeof returnedSchemas.journal>
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)

    return (
        <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger>{props.children}</Drawer.Trigger>
            <Drawer.Content>
                <Drawer.Header title="Modifier le journal" />
                <Drawer.Body>
                    <FormRoot
                        schema={updateOneJournalRouteDefinition.schemas.body}
                        defaultValues={{
                            ...props.journal,
                            idJournal: props.journal.id,
                        }}
                        submitButtonProps={{
                            leftIcon: <IconPlus />,
                            text: "Modifier le journal",
                        }}
                        onSubmit={async (data) => {
                            const updateJournalResponse = await getResponseBodyFromAPI({
                                routeDefinition: updateOneJournalRouteDefinition,
                                body: data,
                            })
                            if (updateJournalResponse.ok === false) {
                                toast({ title: "Impossible de modifier le journal", variant: "error" })
                                return false
                            }

                            toast({ title: "Journal modifié avec succès", variant: "success" })
                            return true
                        }}
                        onCancel={undefined}
                        onSuccess={async () => {
                            await Promise.all([
                                invalidateData({
                                    routeDefinition: readAllJournalsRouteDefinition,
                                    body: {
                                        idYear: props.journal.idYear,
                                    },
                                }),
                                invalidateData({
                                    routeDefinition: readOneJournalRouteDefinition,
                                    body: {
                                        idJournal: props.journal.id,
                                        idYear: props.journal.idYear,
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
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Code"
                                                tooltip="Le code qui référence le journal ajouté."
                                                isRequired={true}
                                            />
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
                                    name="label"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                label="Libellé"
                                                tooltip="Le libellé qui définit le journal ajouté."
                                                isRequired={false}
                                            />
                                            <FormControl>
                                                <InputText value={field.value} onChange={field.onChange} />
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
