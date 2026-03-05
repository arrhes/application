import { css } from "@arrhes/ui/utilities/cn.js"
import { DocDefinition } from "../../../components/document/docDefinition.js"
import { DocExample } from "../../../components/document/docExample.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocList } from "../../../components/document/docList.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTip } from "../../../components/document/docTip.js"

export function IntroductionAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Introduction à la comptabilité"
                description="Comprendre les fondamentaux de la comptabilité"
            />

            <DocSection title="Qu'est-ce que la comptabilité ?">
                <DocParagraph>
                    La comptabilité est un système d'organisation de l'information financière. Elle permet
                    d'enregistrer, classer et analyser toutes les opérations économiques d'une organisation (entreprise,
                    association, etc.).
                </DocParagraph>
                <DocParagraph>
                    À l'origine, la comptabilité est née du besoin de contrôler les mouvements d'argent et de limiter
                    les risques de détournement. Pour cela, seule une personne désignée (le caissier) est habilitée à
                    percevoir et verser de l'argent, et toutes les opérations doivent être justifiées par des pièces.
                </DocParagraph>
                <DocParagraph>En termes simples, la comptabilité répond à deux questions essentielles :</DocParagraph>
                <DocList items={["D'où vient l'argent ? (les ressources)", "Où va l'argent ? (les emplois)"]} />
            </DocSection>

            <DocSection title="Pourquoi tenir une comptabilité ?">
                <DocParagraph>
                    La tenue d'une comptabilité est obligatoire pour la plupart des structures en France. Au-delà de
                    l'obligation légale, elle offre plusieurs avantages :
                </DocParagraph>
                <DocList
                    items={[
                        "Connaître la situation financière de votre organisation à tout moment",
                        "Prendre des décisions éclairées basées sur des chiffres réels",
                        "Justifier vos opérations auprès de l'administration fiscale",
                        "Calculer le bénéfice ou la perte de l'exercice",
                        "Communiquer avec vos partenaires (banques, fournisseurs, membres)",
                    ]}
                />
            </DocSection>

            <DocSection title="L'exercice comptable">
                <DocParagraph>
                    Le temps est découpé en périodes appelées <strong>exercices</strong>, généralement d'un an. À la fin
                    de chaque exercice, l'entreprise doit calculer son résultat (bénéfice ou perte) et présenter ses
                    comptes.
                </DocParagraph>
                <DocDefinition
                    term="Exercice comptable"
                    definition="Période de 12 mois (généralement l'année civile) pendant laquelle on enregistre les opérations. À la fin de l'exercice, on établit les documents de synthèse (bilan, compte de résultat)."
                />
                <DocParagraph>
                    Le bénéfice de l'exercice est la différence entre le patrimoine de fin d'exercice et le patrimoine
                    initial. Si l'entreprise a réussi dans ses activités, elle dispose à la fin de l'exercice d'un
                    patrimoine supérieur à celui du début.
                </DocParagraph>
            </DocSection>

            <DocSection title="Les principes fondamentaux">
                <DocDefinition
                    term="Partie double"
                    definition="Chaque opération comptable affecte au moins deux comptes : l'un est débité, l'autre est crédité. Le total des débits doit toujours être égal au total des crédits. Ce principe garantit l'équilibre de la comptabilité."
                />
                <DocDefinition
                    term="Pièce justificative"
                    definition="Document qui prouve la réalité d'une opération (facture, relevé bancaire, ticket de caisse...). Chaque écriture comptable doit être justifiée par une pièce. C'est le fondement du contrôle comptable."
                />
                <DocDefinition
                    term="Enregistrement chronologique"
                    definition="Les écritures doivent être passées régulièrement dans l'ordre chronologique. Tout retour en arrière est impossible : les erreurs sont corrigées par des écritures de sens contraire, jamais effacées."
                />

                <DocExample title="La partie double en action">
                    <p>Vous achetez des fournitures de bureau pour 100 euros en espèces.</p>
                    <p className={css({ marginTop: "3" })}>Cette opération se traduit par :</p>
                    <ul className={css({ marginTop: "2", ml: "4", spaceY: "1" })}>
                        <li>Débit du compte Fournitures : +100 euros (vous avez plus de fournitures)</li>
                        <li>Crédit du compte Caisse : -100 euros (vous avez moins d'espèces)</li>
                    </ul>
                    <p className={css({ marginTop: "3", fontWeight: "medium" })}>
                        Total débits = Total crédits = 100 euros
                    </p>
                </DocExample>
            </DocSection>

            <DocSection title="Vocabulaire essentiel">
                <DocDefinition
                    term="Débit"
                    definition="Côté gauche d'un compte. Le mot vient du latin debere (devoir) : il indique que le caissier doit pouvoir rendre l'argent entré dans sa caisse. Pour les comptes d'actif et de charges, un débit représente une augmentation."
                />
                <DocDefinition
                    term="Crédit"
                    definition="Côté droit d'un compte. Le mot vient du latin credere (croire) : en échange d'une sortie d'argent, le caissier reçoit une pièce justificative qui lui permet d'être cru lors d'un contrôle. Pour les comptes de passif et de produits, un crédit représente une augmentation."
                />
                <DocDefinition
                    term="Solde"
                    definition="Différence entre le total des débits et le total des crédits d'un compte. Un compte est débiteur si les débits sont supérieurs aux crédits, créditeur dans le cas contraire."
                />
            </DocSection>

            <DocSection title="Lien avec Arrhes">
                <DocParagraph>
                    Ces concepts sont directement appliqués dans Arrhes. Lorsque vous{" "}
                    <DocLink to="/documentation/dashboard/écritures">saisissez une écriture</DocLink>, le logiciel vous
                    demande de spécifier les comptes à débiter et à créditer, et vérifie automatiquement que l'équilibre
                    est respecté.
                </DocParagraph>
            </DocSection>

            <DocTip variant="info">
                Maintenant que vous connaissez les bases de la comptabilité, découvrez comment les comptes sont
                organisés dans la page suivante.
            </DocTip>

            <DocNextPage to="/documentation/comptabilité/comptes" label="Les comptes comptables" />
        </DocRoot>
    )
}
