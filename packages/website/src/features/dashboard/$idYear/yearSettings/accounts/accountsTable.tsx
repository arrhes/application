import { readAllAccountsRouteDefinition } from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconListNumbers } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { type MouseEvent, useCallback, useDeferredValue, useMemo } from "react"
import { FormatError } from "../../../../../components/formats/formatError.tsx"
import { EmptyState } from "../../../../../components/layouts/emptyState.tsx"
import { Virtualizer } from "../../../../../components/layouts/virtualizer.tsx"
import { useDataFromAPI } from "../../../../../utilities/useHTTPData.ts"
import { AccountItem } from "./accountItem.tsx"
import { sortAccounts } from "./sortAccounts.tsx"

export function AccountsTable(props: { idOrganization: string; idYear: string; globalFilter: string }) {
    const navigate = useNavigate()

    const response = useDataFromAPI({
        routeDefinition: readAllAccountsRouteDefinition,
        body: {
            idYear: props.idYear,
        },
    })

    const deferredFilter = useDeferredValue(props.globalFilter)

    const structuredAccounts = useMemo(() => {
        if (!response.data) return []

        const normalizedFilter = deferredFilter.trim().toLowerCase()
        const filtered =
            normalizedFilter === ""
                ? response.data
                : response.data.filter((account) => {
                      const text = `${account.number} ${account.label}`.toLowerCase()
                      return text.includes(normalizedFilter)
                  })

        const sorted = [...filtered].sort((a, b) => a.number.toString().localeCompare(b.number.toString()))

        return sortAccounts({ accounts: sorted })
    }, [response.data, deferredFilter])

    const deferredAccounts = useDeferredValue(structuredAccounts)

    const hrefBase = `/dashboard/organisations/${props.idOrganization}/exercices/${props.idYear}/param%C3%A8tres/comptes/`

    const handleContainerClick = useCallback(
        (e: MouseEvent<HTMLDivElement>) => {
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return

            const link = (e.target as HTMLElement).closest("a[data-account-link]") as HTMLAnchorElement | null
            if (!link) return

            e.preventDefault()
            const href = link.getAttribute("href")
            if (!href) return

            const idAccount = href.split("/").pop()
            if (!idAccount) return

            navigate({
                to: "/dashboard/organisations/$idOrganization/exercices/$idYear/paramètres/comptes/$idAccount",
                params: {
                    idOrganization: props.idOrganization,
                    idYear: props.idYear,
                    idAccount,
                },
            })
        },
        [navigate, props.idOrganization, props.idYear],
    )

    const renderAccount = useCallback(
        (sortedAccount: (typeof deferredAccounts)[number]) => (
            <AccountItem
                account={sortedAccount.account}
                level={sortedAccount.level}
                href={`${hrefBase}${sortedAccount.account.id}`}
            />
        ),
        [hrefBase],
    )

    return (
        <div
            className={css({
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                padding: "4",
            })}
        >
            {response.data === undefined ? (
                response.isPending ? (
                    <div className={css({ padding: "1rem" })}>
                        <CircularLoader text="Chargement des données..." />
                    </div>
                ) : (
                    <FormatError
                        text="Erreur lors de la récupération des données."
                        className={css({ padding: "1rem" })}
                    />
                )
            ) : structuredAccounts.length === 0 ? (
                <EmptyState
                    icon={<IconListNumbers size={48} />}
                    title={props.globalFilter ? "Aucun compte trouvé" : "Aucun compte"}
                    subtitle={props.globalFilter ? undefined : "Ajoutez un compte pour commencer"}
                />
            ) : (
                <div onClick={handleContainerClick} className={css({ width: "100%", height: "100%" })}>
                    <Virtualizer data={deferredAccounts} childSize={32}>
                        {renderAccount}
                    </Virtualizer>
                </div>
            )}
        </div>
    )
}
