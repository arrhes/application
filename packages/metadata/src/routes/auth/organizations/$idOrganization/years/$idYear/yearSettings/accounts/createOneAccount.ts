import * as v from "valibot"
import { routePath } from "../../../../../../../../components/index.js"
import { accountSchema, accountSchemaReturn } from "../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../utilities/routeDefinition.js"

export const createOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    path: `${routePath.auth}/create-one-account`,
    schemas: {
        body: v.object({
            idYear: accountSchema.entries.idYear,
            idAccountParent: accountSchema.entries.idAccountParent,

            idBalanceSheetAsset: v.optional(accountSchema.entries.idBalanceSheetAsset),
            balanceSheetAssetColumn: v.optional(accountSchema.entries.balanceSheetAssetColumn),
            balanceSheetAssetFlow: v.optional(accountSchema.entries.balanceSheetAssetFlow),

            idBalanceSheetLiability: v.optional(accountSchema.entries.idBalanceSheetLiability),
            balanceSheetLiabilityColumn: v.optional(accountSchema.entries.balanceSheetLiabilityColumn),
            balanceSheetLiabilityFlow: v.optional(accountSchema.entries.balanceSheetLiabilityFlow),

            idIncomeStatement: v.optional(accountSchema.entries.idIncomeStatement),

            isClass: accountSchema.entries.isClass,
            isSelectable: accountSchema.entries.isSelectable,
            number: accountSchema.entries.number,
            label: accountSchema.entries.label,
            type: accountSchema.entries.type,
        }),
        return: accountSchemaReturn,
    },
})
