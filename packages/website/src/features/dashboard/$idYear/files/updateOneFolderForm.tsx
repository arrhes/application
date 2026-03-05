import { readAllFoldersRouteDefinition, updateOneFolderRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPencil } from "@tabler/icons-react"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/formControl.js"
import { FormError } from "../../../../components/forms/formError.js"
import { FormField } from "../../../../components/forms/formField.js"
import { FormItem } from "../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../components/forms/formRoot.js"
import { InputText } from "../../../../components/inputs/inputText.js"
import { toast } from "../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"

export function UpdateOneFolderForm(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    onSuccess?: () => void
}) {
    return (
        <FormRoot
            schema={updateOneFolderRouteDefinition.schemas.body}
            defaultValues={{
                idFolder: props.folder.id,
                idYear: props.folder.idYear,
                name: props.folder.name,
            }}
            submitButtonProps={{
                leftIcon: <IconPencil />,
                text: "Modifier le dossier",
            }}
            onSubmit={async (data) => {
                const updateResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneFolderRouteDefinition,
                    body: {
                        idFolder: props.folder.id,
                        idYear: data.idYear,
                        name: data.name,
                    },
                })
                if (updateResponse.ok === false) {
                    toast({ title: "Impossible de modifier le dossier", variant: "error" })
                    return false
                }
                toast({ title: "Dossier modifié avec succès", variant: "success" })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await invalidateData({
                    routeDefinition: readAllFoldersRouteDefinition,
                    body: {
                        idYear: props.folder.idYear,
                    },
                })
                props.onSuccess?.()
            }}
        >
            {(form) => (
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel label="Nom du dossier" isRequired />
                            <FormControl>
                                <InputText value={field.value} onChange={field.onChange} autoFocus />
                            </FormControl>
                            <FormError />
                        </FormItem>
                    )}
                />
            )}
        </FormRoot>
    )
}
