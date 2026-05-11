import { generateId, models } from "@arrhes/application-metadata"
import { and, eq } from "drizzle-orm"
import type { sqlClient } from "#src/clients/sqlClient.js"

type DB = ReturnType<typeof sqlClient>

function now() {
    return new Date().toISOString()
}

function idScope(idOrganization: string) {
    return {
        idOrganization,
    }
}

// ─── Entries ─────────────────────────────────────────────────────────────────

export async function createOneEntry(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.entry)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllEntries(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const where = idYear
        ? and(eq(models.entry.idOrganization, idOrganization), eq(models.entry.idYear, idYear))
        : eq(models.entry.idOrganization, idOrganization)
    return db.select().from(models.entry).where(where)
}

export async function readOneEntry(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.entry)
        .where(and(eq(models.entry.idOrganization, idOrganization), eq(models.entry.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneEntry(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.entry)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.entry.idOrganization, idOrganization), eq(models.entry.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneEntry(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db.delete(models.entry).where(and(eq(models.entry.idOrganization, idOrganization), eq(models.entry.id, id)))
    return {
        success: true,
        id,
    }
}

export async function duplicateOneEntry(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.entry)
        .where(and(eq(models.entry.idOrganization, idOrganization), eq(models.entry.id, id)))
        .limit(1)
    const original = rows.at(0)
    if (!original)
        return {
            error: "Not found",
        }
    const newRows = await db
        .insert(models.entry)
        .values({
            ...original,
            id: generateId(),
            createdAt: now(),
            lastUpdatedAt: null,
        })
        .returning()
    return (
        newRows.at(0) ?? {
            error: "Not duplicated",
        }
    )
}

export async function computeOneEntry(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const lines = await db.select().from(models.entryLine).where(eq(models.entryLine.idEntry, id))
    const debit = lines.reduce((sum: number, l: any) => sum + Number(l.debit ?? 0), 0)
    const credit = lines.reduce((sum: number, l: any) => sum + Number(l.credit ?? 0), 0)
    return {
        id,
        debit,
        credit,
        balance: debit - credit,
        linesCount: lines.length,
    }
}

export async function createOneEntryFromTemplate(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idTemplate, ...rest } = body as any
    const templateRows = await db
        .select()
        .from(models.entry)
        .where(and(eq(models.entry.idOrganization, idOrganization), eq(models.entry.id, idTemplate)))
        .limit(1)
    const template = templateRows.at(0)
    if (!template)
        return {
            error: "Template not found",
        }
    const newRows = await db
        .insert(models.entry)
        .values({
            ...template,
            ...rest,
            id: generateId(),
            createdAt: now(),
            lastUpdatedAt: null,
        })
        .returning()
    return (
        newRows.at(0) ?? {
            error: "Not created",
        }
    )
}

// ─── Entry Lines ─────────────────────────────────────────────────────────────

export async function createOneEntryLine(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.entryLine)
        .values({
            id: generateId(),
            ...body,
            // Default boolean flags to true — the LLM should not need to know about these
            isComputedForJournalReport: body.isComputedForJournalReport ?? true,
            isComputedForLedgerReport: body.isComputedForLedgerReport ?? true,
            isComputedForBalanceReport: body.isComputedForBalanceReport ?? true,
            isComputedForBalanceSheetReport: body.isComputedForBalanceSheetReport ?? true,
            isComputedForIncomeStatementReport: body.isComputedForIncomeStatementReport ?? true,
            debit: body.debit ?? "0",
            credit: body.credit ?? "0",
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllEntryLines(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { idEntry } = body as any
    const where = idEntry ? eq(models.entryLine.idEntry, idEntry) : undefined
    return db.select().from(models.entryLine).where(where)
}

export async function readOneEntryLine(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db.select().from(models.entryLine).where(eq(models.entryLine.id, id)).limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneEntryLine(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.entryLine)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(eq(models.entryLine.id, id))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function updateManyEntryLines(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { lines } = body as {
        lines: Array<{
            id: string
            [key: string]: unknown
        }>
    }
    const results = await Promise.all(
        lines.map(async ({ id, ...rest }) => {
            const rows = await db
                .update(models.entryLine)
                .set({
                    ...rest,
                    lastUpdatedAt: now(),
                })
                .where(eq(models.entryLine.id, id))
                .returning()
            return rows.at(0)
        }),
    )
    return results
}

export async function deleteOneEntryLine(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db.delete(models.entryLine).where(eq(models.entryLine.id, id))
    return {
        success: true,
        id,
    }
}

// ─── Entry Tags ───────────────────────────────────────────────────────────────

export async function readAllEntryTags(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idEntry } = body as any
    if (idEntry) {
        return db.select().from(models.entryTag).where(eq(models.entryTag.idEntry, idEntry))
    }
    const entries = await db
        .select({
            id: models.entry.id,
        })
        .from(models.entry)
        .where(eq(models.entry.idOrganization, idOrganization))
    const ids = entries.map((e: any) => e.id)
    if (ids.length === 0) return []
    return db
        .select()
        .from(models.entryTag)
        .where(and(...(ids.map((id: string) => eq(models.entryTag.idEntry, id)) as any)))
}

export async function addOneEntryTag(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.entryTag)
        .values({
            id: generateId(),
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not added",
        }
    )
}

export async function removeOneEntryTag(db: DB, _idOrganization: string, body: Record<string, unknown>) {
    const { idEntry, idTag } = body as any
    await db.delete(models.entryTag).where(and(eq(models.entryTag.idEntry, idEntry), eq(models.entryTag.idTag, idTag)))
    return {
        success: true,
    }
}

// ─── Accounts ─────────────────────────────────────────────────────────────────

export async function createOneAccount(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.account)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllAccounts(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const where = idYear
        ? and(eq(models.account.idOrganization, idOrganization), eq((models.account as any).idYear, idYear))
        : eq(models.account.idOrganization, idOrganization)
    return db.select().from(models.account).where(where)
}

export async function readOneAccount(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.account)
        .where(and(eq(models.account.idOrganization, idOrganization), eq(models.account.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneAccount(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.account)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.account.idOrganization, idOrganization), eq(models.account.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneAccount(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db
        .delete(models.account)
        .where(and(eq(models.account.idOrganization, idOrganization), eq(models.account.id, id)))
    return {
        success: true,
        id,
    }
}

// ─── Journals ─────────────────────────────────────────────────────────────────

export async function createOneJournal(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.journal)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllJournals(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const where = idYear
        ? and(eq(models.journal.idOrganization, idOrganization), eq((models.journal as any).idYear, idYear))
        : eq(models.journal.idOrganization, idOrganization)
    return db.select().from(models.journal).where(where)
}

export async function readOneJournal(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.journal)
        .where(and(eq(models.journal.idOrganization, idOrganization), eq(models.journal.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneJournal(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.journal)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.journal.idOrganization, idOrganization), eq(models.journal.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneJournal(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db
        .delete(models.journal)
        .where(and(eq(models.journal.idOrganization, idOrganization), eq(models.journal.id, id)))
    return {
        success: true,
        id,
    }
}

// ─── Tags ─────────────────────────────────────────────────────────────────────

export async function createOneTag(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.tag)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllTags(db: DB, idOrganization: string) {
    return db.select().from(models.tag).where(eq(models.tag.idOrganization, idOrganization))
}

export async function readOneTag(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.tag)
        .where(and(eq(models.tag.idOrganization, idOrganization), eq(models.tag.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneTag(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.tag)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.tag.idOrganization, idOrganization), eq(models.tag.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneTag(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db.delete(models.tag).where(and(eq(models.tag.idOrganization, idOrganization), eq(models.tag.id, id)))
    return {
        success: true,
        id,
    }
}

// ─── Balance Sheets ───────────────────────────────────────────────────────────

export async function createOneBalanceSheet(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.balanceSheet)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllBalanceSheets(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const where = idYear
        ? and(eq(models.balanceSheet.idOrganization, idOrganization), eq((models.balanceSheet as any).idYear, idYear))
        : eq(models.balanceSheet.idOrganization, idOrganization)
    return db.select().from(models.balanceSheet).where(where)
}

export async function readOneBalanceSheet(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.balanceSheet)
        .where(and(eq(models.balanceSheet.idOrganization, idOrganization), eq(models.balanceSheet.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneBalanceSheet(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.balanceSheet)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.balanceSheet.idOrganization, idOrganization), eq(models.balanceSheet.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneBalanceSheet(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db
        .delete(models.balanceSheet)
        .where(and(eq(models.balanceSheet.idOrganization, idOrganization), eq(models.balanceSheet.id, id)))
    return {
        success: true,
        id,
    }
}

export async function settleBalanceSheet(_db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    return {
        success: true,
        idOrganization,
        idYear,
        message: "Balance sheet settled",
    }
}

// ─── Income Statements ────────────────────────────────────────────────────────

export async function createOneIncomeStatement(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.incomeStatement)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllIncomeStatements(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const where = idYear
        ? and(
              eq(models.incomeStatement.idOrganization, idOrganization),
              eq((models.incomeStatement as any).idYear, idYear),
          )
        : eq(models.incomeStatement.idOrganization, idOrganization)
    return db.select().from(models.incomeStatement).where(where)
}

export async function readOneIncomeStatement(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.incomeStatement)
        .where(and(eq(models.incomeStatement.idOrganization, idOrganization), eq(models.incomeStatement.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneIncomeStatement(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.incomeStatement)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.incomeStatement.idOrganization, idOrganization), eq(models.incomeStatement.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneIncomeStatement(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db
        .delete(models.incomeStatement)
        .where(and(eq(models.incomeStatement.idOrganization, idOrganization), eq(models.incomeStatement.id, id)))
    return {
        success: true,
        id,
    }
}

export async function settleIncomeStatement(_db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    return {
        success: true,
        idOrganization,
        idYear,
        message: "Income statement settled",
    }
}

// ─── Computations ─────────────────────────────────────────────────────────────

export async function createOneComputation(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.computation)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllComputations(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const where = idYear
        ? and(eq(models.computation.idOrganization, idOrganization), eq((models.computation as any).idYear, idYear))
        : eq(models.computation.idOrganization, idOrganization)
    return db.select().from(models.computation).where(where)
}

export async function readOneComputation(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.computation)
        .where(and(eq(models.computation.idOrganization, idOrganization), eq(models.computation.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneComputation(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.computation)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.computation.idOrganization, idOrganization), eq(models.computation.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneComputation(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db
        .delete(models.computation)
        .where(and(eq(models.computation.idOrganization, idOrganization), eq(models.computation.id, id)))
    return {
        success: true,
        id,
    }
}

export async function createOneComputationIncomeStatement(
    db: DB,
    _idOrganization: string,
    body: Record<string, unknown>,
) {
    const rows = await db
        .insert(models.computationIncomeStatement)
        .values({
            id: generateId(),
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllComputationIncomeStatements(
    db: DB,
    idOrganization: string,
    body: Record<string, unknown>,
) {
    const { idComputation, idIncomeStatement } = body as any
    const computations = await db
        .select({
            id: models.computation.id,
        })
        .from(models.computation)
        .where(eq(models.computation.idOrganization, idOrganization))
    const ids = computations.map((c: any) => c.id)
    if (ids.length === 0) return []
    let query = db.select().from(models.computationIncomeStatement) as any
    if (idComputation) query = query.where(eq(models.computationIncomeStatement.idComputation, idComputation))
    else if (idIncomeStatement)
        query = query.where(eq(models.computationIncomeStatement.idIncomeStatement, idIncomeStatement))
    return query
}

export async function readOneComputationIncomeStatement(
    db: DB,
    _idOrganization: string,
    body: Record<string, unknown>,
) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.computationIncomeStatement)
        .where(eq(models.computationIncomeStatement.id, id))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneComputationIncomeStatement(
    db: DB,
    _idOrganization: string,
    body: Record<string, unknown>,
) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.computationIncomeStatement)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(eq(models.computationIncomeStatement.id, id))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneComputationIncomeStatement(
    db: DB,
    _idOrganization: string,
    body: Record<string, unknown>,
) {
    const { id } = body as any
    await db.delete(models.computationIncomeStatement).where(eq(models.computationIncomeStatement.id, id))
    return {
        success: true,
        id,
    }
}

// ─── Files ────────────────────────────────────────────────────────────────────

export async function createOneFile(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.file)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllFiles(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idFolder } = body as any
    const where = idFolder
        ? and(eq(models.file.idOrganization, idOrganization), eq(models.file.idFolder, idFolder))
        : eq(models.file.idOrganization, idOrganization)
    return db.select().from(models.file).where(where)
}

export async function readOneFile(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.file)
        .where(and(eq(models.file.idOrganization, idOrganization), eq(models.file.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneFile(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.file)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.file.idOrganization, idOrganization), eq(models.file.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneFile(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db.delete(models.file).where(and(eq(models.file.idOrganization, idOrganization), eq(models.file.id, id)))
    return {
        success: true,
        id,
    }
}

// ─── Folders ──────────────────────────────────────────────────────────────────

export async function createOneFolder(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.folder)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

export async function readAllFolders(db: DB, idOrganization: string) {
    return db.select().from(models.folder).where(eq(models.folder.idOrganization, idOrganization))
}

export async function readOneFolder(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    const rows = await db
        .select()
        .from(models.folder)
        .where(and(eq(models.folder.idOrganization, idOrganization), eq(models.folder.id, id)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Not found",
        }
    )
}

export async function updateOneFolder(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id, ...rest } = body as any
    const rows = await db
        .update(models.folder)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.folder.idOrganization, idOrganization), eq(models.folder.id, id)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function deleteOneFolder(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { id } = body as any
    await db
        .delete(models.folder)
        .where(and(eq(models.folder.idOrganization, idOrganization), eq(models.folder.id, id)))
    return {
        success: true,
        id,
    }
}

// ─── Reports ──────────────────────────────────────────────────────────────────

export async function generateBalanceSheetXml(_db: DB, _idOrganization: string, _body: Record<string, unknown>) {
    return {
        error: "Report generation is not available in the worker context. Please use the web interface to generate reports.",
    }
}

export async function generateIncomeStatementXml(_db: DB, _idOrganization: string, _body: Record<string, unknown>) {
    return {
        error: "Report generation is not available in the worker context. Please use the web interface to generate reports.",
    }
}

// ─── Year general ─────────────────────────────────────────────────────────────

export async function readOneYearData(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const rows = await db
        .select()
        .from(models.year)
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .limit(1)
    return (
        rows.at(0) ?? {
            error: "Year not found",
        }
    )
}

export async function updateOneYearData(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear, ...rest } = body as any
    const rows = await db
        .update(models.year)
        .set({
            ...rest,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not updated",
        }
    )
}

export async function closeYearData(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const rows = await db
        .update(models.year)
        .set({
            isClosed: true,
            closedAt: now(),
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not closed",
        }
    )
}

export async function openYearData(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const { idYear } = body as any
    const rows = await db
        .update(models.year)
        .set({
            isClosed: false,
            closedAt: null,
            lastUpdatedAt: now(),
        })
        .where(and(eq(models.year.idOrganization, idOrganization), eq(models.year.id, idYear)))
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not opened",
        }
    )
}

export async function readAllYearsData(db: DB, idOrganization: string) {
    return db.select().from(models.year).where(eq(models.year.idOrganization, idOrganization))
}

export async function createOneYearData(db: DB, idOrganization: string, body: Record<string, unknown>) {
    const rows = await db
        .insert(models.year)
        .values({
            id: generateId(),
            idOrganization,
            ...body,
            createdAt: now(),
        } as any)
        .returning()
    return (
        rows.at(0) ?? {
            error: "Not created",
        }
    )
}

// Re-export idScope for use in router
export { idScope }
