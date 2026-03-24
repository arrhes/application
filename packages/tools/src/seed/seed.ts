import { pbkdf2Sync, randomBytes } from "node:crypto"
import {
    type DefaultAccount,
    defaultCompanyAccounts,
    defaultCompanyBalanceSheets,
    defaultCompanyIncomeStatements,
    defaultComputations,
    defaultJournals,
} from "@arrhes/application-metadata/components"
import { models } from "@arrhes/application-metadata/models"
import { generateId } from "@arrhes/application-metadata/utilities"
import { randFirstName } from "@ngneat/falso"
import { dbClient } from "../dbClient.js"

// Helper: Flatten hierarchical accounts into a flat array
function flattenAccounts(accounts: DefaultAccount[]): DefaultAccount[] {
    const result: DefaultAccount[] = []

    function traverse(account: DefaultAccount) {
        result.push(account)
        for (const child of account.children) {
            traverse(child)
        }
    }

    for (const account of accounts) {
        traverse(account)
    }

    return result
}

// Helper: Find parent account number (immediate parent in hierarchy)
function findParentNumber(accountNumber: number, allAccounts: DefaultAccount[]): number | undefined {
    const numberStr = accountNumber.toString()
    if (numberStr.length <= 1) return undefined

    // For each possible parent length (from longest to shortest)
    for (let len = numberStr.length - 1; len >= 1; len--) {
        const potentialParent = parseInt(numberStr.substring(0, len), 10)
        if (allAccounts.some((a) => a.number === potentialParent)) {
            return potentialParent
        }
    }

    return undefined
}

