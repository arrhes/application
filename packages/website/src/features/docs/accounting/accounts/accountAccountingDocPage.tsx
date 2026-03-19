import { css } from "@arrhes/ui/utilities/cn.js"
import {
    IconArrowLeft,
    IconBookmark,
    IconChevronRight,
    IconCornerDownRight,
    IconInfoCircle,
    IconSparkles,
} from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocLink } from "../../../../components/document/docLink.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocSources } from "../../../../components/document/docSources.js"
import { DocTable } from "../../../../components/document/docTable.js"
import { DocTip } from "../../../../components/document/docTip.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { type AccountEntry, getAccount, getAccountBySlug, getDirectChildren } from "./accountsData.js"

export function AccountAccountingDocPage() {
    const { account: slug } = useParams({ strict: false }) as { account: string }
    const entry = getAccountBySlug(slug)

    if (!entry) {
        return (
            <DocRoot>
                <DocHeader title="Compte introuvable" description="Ce compte n'existe pas dans le plan comptable." />
                <LinkButton to="/documentation/comptabilité/comptes/liste">
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "sm",
                            color: "primary",
                        })}
                    >
                        <IconArrowLeft size={16} />
                        Retour au plan comptable
                    </span>
                </LinkButton>
            </DocRoot>
        )
    }

    const parentAccount = entry.parent ? getAccount(entry.parent) : null
    const children = getDirectChildren(entry.number)
    const isSummaryAccount = entry.number.length <= 2

    const debitMeaning =
        entry.side === "actif" || entry.side === "charge"
            ? "Augmentation"
            : entry.side === "actif ou passif"
              ? "Variable"
              : "Diminution"
    const creditMeaning =
        entry.side === "passif" || entry.side === "produit"
            ? "Augmentation"
            : entry.side === "actif ou passif"
              ? "Variable"
              : "Diminution"

    return (
        <DocRoot>
            <div>
                <LinkButton to="/documentation/comptabilité/comptes/liste">
                    <span
                        className={css({
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            fontSize: "sm",
                            color: "primary",
                            fontWeight: "medium",
                            textDecoration: "underline",
                            textDecorationColor: "primary/30",
                            textUnderlineOffset: "2px",
                            _hover: { textDecorationColor: "primary" },
                            transition: "all 0.15s",
                            mb: "4",
                        })}
                    >
                        <IconArrowLeft size={14} />
                        Plan comptable
                    </span>
                </LinkButton>
                <DocHeader
                    title={`${entry.number} - ${entry.label}`}
                    description={`Classe ${entry.classNumber} - ${entry.className}`}
                />
            </div>

            {/* Account info card */}
            <div
                className={css({
                    padding: "1.5rem",
                    borderRadius: "lg",
                    backgroundColor: "white",
                    border: "1px solid",
                    borderColor: "neutral/15",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                <div
                    className={css({
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    })}
                >
                    <IconBookmark
                        size={12}
                        className={css({
                            stroke: "neutral/50",
                            flexShrink: 0,
                        })}
                    />
                    <span
                        className={css({
                            fontSize: "xs",
                            fontWeight: "medium",
                            color: "neutral/50",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        })}
                    >
                        Fiche du compte
                    </span>
                </div>

                <div
                    className={css({
                        display: "grid",
                        gridTemplateColumns: { base: "1fr", md: "1fr 1fr" },
                        gap: "0.75rem",
                    })}
                >
                    <InfoRow label="Numéro" value={entry.number} />
                    <InfoRow label="Intitulé" value={entry.label} />
                    <InfoRow label="Classe" value={`${entry.classNumber} - ${entry.className}`} />
                    <InfoRow label="Type" value={entry.type === "bilan" ? "Bilan" : "Résultat"} />
                    <InfoRow label="Position" value={entry.side.charAt(0).toUpperCase() + entry.side.slice(1)} />
                    <InfoRow label="Système" value={entry.system === "minimal" ? "Minimal" : "Facultatif"} />
                </div>

                {entry.description && (
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral",
                            lineHeight: "1.75",
                            borderTop: "1px solid",
                            borderTopColor: "neutral/10",
                            paddingTop: "1rem",
                        })}
                    >
                        {entry.description}
                    </p>
                )}
            </div>

            {/* Summary account banner */}
            {isSummaryAccount && (
                <div
                    className={css({
                        display: "flex",
                        gap: "0.75rem",
                        padding: "1rem 1.25rem",
                        borderRadius: "lg",
                        backgroundColor: "information/5",
                        border: "1px solid",
                        borderColor: "information/15",
                    })}
                >
                    <IconInfoCircle
                        size={18}
                        className={css({
                            stroke: "information",
                            flexShrink: 0,
                            marginTop: "0.125rem",
                        })}
                    />
                    <div className={css({ display: "flex", flexDirection: "column", gap: "0.25rem" })}>
                        <span
                            className={css({
                                fontSize: "sm",
                                fontWeight: "semibold",
                                color: "information",
                            })}
                        >
                            Compte de regroupement
                        </span>
                        <span
                            className={css({
                                fontSize: "sm",
                                color: "neutral/70",
                                lineHeight: "1.6",
                            })}
                        >
                            Ce compte à {entry.number.length} chiffre{entry.number.length > 1 ? "s" : ""} est un compte
                            de classification. Il ne peut pas être utilisé directement dans une{" "}
                            <DocLink to="/documentation/comptabilité/écritures">écriture comptable</DocLink>. Les
                            écritures doivent être passées dans les sous-comptes à 3 chiffres ou plus.
                        </span>
                    </div>
                </div>
            )}

            {/* Examples as journal entries */}
            {!isSummaryAccount && entry.examples && entry.examples.length > 0 && (
                <DocSection title="Exemples d'écritures">
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "1.25rem",
                        })}
                    >
                        {entry.examples.map((example) => {
                            const journalEntry = getExampleJournalEntry(entry, example)
                            return (
                                <div
                                    key={example}
                                    className={css({
                                        borderRadius: "lg",
                                        border: "1px solid",
                                        borderColor: "success/15",
                                        overflow: "hidden",
                                    })}
                                >
                                    <div
                                        className={css({
                                            display: "flex",
                                            alignItems: "baseline",
                                            gap: "0.5rem",
                                            padding: "0.75rem 1rem",
                                            backgroundColor: "success/5",
                                            borderBottom: "1px solid",
                                            borderBottomColor: "success/15",
                                        })}
                                    >
                                        <IconSparkles
                                            size={14}
                                            className={css({
                                                stroke: "success",
                                                flexShrink: 0,
                                                position: "relative",
                                                top: "0.125rem",
                                            })}
                                        />
                                        <span
                                            className={css({
                                                fontSize: "sm",
                                                color: "neutral/80",
                                                lineHeight: "1.6",
                                            })}
                                        >
                                            {example}
                                        </span>
                                    </div>
                                    <DocTable
                                        headers={["Compte", "Intitulé", "Débit", "Crédit"]}
                                        rows={journalEntry.rows}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </DocSection>
            )}

            {/* How debit/credit works */}
            {!isSummaryAccount && (
                <DocSection title="Fonctionnement">
                    <DocTable
                        headers={["Mouvement", "Signification"]}
                        rows={[
                            ["Débit", debitMeaning],
                            ["Crédit", creditMeaning],
                        ]}
                    />
                    <DocParagraph>
                        Ce compte est un compte{" "}
                        {entry.side === "actif ou passif" ? (
                            <>
                                d'
                                <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "actif" }}>
                                    actif
                                </DocLink>{" "}
                                ou de{" "}
                                <DocLink to="/documentation/comptabilité/glossaire/$term" params={{ term: "passif" }}>
                                    passif
                                </DocLink>
                            </>
                        ) : (
                            <>
                                de{" "}
                                <DocLink
                                    to="/documentation/comptabilité/glossaire/$term"
                                    params={{
                                        term:
                                            entry.side === "charge"
                                                ? "charges-classe-6"
                                                : entry.side === "produit"
                                                  ? "produits-classe-7"
                                                  : entry.side,
                                    }}
                                >
                                    {entry.side}
                                </DocLink>
                            </>
                        )}
                        . Il figure dans le{" "}
                        <DocLink
                            to="/documentation/comptabilité/glossaire/$term"
                            params={{ term: entry.type === "bilan" ? "bilan" : "compte-de-résultat" }}
                        >
                            {entry.type === "bilan" ? "bilan" : "compte de résultat"}
                        </DocLink>
                        .
                    </DocParagraph>
                </DocSection>
            )}

            {/* Parent account */}
            {parentAccount && (
                <DocSection title="Compte parent">
                    <LinkButton
                        to="/documentation/comptabilité/comptes/liste/$account"
                        params={{ account: parentAccount.slug }}
                    >
                        <div
                            className={css({
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                fontSize: "sm",
                                color: "primary",
                                padding: "0.5rem 0.75rem",
                                borderRadius: "md",
                                border: "1px solid",
                                borderColor: "primary/20",
                                backgroundColor: "primary/5",
                                _hover: { backgroundColor: "primary/10" },
                                transition: "all 0.15s",
                                width: "fit-content",
                            })}
                        >
                            <IconChevronRight
                                size={14}
                                className={css({ stroke: "primary/50", flexShrink: 0, transform: "rotate(180deg)" })}
                            />
                            <span className={css({ fontFamily: "mono", fontWeight: "bold" })}>
                                {parentAccount.number}
                            </span>
                            <span>{parentAccount.label}</span>
                        </div>
                    </LinkButton>
                </DocSection>
            )}

            {/* Direct children */}
            {children.length > 0 && (
                <DocSection title="Sous-comptes">
                    <div
                        className={css({
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.375rem",
                        })}
                    >
                        {children.map((child) => (
                            <LinkButton
                                key={child.slug}
                                to="/documentation/comptabilité/comptes/liste/$account"
                                params={{ account: child.slug }}
                            >
                                <div
                                    className={css({
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "0.5rem",
                                        fontSize: "sm",
                                        padding: "0.375rem 0.75rem",
                                        borderRadius: "md",
                                        border: "1px solid",
                                        borderColor: "neutral/10",
                                        backgroundColor: "white",
                                        _hover: {
                                            borderColor: "primary/30",
                                            backgroundColor: "primary/5",
                                        },
                                        transition: "all 0.15s",
                                    })}
                                >
                                    <IconCornerDownRight
                                        size={14}
                                        className={css({ stroke: "neutral/30", flexShrink: 0 })}
                                    />
                                    <span
                                        className={css({
                                            fontFamily: "mono",
                                            fontWeight: "bold",
                                            color: "primary",
                                            fontStyle: child.system === "facultatif" ? "italic" : "normal",
                                        })}
                                    >
                                        {child.number}
                                    </span>
                                    <span
                                        className={css({
                                            color: child.system === "facultatif" ? "neutral/50" : "neutral",
                                            fontStyle: child.system === "facultatif" ? "italic" : "normal",
                                            flex: 1,
                                            minWidth: 0,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        })}
                                    >
                                        {child.label}
                                    </span>
                                </div>
                            </LinkButton>
                        ))}
                    </div>
                </DocSection>
            )}

            {/* Practical usage section */}
            {!isSummaryAccount && (
                <DocSection title="Utilisation pratique">
                    <PracticalUsage entry={entry} debitMeaning={debitMeaning} creditMeaning={creditMeaning} />
                </DocSection>
            )}

            <DocTip variant="tip">
                Pour approfondir le fonctionnement des comptes, consultez le{" "}
                <DocLink to="/documentation/comptabilité/comptes">cours sur les comptes</DocLink> et la page sur{" "}
                <DocLink to="/documentation/comptabilité/écritures">les écritures comptables</DocLink>.
            </DocTip>

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-francaises/reglementation-comptable/recueil-des-normes-comptables-francaises",
                    },
                    {
                        label: "Plan comptable général (France) — Wikipédia",
                        url: "https://fr.wikipedia.org/wiki/Plan_comptable_g%C3%A9n%C3%A9ral_(France)",
                    },
                ]}
            />
        </DocRoot>
    )
}

