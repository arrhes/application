import * as v from "valibot"
import { routePath } from "../../../../../../../../../components/index.js"
import { accountSchema, accountSchemaReturn } from "../../../../../../../../../schemas/account.js"
import { routeDefinition } from "../../../../../../../../../utilities/routeDefinition.js"

export const createOneAccountRouteDefinition = routeDefinition({
    protocol: "http",
    method: "POST",
    path: `${routePath.v1}/organizations/:idOrganization/years/:idYear/accounts`,
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

            isSelectable: accountSchema.entries.isSelectable,
            number: accountSchema.entries.number,
            label: accountSchema.entries.label,
            type: accountSchema.entries.type,
        }),
        return: accountSchemaReturn,
    },
})
