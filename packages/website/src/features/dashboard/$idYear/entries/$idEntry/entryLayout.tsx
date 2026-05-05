import { ButtonGhostContent, ButtonOutlineContent, FormatError, formatPrice } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconArrowBackUp,
    IconChevronLeft,
    IconCopyCheck,
    IconDatabase,
    IconDotsVertical,
    IconInfoCircle,
    IconList,
    IconTag,
    IconTrash,
} from "@tabler/icons-react"
import { Outlet, useParams } from "@tanstack/react-router"
import { Banner } from "../../../../../components/layouts/banner.tsx"
import { Dropdown } from "../../../../../components/layouts/dropdownMenu/dropdown.js"
import { Page } from "../../../../../components/layouts/page/page.tsx"
import { Tab } from "../../../../../components/layouts/tab/tab.tsx"
import { LinkButton } from "../../../../../components/linkButton.js"
import { entryLayoutRoute } from "../../../../../routes/root/dashboard/organizations/$idOrganization/years/$idYear/entries/$idEntry/entryLayoutRoute.tsx"
import { compareAmounts } from "../../../../../utilities/compareAmounts.ts"
import type { YearDataKey } from "../../yearDataWrapper.tsx"
import { YearDataWrapper } from "../../yearDataWrapper.tsx"
import { ReverseOneEntry } from "../reverseOneEntry.tsx"
import { DeleteOneEntry } from "./deleteOneEntry.tsx"
import { DuplicateOneEntry } from "./duplicateOneEntry.tsx"

const requiredKeys = [
    "entries",
    "entryLines",
    "entryTags",
    "accounts",
    "journals",
    "tags",
    "files",
] as const satisfies readonly YearDataKey[]

export function EntryLayout() {
    const params = useParams({ from: entryLayoutRoute.id })

    return (
        <YearDataWrapper idYear={params.idYear} requiredKeys={requiredKeys}>
            {({ entries, entryLines: allEntryLines }) => {
                const entry = entries.find((r) => r.id === params.idEntry)

                if (entry === undefined) {
                    return <FormatError text="Écriture introuvable." className={css({ padding: "1rem" })} />
                }

                const entryLines = allEntryLines.filter((row) => row.idEntry === params.idEntry)

                let totalDebit = 0
                let totalCredit = 0

                for (const entryLine of entryLines) {
                    totalDebit += Number(entryLine.debit)
                    totalCredit += Number(entryLine.credit)
                }

                return (
                    <Page.Root>
                        <Page.Content>
                            <div
                                className={css({
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: "0.5rem",
                                })}
                            >
                                <LinkButton
                                    to="/dashboard/organisations/$idOrganization/exercices/$idYear/écritures"
                                    params={{
                                        idOrganization: params.idOrganization,
                                        idYear: params.idYear,
                                    }}
                                >
                                    <ButtonOutlineContent leftIcon={<IconChevronLeft />} text="Retour" />
                                </LinkButton>
                                <div
                                    className={css({
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                    })}
                                >
                                    <Dropdown.Root>
                                        <Dropdown.Trigger>
                                            <ButtonGhostContent leftIcon={<IconDotsVertical />} />
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align="end">
                                            <Dropdown.Item>
                                                <ReverseOneEntry entry={entry}>
                                                    <ButtonGhostContent
                                                        leftIcon={<IconArrowBackUp />}
                                                        text="Extourner"
                                                        className={css({ width: "100%", justifyContent: "start" })}
                                                    />
                                                </ReverseOneEntry>
                                            </Dropdown.Item>
                                            <Dropdown.Item>
                                                <DuplicateOneEntry entry={entry}>
                                                    <ButtonGhostContent
                                                        leftIcon={<IconCopyCheck />}
                                                        text="Dupliquer"
                                                        className={css({ width: "100%", justifyContent: "start" })}
                                                    />
                                                </DuplicateOneEntry>
                                            </Dropdown.Item>
                                        </Dropdown.Content>
                                    </Dropdown.Root>
                                    <DeleteOneEntry entry={entry}>
                                        <ButtonOutlineContent
                                            leftIcon={<IconTrash />}
                                            title="Supprimer"
                                            color="danger"
                                        />
                                    </DeleteOneEntry>
                                </div>
                            </div>
                            {entry.idFile !== null ? null : (
                                <Banner variant="error">Il manque une pièce justificative.</Banner>
                            )}
                            {compareAmounts({
                                a: totalDebit,
                                b: totalCredit,
                            }) ? null : (
                                <Banner variant="error">
                                    Les montants au débit et au crédit sont différents, veuillez corriger pour pouvoir
                                    valider. ({formatPrice({ price: totalDebit - totalCredit })})
                                </Banner>
                            )}
                            <Tab.Root
                                tabs={[
                                    {
                                        label: "Informations",
                                        icon: <IconInfoCircle />,
                                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry",
                                        params: {
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                            idEntry: params.idEntry,
                                        },
                                    },
                                    {
                                        label: "Mouvements",
                                        icon: <IconList />,
                                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry/mouvements",
                                        params: {
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                            idEntry: params.idEntry,
                                        },
                                    },
                                    {
                                        label: "Catégories",
                                        icon: <IconTag />,
                                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry/catégories",
                                        params: {
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                            idEntry: params.idEntry,
                                        },
                                    },
                                    {
                                        label: "Métadonnées",
                                        icon: <IconDatabase />,
                                        to: "/dashboard/organisations/$idOrganization/exercices/$idYear/écritures/$idEntry/métadonnées",
                                        params: {
                                            idOrganization: params.idOrganization,
                                            idYear: params.idYear,
                                            idEntry: params.idEntry,
                                        },
                                    },
                                ]}
                            />
                            <Outlet />
                        </Page.Content>
                    </Page.Root>
                )
            }}
        </YearDataWrapper>
    )
}
