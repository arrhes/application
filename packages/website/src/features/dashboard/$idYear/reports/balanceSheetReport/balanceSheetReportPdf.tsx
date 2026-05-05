import type { returnedSchemas } from "@arrhes/application-metadata/schemas"
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer"
import type * as v from "valibot"
import { toRoman } from "../../../../../utilities/toRoman.ts"
import { getBalanceSheetChildren } from "../../yearSettings/balanceSheets/getBalanceSheetChildren.tsx"

function fmt(value: number): string {
    return value.toFixed(2)
}

type BalanceSheet = v.InferOutput<typeof returnedSchemas.balanceSheet>
type EntryLine = v.InferOutput<typeof returnedSchemas.entryLine>
type Account = v.InferOutput<typeof returnedSchemas.account>

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 9,
        fontFamily: "Helvetica",
        color: "#111111",
    },
    title: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 11,
        fontFamily: "Helvetica-Bold",
        marginBottom: 8,
        marginTop: 20,
    },
    headerRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc",
        paddingBottom: 4,
        marginBottom: 2,
    },
    headerText: {
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: "#555555",
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#eeeeee",
        paddingVertical: 3,
    },
    sectionRow: {
        flexDirection: "row",
        borderBottomWidth: 0.5,
        borderBottomColor: "#dddddd",
        paddingVertical: 3,
        backgroundColor: "#f5f5f5",
    },
    labelCell: {
        flex: 1,
    },
    amountCell: {
        width: 65,
        textAlign: "right",
    },
    boldText: {
        fontFamily: "Helvetica-Bold",
    },
})

function computeAssetAmounts(
    balanceSheet: BalanceSheet,
    allBalanceSheets: BalanceSheet[],
    accounts: Account[],
    entryLines: EntryLine[],
): { gross: number; amortization: number } {
    const children = getBalanceSheetChildren({ balanceSheet, balanceSheets: allBalanceSheets })
    let grossTotalAmount = 0
    let amortizationTotalAmount = 0

    accounts
        .filter((account) => {
            const hasAccount = account.idBalanceSheetAsset === balanceSheet.id
            const hasChildrenAccount = children.some((bs) => bs.id === account.idBalanceSheetAsset)
            return hasAccount || hasChildrenAccount
        })
        .forEach((account) => {
            let debit = 0
            let credit = 0
            entryLines
                .filter((el) => el.idAccount === account.id)
                .forEach((el) => {
                    debit += Number(el.debit)
                    credit += Number(el.credit)
                })
            const balance = debit - credit

            if (balance < 0 && account.balanceSheetAssetFlow === "debit") return
            if (balance > 0 && account.balanceSheetAssetFlow === "credit") return

            if (account.balanceSheetAssetColumn === "gross") {
                grossTotalAmount += account.balanceSheetAssetFlow === "debit" ? Math.abs(balance) : -Math.abs(balance)
            }
            if (account.balanceSheetAssetColumn === "amortization") {
                amortizationTotalAmount +=
                    account.balanceSheetAssetFlow === "debit" ? Math.abs(balance) : -Math.abs(balance)
            }
        })

    return { gross: grossTotalAmount, amortization: amortizationTotalAmount }
}

function computeLiabilityAmount(
    balanceSheet: BalanceSheet,
    allBalanceSheets: BalanceSheet[],
    accounts: Account[],
    entryLines: EntryLine[],
): number {
    const children = getBalanceSheetChildren({ balanceSheet, balanceSheets: allBalanceSheets })
    let netTotalAmount = 0

    accounts
        .filter((account) => {
            const hasAccount = account.idBalanceSheetLiability === balanceSheet.id
            const hasChildrenAccount = children.some((bs) => bs.id === account.idBalanceSheetLiability)
            return hasAccount || hasChildrenAccount
        })
        .forEach((account) => {
            let debit = 0
            let credit = 0
            entryLines
                .filter((el) => el.idAccount === account.id)
                .forEach((el) => {
                    debit += Number(el.debit)
                    credit += Number(el.credit)
                })
            const balance = credit - debit

            if (balance > 0 && account.balanceSheetLiabilityFlow === "debit") return
            if (balance < 0 && account.balanceSheetLiabilityFlow === "credit") return

            if (account.balanceSheetLiabilityColumn === "net") {
                netTotalAmount += balance
            }
        })

    return netTotalAmount
}

