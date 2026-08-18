import { ButtonGhostContent } from "@comptasse/ui"
import { css } from "@comptasse/ui/utilities/cn.js"
import { useVirtualizer } from "@tanstack/react-virtual"
import { useRef, useState, useTransition } from "react"
import { DocHeader } from "../../../../../components/document/DocHeader.js"
import { DocParagraph } from "../../../../../components/document/DocParagraph.js"
import { DocRoot } from "../../../../../components/document/DocRoot.js"
import { DocSection } from "../../../../../components/document/DocSection.js"
import { DocSourceRef } from "../../../../../components/document/DocSourceRef.js"
import { LinkButton } from "../../../../../components/LinkButton.js"
import { SearchBar } from "../../../../../components/layouts/SearchBar.js"
import { accountEntries, searchAccounts } from "./accountsData.js"

export const ROW_HEIGHT = 32

export const ROW_GAP = 4

interface AccountRowProps {
    account: {
        slug: string
        number: string
        label: string
        isOptional: boolean
    }
}

function AccountRow(props: AccountRowProps) {
    const { account } = props
    const isFacultatif = account.isOptional
    const depth = account.number.length - 1
    return (
        <div
            style={{
                paddingLeft: `${depth * 1}rem`,
            }}
        >
            <LinkButton
                to="/documentation/comptabilité/ressources/comptes/$account"
                params={{
                    account: account.slug,
                }}
                className={{
                    width: "100%",
                }}
            >
                <ButtonGhostContent
                    className={{
                        width: "100%",
                        justifyContent: "start",
                        fontSize: "sm",
                    }}
                >
                    <span
                        className={css({
                            fontWeight: "bold",
                            fontFamily: "mono",
                            fontStyle: isFacultatif ? "italic" : "normal",
                            color: isFacultatif ? "primary/50" : "primary",
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
                </ButtonGhostContent>
            </LinkButton>
        </div>
    )
}

export function AccountsResourcesAccountingDocPage() {
    const [query, setQuery] = useState("")
    const [filteredAccounts, setFilteredAccounts] = useState(accountEntries)
    const [isPending, startTransition] = useTransition()
    const parentRef = useRef(null)
    const hasQuery = query.trim().length > 0
    const virtualizer = useVirtualizer({
        count: filteredAccounts.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => ROW_HEIGHT + ROW_GAP,
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
                        to="/documentation/comptabilité/introduction/classes"
                        className={{
                            fontSize: "sm",
                            color: "primary",
                            fontWeight: "medium",
                            textDecoration: "underline",
                            textDecorationColor: "primary/30",
                            textUnderlineOffset: "2px",
                            _hover: {
                                textDecorationColor: "primary",
                            },
                            transition: "all 0.15s",
                        }}
                    >
                        classes de comptes
                    </LinkButton>
                    .
                </DocParagraph>
            </DocSection>

            <SearchBar
                value={query}
                onChange={handleSearch}
                isLoading={isPending}
                ariaLabel="Rechercher un compte"
                placeholder="512, banque, fournisseurs, capital..."
            />

            {/* Result count */}
            <DocParagraph>
                {filteredAccounts.length} compte{filteredAccounts.length !== 1 ? "s" : ""}
                {hasQuery ? " trouvé" : ""}
                {hasQuery && filteredAccounts.length !== 1 ? "s" : ""}
            </DocParagraph>

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
                        padding: "0.5rem",
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
                                    height: `${virtualItem.size - ROW_GAP}px`,
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
        </DocRoot>
    )
}
