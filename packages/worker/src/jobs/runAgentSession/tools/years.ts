import { models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { sqlClient } from "#src/clients/sqlClient.js"

type DB = ReturnType<typeof sqlClient>

export async function readAllYears(db: DB, idOrganization: string) {
    return db.select().from(models.year).where(eq(models.year.idOrganization, idOrganization))
}

export async function readOneYear(db: DB, idOrganization: string, idYear: string) {
    const rows = await db
        .select()
        .from(models.year)
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .limit(1)
    return rows.at(0) ?? { error: "Year not found" }
}

export async function createOneYear(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { generateId } = await import("@arrhes/application-metadata")
    const rows = await db
        .insert(models.year)
        .values({ ...body, id: generateId(), idOrganization, createdAt: new Date().toISOString() } as any)
        .returning()
    return rows.at(0) ?? { error: "Year not created" }
}

export async function updateOneYear(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear, ...rest } = body as any
    const rows = await db
        .update(models.year)
        .set({ ...rest, lastUpdatedAt: new Date().toISOString() })
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .returning()
    return rows.at(0) ?? { error: "Year not updated" }
}

export async function closeYear(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const rows = await db
        .update(models.year)
        .set({ state: "closed", lastUpdatedAt: new Date().toISOString() } as any)
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .returning()
    return rows.at(0) ?? { error: "Year not closed" }
}

export async function openYear(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const rows = await db
        .update(models.year)
        .set({ state: "open", lastUpdatedAt: new Date().toISOString() } as any)
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .returning()
    return rows.at(0) ?? { error: "Year not opened" }
}
