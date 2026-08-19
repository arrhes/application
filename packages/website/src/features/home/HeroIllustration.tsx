import { css } from "@comptasse/ui/utilities/cn.js"

const dim = css({
    color: "neutral/30",
})
const muted = css({
    color: "neutral/50",
})
const text = css({
    color: "neutral/100",
})
const accent = css({
    color: "primary",
})
const success = css({
    color: "success",
})
const error = css({
    color: "error",
})
const row = css({
    display: "block",
    whiteSpace: "pre",
})
const contentWidth = 38
const innerPaddedWidth = contentWidth - 2
const padJournal = (value: string) => value.padEnd(contentWidth, " ")
const padWithSides = (value: string) => ` ${value.padEnd(innerPaddedWidth, " ")} `
const topLeft = " ◆ Comptasse"
const topRight = "Exercice 2026 "
const topGap = " ".repeat(Math.max(1, contentWidth - topLeft.length - topRight.length))
const formatKPIGap = (label: string, amount: string) =>
    " ".repeat(Math.max(1, innerPaddedWidth - label.length - amount.length))
const formatEntryAmount = (value: string) => (value === "-" ? "-".padStart(8, " ") : value.padStart(8, " "))
const formatEntryLine = (account: string, label: string, debit: string, credit: string) =>
    padWithSides(
        `${account.padStart(5, " ")}  ${label.slice(0, 11).padEnd(11, " ")} ${formatEntryAmount(debit)} ${formatEntryAmount(credit)}`,
    )
const formatFooterGap = (label: string, amount: string, trend: string) =>
    " ".repeat(Math.max(1, innerPaddedWidth - label.length - amount.length - trend.length - 1))

export function HeroIllustration() {
    return (
        <div
            className={css({
                width: "fit-content",
                height: "auto",
                display: "inline-block",
                fontFamily: "mono",
                fontSize: "xs",
                lineHeight: "1.25",
                color: "neutral/100",
                whiteSpace: "pre",
                // userSelect: "none",
            })}
        >
            {/* ── Top frame ── */}
            <div className={row}>
                <span className={dim}>{"╭──────────────────────────────────────╮"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={accent}>{topLeft}</span>
                <span className={muted}>{topGap}</span>
                <span className={muted}>{topRight}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"├──────────────────────────────────────┤"}</span>
            </div>

            {/* ── KPI row ── */}
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}> </span>
                <span className={muted}>{"Chiffre d'affaires"}</span>
                <span className={muted}>{formatKPIGap("Chiffre d'affaires", "42 850,00€")}</span>
                <span className={text}>{"42 850,00€"}</span>
                <span className={muted}> </span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}> </span>
                <span className={muted}>{"Charges"}</span>
                <span className={muted}>{formatKPIGap("Charges", "24 310,00€")}</span>
                <span className={text}>{"24 310,00€"}</span>
                <span className={muted}> </span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}> </span>
                <span className={muted}>{"Résultat net"}</span>
                <span className={muted}>{formatKPIGap("Résultat net", "18 540,00€")}</span>
                <span className={accent}>{"18 540,00€"}</span>
                <span className={muted}> </span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"├──────────────────────────────────────┤"}</span>
            </div>

            {/* ── Journal table ── */}
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={text}>{padWithSides("15/01  Fact. FC001")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{formatEntryLine("411", "Clients", "1 200", "-")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{formatEntryLine("706", "Prestation", "-", "1 000")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{formatEntryLine("44571", "TVA coll.", "-", "200")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{padJournal("")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={text}>{padWithSides("03/02  Fact. FC002")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{formatEntryLine("411", "Clients", "3 600", "-")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{formatEntryLine("707", "Marchandises", "-", "3 000")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{formatEntryLine("44571", "TVA coll.", "-", "600")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{padJournal("")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}>{padJournal(" ···")}</span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"├──────────────────────────────────────┤"}</span>
            </div>

            {/* ── Footer summary ── */}
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}> </span>
                <span className={muted}>{"Solde banque"}</span>
                <span className={muted}>{formatFooterGap("Solde banque", "8 530,00 €", "▲ +12%")}</span>
                <span className={text}>{"8 530,00 €"}</span>
                <span className={muted}> </span>
                <span className={success}>{"▲ +12%"}</span>
                <span className={muted}> </span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}> </span>
                <span className={muted}>{"Clients"}</span>
                <span className={muted}>{formatFooterGap("Clients", "4 260,00 €", "▼  -8%")}</span>
                <span className={text}>{"4 260,00 €"}</span>
                <span className={muted}> </span>
                <span className={error}>{"▼  -8%"}</span>
                <span className={muted}> </span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"│"}</span>
                <span className={muted}> </span>
                <span className={muted}>{"Fournisseurs"}</span>
                <span className={muted}>{formatFooterGap("Fournisseurs", "2 140,00 €", "▲  +4%")}</span>
                <span className={text}>{"2 140,00 €"}</span>
                <span className={muted}> </span>
                <span className={success}>{"▲  +4%"}</span>
                <span className={muted}> </span>
                <span className={dim}>{"│"}</span>
            </div>
            <div className={row}>
                <span className={dim}>{"╰──────────────────────────────────────╯"}</span>
            </div>
        </div>
    )
}
