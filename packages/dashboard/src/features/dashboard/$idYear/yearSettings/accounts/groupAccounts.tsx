import type { returnedSchemas } from "@comptasse/application-metadata/schemas"
import type * as v from "valibot"

export type GroupedAccount = {
    account: v.InferOutput<typeof returnedSchemas.account>
    subAccounts: GroupedAccount[]
}

export function groupAccounts(parameters: {
    accounts: Array<v.InferOutput<typeof returnedSchemas.account>>
    digits: number
}) {
    if (parameters.accounts.length === 0) return []
    const grouped: GroupedAccount[] = []
    for (const account of parameters.accounts) {
        if (account.number.toString().length !== parameters.digits) continue
        const subAccounts = groupAccounts({
            accounts: parameters.accounts.filter(
                (_account) =>
                    _account.number.toString().slice(0, parameters.digits) ===
                    account.number.toString().slice(0, parameters.digits),
            ),
            digits: parameters.digits + 1,
        }) as GroupedAccount[]
        grouped.push({
            account: account,
            subAccounts: subAccounts,
        })
    }
    return grouped
}
