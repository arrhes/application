import { css } from "@arrhes/ui/utilities/cn.js"
import { IconLoader2, IconSearch } from "@tabler/icons-react"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useState, useTransition } from "react"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocNextPage } from "../../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocSourceRef } from "../../../../components/document/docSourceRef.js"
import { DocSources } from "../../../../components/document/docSources.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { type AccountEntry, accountEntries, searchAccounts } from "./accountsData.js"

// ── Account row ─────────────────────────────────────────────────────────────

const ROW_HEIGHT = 36

function AccountRow(props: { account: AccountEntry }) {
    const { account } = props
    const isFacultatif = account.system === "facultatif"
    const depth = account.number.length - 1
    return (
        <div style={{ paddingLeft: `${depth * 1}rem` }}>
            <LinkButton
                to="/documentation/comptabilité/comptes/liste/$account"
                params={{ account: account.slug }}
                className={css({
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    padding: "0 0.5rem",
                    height: `${ROW_HEIGHT}px`,
                    fontSize: "sm",
                    color: "neutral",
                    borderRadius: "md",
                    _hover: { backgroundColor: "primary/5", color: "primary" },
                    transition: "all 0.1s",
                    cursor: "pointer",
                    width: "100%",
                })}
            >
                <span
                    className={css({
                        fontWeight: "bold",
                        color: "primary",
                        fontFamily: "mono",
                        minWidth: "3.5rem",
                        fontStyle: isFacultatif ? "italic" : "normal",
                    })}
                >
                    {account.number}
                </span>
                <span
                    className={css({
                        flex: 1,
                        minWidth: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontStyle: isFacultatif ? "italic" : "normal",
                        color: isFacultatif ? "neutral/50" : "neutral",
                    })}
                >
                    {account.label}
                </span>
            </LinkButton>
        </div>
    )
}

// ── Main page ──────────────────────────────────────────────────────────────

export function AccountsListAccountingDocPage() {
    const [query, setQuery] = useState("")
    const [filteredAccounts, setFilteredAccounts] = useState<AccountEntry[]>(accountEntries)
    const [isPending, startTransition] = useTransition()
    const parentRef = useRef<HTMLDivElement>(null)
    const hasQuery = query.trim().length > 0

    const virtualizer = useVirtualizer({
        count: filteredAccounts.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ROW_HEIGHT,
        overscan: 20,
    })

    function handleSearch(value: string) {
        setQuery(value)
        startTransition(() => {
            if (!value.trim()) {
                setFilteredAccounts(accountEntries)
            } else {
                setFilteredAccounts(searchAccounts(value))
            }
        })
    }

    return (
        <DocRoot>
            <DocHeader
                title="Liste des comptes"
                description="Parcourez et recherchez les comptes du Plan Comptable Général"
            />

            <DocSection title="Plan comptable">
                <DocParagraph>
                    Parcourez les {accountEntries.length} comptes du Plan Comptable Général.
                    <DocSourceRef n={1} /> Utilisez la barre de recherche pour filtrer par numéro, intitulé ou
                    description. Les comptes en <em>italique</em> sont facultatifs. Pour une présentation détaillée de
                    chaque classe, consultez la page{" "}
                    <LinkButton
                        to="/documentation/comptabilité/comptes/classes"
                        className={css({
                            fontSize: "sm",
                            color: "primary",
                            fontWeight: "medium",
                            textDecoration: "underline",
                            textDecorationColor: "primary/30",
                            textUnderlineOffset: "2px",
                            _hover: { textDecorationColor: "primary" },
                            transition: "all 0.15s",
                        })}
                    >
                        classes de comptes
                    </LinkButton>
                    .
                </DocParagraph>
            </DocSection>

            {/* Search bar */}
            <div
                className={css({
                    position: "relative",
                })}
            >
                {isPending ? (
                    <IconLoader2
                        size={16}
                        className={css({
                            position: "absolute",
                            left: "0.75rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            stroke: "primary",
                            pointerEvents: "none",
                            animation: "spin 1s linear infinite",
                        })}
                    />
                ) : (
                    <IconSearch
                        size={16}
                        className={css({
                            position: "absolute",
                            left: "0.75rem",
                            top: "50%",
                            transform: "translateY(-50%)",
                            stroke: "neutral/40",
                            pointerEvents: "none",
                        })}
                    />
                )}
                <input
                    type="text"
                    placeholder="512, banque, fournisseurs, capital..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className={css({
                        width: "100%",
                        padding: "0.75rem 0.75rem 0.75rem 2.5rem",
                        fontSize: "sm",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/15",
                        backgroundColor: "white",
                        color: "neutral",
                        outline: "none",
                        _focus: {
                            borderColor: "primary/50",
                            boxShadow: "0 0 0 3px token(colors.primary/10)",
                        },
                        _placeholder: {
                            color: "neutral/40",
                        },
                        transition: "all 0.15s",
                    })}
                />
            </div>

            {/* Result count */}
            <span
                className={css({
                    fontSize: "xs",
                    color: "neutral/40",
                    fontWeight: "medium",
                })}
            >
                {filteredAccounts.length} compte{filteredAccounts.length !== 1 ? "s" : ""}
                {hasQuery ? " trouvé" : ""}
                {hasQuery && filteredAccounts.length !== 1 ? "s" : ""}
            </span>

            {/* Virtualized list */}
            {filteredAccounts.length > 0 ? (
                <div
                    ref={parentRef}
                    className={css({
                        height: "70vh",
                        maxHeight: "800px",
                        overflow: "auto",
                        borderRadius: "lg",
                        border: "1px solid",
                        borderColor: "neutral/10",
                        padding: "0.25rem",
                    })}
                >
                    <div
                        style={{
                            height: `${virtualizer.getTotalSize()}px`,
                            width: "100%",
                            position: "relative",
                        }}
                    >
                        {virtualizer.getVirtualItems().map((virtualItem) => (
                            <div
                                key={virtualItem.key}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: `${virtualItem.size}px`,
                                    transform: `translateY(${virtualItem.start}px)`,
                                }}
                            >
                                <AccountRow account={filteredAccounts[virtualItem.index]} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                !isPending && (
                    <p
                        className={css({
                            fontSize: "sm",
                            color: "neutral/50",
                            padding: "2rem 0",
                            textAlign: "center",
                        })}
                    >
                        Aucun compte ne correspond à votre recherche.
                    </p>
                )
            )}

            <DocNextPage
                to="/documentation/comptabilité/documents"
                label="Les documents comptables"
                description="Vous pouvez rechercher par numéro (ex : 512), par intitulé (ex : banque) ou par description. La recherche ignore les accents et la casse."
            />

            <DocSources
                sources={[
                    {
                        label: "Plan Comptable Général — Autorité des Normes Comptables (ANC)",
                        url: "https://www.anc.gouv.fr/normes-comptables-francaises/recueils-des-normes-comptables",
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
