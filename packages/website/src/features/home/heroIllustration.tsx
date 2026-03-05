import { css } from "@arrhes/ui/utilities/cn.js"

export function HeroIllustration() {
    const dim = css({ color: "neutral/30" })
    const muted = css({ color: "neutral/50" })
    const text = css({ color: "neutral/100" })
    const accent = css({ color: "primary" })
    const success = css({ color: "success" })
    const error = css({ color: "error" })

    return (
        <div
            className={css({
                width: "fit-content",
                height: "auto",
                fontFamily: "mono",
                fontSize: "xs",
                lineHeight: "1",
                color: "neutral/100",
                whiteSpace: "pre",
                // userSelect: "none",
            })}
        >
            {/* ── Top frame ── */}
            <span className={dim}>{"╭──────────────────────────────────────╮\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={accent}>{" ◆ Arrhes"}</span>
            <span className={muted}>{"         Exercice 2026       "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"├──────────────────────────────────────┤\n"}</span>

            {/* ── KPI row ── */}
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Chiffre d'affaires"}</span>
            <span className={text}>{"      42 850,00 €  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Charges"}</span>
            <span className={text}>{"                 24 310,00 €  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Résultat net"}</span>
            <span className={accent}>{"            18 540,00 €  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"├──────────────────────────────────────┤\n"}</span>

            {/* ── Journal table ── */}
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Date     Libellé          D       C  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌ "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={text}>{" 15/01  Fact. FC001   1 200      ·    "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={text}>{" 15/01  "}</span>
            <span className={muted}>{"  Prestation       ·   1 000  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={text}>{" 15/01  "}</span>
            <span className={muted}>{"  TVA coll.        ·     200  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={text}>{" 03/02  Fact. FC002   3 600      ·    "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={text}>{" 03/02  "}</span>
            <span className={muted}>{"  Marchandises     ·   3 000  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={text}>{" 03/02  "}</span>
            <span className={muted}>{"  TVA coll.        ·     600  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={muted}>{"                   ···                "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"├──────────────────────────────────────┤\n"}</span>

            {/* ── Footer summary ── */}
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Solde banque "}</span>
            <span className={text}>{"  8 530,00 €  "}</span>
            <span className={success}>{"  ▲ +12%  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Clients      "}</span>
            <span className={text}>{"  4 260,00 €  "}</span>
            <span className={error}>{"  ▼  -8%  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"│"}</span>
            <span className={muted}>{" Fournisseurs "}</span>
            <span className={text}>{"  2 140,00 €  "}</span>
            <span className={success}>{"  ▲  +4%  "}</span>
            <span className={dim}>{"│\n"}</span>
            <span className={dim}>{"╰──────────────────────────────────────╯"}</span>
        </div>
    )
}
