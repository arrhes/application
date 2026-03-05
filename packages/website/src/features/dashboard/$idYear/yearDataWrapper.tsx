import {
    readAllAccountsRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllRecordLabelsRouteDefinition,
    readAllRecordRowsRouteDefinition,
    readAllRecordsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { CircularLoader } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { useQueries } from "@tanstack/react-query"
import type { ReactElement } from "react"
import { useMemo } from "react"
import type * as v from "valibot"
import { FormatError } from "../../../components/formats/formatError.tsx"
import { ClientError } from "../../../utilities/clientError.ts"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

const yearQueries = {
    accounts: readAllAccountsRouteDefinition,
    records: readAllRecordsRouteDefinition,
    recordRows: readAllRecordRowsRouteDefinition,
    journals: readAllJournalsRouteDefinition,
    recordLabels: readAllRecordLabelsRouteDefinition,
    files: readAllFilesRouteDefinition,
    folders: readAllFoldersRouteDefinition,
    balanceSheets: readAllBalanceSheetsRouteDefinition,
    incomeStatements: readAllIncomeStatementsRouteDefinition,
    computations: readAllComputationsRouteDefinition,
    computationIncomeStatements: readAllComputationIncomeStatementsRouteDefinition,
} as const

type YearQueries = typeof yearQueries

type YearData = {
    [K in keyof YearQueries]: v.InferOutput<YearQueries[K]["schemas"]["return"]>
}

export type YearDataKey = keyof YearData

type YearScopedRouteDefinition = {
    path: string
    schemas: {
        body: v.ObjectSchema<v.ObjectEntries, undefined>
        return:
            | v.ObjectSchema<v.ObjectEntries, undefined>
            | v.ArraySchema<v.ObjectSchema<v.ObjectEntries, undefined>, undefined>
    }
}

const yearQueryEntries = Object.entries(yearQueries) as [YearDataKey, YearScopedRouteDefinition][]

export function YearDataWrapper<const K extends readonly YearDataKey[]>(props: {
    idYear: string
    requiredKeys: K
    children: (data: Pick<YearData, K[number]>) => ReactElement | null
}) {
    const body = useMemo(
        () => ({
            idYear: props.idYear,
        }),
        [props.idYear],
    )

    const results = useQueries({
        queries: yearQueryEntries.map(([_key, routeDef]) => ({
            queryKey: [routeDef.path, body],
            queryFn: async (context: { signal: AbortSignal }) => {
                const response = await getResponseBodyFromAPI({
                    routeDefinition: routeDef,
                    body,
                    signal: context.signal,
                })
                if (response.ok === false) {
                    throw new ClientError({
                        message: "Error with the data fetching",
                        rawError: response.error,
                    })
                }
                return response.data
            },
            retry: 1,
        })),
    })

    const requiredIndices = useMemo(
        () => props.requiredKeys.map((key) => yearQueryEntries.findIndex(([k]) => k === key)),
        [props.requiredKeys],
    )

    const isPending = requiredIndices.some((index) => results[index].isPending)
    const isError = requiredIndices.some((index) => results[index].isError)

    if (isPending) {
        return <CircularLoader text="Chargement des données..." className={css({ padding: "1rem" })} />
    }

    if (isError) {
        return <FormatError text="Erreur lors de la récupération des données." className={css({ padding: "1rem" })} />
    }

    const data = Object.fromEntries(yearQueryEntries.map(([key], index) => [key, results[index].data])) as Pick<
        YearData,
        K[number]
    >

    return props.children(data)
}
