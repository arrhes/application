import { models, searchReferenceableRouteDefinition } from "@arrhes/application-metadata"
import { and, eq, ilike, or, sql } from "drizzle-orm"
import { checkUserSessionMiddleware } from "../../../middlewares/checkUserSessionMiddleware.js"
import { validateBodyMiddleware } from "../../../middlewares/validateBody.middleware.js"
import { apiFactory } from "../../../utilities/apiFactory.js"
import { response } from "../../../utilities/response.js"

const MAX_PER_TYPE = 10
const MAX_TOTAL = 50

export const searchReferenceableRoute = apiFactory
    .createApp()
    .post(searchReferenceableRouteDefinition.path, async (c) => {
        await checkUserSessionMiddleware({
            context: c,
        })
        const body = await validateBodyMiddleware({
            context: c,
            schema: searchReferenceableRouteDefinition.schemas.body,
        })

        const db = c.var.clients.sql
        const { idOrganization, idYear, query } = body
        const pattern = `%${query}%`

        const results: Array<{
            id: string
            type: "account" | "entry" | "journal" | "tag" | "file"
            label: string
        }> = []

        const yearFilter = idYear ? eq(models.account.idYear, idYear) : undefined

        // Accounts: search by number or label
        const accounts = await db
            .select({
                id: models.account.id,
                number: models.account.number,
                label: models.account.label,
            })
            .from(models.account)
            .where(
                and(
                    eq(models.account.idOrganization, idOrganization),
                    yearFilter ? eq(models.account.idYear, idYear!) : undefined,
                    or(ilike(models.account.number, pattern), ilike(models.account.label, pattern)),
                ),
            )
            .limit(MAX_PER_TYPE)

        for (const a of accounts) {
            results.push({
                id: a.id,
                type: "account",
                label: `${a.number} — ${a.label}`,
            })
        }

        // Entries: search by label
        const entries = await db
            .select({
                id: models.entry.id,
                label: models.entry.label,
                date: models.entry.date,
            })
            .from(models.entry)
            .where(
                and(
                    eq(models.entry.idOrganization, idOrganization),
                    idYear ? eq(models.entry.idYear, idYear) : undefined,
                    ilike(models.entry.label, pattern),
                ),
            )
            .limit(MAX_PER_TYPE)

        for (const e of entries) {
            const dateStr = e.date ? new Date(e.date).toLocaleDateString("fr-FR") : ""
            results.push({
                id: e.id,
                type: "entry",
                label: dateStr ? `${e.label} (${dateStr})` : e.label,
            })
        }

        // Journals: search by code or label
        const journals = await db
            .select({
                id: models.journal.id,
                code: models.journal.code,
                label: models.journal.label,
            })
            .from(models.journal)
            .where(
                and(
                    eq(models.journal.idOrganization, idOrganization),
                    idYear ? eq(models.journal.idYear, idYear) : undefined,
                    or(ilike(models.journal.code, pattern), ilike(sql`COALESCE(${models.journal.label}, '')`, pattern)),
                ),
            )
            .limit(MAX_PER_TYPE)

        for (const j of journals) {
            results.push({
                id: j.id,
                type: "journal",
                label: j.label ? `${j.code} — ${j.label}` : j.code,
            })
        }

        // Tags: search by label
        const tags = await db
            .select({
                id: models.tag.id,
                label: models.tag.label,
            })
            .from(models.tag)
            .where(
                and(
                    eq(models.tag.idOrganization, idOrganization),
                    idYear ? eq(models.tag.idYear, idYear) : undefined,
                    ilike(models.tag.label, pattern),
                ),
            )
            .limit(MAX_PER_TYPE)

        for (const t of tags) {
            results.push({
                id: t.id,
                type: "tag",
                label: t.label,
            })
        }

        // Files: search by name or reference
        const files = await db
            .select({
                id: models.file.id,
                name: models.file.name,
                reference: models.file.reference,
            })
            .from(models.file)
            .where(
                and(
                    eq(models.file.idOrganization, idOrganization),
                    idYear ? eq(models.file.idYear, idYear) : undefined,
                    or(
                        ilike(sql`COALESCE(${models.file.name}, '')`, pattern),
                        ilike(sql`COALESCE(${models.file.reference}, '')`, pattern),
                    ),
                ),
            )
            .limit(MAX_PER_TYPE)

        for (const f of files) {
            const label = f.reference && f.name ? `${f.reference} — ${f.name}` : (f.name ?? f.reference ?? "Fichier")
            results.push({
                id: f.id,
                type: "file",
                label,
            })
        }

        return response({
            context: c,
            statusCode: 200,
            schema: searchReferenceableRouteDefinition.schemas.return,
            data: results.slice(0, MAX_TOTAL),
        })
    })
