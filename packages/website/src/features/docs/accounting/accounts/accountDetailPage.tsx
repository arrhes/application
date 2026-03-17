import { css } from "@arrhes/ui/utilities/cn.js"
import { IconArrowLeft, IconBookmark, IconChevronRight, IconCornerDownRight } from "@tabler/icons-react"
import { useParams } from "@tanstack/react-router"
import { DocHeader } from "../../../../components/document/docHeader.js"
import { DocLink } from "../../../../components/document/docLink.js"
import { DocParagraph } from "../../../../components/document/docParagraph.js"
import { DocRoot } from "../../../../components/document/docRoot.js"
import { DocSection } from "../../../../components/document/docSection.js"
import { DocTable } from "../../../../components/document/docTable.js"
import { DocTip } from "../../../../components/document/docTip.js"
import { LinkButton } from "../../../../components/linkButton.js"
import { type AccountEntry, getAccount, getAccountBySlug, getDirectChildren } from "./accountsData.js"

export function AccountDetailPage() {
    const { account: slug } = useParams({ strict: false }) as { account: string }
    const entry = getAccountBySlug(slug)

    if (!entry) {
        return (
            <DocRoot>
                <DocHeader title="Compte introuvable" description="Ce compte n'existe pas dans le plan comptable." />
                <LinkButton to="/documentation/comptabilité/comptes">
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
                <LinkButton to="/documentation/comptabilité/comptes">
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

            {/* PCG 2026 diff banners */}
            {entry.removed && (
                <DocTip variant="warning" label="Compte supprimé">
                    Ce compte a été supprimé du Plan Comptable Général dans la version 2026. Il existait dans le PCG
                    2025 mais n'est plus utilisable pour les exercices ouverts à compter du 1er janvier 2026.
                    {entry.number === "1675" && (
                        <>
                            {" "}
                            Les emprunts participatifs sont désormais enregistrés dans le compte{" "}
                            <DocLink to="/documentation/comptabilité/comptes/$account" params={{ account: "1682" }}>
                                1682 - Emprunts participatifs
                            </DocLink>
                            .
                        </>
                    )}
                </DocTip>
            )}
            {entry.added && (
                <DocTip variant="success" label="Nouveau compte">
                    Ce compte a été ajouté dans le Plan Comptable Général 2026. Il n'existait pas dans le PCG 2025 et
                    est utilisable pour les exercices ouverts à compter du 1er janvier 2026.
                </DocTip>
            )}
            {(entry.previousLabel || entry.previousSystem) && !entry.removed && !entry.added && (
                <DocTip variant="info" label="Compte modifié en 2026">
                    Ce compte a été modifié dans le PCG 2026 par rapport au PCG 2025.
                    {entry.previousLabel && (
                        <>
                            {" "}
                            Ancien intitulé : <em>« {entry.previousLabel} »</em>.
                        </>
                    )}
                    {entry.previousSystem && (
                        <>
                            {" "}
                            Ancien système : <em>{entry.previousSystem === "minimal" ? "Minimal" : "Facultatif"}</em>{" "}
                            (désormais {entry.system === "minimal" ? "Minimal" : "Facultatif"}).
                        </>
                    )}
                </DocTip>
            )}

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
                            borderColor: "neutral/10",
                            paddingTop: "1rem",
                        })}
                    >
                        {entry.description}
                    </p>
                )}
            </div>

            {/* How debit/credit works */}
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
                        params={{ term: entry.type === "bilan" ? "bilan" : "compte-de-resultat" }}
                    >
                        {entry.type === "bilan" ? "bilan" : "compte de résultat"}
                    </DocLink>
                    .
                </DocParagraph>
            </DocSection>

            {/* Parent account */}
            {parentAccount && (
                <DocSection title="Compte parent">
                    <LinkButton
                        to="/documentation/comptabilité/comptes/$account"
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
                                to="/documentation/comptabilité/comptes/$account"
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
                                        borderColor: child.removed ? "error/15" : "neutral/10",
                                        backgroundColor: child.removed ? "error/5" : "white",
                                        _hover: {
                                            borderColor: child.removed ? "error/30" : "primary/30",
                                            backgroundColor: child.removed ? "error/10" : "primary/5",
                                        },
                                        transition: "all 0.15s",
                                        ...(child.removed && { opacity: 0.65 }),
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
                                            color: child.removed ? "error" : "primary",
                                            fontStyle: child.system === "facultatif" ? "italic" : "normal",
                                            ...(child.removed && { textDecoration: "line-through" }),
                                        })}
                                    >
                                        {child.number}
                                    </span>
                                    <span
                                        className={css({
                                            color: child.removed
                                                ? "error/70"
                                                : child.system === "facultatif"
                                                  ? "neutral/50"
                                                  : "neutral",
                                            fontStyle: child.system === "facultatif" ? "italic" : "normal",
                                            ...(child.removed && { textDecoration: "line-through" }),
                                            flex: 1,
                                            minWidth: 0,
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        })}
                                    >
                                        {child.label}
                                    </span>
                                    {child.removed && <ChildDiffTag label="Supprimé" color="error" />}
                                    {child.added && <ChildDiffTag label="Nouveau" color="success" />}
                                    {(child.previousLabel || child.previousSystem) &&
                                        !child.removed &&
                                        !child.added && <ChildDiffTag label="Modifié" color="information" />}
                                </div>
                            </LinkButton>
                        ))}
                    </div>
                </DocSection>
            )}

            {/* Practical usage section */}
            <DocSection title="Utilisation pratique">
                <PracticalUsage entry={entry} debitMeaning={debitMeaning} creditMeaning={creditMeaning} />
            </DocSection>

            <DocTip variant="tip">
                Pour approfondir le fonctionnement des comptes, consultez le{" "}
                <DocLink to="/documentation/comptabilité/comptes">cours sur les comptes</DocLink> et la page sur{" "}
                <DocLink to="/documentation/comptabilité/écritures">les écritures comptables</DocLink>.
            </DocTip>
        </DocRoot>
    )
}

function ChildDiffTag(props: { label: string; color: "error" | "success" | "information" }) {
    const { label, color } = props
    return (
        <span
            className={css({
                fontSize: "2xs",
                fontWeight: "bold",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                padding: "0.0625rem 0.375rem",
                borderRadius: "full",
                flexShrink: 0,
                lineHeight: "1.4",
                color: `${color}`,
                backgroundColor: `${color}/10`,
                border: "1px solid",
                borderColor: `${color}/20`,
            })}
        >
            {label}
        </span>
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
