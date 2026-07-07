import {
    readAllOrganizationUsersRouteDefinition,
    updateOneOrganizationUserRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputToggle, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPencil } from "@tabler/icons-react"
import type { JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import type * as v from "valibot"
import { FormControl } from "../../../../../components/forms/FormControl.tsx"
import { FormError } from "../../../../../components/forms/FormError.tsx"
import { FormField } from "../../../../../components/forms/FormField.tsx"
import { FormItem } from "../../../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../../../components/forms/FormRoot.tsx"
import { useTabs } from "../../../../../contexts/tabs/useTabs.tsx"
import { getResponseBodyFromAPI } from "../../../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../../../utilities/invalidateData.ts"

export function UpdateOneOrganizationUser(props: {
    organizationUser: v.InferOutput<typeof returnedSchemas.organizationUser>
    children: JSX.Element
}) {
    const { openPanelTab, closeTab } = useTabs()

    return (
        <Button
            className={{
                padding: "0",
                border: "none",
                backgroundColor: "transparent",
                width: "fit-content",
                height: "fit-content",
            }}
            onClick={() => {
                const r = {
                    current: "",
                }
                r.current = openPanelTab(
                    "Modifier l'utilisateur",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={updateOneOrganizationUserRouteDefinition.schemas.body}
                            defaultValues={props.organizationUser}
                            submitButtonProps={{
                                leftIcon: <IconPencil />,
                                text: "Modifier l'utilisateur",
                            }}
                            onSubmit={async (data) => {
                                const response = await getResponseBodyFromAPI({
                                    routeDefinition: updateOneOrganizationUserRouteDefinition,
                                    body: data,
                                })
                                if (!response.ok) {
                                    toast({
                                        title: "Impossible de modifier l'utilisateur",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Utilisateur modifié avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await invalidateData({
                                    routeDefinition: readAllOrganizationUsersRouteDefinition,
                                    body: {},
                                })

                                closeTab(r.current)
                            }}
                        >
                            {(form) => (
                                <Fragment>
                                    <FormField
                                        control={form.control}
                                        name="isAdmin"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Possède les droits administrateur ?"
                                                    isRequired={true}
                                                    description={undefined}
                                                    tooltip={undefined}
                                                />
                                                <FormControl>
                                                    <InputToggle
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                        options={[
                                                            {
                                                                value: true,
                                                                label: "Oui",
                                                            },
                                                            {
                                                                value: false,
                                                                label: "Non",
                                                            },
                                                        ]}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                </Fragment>
                            )}
                        </FormRoot>
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
