import {
    readAllAccountsRouteDefinition,
    readAllBalanceSheetsRouteDefinition,
    readAllComputationIncomeStatementsRouteDefinition,
    readAllComputationsRouteDefinition,
    readAllEntriesRouteDefinition,
    readAllEntryLinesRouteDefinition,
    readAllEntryTagsRouteDefinition,
    readAllFilesRouteDefinition,
    readAllFoldersRouteDefinition,
    readAllIncomeStatementsRouteDefinition,
    readAllJournalsRouteDefinition,
    readAllTagsRouteDefinition,
} from "@arrhes/application-metadata/routes"
import { type UseQueryResult, useQuery } from "@tanstack/react-query"
import { createContext, type ReactNode, useMemo } from "react"
import type * as v from "valibot"
import { ClientError } from "../../../utilities/clientError.ts"
import { getResponseBodyFromAPI } from "../../../utilities/getResponseBodyFromAPI.ts"

const yearQueries = {
    accounts: readAllAccountsRouteDefinition,
    entries: readAllEntriesRouteDefinition,
    entryLines: readAllEntryLinesRouteDefinition,
    entryTags: readAllEntryTagsRouteDefinition,
    journals: readAllJournalsRouteDefinition,
    tags: readAllTagsRouteDefinition,
    files: readAllFilesRouteDefinition,
    folders: readAllFoldersRouteDefinition,
    balanceSheets: readAllBalanceSheetsRouteDefinition,
    incomeStatements: readAllIncomeStatementsRouteDefinition,
    computations: readAllComputationsRouteDefinition,
    computationIncomeStatements: readAllComputationIncomeStatementsRouteDefinition,
} as const

type YearQueries = typeof yearQueries

export type YearData = {
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

export type YearDataContextValue = {
    [K in YearDataKey]: UseQueryResult<YearData[K]>
}

export const YearDataContext = createContext<YearDataContextValue | null>(null)

function useYearQuery<K extends YearDataKey>(
    key: K,
    body: {
        idYear: string
    },
) {
    const routeDefinition = yearQueries[key] as YearScopedRouteDefinition

    return useQuery({
        queryKey: [
            routeDefinition.path,
            body,
        ],
        queryFn: async (context) => {
            const response = await getResponseBodyFromAPI({
                routeDefinition,
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
    }) as UseQueryResult<YearData[K]>
}

export function YearDataProvider(props: { idYear: string; children: ReactNode }) {
    const body = useMemo(
        () => ({
            idYear: props.idYear,
        }),
        [
            props.idYear,
        ],
    )

    const accounts = useYearQuery("accounts", body)
    const entries = useYearQuery("entries", body)
    const entryLines = useYearQuery("entryLines", body)
    const entryTags = useYearQuery("entryTags", body)
    const journals = useYearQuery("journals", body)
    const tags = useYearQuery("tags", body)
    const files = useYearQuery("files", body)
    const folders = useYearQuery("folders", body)
    const balanceSheets = useYearQuery("balanceSheets", body)
    const incomeStatements = useYearQuery("incomeStatements", body)
    const computations = useYearQuery("computations", body)
    const computationIncomeStatements = useYearQuery("computationIncomeStatements", body)

    const value = useMemo<YearDataContextValue>(
        () => ({
            accounts,
            entries,
            entryLines,
            entryTags,
            journals,
            tags,
            files,
            folders,
            balanceSheets,
            incomeStatements,
            computations,
            computationIncomeStatements,
        }),
        [
            accounts,
            entries,
            entryLines,
            entryTags,
            journals,
            tags,
            files,
            folders,
            balanceSheets,
            incomeStatements,
            computations,
            computationIncomeStatements,
        ],
    )

    return <YearDataContext.Provider value={value}>{props.children}</YearDataContext.Provider>
}