function InfoRow(props: { label: string; value: string }) {
    return (
        <div
            className={css({
                display: "flex",
                alignItems: "baseline",
                gap: "0.5rem",
            })}
        >
            <span
                className={css({
                    fontSize: "xs",
                    fontWeight: "medium",
                    color: "neutral/40",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    minWidth: "4rem",
                })}
            >
                {props.label}
            </span>
            <span
                className={css({
                    fontSize: "sm",
                    color: "neutral",
                    fontWeight: "medium",
                })}
            >
                {props.value}
            </span>
        </div>
    )
}

// ── Example journal entries ──────────────────────────────────────────────────

function extractAmount(text: string): string | null {
    const match = text.match(/([\d\s]+(?:\.\d+)?)\s*€/)
    if (!match) return null
    const raw = match[1].trim().replace(/\s/g, " ")
    return `${raw},00`
}

function formatAmount(amount: string | null): string {
    return amount ?? "X"
}

type CounterpartInfo = { number: string; label: string }

function getCounterpartForAccount(entry: AccountEntry): CounterpartInfo {
    const { number, classNumber, side } = entry

    // Amortissements (28x) → dotations aux amortissements
    if (number.startsWith("28")) {
        const dotation = getAccount("6811")
        return dotation
            ? { number: dotation.number, label: dotation.label }
            : { number: "6811", label: "Dotations aux amortissements sur immobilisations incorporelles et corporelles" }
    }

    // Dépréciations d'immobilisations (29x) → dotations aux dépréciations
    if (number.startsWith("29")) {
        const dotation = getAccount("6816")
        return dotation
            ? { number: dotation.number, label: dotation.label }
            : { number: "6816", label: "Dotations aux dépréciations des immobilisations incorporelles et corporelles" }
    }

    // Dépréciations de stocks (39x) → dotations aux dépréciations
    if (number.startsWith("39")) {
        const dotation = getAccount("6817")
        return dotation
            ? { number: dotation.number, label: dotation.label }
            : { number: "6817", label: "Dotations aux dépréciations des actifs circulants" }
    }

    // Dépréciations de comptes de tiers (49x) → dotations aux dépréciations
    if (number.startsWith("49")) {
        const dotation = getAccount("6817")
        return dotation
            ? { number: dotation.number, label: dotation.label }
            : { number: "6817", label: "Dotations aux dépréciations des actifs circulants" }
    }

    // Class 1 - Capitaux → Banque
    if (classNumber === 1) {
        const banque = getAccount("512")
        return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
    }

    // Class 2 - Immobilisations → Fournisseurs d'immobilisations
    if (classNumber === 2) {
        const fournisseurImmo = getAccount("404")
        if (fournisseurImmo) return { number: fournisseurImmo.number, label: fournisseurImmo.label }
        return { number: "404", label: "Fournisseurs d'immobilisations" }
    }

    // Class 3 - Stocks → Variation des stocks
    if (classNumber === 3) {
        if (number.startsWith("31") || number.startsWith("35")) {
            const variation = getAccount("6031")
            return variation
                ? { number: variation.number, label: variation.label }
                : { number: "6031", label: "Variation des stocks de matières premières (et fournitures)" }
        }
        if (number.startsWith("32")) {
            const variation = getAccount("6032")
            return variation
                ? { number: variation.number, label: variation.label }
                : { number: "6032", label: "Variation des stocks des autres approvisionnements" }
        }
        if (number.startsWith("33") || number.startsWith("34")) {
            const variation = getAccount("7133")
            return variation
                ? { number: variation.number, label: variation.label }
                : { number: "7133", label: "Variation des en-cours de production de biens" }
        }
        if (number.startsWith("37")) {
            const variation = getAccount("6037")
            return variation
                ? { number: variation.number, label: variation.label }
                : { number: "6037", label: "Variation des stocks de marchandises" }
        }
        const variation = getAccount("603")
        return variation
            ? { number: variation.number, label: variation.label }
            : { number: "603", label: "Variation des stocks" }
    }

    // Class 4 - Tiers
    if (classNumber === 4) {
        // Fournisseurs (40x) → Banque
        if (number.startsWith("40")) {
            const banque = getAccount("512")
            return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
        }
        // Clients (41x) → Banque
        if (number.startsWith("41")) {
            const banque = getAccount("512")
            return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
        }
        // Personnel (42x) → Banque
        if (number.startsWith("42")) {
            const banque = getAccount("512")
            return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
        }
        // Organismes sociaux (43x) → Banque
        if (number.startsWith("43")) {
            const banque = getAccount("512")
            return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
        }
        // TVA déductible (4456x) → Fournisseurs
        if (number.startsWith("4456")) {
            const fournisseur = getAccount("401")
            return fournisseur
                ? { number: fournisseur.number, label: fournisseur.label }
                : { number: "401", label: "Fournisseurs" }
        }
        // TVA collectée (4457x) → Clients
        if (number.startsWith("4457")) {
            const client = getAccount("411")
            return client ? { number: client.number, label: client.label } : { number: "411", label: "Clients" }
        }
        // État (44x) → Banque
        if (number.startsWith("44")) {
            const banque = getAccount("512")
            return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
        }
        // Default tiers → Banque
        const banque = getAccount("512")
        return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
    }

    // Class 5 - Financiers → Clients or Fournisseurs depending on side
    if (classNumber === 5) {
        if (side === "actif") {
            const client = getAccount("411")
            return client ? { number: client.number, label: client.label } : { number: "411", label: "Clients" }
        }
        const fournisseur = getAccount("401")
        return fournisseur
            ? { number: fournisseur.number, label: fournisseur.label }
            : { number: "401", label: "Fournisseurs" }
    }

    // Class 6 - Charges → Fournisseurs
    if (classNumber === 6) {
        // Dotations (68x) → counterpart is the asset depreciation/amortization account
        if (number.startsWith("68")) {
            const amort = getAccount("28")
            return amort
                ? { number: amort.number, label: amort.label }
                : { number: "28", label: "Amortissements des immobilisations" }
        }
        // Salaires (641) → Personnel
        if (number.startsWith("641")) {
            const personnel = getAccount("421")
            return personnel
                ? { number: personnel.number, label: personnel.label }
                : { number: "421", label: "Personnel - Rémunérations dues" }
        }
        // Charges sociales (645) → Organismes sociaux
        if (number.startsWith("645")) {
            const orga = getAccount("43")
            return orga
                ? { number: orga.number, label: orga.label }
                : { number: "43", label: "Sécurité sociale et autres organismes sociaux" }
        }
        const fournisseur = getAccount("401")
        return fournisseur
            ? { number: fournisseur.number, label: fournisseur.label }
            : { number: "401", label: "Fournisseurs" }
    }

    // Class 7 - Produits → Clients
    if (classNumber === 7) {
        // Reprises (78x) → counterpart is the depreciation/amortization account
        if (number.startsWith("78")) {
            const deprec = getAccount("29")
            return deprec
                ? { number: deprec.number, label: deprec.label }
                : { number: "29", label: "Dépréciations des immobilisations" }
        }
        const client = getAccount("411")
        return client ? { number: client.number, label: client.label } : { number: "411", label: "Clients" }
    }

    // Class 8 - Spéciaux → generic counterpart
    if (classNumber === 8) {
        return { number: "8", label: "Comptes spéciaux (contrepartie)" }
    }

    // Fallback
    const banque = getAccount("512")
    return banque ? { number: banque.number, label: banque.label } : { number: "512", label: "Banques" }
}

