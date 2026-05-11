import {
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    updateOneFileRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { InputSelect, toast } from "@arrhes/ui"
import { IconArrowsMove } from "@tabler/icons-react"
import { useMemo } from "react"
import type * as v from "valibot"
import { FormControl } from "../../../../components/forms/formControl.js"
import { FormError } from "../../../../components/forms/formError.js"
import { FormField } from "../../../../components/forms/formField.js"
import { FormItem } from "../../../../components/forms/formItem.js"
import { FormLabel } from "../../../../components/forms/formLabel.js"
import { FormRoot } from "../../../../components/forms/formRoot.js"
import { getResponseBodyFromAPI } from "../../../../utilities/getResponseBodyFromAPI.js"
import { invalidateData } from "../../../../utilities/invalidateData.js"
import { useDataFromAPI } from "../../../../utilities/useHTTPData.ts"

const rootOptionKey = "__root__"

export function MoveOneFileForm(props: { file: v.InferOutput<typeof returnedSchemas.file>; onSuccess?: () => void }) {
    const foldersResponse = useDataFromAPI({
        routeDefinition: readAllFoldersRouteDefinition,
        body: {},
    })

    const folderOptions = useMemo(
        () => [
            {
                key: rootOptionKey,
                label: "/",
            },
            ...(foldersResponse.data ?? []).map((folder) => ({
                key: folder.id,
                label: folder.name,
            })),
        ],
        [
            foldersResponse.data,
        ],
    )

    return (
        <FormRoot
            schema={updateOneFileRouteDefinition.schemas.body}
            defaultValues={{
                idFile: props.file.id,
                idFolder: props.file.idFolder,
            }}
            submitButtonProps={{
                leftIcon: <IconArrowsMove />,
                text: "Déplacer le fichier",
            }}
            onSubmit={async (data) => {
                const updateResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneFileRouteDefinition,
                    body: {
                        idFile: props.file.id,
                        idFolder: data.idFolder,
                    },
                })

                if (updateResponse.ok === false) {
                    toast({
                        title: "Impossible de déplacer le fichier",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Fichier déplacé avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await invalidateData({
                    routeDefinition: readAllFilesRouteDefinition,
                    body: {},
                })

                props.onSuccess?.()
            }}
        >
            {(form) => (
                <>
                    <FormField
                        control={form.control}
                        name="idFolder"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Dossier de destination"
                                    isRequired={false}
                                    description="Choisissez un dossier ou déplacez le fichier à la racine."
                                />
                                <FormControl>
                                    <InputSelect
                                        value={(field.value ?? rootOptionKey) as string}
                                        onChange={(value) =>
                                            field.onChange(value === rootOptionKey ? null : (value ?? null))
                                        }
                                        options={folderOptions}
                                        placeholder="Sélectionner un dossier"
                                        isLoading={foldersResponse.isPending}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                </>
            )}
        </FormRoot>
    )
}
