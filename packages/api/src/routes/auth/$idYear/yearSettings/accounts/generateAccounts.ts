/*
import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    type DefaultAccount,
    defaultAssociationAccounts,
    defaultCompanyAccounts,
    generateAccountsRouteDefinition,
    generateId,
    models,
} from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type * as v from "valibot"
import { checkUserSessionMiddleware } from "../../../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../../../utilities/apiFactory.js"
import { Exception } from "../../../../../utilities/exception.js"
import { response } from "../../../../../utilities/response.js"
import { deleteMany } from "../../../../../utilities/sql/deleteMany.js"
import { insertMany } from "../../../../../utilities/sql/insertMany.js"
import { selectOne } from "../../../../../utilities/sql/selectOne.js"

function generateAccounts(parameters: {
    accounts: Array<DefaultAccount>
    idOrganization: v.InferOutput<typeof returnedSchemas.organization>["id"]
    idYear: v.InferOutput<typeof returnedSchemas.year>["id"]
    idAccountParent: v.InferOutput<typeof returnedSchemas.account>["idAccountParent"] | null
}) {
    const newAccounts: Array<v.InferOutput<typeof returnedSchemas.account>> = []

    parameters.accounts.forEach((account) => {
        const newAccount = {
            id: generateId(),
            idOrganization: parameters.idOrganization,
            idYear: parameters.idYear,
            idAccountParent: parameters.idAccountParent,

            idBalanceSheetAsset: null,
            balanceSheetAssetColumn: null,
            balanceSheetAssetFlow: null,

            idBalanceSheetLiability: null,
            balanceSheetLiabilityColumn: null,
            balanceSheetLiabilityFlow: null,

            idIncomeStatement: null,

            number: account.number.toString(),
            isMandatory: account.isMandatory,
            isClass: account.isClass,
            isDefault: true,
            isSelectable: account.isSelectable,
            label: account.label,
            type: account.type,
            createdAt: new Date().toISOString(),
            lastUpdatedAt: null,
            createdBy: null,
            lastUpdatedBy: null,
        }
        newAccounts.push(newAccount)
        newAccounts.push(
            ...generateAccounts({
                ...parameters,
                accounts: account.children,
                idAccountParent: newAccount.id,
            }),
        )
    })

    return newAccounts
}

export const generateAccountsRoute = apiFactory.createApp().post(generateAccountsRouteDefinition.path, async (c) => {
    const { idOrganization } = await checkUserSessionMiddleware({ context: c })
    const body = await validateBodyMiddleware({
        context: c,
        schema: generateAccountsRouteDefinition.schemas.body,
    })

    if (body.isReplicatingAccounts === true) {
        throw new Exception({
            internalMessage: "Replicating accounts is not implemented yet",
            externalMessage: "Non implémenté",
        })
    }

    const generatedAccounts = await c.var.clients.sql.transaction(async (tx) => {
        try {
            const _deletedAccounts = await deleteMany({
                database: tx,
                table: models.account,
                where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
            })
        } catch (_error: unknown) {
            throw new Exception({
                internalMessage: "Failed to delete accounts",
                externalMessage: "Échec de la suppression des comptes",
            })
        }

        const organization = await selectOne({
            database: tx,
            table: models.organization,
            where: (table) => eq(table.id, idOrganization),
        })
        const defaultAccounts = (
            organization.scope === "association" ? defaultAssociationAccounts : defaultCompanyAccounts
        ).filter((account) => {
            if (account.isMandatory === false) {
                if (body.isMinimalSystem === true) return false
            }
            return true
        })

        const newAccounts = generateAccounts({
            idOrganization: idOrganization,
            idYear: body.idYear,
            accounts: defaultAccounts,
            idAccountParent: null,
        })

        const generatedAccounts = await insertMany({
            database: tx,
            table: models.account,
            data: newAccounts,
        })

        return generatedAccounts
    })

    return response({
        context: c,
        statusCode: 200,
        schema: generateAccountsRouteDefinition.schemas.return,
        data: generatedAccounts,
    })
})
*/
