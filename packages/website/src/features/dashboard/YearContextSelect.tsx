import { readAllYearsRouteDefinition } from "@arrhes/application-metadata"
import { Button, ButtonGhostContent, ButtonPlainContent, Separator } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { Popover } from "../../components/overlays/popover/popover.js"
import { useTabs } from "../../contexts/tabs/tabsContext.js"
import { useDataFromAPI } from "../../utilities/useHTTPData.js"

export function YearContextSelect(props: {
    value: string | null
    onChange: (v: string | null) => void
    idOrganizationSelected: string | null
}) {
    const { openTab } = useTabs()

    const yearsData = useDataFromAPI({
        routeDefinition: readAllYearsRouteDefinition,
        body: { idOrganization: props.idOrganizationSelected ?? undefined },
        enabled: props.idOrganizationSelected !== null,
    })

    const options = (yearsData.data ?? [])
        .filter((y) => y.idOrganization === props.idOrganizationSelected)
        .map((y) => ({
            key: y.id,
            label: y.label,
        }))

    const selectedLabel = options.find((option) => option.key === props.value)?.label

    if (options.length === 0) {
        return (
            <Button
                onClick={() =>
                    props.idOrganizationSelected !== null &&
                    openTab({
                        component: "exercices",
                        props: {
                            idOrganization: props.idOrganizationSelected,
                        },
                    })
                }
            >
                <ButtonPlainContent text="Ajouter un exercice" />
            </Button>
        )
    }

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <Button hasLoader={yearsData.isPending}>
                    <ButtonGhostContent
                        text={selectedLabel ?? "Sélectionner un exercice"}
                        isLoading={yearsData.isPending}
                    />
                </Button>
            </Popover.Trigger>
            <Popover.Content
                align="start"
                className={css({
                    padding: "0.5rem",
                    minWidth: "160px",
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
                        props.idOrganizationSelected !== null &&
                        openTab({
                            component: "exercices",
                            props: {
                                idOrganization: props.idOrganizationSelected,
                            },
                        })
                    }
                    className={css({
                        width: "100%",
                    })}
                >
                    <ButtonGhostContent
                        text="Ajouter un exercice"
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
