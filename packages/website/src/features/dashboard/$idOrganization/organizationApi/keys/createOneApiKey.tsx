import { createOneApiKeyRouteDefinition, readAllApiKeysRouteDefinition } from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
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
import { useTabs } from "../../../../../contexts/tabs/tabsContext.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"
import { RawKeyDisplay } from "./rawKeyDisplay.tsx"

function CreateOneApiKeyPanel(props: { onClose: () => void }) {
    const [rawKey, setRawKey] = useState<string | null>(null)

    return (
        <div
            className={css({
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            })}
        >
            {rawKey !== null ? (
                <RawKeyDisplay
                    rawKey={rawKey}
                    onClose={props.onClose}
                />
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
                            toast({
                                title: "Impossible de créer la clé API",
                                variant: "error",
                            })
                            return false
                        }

                        setRawKey(response.data.rawKey)
                        toast({
                            title: "Clé API créée avec succès",
                            variant: "success",
                        })
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
                                            isRequired={false}
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
        </div>
    )
}

export function CreateOneApiKey(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    children: JSX.Element
}) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={css({
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            })}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Créer une clé API",
                    <CreateOneApiKeyPanel onClose={() => closeTab(r.current)} />,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
