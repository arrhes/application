import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
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
    return parameters.accounts
        .filter((account) => account.number.toString().length === parameters.digits)
        .map((account) => {
            const subAccounts = groupAccounts({
                accounts: parameters.accounts.filter(
                    (_account) =>
                        _account.number.toString().slice(0, parameters.digits) ===
                        account.number.toString().slice(0, parameters.digits),
                ),
                digits: parameters.digits + 1,
            }) as GroupedAccount[]
            return {
                account: account,
                subAccounts: subAccounts,
            }
        }) as GroupedAccount[]
}
