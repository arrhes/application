import {
    addNewOrganizationRouteDefinition,
    getAllMyOrganizationsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { Button, InputText, InputToggle, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import type { ComponentProps, JSX } from "react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/FormControl.tsx"
import { FormError } from "../../../components/forms/FormError.tsx"
import { FormField } from "../../../components/forms/FormField.tsx"
import { FormItem } from "../../../components/forms/FormItem.tsx"
import { FormLabel } from "../../../components/forms/FormLabel.tsx"
import { FormRoot } from "../../../components/forms/FormRoot.tsx"
import { useRightPanel } from "../../../contexts/rightPanel/RightPanelContext.js"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function AddNewOrganization(props: {
    children: JSX.Element
    className?: ComponentProps<typeof Button>["className"]
}) {
    const { openPanel, closePanel } = useRightPanel()

    const form = (
        <FormRoot
            schema={addNewOrganizationRouteDefinition.schemas.body}
            defaultValues={{
                scope: "company",
            }}
            submitButtonProps={{
                leftIcon: <IconPlus />,
                text: "Ajouter l'organisation",
            }}
            onSubmit={async (data) => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: addNewOrganizationRouteDefinition,
                    body: data,
                })
                if (!response.ok) {
                    toast({
                        title: "Impossible d'ajouter l'organisation",
                        variant: "error",
                    })
                    return false
                }

                toast({
                    title: "Organisation ajoutée avec succès",
                    variant: "success",
                })
                return true
            }}
            onCancel={undefined}
            onSuccess={async () => {
                await invalidateData({
                    routeDefinition: getAllMyOrganizationsRouteDefinition,
                    body: {},
                })

                closePanel()
            }}
        >
            {(form) => (
                <Fragment>
                    <FormField
                        control={form.control}
                        name="scope"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel
                                    label="Type d'organisation"
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
                                                value: "company",
                                                label: "Entreprise",
                                            },
                                            {
                                                value: "association",
                                                label: "Association",
                                            },
                                        ]}
                                    />
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
                                    label="Raison sociale ou nom de l'organisation"
                                    isRequired={true}
                                    description={undefined}
                                    tooltip={undefined}
                                />
                                <FormControl>
                                    <InputText
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormError />
                            </FormItem>
                        )}
                    />
                </Fragment>
            )}
        </FormRoot>
    )

    return (
        <Button
            className={css.raw(
                {
                    padding: "0",
                    border: "none",
                    backgroundColor: "transparent",
                    width: "fit-content",
                    height: "fit-content",
                },
                props.className,
            )}
            onClick={() => openPanel(form, "Ajouter une organisation")}
        >
            {props.children}
        </Button>
    )
}
