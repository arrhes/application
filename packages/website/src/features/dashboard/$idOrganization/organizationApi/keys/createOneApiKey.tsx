import { createOneApiKeyRouteDefinition, readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { IconPlus } from "@tabler/icons-react"
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
import { Drawer } from "../../../../../components/overlays/drawer/drawer.tsx"
import { toast } from "../../../../../contexts/toasts/useToast.ts"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"
import { RawKeyDisplay } from "./rawKeyDisplay.tsx"

export function CreateOneApiKey(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: JSX.Element
}) {
    const [open, setOpen] = useState(false)
    const [rawKey, setRawKey] = useState<string | null>(null)

    return (
        <Fragment>
            <Drawer.Root
                open={open}
                onOpenChange={(value) => {
                    setOpen(value)
                    if (!value) {
                        setRawKey(null)
                    }
                }}
            >
                <Drawer.Trigger>{props.children}</Drawer.Trigger>
                <Drawer.Content>
                    <Drawer.Header title="Créer une clé API" />
                    <Drawer.Body>
                        {rawKey !== null ? (
                            <RawKeyDisplay rawKey={rawKey} onClose={() => setOpen(false)} />
                        ) : (
                            <FormRoot
                                schema={createOneApiKeyRouteDefinition.schemas.body}
                                defaultValues={{}}
                                submitButtonProps={{
                                    leftIcon: <IconPlus />,
                                    text: "Créer la clé API",
                                }}
                                onSubmit={async (data) => {
                                    const response = await getResponseBodyFromAPI({
                                        routeDefinition: createOneApiKeyRouteDefinition,
                                        body: data,
                                    })
                                    if (!response.ok) {
                                        toast({ title: "Impossible de créer la clé API", variant: "error" })
                                        return false
                                    }

                                    setRawKey(response.data.rawKey)
                                    toast({ title: "Clé API créée avec succès", variant: "success" })
                                    return true
                                }}
                                onCancel={undefined}
                                onSuccess={async () => {
                                    await invalidateData({
                                        routeDefinition: readAllApiKeysRouteDefinition,
                                        body: {},
                                    })
                                }}
                            >
                                {(form) => (
                                    <Fragment>
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        label="Nom de la clé"
                                                        isRequired={true}
                                                        description={undefined}
                                                        tooltip={undefined}
                                                    />
                                                    <FormControl>
                                                        <InputText
                                                            value={field.value}
                                                            onChange={field.onChange}
                                                            type="text"
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                    </Fragment>
                                )}
                            </FormRoot>
                        )}
                    </Drawer.Body>
                </Drawer.Content>
            </Drawer.Root>
        </Fragment>
    )
}
