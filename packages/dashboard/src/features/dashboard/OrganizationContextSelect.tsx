import { Button, ButtonGhostContent, ButtonPlainContent, Separator } from "@arrhes/ui"
import { IconChevronDown } from "@tabler/icons-react"
import { useState } from "react"
import { getAllMyOrganizationsRouteDefinition } from "../../../../metadata/src/routes/dashboard/auth/index.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"
import { AddNewOrganization } from "./organizations/AddNewOrganization.js"

export function OrganizationContextSelect(props: { value: string | null; onChange: (v: string | null) => void }) {
    const [open, setOpen] = useState(false)
    const organizationUsersData = useDataFromAPI({
        routeDefinition: getAllMyOrganizationsRouteDefinition,
        body: {},
    })

    const options = (organizationUsersData.data ?? []).map((organizationUser) => ({
        key: organizationUser.organization.id,
        label: organizationUser.organization.name,
    }))
    const selectedLabel = options.find((option) => option.key === props.value)?.label

    if (options.length === 0) {
        return (
            <AddNewOrganization>
                <ButtonPlainContent text="Ajouter une organisation" />
            </AddNewOrganization>
        )
    }

    return (
        <Popover.Root
            open={open}
            onOpenChange={setOpen}
        >
            <Popover.Trigger asChild>
                <Button hasLoader={organizationUsersData.isPending}>
                    <ButtonGhostContent
                        text={selectedLabel ?? "Sélectionner une organisation"}
                        isLoading={organizationUsersData.isPending}
                        rightIcon={<IconChevronDown />}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className={{
                    padding: "0.5rem",
                    minWidth: "180px",
                    maxHeight: "260px",
                    overflowY: "auto",
                    gap: "0.25rem",
                }}
            >
                {options.map((option) => (
                    <Button
                        key={option.key}
                        onClick={() => {
                            props.onChange(option.key === props.value ? null : option.key)
                            setOpen(false)
                        }}
                        className={{
                            width: "100%",
                        }}
                    >
                        <ButtonGhostContent
                            text={option.label}
                            isCurrent={option.key === props.value}
                            className={{
                                width: "100%",
                                justifyContent: "start",
                            }}
                        />
                    </Button>
                ))}
                <Separator
                    className={{
                        marginY: "0.25rem",
                    }}
                />
                <div onClick={() => setOpen(false)}>
                    <AddNewOrganization
                        className={{
                            width: "100%",
                        }}
                    >
                        <ButtonGhostContent
                            text="Ajouter une organisation"
                            className={{
                                width: "100%",
                                justifyContent: "start",
                            }}
                        />
                    </AddNewOrganization>
                </div>
            </Popover.Content>
        </Popover.Root>
    )
}
