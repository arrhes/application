import { DocLink } from "../../../../../components/document/docLink.js"
import { DocParagraph } from "../../../../../components/document/docParagraph.js"
import { DocSection } from "../../../../../components/document/docSection.js"
import { DocTable } from "../../../../../components/document/docTable.js"
import type { AccountEntry } from "../accountsData.js"

export function DebitCreditSection(props: { entry: AccountEntry; debitMeaning: string; creditMeaning: string }) {
    const { entry, debitMeaning, creditMeaning } = props

    return (
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
    )
}
