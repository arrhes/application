/*
import type { returnedSchemas } from "@arrhes/application-metadata"
import {
    defaultAssociationBalanceSheets,
    defaultCompanyBalanceSheets,
    generateBalanceSheetsRouteDefinition,
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

export const generateBalanceSheetsRoute = apiFactory
    .createApp()
    .post(generateBalanceSheetsRouteDefinition.path, async (c) => {
        const { idOrganization } = await checkUserSessionMiddleware({ context: c })
        const body = await validateBodyMiddleware({
            context: c,
            schema: generateBalanceSheetsRouteDefinition.schemas.body,
        })

        const generatedBalanceSheets = await c.var.clients.sql.transaction(async (tx) => {
            try {
                const _deletedBalanceSheets = await deleteMany({
                    database: tx,
                    table: models.balanceSheet,
                    where: (table) => and(eq(table.idOrganization, idOrganization), eq(table.idYear, body.idYear)),
                })
            } catch (_error: unknown) {
                throw new Exception({
                    internalMessage: "Failed to delete balanceSheets",
                    externalMessage: "Échec de la suppression des lignes de bilan",
                })
            }

            const organization = await selectOne({
                database: tx,
                table: models.organization,
                where: (table) => eq(table.id, idOrganization),
            })
            const defaultBalanceSheets =
                organization.scope === "association" ? defaultAssociationBalanceSheets : defaultCompanyBalanceSheets

            const newBalanceSheets: Array<v.InferOutput<typeof returnedSchemas.balanceSheet>> = []

            defaultBalanceSheets.forEach((defaultBalanceSheet) => {
                const balanceSheetParent = newBalanceSheets.find((newBalanceSheet) => {
                    const isParent = newBalanceSheet.number === defaultBalanceSheet.numberParent?.toString()
                    const isSameSide = newBalanceSheet.side === defaultBalanceSheet.side
                    return isParent && isSameSide
                })
                newBalanceSheets.push({
                    id: generateId(),
                    idOrganization: idOrganization,
                    idYear: body.idYear,
                    idBalanceSheetParent: balanceSheetParent?.id ?? null,
                    number: defaultBalanceSheet.number.toString(),
                    isDefault: true,
                    isComputed: balanceSheetParent === undefined,
                    label: defaultBalanceSheet.label,
                    side: defaultBalanceSheet.side,
                    createdAt: new Date().toISOString(),
                    lastUpdatedAt: null,
                    createdBy: null,
                    lastUpdatedBy: null,
                })
            })

            const generatedBalanceSheets = await insertMany({
                database: tx,
                table: models.balanceSheet,
                data: newBalanceSheets,
            })

            return generatedBalanceSheets
        })

        return response({
            context: c,
            statusCode: 200,
            schema: generateBalanceSheetsRouteDefinition.schemas.return,
            data: generatedBalanceSheets,
        })
    })
*/
