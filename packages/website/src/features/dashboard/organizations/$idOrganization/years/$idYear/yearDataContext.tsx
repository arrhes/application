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
import { type UseQueryResult, useQuery } from "@tanstack/react-query"
import { createContext, type ReactNode, useContext, useMemo } from "react"
import type * as v from "valibot"
import { ClientError } from "../../../../../../utilities/clientError.ts"
import { getResponseBodyFromAPI } from "../../../../../../utilities/getResponseBodyFromAPI.ts"

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

type YearDataContextValue = {
    [K in YearDataKey]: UseQueryResult<YearData[K]>
}

const YearDataContext = createContext<YearDataContextValue | null>(null)

function useYearQuery<K extends YearDataKey>(key: K, body: { idYear: string }) {
    const routeDefinition = yearQueries[key] as YearScopedRouteDefinition

    return useQuery({
        queryKey: [routeDefinition.path, body],
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
        [props.idYear],
    )

    const accounts = useYearQuery("accounts", body)
    const records = useYearQuery("records", body)
    const recordRows = useYearQuery("recordRows", body)
    const journals = useYearQuery("journals", body)
    const recordLabels = useYearQuery("recordLabels", body)
    const files = useYearQuery("files", body)
    const folders = useYearQuery("folders", body)
    const balanceSheets = useYearQuery("balanceSheets", body)
    const incomeStatements = useYearQuery("incomeStatements", body)
    const computations = useYearQuery("computations", body)
    const computationIncomeStatements = useYearQuery("computationIncomeStatements", body)

    const value = useMemo<YearDataContextValue>(
        () => ({
            accounts,
            records,
            recordRows,
            journals,
            recordLabels,
            files,
            folders,
            balanceSheets,
            incomeStatements,
            computations,
            computationIncomeStatements,
        }),
        [
            accounts,
            records,
            recordRows,
            journals,
            recordLabels,
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

export function useYearData(): YearDataContextValue {
    const context = useContext(YearDataContext)
    if (context === null) {
        throw new Error("useYearData must be used within a YearDataProvider")
    }
    return context
}
