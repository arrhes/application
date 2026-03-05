import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import type * as v from "valibot"

export function sortAccounts(parameters: { accounts: Array<v.InferOutput<typeof returnedSchemas.account>> }) {
    if (parameters.accounts.length === 0) return []

    const map = new Map(parameters.accounts.map((i) => [i.id, i]))
    const levelCache = new Map<string, number>()

    function getLevel(account: (typeof parameters.accounts)[number]): number {
        const cached = levelCache.get(account.id)
        if (cached !== undefined) return cached

        let level = 0
        if (account.idAccountParent && map.has(account.idAccountParent)) {
            level = getLevel(map.get(account.idAccountParent)!) + 1
        }

        levelCache.set(account.id, level)
        return level
    }

    return parameters.accounts.map((account) => {
        return {
            account: account,
            level: getLevel(account),
        }
    })
}