function AssetPdfRows({
    balanceSheets,
    allBalanceSheets,
    accounts,
    entryLines,
    level,
}: {
    balanceSheets: BalanceSheet[]
    allBalanceSheets: BalanceSheet[]
    accounts: Account[]
    entryLines: EntryLine[]
    level: number
}) {
    return (
        <>
            {balanceSheets.map((bs) => {
                const directChildren = getBalanceSheetChildren({
                    balanceSheet: bs,
                    balanceSheets: allBalanceSheets,
                }).filter((child) => child.idBalanceSheetParent === bs.id)

                const number = level === 0 ? toRoman(Number(bs.number)) : null
                const isAmountDisplayed = bs.isComputed === true || directChildren.length === 0
                const { gross, amortization } = computeAssetAmounts(bs, allBalanceSheets, accounts, entryLines)

                return (
                    <View key={bs.id}>
                        <View style={number ? styles.sectionRow : styles.row}>
                            <View style={[styles.labelCell, { paddingLeft: level * 12 }]}>
                                <Text style={number ? styles.boldText : {}}>
                                    {number ? `${number}  ` : ""}
                                    {bs.label}
                                </Text>
                            </View>
                            <View style={styles.amountCell}>
                                {isAmountDisplayed ? <Text>{fmt(gross)}</Text> : null}
                            </View>
                            <View style={styles.amountCell}>
                                {isAmountDisplayed ? <Text>{fmt(amortization)}</Text> : null}
                            </View>
                            <View style={styles.amountCell}>
                                {isAmountDisplayed ? <Text>{fmt(gross + amortization)}</Text> : null}
                            </View>
                        </View>
                        {directChildren.length > 0 ? (
                            <AssetPdfRows
                                balanceSheets={directChildren}
                                allBalanceSheets={allBalanceSheets}
                                accounts={accounts}
                                entryLines={entryLines}
                                level={level + 1}
                            />
                        ) : null}
                    </View>
                )
            })}
        </>
    )
}

function LiabilityPdfRows({
    balanceSheets,
    allBalanceSheets,
    accounts,
    entryLines,
    level,
}: {
    balanceSheets: BalanceSheet[]
    allBalanceSheets: BalanceSheet[]
    accounts: Account[]
    entryLines: EntryLine[]
    level: number
}) {
    return (
        <>
            {balanceSheets.map((bs) => {
                const directChildren = getBalanceSheetChildren({
                    balanceSheet: bs,
                    balanceSheets: allBalanceSheets,
                }).filter((child) => child.idBalanceSheetParent === bs.id)

                const number = level === 0 ? toRoman(Number(bs.number)) : null
                const isAmountDisplayed = bs.isComputed === true || directChildren.length === 0
                const net = computeLiabilityAmount(bs, allBalanceSheets, accounts, entryLines)

                return (
                    <View key={bs.id}>
                        <View style={number ? styles.sectionRow : styles.row}>
                            <View style={[styles.labelCell, { paddingLeft: level * 12 }]}>
                                <Text style={number ? styles.boldText : {}}>
                                    {number ? `${number}  ` : ""}
                                    {bs.label}
                                </Text>
                            </View>
                            <View style={styles.amountCell}>{isAmountDisplayed ? <Text>{fmt(net)}</Text> : null}</View>
                        </View>
                        {directChildren.length > 0 ? (
                            <LiabilityPdfRows
                                balanceSheets={directChildren}
                                allBalanceSheets={allBalanceSheets}
                                accounts={accounts}
                                entryLines={entryLines}
                                level={level + 1}
                            />
                        ) : null}
                    </View>
                )
            })}
        </>
    )
}

export function BalanceSheetReportPdf(props: {
    balanceSheets: BalanceSheet[]
    entryLines: EntryLine[]
    accounts: Account[]
}) {
    const assetBalanceSheets = props.balanceSheets.filter((bs) => bs.side === "asset")
    const liabilityBalanceSheets = props.balanceSheets.filter((bs) => bs.side === "liability")

    const rootAssets = assetBalanceSheets
        .filter((bs) => bs.idBalanceSheetParent === null)
        .sort((a, b) => Number(a.number) - Number(b.number))

    const rootLiabilities = liabilityBalanceSheets
        .filter((bs) => bs.idBalanceSheetParent === null)
        .sort((a, b) => Number(a.number) - Number(b.number))

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text style={styles.title}>Bilan</Text>

                {/* Asset section */}
                <Text style={styles.sectionTitle}>Actif</Text>
                <View style={styles.headerRow}>
                    <View style={styles.labelCell}>
                        <Text style={styles.headerText}>Intitulé</Text>
                    </View>
                    <View style={styles.amountCell}>
                        <Text style={styles.headerText}>Brut</Text>
                    </View>
                    <View style={styles.amountCell}>
                        <Text style={styles.headerText}>Amort. & Dépré.</Text>
                    </View>
                    <View style={styles.amountCell}>
                        <Text style={styles.headerText}>Net</Text>
                    </View>
                </View>
                <AssetPdfRows
                    balanceSheets={rootAssets}
                    allBalanceSheets={assetBalanceSheets}
                    accounts={props.accounts}
                    entryLines={props.entryLines}
                    level={0}
                />

                {/* Liability section */}
                <Text style={styles.sectionTitle}>Passif</Text>
                <View style={styles.headerRow}>
                    <View style={styles.labelCell}>
                        <Text style={styles.headerText}>Intitulé</Text>
                    </View>
                    <View style={styles.amountCell}>
                        <Text style={styles.headerText}>Net</Text>
                    </View>
                </View>
                <LiabilityPdfRows
                    balanceSheets={rootLiabilities}
                    allBalanceSheets={liabilityBalanceSheets}
                    accounts={props.accounts}
                    entryLines={props.entryLines}
                    level={0}
                />
            </Page>
        </Document>
    )
}
