import {
    createOneInventoryItemRouteDefinition,
    readAllInventoryItemsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Button, InputText, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
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

export function CreateOneInventoryItem(props: {
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
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
                    "Ajouter un article d'inventaire",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            maxWidth: "32rem",
                        })}
                    >
                        <FormRoot
                            schema={createOneInventoryItemRouteDefinition.schemas.body}
                            defaultValues={{
                                idYear: props.idYear,
                                currentQuantity: "0",
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Ajouter l'article",
                            }}
                            onSubmit={async (data) => {
                                const createResponse = await getResponseBodyFromAPI({
                                    routeDefinition: createOneInventoryItemRouteDefinition,
                                    body: data,
                                })
                                if (createResponse.ok === false) {
                                    toast({
                                        title: "Impossible d'ajouter l'article",
                                        variant: "error",
                                    })
                                    return false
                                }

                                toast({
                                    title: "Article ajouté avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await invalidateData({
                                    routeDefinition: readAllInventoryItemsRouteDefinition,
                                    body: {
                                        idYear: props.idYear,
                                    },
                                })

                                closeTab(r.current)
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
                                                    label="Nom"
                                                    tooltip="Le nom de l'article."
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
                                        name="sku"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Référence (SKU)"
                                                    tooltip="La référence unique de l'article."
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Catégorie"
                                                    tooltip="La catégorie de l'article."
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <div
                                        className={css({
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "1rem",
                                        })}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="unit"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        label="Unité"
                                                        tooltip="L'unité de mesure (pièce, kg, litre...)."
                                                        isRequired={true}
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
                                        <FormField
                                            control={form.control}
                                            name="currentQuantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        label="Quantité initiale"
                                                        tooltip="La quantité actuelle en stock."
                                                        isRequired={false}
                                                    />
                                                    <FormControl>
                                                        <InputText
                                                            value={field.value ?? "0"}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div
                                        className={css({
                                            display: "grid",
                                            gridTemplateColumns: "1fr 1fr",
                                            gap: "1rem",
                                        })}
                                    >
                                        <FormField
                                            control={form.control}
                                            name="unitPrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        label="Prix unitaire"
                                                        tooltip="Le prix unitaire de l'article."
                                                        isRequired={false}
                                                    />
                                                    <FormControl>
                                                        <InputText
                                                            value={field.value ?? ""}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="minimumThreshold"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel
                                                        label="Seuil minimum"
                                                        tooltip="Le seuil en dessous duquel le stock est considéré comme faible."
                                                        isRequired={false}
                                                    />
                                                    <FormControl>
                                                        <InputText
                                                            value={field.value ?? ""}
                                                            onChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                    <FormError />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField
                                        control={form.control}
                                        name="location"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Emplacement"
                                                    tooltip="L'emplacement physique de l'article dans l'entrepôt."
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value ?? ""}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormError />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Description"
                                                    tooltip="Une description optionnelle de l'article."
                                                    isRequired={false}
                                                />
                                                <FormControl>
                                                    <InputText
                                                        value={field.value ?? ""}
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
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
