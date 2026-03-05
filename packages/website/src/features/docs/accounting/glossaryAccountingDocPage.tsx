import { DocGlossaryEntry } from "../../../components/document/docGlossaryEntry.js"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocLink } from "../../../components/document/docLink.js"
import { DocNextPage } from "../../../components/document/docNextPage.js"
import { DocParagraph } from "../../../components/document/docParagraph.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocSection } from "../../../components/document/docSection.js"
import { DocTip } from "../../../components/document/docTip.js"

export function GlossaryAccountingDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Glossaire comptable"
                description="Tous les termes essentiels de la comptabilité en un coup d'oeil"
            />

            <DocParagraph>
                Ce glossaire regroupe les définitions des termes comptables utilisés dans le cours. Cliquez sur les
                liens pour approfondir chaque concept dans la page correspondante.
            </DocParagraph>

            <DocSection title="A">
                <DocGlossaryEntry
                    term="Actif"
                    definition="Partie gauche du bilan. Regroupe tout ce que l'organisation possède : immobilisations, stocks, créances clients, trésorerie. Les comptes d'actif augmentent au débit et diminuent au crédit."
                />
                <DocGlossaryEntry
                    term="Amortissement"
                    definition="Constatation comptable de la dépréciation d'un bien immobilisé au fil du temps (usure, obsolescence). Il est enregistré chaque année comme une charge dans le compte de résultat."
                />
                <DocGlossaryEntry
                    term="Annexe"
                    definition="Document obligatoire qui complète le bilan et le compte de résultat avec des informations complémentaires : méthodes comptables utilisées, engagements hors bilan, détails sur certains postes."
                />
            </DocSection>

            <DocSection title="B">
                <DocGlossaryEntry
                    term="Balance"
                    definition="Liste de tous les comptes avec leurs totaux débit, crédit et solde. Outil de contrôle essentiel : le total des soldes débiteurs doit toujours égaler le total des soldes créditeurs."
                />
                <DocGlossaryEntry
                    term="Bénéfice"
                    definition="Résultat positif d'un exercice. Peut être calculé par le patrimoine (patrimoine final - patrimoine initial) ou par les opérations (produits - charges). Les deux méthodes doivent donner le même résultat."
                />
                <DocGlossaryEntry
                    term="Bilan"
                    definition="Photographie du patrimoine de l'organisation à une date donnée. Il montre ce que l'organisation possède (actif) et comment elle l'a financé (passif). L'actif doit toujours être égal au passif."
                />
            </DocSection>

            <DocSection title="C">
                <DocGlossaryEntry
                    term="Capital"
                    definition="Apports initiaux des associés ou fondateurs. Fait partie des capitaux propres au passif du bilan. Il est assimilé à une dette de l'entreprise envers ses propriétaires."
                />
                <DocGlossaryEntry
                    term="Capitaux propres"
                    definition="Ensemble des ressources appartenant aux propriétaires de l'organisation : capital, réserves, report à nouveau et résultat de l'exercice. Ils figurent au passif du bilan."
                />
                <DocGlossaryEntry
                    term="Charges (classe 6)"
                    definition="Toutes les dépenses de l'exercice : achats, services extérieurs, impôts, salaires, charges financières. Les comptes de charges sont débités quand ils augmentent."
                />
                <DocGlossaryEntry
                    term="Classe de compte"
                    definition="Regroupement des comptes par nature, numérotés de 1 à 7. Classes 1 à 5 : comptes de bilan. Classes 6 et 7 : comptes de gestion (résultat). Le premier chiffre du numéro de compte indique sa classe."
                />
                <DocGlossaryEntry
                    term="Compte"
                    definition="Catégorie qui regroupe des opérations de même nature. Chaque compte possède un numéro et un intitulé définis par le Plan Comptable Général."
                />
                <DocGlossaryEntry
                    term="Compte de résultat"
                    definition="Document de synthèse qui compare les produits aux charges sur un exercice pour déterminer le résultat (bénéfice ou perte). Construit à partir des comptes d'opérations (classes 6 et 7)."
                />
                <DocGlossaryEntry
                    term="Comptes d'agents"
                    definition="Comptes qui enregistrent les relations avec les tiers (clients, fournisseurs, banque, État) du point de vue de ces tiers. Ils décrivent qui doit quoi à qui."
                />
                <DocGlossaryEntry
                    term="Comptes d'opérations"
                    definition="Comptes qui enregistrent les opérations économiques du point de vue de l'entreprise : achats, ventes, charges, produits. Ils décrivent ce que fait l'entreprise."
                />
                <DocGlossaryEntry
                    term="Crédit"
                    definition="Côté droit d'un compte. Du latin credere (croire) : en échange d'une sortie d'argent, le caissier reçoit une pièce justificative. Pour les comptes de passif et de produits, un crédit représente une augmentation."
                />
            </DocSection>

            <DocSection title="D">
                <DocGlossaryEntry
                    term="Débit"
                    definition="Côté gauche d'un compte. Du latin debere (devoir) : le caissier doit pouvoir rendre l'argent entré dans sa caisse. Pour les comptes d'actif et de charges, un débit représente une augmentation."
                />
            </DocSection>

            <DocSection title="E">
                <DocGlossaryEntry
                    term="Écriture comptable"
                    definition="Enregistrement d'une opération économique dans les comptes. Comprend une date, un libellé, un numéro de pièce et les comptes mouvementés. Respecte toujours le principe de la partie double."
                />
                <DocGlossaryEntry
                    term="Exercice comptable"
                    definition="Période de 12 mois (généralement l'année civile) pendant laquelle on enregistre les opérations. À la fin, on établit les documents de synthèse (bilan, compte de résultat)."
                />
            </DocSection>

            <DocSection title="G">
                <DocGlossaryEntry
                    term="Grand livre"
                    definition="Liste de tous les comptes avec le détail de leurs mouvements. Permet de vérifier l'historique et le solde progressif de chaque compte."
                />
            </DocSection>

            <DocSection title="I">
                <DocGlossaryEntry
                    term="Immobilisations (classe 2)"
                    definition="Biens destinés à rester durablement dans l'organisation : terrains, bâtiments, matériel, véhicules, logiciels. Figurent à l'actif du bilan."
                />
            </DocSection>

            <DocSection title="J">
                <DocGlossaryEntry
                    term="Journal"
                    definition="Registre chronologique de toutes les écritures comptables. A une valeur juridique et constitue une preuve en cas de contrôle. Les écritures ne doivent jamais y être effacées."
                />
                <DocGlossaryEntry
                    term="Journaux auxiliaires"
                    definition="Journaux spécialisés par type d'opération : journal des achats (HA), des ventes (VE), de banque (BQ), de caisse (CA), des opérations diverses (OD). Ils facilitent l'organisation et le contrôle."
                />
            </DocSection>

            <DocSection title="P">
                <DocGlossaryEntry
                    term="Partie double"
                    definition="Principe fondamental : chaque opération comptable affecte au moins deux comptes. L'un est débité, l'autre est crédité. Le total des débits doit toujours être égal au total des crédits."
                />
                <DocGlossaryEntry
                    term="Passif"
                    definition="Partie droite du bilan. Regroupe les ressources de l'organisation : capitaux propres, emprunts, dettes fournisseurs, dettes fiscales. Les comptes de passif augmentent au crédit et diminuent au débit."
                />
                <DocGlossaryEntry
                    term="Perte"
                    definition="Résultat négatif d'un exercice, quand les charges sont supérieures aux produits. La perte diminue les capitaux propres au bilan."
                />
                <DocGlossaryEntry
                    term="Pièce justificative"
                    definition="Document qui prouve la réalité d'une opération (facture, relevé bancaire, ticket de caisse...). Chaque écriture comptable doit être justifiée par une pièce."
                />
                <DocGlossaryEntry
                    term="Plan Comptable Général (PCG)"
                    definition="Référentiel français qui définit la structure commune des comptes pour toutes les organisations. Il organise les comptes en 7 classes numérotées."
                />
                <DocGlossaryEntry
                    term="Produits (classe 7)"
                    definition="Toutes les recettes de l'exercice : ventes, prestations de services, subventions, produits financiers, cotisations. Les comptes de produits sont crédités quand ils augmentent."
                />
            </DocSection>

            <DocSection title="R">
                <DocGlossaryEntry
                    term="Report à nouveau"
                    definition="Résultat de l'exercice précédent en attente d'affectation (mise en réserve ou distribution aux associés)."
                />
                <DocGlossaryEntry
                    term="Réserves"
                    definition="Bénéfices des années passées qui ont été conservés dans l'entreprise et non distribués aux associés. Font partie des capitaux propres."
                />
                <DocGlossaryEntry
                    term="Résultat"
                    definition="Différence entre les produits et les charges d'un exercice. Positif = bénéfice (ou excédent pour une association). Négatif = perte (ou déficit). Le résultat figure dans les capitaux propres du bilan."
                />
            </DocSection>

            <DocSection title="S">
                <DocGlossaryEntry
                    term="Solde"
                    definition="Différence entre le total des débits et le total des crédits d'un compte. Un compte est débiteur si les débits sont supérieurs aux crédits, créditeur dans le cas contraire."
                />
                <DocGlossaryEntry
                    term="Stocks (classe 3)"
                    definition="Marchandises, matières premières et produits finis en attente de vente ou d'utilisation. Figurent à l'actif circulant du bilan."
                />
            </DocSection>

            <DocSection title="T">
                <DocGlossaryEntry
                    term="Tiers (classe 4)"
                    definition="Personnes ou organismes avec lesquels l'organisation a des relations financières : clients, fournisseurs, État, organismes sociaux. Le solde indique ce qu'on vous doit ou ce que vous devez."
                />
                <DocGlossaryEntry
                    term="TVA collectée (compte 4457)"
                    definition="TVA facturée sur les ventes, que vous devez reverser à l'État. Le compte est crédité quand la TVA collectée augmente."
                />
                <DocGlossaryEntry
                    term="TVA déductible (compte 4456)"
                    definition="TVA payée sur les achats, que l'État vous doit ou que vous pouvez déduire de la TVA collectée. Le compte est débité quand la TVA déductible augmente."
                />
            </DocSection>

            <DocTip variant="tip">
                Ce glossaire est un aide-mémoire. Pour comprendre ces concepts en profondeur, consultez les pages du
                cours : <DocLink to="/documentation/comptabilité/introduction">Introduction</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/comptes">Les comptes</DocLink>,{" "}
                <DocLink to="/documentation/comptabilité/écritures">Les écritures</DocLink> et{" "}
                <DocLink to="/documentation/comptabilité/documents">Les documents</DocLink>.
            </DocTip>

            <DocNextPage to="/documentation/dashboard/démarrage" label="Guide : Démarrer avec Arrhes" />
        </DocRoot>
    )
}
