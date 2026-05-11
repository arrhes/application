import { readAllFoldersRouteDefinition, updateOneFolderRouteDefinition } from "@arrhes/application-metadata/routes"
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

function getDescendantFolderIds(parameters: {
    folderId: string
    folders: Array<v.InferOutput<typeof returnedSchemas.folder>>
}) {
    const childrenByParentId = new Map<string, Array<string>>()

    for (const folder of parameters.folders) {
        if (folder.idFolderParent === null) {
            continue
        }

        const currentChildren = childrenByParentId.get(folder.idFolderParent) ?? []
        childrenByParentId.set(folder.idFolderParent, [
            ...currentChildren,
            folder.id,
        ])
    }

    const descendants = new Set<string>()
    const stack = [
        ...(childrenByParentId.get(parameters.folderId) ?? []),
    ]

    while (stack.length > 0) {
        const current = stack.pop()

        if (current === undefined || descendants.has(current)) {
            continue
        }

        descendants.add(current)
        stack.push(...(childrenByParentId.get(current) ?? []))
    }

    return descendants
}

export function MoveOneFolderForm(props: {
    folder: v.InferOutput<typeof returnedSchemas.folder>
    onSuccess?: () => void
}) {
    const foldersResponse = useDataFromAPI({
        routeDefinition: readAllFoldersRouteDefinition,
        body: {
            idYear: props.folder.idYear,
        },
    })

    const folderOptions = useMemo(() => {
        const allFolders = foldersResponse.data ?? []
        const blockedFolderIds = getDescendantFolderIds({
            folderId: props.folder.id,
            folders: allFolders,
        })
        blockedFolderIds.add(props.folder.id)

        return [
            {
                key: rootOptionKey,
                label: "/",
            },
            ...allFolders
                .filter((folder) => !blockedFolderIds.has(folder.id))
                .map((folder) => ({
                    key: folder.id,
                    label: folder.name,
                })),
        ]
    }, [
        foldersResponse.data,
        props.folder.id,
    ])

    return (
        <FormRoot
            schema={updateOneFolderRouteDefinition.schemas.body}
            defaultValues={{
                idFolder: props.folder.id,
                idYear: props.folder.idYear,
                idFolderParent: props.folder.idFolderParent,
            }}
            submitButtonProps={{
                leftIcon: <IconArrowsMove />,
                text: "Déplacer le dossier",
            }}
            onSubmit={async (data) => {
                const updateResponse = await getResponseBodyFromAPI({
                    routeDefinition: updateOneFolderRouteDefinition,
                    body: {
                        idFolder: props.folder.id,
                        idYear: data.idYear,
                        idFolderParent: data.idFolderParent,
                    },
                })

                if (updateResponse.ok === false) {
                    toast({
                        title: "Impossible de déplacer le dossier",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Dossier déplacé avec succès",
                    variant: "success",
                })
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
                <>
                    <FormField
                        control={form.control}
                        name="idFolderParent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Dossier parent de destination"
                                    isRequired={false}
                                    description="Choisissez un dossier parent ou déplacez le dossier à la racine."
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
