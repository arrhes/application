import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { DocLastUpdate } from "../../../components/document/docLastUpdate.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocTextSection } from "../../../components/document/docTextSection.js"
import { LinkButton } from "../../../components/linkButton.js"

export function PrivacyGeneralDocPage() {
    return (
        <DocRoot>
            {/* Page header */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                })}
            >
                <h1
                    className={css({
                        fontSize: "lg",
                        fontWeight: "bold",
                        color: "neutral",
                    })}
                >
                    Politique de confidentialité
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Comment nous collectons, utilisons et protégeons vos données personnelles.
                </p>
            </div>

            {/* Content */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                })}
            >
                <DocTextSection title="1. Responsable du traitement">
                    <p>
                        Le responsable du traitement des données personnelles est la même société que celle qui
                        mentionnée dans les{" "}
                        <LinkButton to="/documentation/mentions-légales">
                            <LinkContent>mentions légales</LinkContent>
                        </LinkButton>
                        .
                    </p>
                    <p>
                        Pour toute question relative à vos données personnelles, vous pouvez nous contacter à l'adresse
                        :{" "}
                        <a href="mailto:support@arrhes.com">
                            <LinkContent>support@arrhes.com</LinkContent>
                        </a>
                    </p>
                </DocTextSection>

                <DocTextSection title="2. Données collectées">
                    <p>Nous collectons les données suivantes :</p>
                    <ul>
                        <li>
                            <strong>Données d'identification :</strong> nom, prénom, adresse email
                        </li>
                        <li>
                            <strong>Données de connexion :</strong> adresse IP, logs de connexion
                        </li>
                        <li>
                            <strong>Données comptables :</strong> écritures, comptes, documents que vous saisissez
                        </li>
                        <li>
                            <strong>Données d'usage :</strong> fonctionnalités utilisées, préférences
                        </li>
                    </ul>
                </DocTextSection>

                <DocTextSection title="3. Finalités du traitement">
                    <p>Vos données sont utilisées pour :</p>
                    <ul>
                        <li>Fournir et améliorer le service</li>
                        <li>Gérer votre compte utilisateur</li>
                        <li>Assurer la sécurité du service</li>
                        <li>Vous contacter pour des informations relatives au service</li>
                        <li>Respecter nos obligations légales</li>
                    </ul>
                </DocTextSection>

                <DocTextSection title="4. Base légale">
                    <p>Le traitement de vos données repose sur les bases légales suivantes :</p>
                    <ul>
                        <li>
                            <strong>Exécution du contrat :</strong> pour fournir le service
                        </li>
                        <li>
                            <strong>Intérêt légitime :</strong> pour améliorer nos services et assurer la sécurité
                        </li>
                        <li>
                            <strong>Consentement :</strong> pour les communications (optionnel)
                        </li>
                        <li>
                            <strong>Obligation légale :</strong> pour la conservation des données liées au paiement
                        </li>
                    </ul>
                </DocTextSection>

                <DocTextSection title="5. Durée de conservation">
                    <p>Vos données sont conservées pendant la durée de votre utilisation du service, puis :</p>
                    <ul>
                        <li>Données de compte : supprimées à la clôture du compte</li>
                        <li>Données de paiement : conservées 10 ans conformément à la loi</li>
                        <li>Logs de connexion : conservés 1 an</li>
                    </ul>
                </DocTextSection>

                <DocTextSection title="6. Destinataires des données">
                    <p>Vos données peuvent être partagées avec :</p>
                    <ul>
                        <li>Nos sous-traitants techniques (hébergement, email)</li>
                        <li>Les autorités en cas d'obligation légale</li>
                    </ul>
                    <p>Nous ne fournissons jamais vos données, à quelque titre que ce soit, à des tiers.</p>
                </DocTextSection>

                <DocTextSection title="7. Transferts hors UE">
                    <p>
                        Vos données sont hébergées en France et ne font l'objet d'aucun transfert en dehors de l'Union
                        Européenne.
                    </p>
                </DocTextSection>

                <DocTextSection title="8. Sécurité">
                    <p>
                        Nous mettons en oeuvre des mesures techniques et organisationnelles pour protéger vos données :
                    </p>
                    <ul>
                        <li>Chiffrement des données en transit et au repos</li>
                        {/* <li>Authentification sécurisée avec option 2FA</li> */}
                        <li>Sauvegardes régulières</li>
                        <li>Accès limité au personnel autorisé</li>
                    </ul>
                </DocTextSection>

                <DocTextSection title="9. Vos droits">
                    <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                    <ul>
                        <li>
                            <strong>Droit d'accès :</strong> obtenir une copie de vos données
                        </li>
                        <li>
                            <strong>Droit de rectification :</strong> corriger vos données
                        </li>
                        <li>
                            <strong>Droit à l'effacement :</strong> supprimer vos données
                        </li>
                        <li>
                            <strong>Droit à la portabilité :</strong> exporter vos données
                        </li>
                        <li>
                            <strong>Droit d'opposition :</strong> vous opposer à certains traitements
                        </li>
                        <li>
                            <strong>Droit de limitation :</strong> limiter le traitement
                        </li>
                    </ul>
                    <p>
                        Pour exercer ces droits, contactez-nous à{" "}
                        <a href="mailto:support@arrhes.com">
                            <LinkContent>support@arrhes.com</LinkContent>
                        </a>
                        .
                    </p>
                </DocTextSection>

                <DocTextSection title="10. Réclamation">
                    <p>
                        Si vous estimez que le traitement de vos données ne respecte pas la réglementation, nous pouvons
                        en discuter ensemble. Dans le cas échéant, vous pouvez introduire une réclamation auprès de la
                        CNIL (Commission Nationale de l'Informatique et des Libertés).
                    </p>
                </DocTextSection>

                <DocLastUpdate date="12 Février 2026" />
            </div>
        </DocRoot>
    )
}
