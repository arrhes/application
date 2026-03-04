import { fileSchema } from "@arrhes/application-metadata/components"
import {
    generateFilePutSignedUrlRouteDefinition,
    readAllFilesRouteDefinition,
    readOneFileRouteDefinition,
    updateOneFileRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPencil } from "@tabler/icons-react"
import { Fragment } from "react/jsx-runtime"
import * as v from "valibot"
import { FormControl } from "../../../../../components/forms/formControl.js"
import { FormError } from "../../../../../components/forms/formError.js"
import { FormField } from "../../../../../components/forms/formField.js"
import { FormItem } from "../../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../../components/forms/formRoot.js"
import { InputFile } from "../../../../../components/inputs/inputFile.js"
import { InputText } from "../../../../../components/inputs/inputText.js"
import { toast } from "../../../../../contexts/toasts/useToast.js"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../../utilities/invalidateData.js"

export function UpdateOneFileForm(props: { file: v.InferOutput<typeof returnedSchemas.file>; onSuccess?: () => void }) {
    return (
        <FormRoot
            schema={v.intersect([
                updateOneFileRouteDefinition.schemas.body,
                v.object({ file: v.optional(fileSchema) }),
            ])}
            defaultValues={{
                ...props.file,
                idFile: props.file.id,
            }}
            submitButtonProps={{
                leftIcon: <IconPencil />,
                text: "Modifier le fichier",
            }}
            onSubmit={async (data) => {
                const updateFileResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneFileRouteDefinition,
                    body: {
                        idFile: props.file.id,
                        idYear: data.idYear,
                        reference: data.reference,
                        name: data.name,
                    },
                })
                if (updateFileResponse.ok === false) {
                    toast({ title: "Impossible de modifier le fichier", variant: "error" })
                    return false
                }

                if (data.file !== undefined) {
                    const signedUrlResponse = await getResponseBodyFromAPI({
                        routeDefinition: generateFilePutSignedUrlRouteDefinition,
                        body: {
                            idYear: props.file.idYear,
                            idFile: updateFileResponse.data.id,
                            type: data.file.type,
                            size: data.file.size,
                        },
                    })
                    if (signedUrlResponse.ok === false) {
                        toast({ title: "Impossible de télécharger le fichier", variant: "error" })
                        return false
                    }
                    const uploadFileResponse = await fetch(signedUrlResponse.data.url, {
                        method: "PUT",
                        body: data.file,
                    })
                    if (uploadFileResponse.ok === false) {
                        toast({ title: "Le fichier ne peut pas être téléchargé", variant: "error" })
                        return false
                    }
                }

                toast({ title: "Fichier modifié avec succès", variant: "success" })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await Promise.all([
                    invalidateData({
                        routeDefinition: readAllFilesRouteDefinition,
                        body: {
                            idYear: props.file.idYear,
                        },
                    }),
                    invalidateData({
                        routeDefinition: readOneFileRouteDefinition,
                        body: {
                            idFile: props.file.id,
                            idYear: props.file.idYear,
                        },
                    }),
                ])

                props.onSuccess?.()
            }}
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel label="Fichier" isRequired />
                                <FormControl>
                                    <InputFile value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="reference"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel label="Référence" isRequired />
                                <FormControl>
                                    <InputText value={field.value} onChange={field.onChange} autoFocus />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Nom du fichier"
                                    isRequired={false}
                                    description={undefined}
                                    tooltip={undefined}
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
    )
}
