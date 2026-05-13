import { Button, ButtonGhostContent, ButtonPlainContent, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { getAllMyOrganizationsRouteDefinition } from "../../../../metadata/src/routes/dashboard/auth/index.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { useTabs } from "../../contexts/tabs/tabsContext.js"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"

export function OrganizationContextSelect(props: { value: string | null; onChange: (v: string | null) => void }) {
    const { openTab } = useTabs()

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
            <Button
                onClick={() =>
                    openTab({
                        component: "organisations",
                        props: {},
                    })
                }
            >
                <ButtonPlainContent text="Ajouter une organisation" />
            </Button>
        )
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button hasLoader={organizationUsersData.isPending}>
                    <ButtonGhostContent
                        text={selectedLabel ?? "Sélectionner une organisation"}
                        isLoading={organizationUsersData.isPending}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className={css({
                    padding: "0.5rem",
                    minWidth: "180px",
                    maxHeight: "260px",
                    overflowY: "auto",
                    gap: "0.25rem",
                })}
            >
                {options.map((option) => (
                    <Button
                        key={option.key}
                        onClick={() => props.onChange(option.key === props.value ? null : option.key)}
                        className={css({
                            width: "100%",
                        })}
                    >
                        <ButtonGhostContent
                            text={option.label}
                            isCurrent={option.key === props.value}
                            className={css({
                                width: "100%",
                                justifyContent: "start",
                            })}
                        />
                    </Button>
                ))}
                <Separator
                    className={css({
                        marginY: "0.25rem",
                    })}
                />
                <Button
                    onClick={() =>
                        openTab({
                            component: "organisations",
                            props: {},
                        })
                    }
                    className={css({
                        width: "100%",
                    })}
                >
                    <ButtonGhostContent
                        text="Ajouter une organisation"
                        className={css({
                            width: "100%",
                            justifyContent: "start",
                        })}
                    />
                </Button>
            </Popover.Content>
        </Popover.Root>
    )
}
