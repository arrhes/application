import { Style } from "hono/css"

export interface InvoiceData {
    invoiceNumber: string
    periodStart: string
    periodEnd: string
    organizationName: string
    organizationEmail: string
    amountInCents: number
    subscriptions: Array<{
        type: string
        quantity: number
        amountInCents: number
    }>
}

function formatEuros(cents: number): string {
    return `${(cents / 100).toFixed(2).replace(".", ",")} €`
}

function typeLabel(type: string): string {
    switch (type) {
        case "support":
            return "Contribution de soutien"
        case "storage_gb":
            return "Stockage supplémentaire (Go)"
        case "agent_tokens_million":
            return "Tokens IA supplémentaires (M)"
        case "ocr_pages_hundred":
            return "Pages OCR supplémentaires (×100)"
        default:
            return type
    }
}

function InvoiceTemplate(props: InvoiceData) {
    const periodStartDate = new Date(props.periodStart)
    const periodEndDate = new Date(props.periodEnd)
    const periodLabel = `${periodStartDate.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`

    return (
        <html lang="fr">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <Style />
            </head>
            <body
                style="
                    margin: 0;
                    padding: 48px 64px;
                    font-family: 'Sometype Mono', monospace, sans-serif;
                    font-size: 14px;
                    color: #1a1a1a;
                    background: white;
                    width: 680px;
                    box-sizing: border-box;
                "
            >
                <div
                    style="
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 48px;
                "
                >
                    <div>
                        <div style="font-size: 24px; font-weight: 700; letter-spacing: 0.04em;">Arrhes</div>
                        <div style="color: #666; margin-top: 4px;">arrhes.app</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 20px; font-weight: 600;">Facture</div>
                        <div style="color: #666; margin-top: 4px;">N° {props.invoiceNumber}</div>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                    <div>
                        <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em; color: #666;">
                            Facturé à
                        </div>
                        <div style="font-weight: 500;">{props.organizationName}</div>
                        <div style="color: #555;">{props.organizationEmail}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 600; margin-bottom: 8px; text-transform: uppercase; font-size: 11px; letter-spacing: 0.08em; color: #666;">
                            Période
                        </div>
                        <div>{periodLabel}</div>
                        <div style="color: #555; font-size: 12px; margin-top: 4px;">
                            {periodStartDate.toLocaleDateString("fr-FR")} — {periodEndDate.toLocaleDateString("fr-FR")}
                        </div>
                    </div>
                </div>

                <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                    <thead>
                        <tr style="border-bottom: 2px solid #1a1a1a;">
                            <th style="text-align: left; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #666;">
                                Description
                            </th>
                            <th style="text-align: center; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #666;">
                                Qté
                            </th>
                            <th style="text-align: right; padding: 8px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #666;">
                                Montant
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.subscriptions.map((sub, idx) => (
                            <tr key={idx} style="border-bottom: 1px solid #e5e5e5;">
                                <td style="padding: 12px 0;">{typeLabel(sub.type)}</td>
                                <td style="padding: 12px 0; text-align: center;">{sub.quantity}</td>
                                <td style="padding: 12px 0; text-align: right;">{formatEuros(sub.amountInCents)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style="display: flex; justify-content: flex-end; margin-bottom: 48px;">
                    <div style="min-width: 220px;">
                        <div style="display: flex; justify-content: space-between; padding: 12px 0; border-top: 2px solid #1a1a1a; font-weight: 700; font-size: 16px;">
                            <span>Total</span>
                            <span>{formatEuros(props.amountInCents)}</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e5e5e5; color: #888; font-size: 12px; text-align: center;">
                    Arrhes SAS — TVA non applicable, art. 293 B du CGI
                </div>
            </body>
        </html>
    )
}

export function invoiceTemplate(props: InvoiceData): string {
    return (<InvoiceTemplate {...props} />).toString()
}