function getExampleJournalEntry(entry: AccountEntry, exampleText: string): { rows: string[][] } {
    const amount = formatAmount(extractAmount(exampleText))
    const counterpart = getCounterpartForAccount(entry)
    const { side, number, label } = entry

    // Determine which side the current account goes on
    const currentIsDebit = side === "actif" || side === "charge" || side === "actif ou passif"

    if (currentIsDebit) {
        return {
            rows: [
                [number, label, amount, ""],
                [counterpart.number, counterpart.label, "", amount],
            ],
        }
    }

    return {
        rows: [
            [counterpart.number, counterpart.label, amount, ""],
            [number, label, "", amount],
        ],
    }
}

// ── Practical usage ─────────────────────────────────────────────────────────

function getJournalExample(entry: AccountEntry): { description: string; rows: string[][] } {
    const { side, classNumber, number, label } = entry

    if (side === "actif") {
        return {
            description: `Lorsqu'un ${label.toLowerCase()} augmente, on le débite. Lorsqu'il diminue, on le crédite.`,
            rows: [
                [number, label, "X", ""],
                ["...", "(contrepartie)", "", "X"],
            ],
        }
    }

    if (side === "passif") {
        return {
            description: `Lorsqu'un ${label.toLowerCase()} augmente, on le crédite. Lorsqu'il diminue, on le débite.`,
            rows: [
                ["...", "(contrepartie)", "X", ""],
                [number, label, "", "X"],
            ],
        }
    }

    if (side === "charge") {
        return {
            description: `La constatation d'une charge se fait au débit du compte ${number}.`,
            rows: [
                [number, label, "X", ""],
                ["...", "(compte de trésorerie ou de tiers)", "", "X"],
            ],
        }
    }

    if (side === "produit") {
        return {
            description: `La constatation d'un produit se fait au crédit du compte ${number}.`,
            rows: [
                ["...", "(compte de trésorerie ou de tiers)", "X", ""],
                [number, label, "", "X"],
            ],
        }
    }

    // actif ou passif
    const isClassFive = classNumber === 5
    return {
        description: isClassFive
            ? `Le compte ${number} peut fonctionner au débit (encaissement) ou au crédit (décaissement) selon l'opération.`
            : `Le compte ${number} peut figurer à l'actif ou au passif du bilan selon son solde.`,
        rows: [
            [number, label, "X", ""],
            ["...", "(contrepartie)", "", "X"],
        ],
    }
}