async function seed() {
    try {
        // Check if data already exists
        const existingUsers = await dbClient.select().from(models.user).limit(1)
        if (existingUsers.length > 0) {
            console.log("Database already seeded, skipping...")
            return
        }

        await dbClient.transaction(async (tx) => {
            const createdAt = new Date().toISOString()

            // ==========================================
            // USER
            // ==========================================
            console.log("Creating user...")
            const passwordSalt = randomBytes(16).toString("hex")
            const passwordHash = pbkdf2Sync("demo", passwordSalt, 128000, 64, `sha512`).toString(`hex`)
            const newUser: typeof models.user.$inferInsert = {
                id: generateId(),
                isActive: true,
                email: "demo@arrhes.com",
                alias: randFirstName(),
                passwordHash: passwordHash,
                passwordSalt: passwordSalt,
                isEmailValidated: true,
                createdAt: createdAt,
            }
            await tx.insert(models.user).values(newUser)

            // ==========================================
            // ORGANIZATION 1: Empty organization
            // ==========================================
            console.log("Creating empty organization...")
            const emptyOrganization: typeof models.organization.$inferInsert = {
                id: generateId(),
                isArchived: false,
                scope: "company",
                siren: "111111111",
                name: "Organisation vide",
                email: "empty@arrhes.com",
                createdAt: createdAt,
            }
            await tx.insert(models.organization).values(emptyOrganization)

            // Link user to empty organization
            const emptyOrganizationUser: typeof models.organizationUser.$inferInsert = {
                id: generateId(),
                idOrganization: emptyOrganization.id,
                idUser: newUser.id,
                isOwner: true,
                isAdmin: true,
                status: "active",
                createdAt: createdAt,
            }
            await tx.insert(models.organizationUser).values(emptyOrganizationUser)

            // ==========================================
            // ORGANIZATION 2: Fully populated organization
            // ==========================================
            console.log("Creating populated organization...")
            const populatedOrganization: typeof models.organization.$inferInsert = {
                id: generateId(),
                isArchived: false,
                scope: "company",
                siren: "222222222",
                name: "Demo company",
                email: "demo@arrhes.com",
                createdAt: createdAt,
            }
            await tx.insert(models.organization).values(populatedOrganization)

            // Link user to populated organization
            const populatedOrganizationUser: typeof models.organizationUser.$inferInsert = {
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idUser: newUser.id,
                isOwner: true,
                isAdmin: true,
                status: "active",
                createdAt: createdAt,
            }
            await tx.insert(models.organizationUser).values(populatedOrganizationUser)

            // ==========================================
            // YEAR (for populated organization)
            // ==========================================
            console.log("Creating year...")
            const currentDate = new Date()
            const newYear: typeof models.year.$inferInsert = {
                id: generateId(),
                idOrganization: populatedOrganization.id,
                isClosed: false,
                label: `Exercice ${currentDate.getFullYear()}`,
                startingAt: new Date(currentDate.getFullYear(), 0, 1, 0, 0).toISOString(),
                endingAt: new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59).toISOString(),
                createdAt: createdAt,
            }
            await tx.insert(models.year).values(newYear)

            // ==========================================
            // JOURNALS
            // ==========================================
            console.log("Creating journals...")
            const newJournals: (typeof models.journal.$inferInsert)[] = defaultJournals.map((journal) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                code: journal.code,
                label: journal.label,
                createdAt: createdAt,
            }))
            await tx.insert(models.journal).values(newJournals)

            // Create a map for journal lookup
            const journalByCode = new Map(newJournals.map((j) => [j.code, j]))

            // ==========================================
            // BALANCE SHEETS
            // ==========================================
            console.log("Creating balance sheets...")
            type BalanceSheetWithMeta = typeof models.balanceSheet.$inferInsert & {
                originalNumber: number
                numberParent: number | undefined
                accounts: (typeof defaultCompanyBalanceSheets)[number]["accounts"]
            }

            const newBalanceSheets: BalanceSheetWithMeta[] = defaultCompanyBalanceSheets.map((bs) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                idBalanceSheetParent: undefined,
                isDefault: true,
                isComputed: true,
                side: bs.side,
                number: bs.number.toString(),
                label: bs.label,
                createdAt: createdAt,
                originalNumber: bs.number,
                numberParent: bs.numberParent,
                accounts: bs.accounts,
            }))

            // Resolve parent IDs
            for (const bs of newBalanceSheets) {
                if (bs.numberParent !== undefined) {
                    const parent = newBalanceSheets.find(
                        (p) => p.originalNumber === bs.numberParent && p.side === bs.side,
                    )
                    if (parent) {
                        bs.idBalanceSheetParent = parent.id
                    }
                }
            }

            // Insert balance sheets (without meta fields)
            await tx
                .insert(models.balanceSheet)
                .values(newBalanceSheets.map(({ originalNumber, numberParent, accounts, ...bs }) => bs))

            // Create lookup maps for balance sheets
            const _balanceSheetByNumberAndSide = new Map(
                newBalanceSheets.map((bs) => [`${bs.side}-${bs.originalNumber}`, bs]),
            )

            // ==========================================
            // INCOME STATEMENTS
            // ==========================================
            console.log("Creating income statements...")
            type IncomeStatementWithMeta = typeof models.incomeStatement.$inferInsert & {
                originalNumber: number
                numberParent: number | undefined
                accountNumbers: number[]
            }

            const newIncomeStatements: IncomeStatementWithMeta[] = defaultCompanyIncomeStatements.map((is) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                idIncomeStatementParent: undefined,
                isDefault: true,
                isComputed: true,
                number: is.number.toString(),
                label: is.label,
                createdAt: createdAt,
                originalNumber: is.number,
                numberParent: is.numberParent,
                accountNumbers: is.accounts,
            }))

            // Resolve parent IDs
            for (const is of newIncomeStatements) {
                if (is.numberParent !== undefined) {
                    const parent = newIncomeStatements.find((p) => p.originalNumber === is.numberParent)
                    if (parent) {
                        is.idIncomeStatementParent = parent.id
                    }
                }
            }

            // Insert income statements (without meta fields)
            await tx
                .insert(models.incomeStatement)
                .values(newIncomeStatements.map(({ originalNumber, numberParent, accountNumbers, ...is }) => is))

            // Create lookup map for income statements
            const incomeStatementByNumber = new Map(newIncomeStatements.map((is) => [is.originalNumber, is]))

            // ==========================================
            // ACCOUNTS
            // ==========================================
            console.log("Creating accounts...")
            const flatAccounts = flattenAccounts(defaultCompanyAccounts)

            type AccountWithMeta = typeof models.account.$inferInsert & {
                originalNumber: number
            }

            // Create account map for balance sheet lookups (account number -> balance sheet info)
            const accountToBalanceSheetAsset = new Map<
                number,
                {
                    id: string
                    flow: "debit" | "credit"
                    isAmortization: boolean
                }
            >()
            const accountToBalanceSheetLiability = new Map<
                number,
                {
                    id: string
                    flow: "debit" | "credit"
                    isAmortization: boolean
                }
            >()

            for (const bs of newBalanceSheets) {
                for (const acc of bs.accounts) {
                    const mapping = {
                        id: bs.id!,
                        flow: acc.flow,
                        isAmortization: acc.isAmortization,
                    }
                    if (bs.side === "asset") {
                        accountToBalanceSheetAsset.set(acc.number, mapping)
                    } else {
                        accountToBalanceSheetLiability.set(acc.number, mapping)
                    }
                }
            }

            // Create account map for income statement lookups
            const accountToIncomeStatement = new Map<number, string>()
            for (const is of newIncomeStatements) {
                for (const accNum of is.accountNumbers) {
                    accountToIncomeStatement.set(accNum, is.id!)
                }
            }

            // Build account objects
            const newAccounts: AccountWithMeta[] = flatAccounts.map((account) => {
                const assetMapping = accountToBalanceSheetAsset.get(account.number)
                const liabilityMapping = accountToBalanceSheetLiability.get(account.number)
                const incomeStatementId = accountToIncomeStatement.get(account.number)

                return {
                    id: generateId(),
                    idOrganization: populatedOrganization.id,
                    idYear: newYear.id,
                    idAccountParent: undefined,
                    idBalanceSheetAsset: assetMapping?.id ?? null,
                    balanceSheetAssetColumn: assetMapping
                        ? assetMapping.isAmortization
                            ? "amortization"
                            : "gross"
                        : null,
                    balanceSheetAssetFlow: assetMapping?.flow ?? null,
                    idBalanceSheetLiability: liabilityMapping?.id ?? null,
                    balanceSheetLiabilityColumn: liabilityMapping
                        ? liabilityMapping.isAmortization
                            ? "amortization"
                            : "gross"
                        : null,
                    balanceSheetLiabilityFlow: liabilityMapping?.flow ?? null,
                    idIncomeStatement: incomeStatementId ?? null,
                    isMandatory: account.isMandatory,
                    isClass: account.isClass,
                    isSelectable: account.isSelectable,
                    isDefault: true,
                    number: account.number.toString(),
                    label: account.label,
                    type: account.type,
                    createdAt: createdAt,
                    originalNumber: account.number,
                }
            })

            // Resolve parent account IDs
            const accountByNumber = new Map(newAccounts.map((a) => [a.originalNumber, a]))
            for (const account of newAccounts) {
                const parentNumber = findParentNumber(account.originalNumber, flatAccounts)
                if (parentNumber !== undefined) {
                    const parent = accountByNumber.get(parentNumber)
                    if (parent) {
                        account.idAccountParent = parent.id
                    }
                }
            }

            // Insert accounts (without meta fields)
            await tx.insert(models.account).values(newAccounts.map(({ originalNumber, ...acc }) => acc))

            // ==========================================
            // COMPUTATIONS
            // ==========================================
            console.log("Creating computations...")
            type ComputationWithMeta = typeof models.computation.$inferInsert & {
                incomeStatements: (typeof defaultComputations)[number]["incomeStatements"]
            }

            const newComputations: ComputationWithMeta[] = defaultComputations.map((comp, index) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                index: index,
                number: comp.number.toString(),
                label: comp.label,
                createdAt: createdAt,
                incomeStatements: comp.incomeStatements,
            }))

            // Insert computations (without meta fields)
            await tx.insert(models.computation).values(newComputations.map(({ incomeStatements, ...comp }) => comp))

            // ==========================================
            // COMPUTATION INCOME STATEMENTS
            // ==========================================
            console.log("Creating computation income statements...")
            const newComputationIncomeStatements: (typeof models.computationIncomeStatement.$inferInsert)[] = []

            for (const computation of newComputations) {
                for (let i = 0; i < computation.incomeStatements.length; i++) {
                    const isRef = computation.incomeStatements[i]
                    const incomeStatement = incomeStatementByNumber.get(isRef.number)

                    if (!incomeStatement) {
                        console.warn(
                            `Income statement not found: ${isRef.number} for computation ${computation.number}`,
                        )
                        continue
                    }

                    newComputationIncomeStatements.push({
                        id: generateId(),
                        idOrganization: populatedOrganization.id,
                        idYear: newYear.id,
                        idComputation: computation.id!,
                        idIncomeStatement: incomeStatement.id!,
                        index: i,
                        operation: isRef.operation,
                        createdAt: createdAt,
                    })
                }
            }

            if (newComputationIncomeStatements.length > 0) {
                await tx.insert(models.computationIncomeStatement).values(newComputationIncomeStatements)
            }

            // ==========================================
            // TAGS
            // ==========================================
            console.log("Creating tags...")
            const tagData = [
                { label: "Loyer mensuel" },
                { label: "Facture fournisseur" },
                { label: "Vente client" },
                { label: "Salaires" },
                { label: "Charges sociales" },
                { label: "Electricite" },
                { label: "Abonnement internet" },
            ]

            const newTags: (typeof models.tag.$inferInsert)[] = tagData.map((t) => ({
                id: generateId(),
                idOrganization: populatedOrganization.id,
                idYear: newYear.id,
                label: t.label,
                createdAt: createdAt,
            }))

            await tx.insert(models.tag).values(newTags)

            // ==========================================
            // SAMPLE ENTRIES AND ENTRY LINES
            // ==========================================
            console.log("Creating sample entries and entry lines...")

            // Account lookup helper
            const acc = (num: number) => newAccounts.find((a) => a.originalNumber === num)

            // Journal lookup
            const journalVT = journalByCode.get("VT")
            const journalAC = journalByCode.get("AC")
            const journalBQ = journalByCode.get("BQ")
            const journalOD = journalByCode.get("OD")

            // Tag lookup by label text
            const tagByLabel = new Map(newTags.map((t) => [t.label, t]))
            const tagIdsFor = (label: string): string[] => {
                const id = tagByLabel.get(label)?.id
                return id ? [id] : []
            }

            // Helper: build an entry + lines + tag links
            function makeEntry(
                journal: (typeof newJournals)[number],
                label: string,
                date: Date,
                tagIds: string[],
                lines: { idAccount: string; label: string; debit: string; credit: string }[],
            ) {
                const entryId = generateId()
                return {
                    entry: {
                        id: entryId,
                        idOrganization: populatedOrganization.id,
                        idYear: newYear.id,
                        idJournal: journal.id,
                        idFile: null,
                        label: label,
                        date: date.toISOString(),
                        createdAt: createdAt,
                    } satisfies typeof models.entry.$inferInsert,
                    lines: lines.map(
                        (l) =>
                            ({
                                id: generateId(),
                                idOrganization: populatedOrganization.id,
                                idYear: newYear.id,
                                idEntry: entryId,
                                idAccount: l.idAccount,
                                isComputedForJournalReport: true,
                                isComputedForLedgerReport: true,
                                isComputedForBalanceReport: true,
                                isComputedForBalanceSheetReport: true,
                                isComputedForIncomeStatementReport: true,
                                label: l.label,
                                debit: l.debit,
                                credit: l.credit,
                                createdAt: createdAt,
                            }) satisfies typeof models.entryLine.$inferInsert,
                    ),
                    entryTags: tagIds.map(
                        (tagId) =>
                            ({
                                id: generateId(),
                                idOrganization: populatedOrganization.id,
                                idYear: newYear.id,
                                idEntry: entryId,
                                idTag: tagId,
                                createdAt: createdAt,
                            }) satisfies typeof models.entryTag.$inferInsert,
                    ),
                }
            }

            const y = currentDate.getFullYear()
            const sampleEntries: ReturnType<typeof makeEntry>[] = []

            // ---- SALES (VT) ----
            if (journalVT && acc(411) && acc(706) && acc(707) && acc(44571)) {
                // FC001 — Prestation de services (January)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC001", new Date(y, 0, 15), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC001",
                            debit: "1200.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(706)!.id,
                            label: "Prestation de services",
                            debit: "0.00",
                            credit: "1000.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "200.00" },
                    ]),
                )
                // FC002 — Vente de marchandises (February)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC002", new Date(y, 1, 3), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC002",
                            debit: "3600.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(707)!.id,
                            label: "Vente de marchandises",
                            debit: "0.00",
                            credit: "3000.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "600.00" },
                    ]),
                )
                // FC003 — Prestation (March)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC003", new Date(y, 2, 10), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC003",
                            debit: "2400.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(706)!.id,
                            label: "Prestation de services",
                            debit: "0.00",
                            credit: "2000.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "400.00" },
                    ]),
                )
                // FC004 — Vente de marchandises (May)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC004", new Date(y, 4, 20), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC004",
                            debit: "960.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(707)!.id,
                            label: "Vente de marchandises",
                            debit: "0.00",
                            credit: "800.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "160.00" },
                    ]),
                )
                // FC005 — Prestation (July)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC005", new Date(y, 6, 8), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC005",
                            debit: "5400.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(706)!.id,
                            label: "Prestation de services",
                            debit: "0.00",
                            credit: "4500.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "900.00" },
                    ]),
                )
                // FC006 — Vente (September)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC006", new Date(y, 8, 12), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC006",
                            debit: "1800.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(707)!.id,
                            label: "Vente de marchandises",
                            debit: "0.00",
                            credit: "1500.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "300.00" },
                    ]),
                )
                // FC007 — Prestation (November)
                sampleEntries.push(
                    makeEntry(journalVT, "Facture client FC007", new Date(y, 10, 5), tagIdsFor("Vente client"), [
                        {
                            idAccount: acc(411)!.id,
                            label: "Client - Facture FC007",
                            debit: "3000.00",
                            credit: "0.00",
                        },
                        {
                            idAccount: acc(706)!.id,
                            label: "Prestation de services",
                            debit: "0.00",
                            credit: "2500.00",
                        },
                        { idAccount: acc(44571)!.id, label: "TVA collectee 20%", debit: "0.00", credit: "500.00" },
                    ]),
                )
            }

            // ---- PURCHASES (AC) ----
            if (journalAC && acc(401) && acc(44566)) {
                // Achat de marchandises (January)
                if (acc(607)) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            "Facture fournisseur FF001",
                            new Date(y, 0, 10),
                            tagIdsFor("Facture fournisseur"),
                            [
                                {
                                    idAccount: acc(607)!.id,
                                    label: "Achats de marchandises",
                                    debit: "2500.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(44566)!.id,
                                    label: "TVA deductible 20%",
                                    debit: "500.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Fournisseur - FF001",
                                    debit: "0.00",
                                    credit: "3000.00",
                                },
                            ],
                        ),
                    )
                }
                // Loyer mensuel — January to June (monthly)
                if (acc(613)) {
                    for (let m = 0; m < 6; m++) {
                        sampleEntries.push(
                            makeEntry(
                                journalAC,
                                `Loyer bureau - ${String(m + 1).padStart(2, "0")}/${y}`,
                                new Date(y, m, 1),
                                tagIdsFor("Loyer mensuel"),
                                [
                                    {
                                        idAccount: acc(613)!.id,
                                        label: "Loyer bureau mensuel",
                                        debit: "1500.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(44566)!.id,
                                        label: "TVA deductible 20%",
                                        debit: "300.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(401)!.id,
                                        label: "Bailleur - loyer",
                                        debit: "0.00",
                                        credit: "1800.00",
                                    },
                                ],
                            ),
                        )
                    }
                }
                // Fournitures de bureau (March)
                if (acc(606)) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            "Facture fournitures bureau",
                            new Date(y, 2, 18),
                            tagIdsFor("Facture fournisseur"),
                            [
                                {
                                    idAccount: acc(606)!.id,
                                    label: "Fournitures de bureau",
                                    debit: "350.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(44566)!.id,
                                    label: "TVA deductible 20%",
                                    debit: "70.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Fournisseur - fournitures",
                                    debit: "0.00",
                                    credit: "420.00",
                                },
                            ],
                        ),
                    )
                }
                // Assurance annuelle (January)
                if (acc(616)) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            "Prime assurance RC Pro",
                            new Date(y, 0, 5),
                            [],
                            [
                                {
                                    idAccount: acc(616)!.id,
                                    label: "Assurance RC Pro annuelle",
                                    debit: "1800.00",
                                    credit: "0.00",
                                },
                                { idAccount: acc(401)!.id, label: "Assureur", debit: "0.00", credit: "1800.00" },
                            ],
                        ),
                    )
                }
                // Honoraires comptable (April)
                if (acc(622)) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            "Honoraires expert-comptable T1",
                            new Date(y, 3, 15),
                            [],
                            [
                                {
                                    idAccount: acc(622)!.id,
                                    label: "Honoraires comptable",
                                    debit: "2000.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(44566)!.id,
                                    label: "TVA deductible 20%",
                                    debit: "400.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Expert-comptable",
                                    debit: "0.00",
                                    credit: "2400.00",
                                },
                            ],
                        ),
                    )
                }
                // Abonnement internet — January to June (monthly)
                if (acc(626)) {
                    for (let m = 0; m < 6; m++) {
                        sampleEntries.push(
                            makeEntry(
                                journalAC,
                                `Abonnement internet - ${String(m + 1).padStart(2, "0")}/${y}`,
                                new Date(y, m, 5),
                                tagIdsFor("Abonnement internet"),
                                [
                                    {
                                        idAccount: acc(626)!.id,
                                        label: "Abonnement internet",
                                        debit: "49.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(44566)!.id,
                                        label: "TVA deductible 20%",
                                        debit: "9.80",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(401)!.id,
                                        label: "FAI - abonnement",
                                        debit: "0.00",
                                        credit: "58.80",
                                    },
                                ],
                            ),
                        )
                    }
                }
                // Déplacement professionnel (June)
                if (acc(625)) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            "Frais deplacement salon professionnel",
                            new Date(y, 5, 22),
                            [],
                            [
                                {
                                    idAccount: acc(625)!.id,
                                    label: "Deplacement salon Paris",
                                    debit: "450.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(44566)!.id,
                                    label: "TVA deductible 10%",
                                    debit: "45.00",
                                    credit: "0.00",
                                },
                                { idAccount: acc(401)!.id, label: "Agence de voyage", debit: "0.00", credit: "495.00" },
                            ],
                        ),
                    )
                }
                // Achat marchandises supplémentaire (August)
                if (acc(607)) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            "Facture fournisseur FF002",
                            new Date(y, 7, 5),
                            tagIdsFor("Facture fournisseur"),
                            [
                                {
                                    idAccount: acc(607)!.id,
                                    label: "Achats de marchandises",
                                    debit: "4200.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(44566)!.id,
                                    label: "TVA deductible 20%",
                                    debit: "840.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Fournisseur - FF002",
                                    debit: "0.00",
                                    credit: "5040.00",
                                },
                            ],
                        ),
                    )
                }
            }

            // ---- SALAIRES (OD) ----
            if (journalOD && acc(641) && acc(645) && acc(421) && acc(431)) {
                // Monthly payroll — January to June
                for (let m = 0; m < 6; m++) {
                    const monthStr = String(m + 1).padStart(2, "0")
                    sampleEntries.push(
                        makeEntry(journalOD, `Salaires ${monthStr}/${y}`, new Date(y, m, 28), tagIdsFor("Salaires"), [
                            {
                                idAccount: acc(641)!.id,
                                label: "Remunerations brutes",
                                debit: "3500.00",
                                credit: "0.00",
                            },
                            {
                                idAccount: acc(421)!.id,
                                label: "Salaire net a payer",
                                debit: "0.00",
                                credit: "2730.00",
                            },
                            {
                                idAccount: acc(431)!.id,
                                label: "Cotisations salariales URSSAF",
                                debit: "0.00",
                                credit: "770.00",
                            },
                        ]),
                    )
                    sampleEntries.push(
                        makeEntry(
                            journalOD,
                            `Charges sociales ${monthStr}/${y}`,
                            new Date(y, m, 28),
                            tagIdsFor("Charges sociales"),
                            [
                                {
                                    idAccount: acc(645)!.id,
                                    label: "Charges patronales",
                                    debit: "1540.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(431)!.id,
                                    label: "Cotisations patronales URSSAF",
                                    debit: "0.00",
                                    credit: "1540.00",
                                },
                            ],
                        ),
                    )
                }
            }

            // ---- BANK (BQ) — Receipts and payments ----
            if (journalBQ && acc(512)) {
                // Client payments (matching sales invoices)
                if (acc(411)) {
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Encaissement client FC001",
                            new Date(y, 1, 1),
                            [],
                            [
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Encaissement FC001",
                                    debit: "1200.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(411)!.id,
                                    label: "Reglement client FC001",
                                    debit: "0.00",
                                    credit: "1200.00",
                                },
                            ],
                        ),
                    )
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Encaissement client FC002",
                            new Date(y, 2, 5),
                            [],
                            [
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Encaissement FC002",
                                    debit: "3600.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(411)!.id,
                                    label: "Reglement client FC002",
                                    debit: "0.00",
                                    credit: "3600.00",
                                },
                            ],
                        ),
                    )
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Encaissement client FC003",
                            new Date(y, 3, 2),
                            [],
                            [
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Encaissement FC003",
                                    debit: "2400.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(411)!.id,
                                    label: "Reglement client FC003",
                                    debit: "0.00",
                                    credit: "2400.00",
                                },
                            ],
                        ),
                    )
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Encaissement client FC005",
                            new Date(y, 7, 1),
                            [],
                            [
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Encaissement FC005",
                                    debit: "5400.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(411)!.id,
                                    label: "Reglement client FC005",
                                    debit: "0.00",
                                    credit: "5400.00",
                                },
                            ],
                        ),
                    )
                }
                // Supplier payments
                if (acc(401)) {
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Reglement fournisseur FF001",
                            new Date(y, 1, 10),
                            [],
                            [
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Reglement fournisseur FF001",
                                    debit: "3000.00",
                                    credit: "0.00",
                                },
                                { idAccount: acc(512)!.id, label: "Paiement FF001", debit: "0.00", credit: "3000.00" },
                            ],
                        ),
                    )
                    // Loyer payments — January to June
                    for (let m = 0; m < 6; m++) {
                        sampleEntries.push(
                            makeEntry(
                                journalBQ,
                                `Paiement loyer ${String(m + 1).padStart(2, "0")}/${y}`,
                                new Date(y, m, 5),
                                tagIdsFor("Loyer mensuel"),
                                [
                                    {
                                        idAccount: acc(401)!.id,
                                        label: "Reglement bailleur",
                                        debit: "1800.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(512)!.id,
                                        label: "Paiement loyer",
                                        debit: "0.00",
                                        credit: "1800.00",
                                    },
                                ],
                            ),
                        )
                    }
                    // Assurance payment
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Paiement assurance RC Pro",
                            new Date(y, 0, 20),
                            [],
                            [
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Reglement assureur",
                                    debit: "1800.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Paiement assurance",
                                    debit: "0.00",
                                    credit: "1800.00",
                                },
                            ],
                        ),
                    )
                    // Internet payments — January to June
                    for (let m = 0; m < 6; m++) {
                        sampleEntries.push(
                            makeEntry(
                                journalBQ,
                                `Paiement internet ${String(m + 1).padStart(2, "0")}/${y}`,
                                new Date(y, m, 10),
                                tagIdsFor("Abonnement internet"),
                                [
                                    { idAccount: acc(401)!.id, label: "Reglement FAI", debit: "58.80", credit: "0.00" },
                                    {
                                        idAccount: acc(512)!.id,
                                        label: "Paiement abonnement internet",
                                        debit: "0.00",
                                        credit: "58.80",
                                    },
                                ],
                            ),
                        )
                    }
                    // Honoraires payment
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Paiement honoraires comptable",
                            new Date(y, 4, 10),
                            [],
                            [
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Reglement expert-comptable",
                                    debit: "2400.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Paiement honoraires",
                                    debit: "0.00",
                                    credit: "2400.00",
                                },
                            ],
                        ),
                    )
                    // Deplacement payment
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Paiement frais deplacement",
                            new Date(y, 6, 2),
                            [],
                            [
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Reglement agence voyage",
                                    debit: "495.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(512)!.id,
                                    label: "Paiement deplacement",
                                    debit: "0.00",
                                    credit: "495.00",
                                },
                            ],
                        ),
                    )
                    // FF002 payment
                    sampleEntries.push(
                        makeEntry(
                            journalBQ,
                            "Reglement fournisseur FF002",
                            new Date(y, 8, 1),
                            [],
                            [
                                {
                                    idAccount: acc(401)!.id,
                                    label: "Reglement fournisseur FF002",
                                    debit: "5040.00",
                                    credit: "0.00",
                                },
                                { idAccount: acc(512)!.id, label: "Paiement FF002", debit: "0.00", credit: "5040.00" },
                            ],
                        ),
                    )
                }
                // Salary payments — January to June
                if (acc(421)) {
                    for (let m = 0; m < 6; m++) {
                        sampleEntries.push(
                            makeEntry(
                                journalBQ,
                                `Virement salaire ${String(m + 1).padStart(2, "0")}/${y}`,
                                new Date(y, m + 1, 1),
                                tagIdsFor("Salaires"),
                                [
                                    {
                                        idAccount: acc(421)!.id,
                                        label: "Paiement salaire net",
                                        debit: "2730.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(512)!.id,
                                        label: "Virement salaire",
                                        debit: "0.00",
                                        credit: "2730.00",
                                    },
                                ],
                            ),
                        )
                    }
                }
                // Social charges payments — quarterly
                if (acc(431)) {
                    for (const quarter of [0, 3]) {
                        const qLabel = quarter === 0 ? "T1" : "T2"
                        sampleEntries.push(
                            makeEntry(
                                journalBQ,
                                `Paiement cotisations URSSAF ${qLabel}`,
                                new Date(y, quarter + 3, 15),
                                tagIdsFor("Charges sociales"),
                                [
                                    {
                                        idAccount: acc(431)!.id,
                                        label: `Reglement URSSAF ${qLabel}`,
                                        debit: "6930.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(512)!.id,
                                        label: `Paiement URSSAF ${qLabel}`,
                                        debit: "0.00",
                                        credit: "6930.00",
                                    },
                                ],
                            ),
                        )
                    }
                }
                // Electricite — bimonthly
                if (acc(606) && acc(401)) {
                    for (const m of [1, 3, 5]) {
                        sampleEntries.push(
                            makeEntry(
                                journalBQ,
                                `Prelevement electricite`,
                                new Date(y, m, 15),
                                tagIdsFor("Electricite"),
                                [
                                    {
                                        idAccount: acc(401)!.id,
                                        label: "Fournisseur electricite",
                                        debit: "180.00",
                                        credit: "0.00",
                                    },
                                    {
                                        idAccount: acc(512)!.id,
                                        label: "Paiement electricite",
                                        debit: "0.00",
                                        credit: "180.00",
                                    },
                                ],
                            ),
                        )
                    }
                }
            }

            // ---- ELECTRICITE purchases (AC) ----
            if (journalAC && acc(606) && acc(44566) && acc(401)) {
                for (const m of [1, 3, 5]) {
                    sampleEntries.push(
                        makeEntry(
                            journalAC,
                            `Facture electricite bimestrielle`,
                            new Date(y, m, 10),
                            tagIdsFor("Electricite"),
                            [
                                {
                                    idAccount: acc(606)!.id,
                                    label: "Electricite bureau",
                                    debit: "150.00",
                                    credit: "0.00",
                                },
                                {
                                    idAccount: acc(44566)!.id,
                                    label: "TVA deductible 20%",
                                    debit: "30.00",
                                    credit: "0.00",
                                },
                                { idAccount: acc(401)!.id, label: "EDF", debit: "0.00", credit: "180.00" },
                            ],
                        ),
                    )
                }
            }

            // Insert entries
            if (sampleEntries.length > 0) {
                await tx.insert(models.entry).values(sampleEntries.map((e) => e.entry))
                await tx.insert(models.entryLine).values(sampleEntries.flatMap((e) => e.lines))
                const allEntryTags = sampleEntries.flatMap((e) => e.entryTags)
                if (allEntryTags.length > 0) {
                    await tx.insert(models.entryTag).values(allEntryTags)
                }
            }

            console.log("Seed completed successfully!")
            console.log(`- 1 user created`)
            console.log(`- 2 organizations created (1 empty, 1 populated)`)
            console.log(`- 1 year created`)
            console.log(`- ${newJournals.length} journals created`)
            console.log(`- ${newBalanceSheets.length} balance sheets created`)
            console.log(`- ${newIncomeStatements.length} income statements created`)
            console.log(`- ${newAccounts.length} accounts created`)
            console.log(`- ${newComputations.length} computations created`)
            console.log(`- ${newComputationIncomeStatements.length} computation-income statement links created`)
            console.log(`- ${newTags.length} tags created`)
            console.log(
                `- ${sampleEntries.length} sample entries created (${sampleEntries.reduce((sum, e) => sum + e.lines.length, 0)} entry lines, ${sampleEntries.reduce((sum, e) => sum + e.entryTags.length, 0)} entry tags)`,
            )
        })
    } catch (error) {
        console.log(error)
    }
}

console.log("Seeding starting.")
await seed()

process.exit()
