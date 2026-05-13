import { createOneTicketRouteDefinition, readAllTicketsRouteDefinition } from "@arrhes/application-metadata/routes"
import { Button, InputTextArea, InputToggle, toast } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconPlus } from "@tabler/icons-react"
import { type JSX, useRef } from "react"
import { Fragment } from "react/jsx-runtime"
import { FormControl } from "../../../components/forms/formControl.tsx"
import { FormError } from "../../../components/forms/formError.tsx"
import { FormField } from "../../../components/forms/formField.tsx"
import { FormItem } from "../../../components/forms/formItem.tsx"
import { FormLabel } from "../../../components/forms/formLabel.tsx"
import { FormRoot } from "../../../components/forms/formRoot.tsx"
import { useTabs } from "../../../contexts/tabs/tabsContext.tsx"
import { applicationRouter } from "../../../routes/applicationRouter.tsx"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"
import { invalidateData } from "../../../utilities/invalidateData.ts"

export function CreateOneTicket(props: { children: JSX.Element }) {
    const { openPanelTab, closeTab } = useTabs()
    const createdTicketIdRef = useRef<string | undefined>(undefined)

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
                    "Créer un nouveau ticket",
                    <div
                        className={css({
                            padding: "2rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        })}
                    >
                        <FormRoot
                            schema={createOneTicketRouteDefinition.schemas.body}
                            defaultValues={{
                                category: "bug",
                            }}
                            submitButtonProps={{
                                leftIcon: <IconPlus />,
                                text: "Créer le ticket",
                            }}
                            onSubmit={async (data) => {
                                const response = await getResponseBodyFromAPI({
                                    routeDefinition: createOneTicketRouteDefinition,
                                    body: data,
                                })
                                if (response.ok === false) {
                                    toast({
                                        title: "Impossible de créer le ticket",
                                        variant: "error",
                                    })
                                    return false
                                }

                                createdTicketIdRef.current = response.data.id
                                toast({
                                    title: "Ticket créé avec succès",
                                    variant: "success",
                                })
                                return true
                            }}
                            onCancel={undefined}
                            onSuccess={async () => {
                                await invalidateData({
                                    routeDefinition: readAllTicketsRouteDefinition,
                                    body: {},
                                })

                                closeTab(r.current)

                                if (createdTicketIdRef.current !== undefined) {
                                    applicationRouter.navigate({
                                        to: "/dashboard/support/tickets/$idTicket",
                                        params: {
                                            idTicket: createdTicketIdRef.current,
                                        },
                                    })
                                }
                            }}
                        >
                            {(form) => (
                                <Fragment>
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Type de ticket"
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
                                                                value: "bug",
                                                                label: "Remonter une erreur",
                                                            },
                                                            {
                                                                value: "enhancement",
                                                                label: "Suggestion d'amélioration",
                                                            },
                                                            {
                                                                value: "feature",
                                                                label: "Demande de fonctionnalité",
                                                            },
                                                            {
                                                                value: "other",
                                                                label: "Autre",
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
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel
                                                    label="Message"
                                                    isRequired={true}
                                                    description={undefined}
                                                    tooltip={undefined}
                                                />
                                                <FormControl>
                                                    <InputTextArea
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
                    </div>,
                )
            }}
        >
            {props.children}
        </Button>
    )
}