function getUsageTips(entry: AccountEntry): string[] {
    const tips: string[] = []
    const { classNumber, system, number } = entry

    // System tip
    if (system === "facultatif") {
        tips.push(
            `Ce compte est facultatif dans le système de base du PCG. Il permet une ventilation plus fine des opérations liées au compte parent.`,
        )
    }

    // Class-specific tips
    if (classNumber === 1) {
        tips.push(
            "Les comptes de capitaux sont généralement mouvementés lors de la création de l'entreprise, des augmentations de capital, de l'affectation du résultat ou de la constatation d'emprunts.",
        )
    } else if (classNumber === 2) {
        tips.push(
            "Les comptes d'immobilisations sont débités lors de l'acquisition d'un bien durable. Ils sont liés aux comptes d'amortissement (28) et de dépréciation (29).",
        )
    } else if (classNumber === 3) {
        tips.push(
            "Les comptes de stocks sont mis à jour en fin d'exercice lors de l'inventaire. La variation de stock impacte le compte de résultat.",
        )
    } else if (classNumber === 4) {
        tips.push(
            "Les comptes de tiers enregistrent les créances et les dettes. Ils sont lettrés lors du règlement pour faciliter le suivi.",
        )
    } else if (classNumber === 5) {
        tips.push(
            "Les comptes financiers suivent la trésorerie de l'entreprise. Ils doivent être régulièrement rapprochés des relevés bancaires.",
        )
    } else if (classNumber === 6) {
        tips.push(
            "Les comptes de charges sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        )
    } else if (classNumber === 7) {
        tips.push(
            "Les comptes de produits sont soldés en fin d'exercice par le compte 12 (Résultat de l'exercice). Ils alimentent le compte de résultat.",
        )
    } else if (classNumber === 8) {
        tips.push(
            "Les comptes spéciaux ne figurent ni au bilan ni au compte de résultat. Les engagements hors bilan (comptes 80) sont mentionnés dans l'annexe. Les contributions volontaires en nature (comptes 86/87) sont présentées au pied du compte de résultat des associations.",
        )
    }

    // TVA accounts
    if (number.startsWith("4456") || number.startsWith("4457")) {
        tips.push(
            "Ce compte de TVA est mouvementé à chaque opération soumise à la taxe. La TVA collectée (4457) et la TVA déductible (4456) sont régularisées lors de la déclaration de TVA.",
        )
    }

    // Amortissement / dépréciation
    if (number.startsWith("28") || number.startsWith("29") || number.startsWith("39")) {
        tips.push(
            `Ce compte enregistre la perte de valeur ${number.startsWith("28") ? "par amortissement" : "par dépréciation"}. Il fonctionne en contrepartie d'un compte de dotation (classe 6) et vient en diminution de la valeur brute de l'actif au bilan.`,
        )
    }

    // Specifics for compte 512
    if (number === "512") {
        tips.push(
            "Le compte 512 est l'un des plus utilisés en comptabilité. Il est débité lors des encaissements (recettes) et crédité lors des décaissements (dépenses). Il doit être rapproché du relevé bancaire à chaque réception.",
        )
    }

    return tips
}

function PracticalUsage(props: { entry: AccountEntry; debitMeaning: string; creditMeaning: string }) {
    const { entry } = props
    const example = getJournalExample(entry)
    const tips = getUsageTips(entry)

    return (
        <>
            <DocParagraph>{example.description}</DocParagraph>

            <div
                className={css({
                    padding: "1rem",
                    borderRadius: "lg",
                    backgroundColor: "information/5",
                    border: "1px solid",
                    borderColor: "information/10",
                })}
            >
                <span
                    className={css({
                        fontSize: "xs",
                        fontWeight: "semibold",
                        color: "information",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: "0.75rem",
                        display: "block",
                    })}
                >
                    Schéma d'écriture type
                </span>
                <DocTable headers={["Compte", "Intitulé", "Débit", "Crédit"]} rows={example.rows} />
            </div>

            {tips.length > 0 && (
                <div
                    className={css({
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                    })}
                >
                    {tips.map((tip) => (
                        <DocTip key={tip} variant="tip">
                            {tip}
                        </DocTip>
                    ))}
                </div>
            )}
        </>
    )
}
