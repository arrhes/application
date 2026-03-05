import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { accountSchema, accountSchemaReturn } from "../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const updateOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/update-one-account`,
    schemas: {
        body: v.object({
            idAccount: accountSchema.entries.id,
            idYear: accountSchema.entries.idYear,
            idAccountParent: v.optional(accountSchema.entries.idAccountParent),

            idBalanceSheetAsset: v.optional(accountSchema.entries.idBalanceSheetAsset),
            balanceSheetAssetColumn: v.optional(accountSchema.entries.balanceSheetAssetColumn),
            balanceSheetAssetFlow: v.optional(accountSchema.entries.balanceSheetAssetFlow),

            idBalanceSheetLiability: v.optional(accountSchema.entries.idBalanceSheetLiability),
            balanceSheetLiabilityColumn: v.optional(accountSchema.entries.balanceSheetLiabilityColumn),
            balanceSheetLiabilityFlow: v.optional(accountSchema.entries.balanceSheetLiabilityFlow),

            idIncomeStatement: v.optional(accountSchema.entries.idIncomeStatement),

            isClass: v.optional(accountSchema.entries.isClass),
            isSelectable: v.optional(accountSchema.entries.isSelectable),
            number: v.optional(accountSchema.entries.number),
            label: v.optional(accountSchema.entries.label),
            type: v.optional(accountSchema.entries.type),
        }),
        return: accountSchemaReturn,
    },
})
