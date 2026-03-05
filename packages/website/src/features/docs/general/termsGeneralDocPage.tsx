import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { DocLastUpdate } from "../../../components/document/docLastUpdate.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocTextSection } from "../../../components/document/docTextSection.js"

export function TermsGeneralDocPage() {
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
                    Conditions Générales d'Utilisation
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Conditions régissant l'utilisation du service Arrhes.
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
                <DocTextSection title="1. Objet">
                    <p>
                        Les présentes Conditions Générales d'Utilisation (CGU) ont pour objet de définir les modalités
                        et conditions d'utilisation du service Arrhes, accessible à l'adresse arrhes.com.
                    </p>
                    <p>En utilisant le service, l'utilisateur accepte sans réserve les présentes CGU.</p>
                </DocTextSection>

                <DocTextSection title="2. Description du service">
                    <p>
                        Arrhes est un logiciel de comptabilité en ligne permettant aux entreprises et associations de
                        gérer leur comptabilité, saisir des écritures, générer des documents comptables et collaborer en
                        équipe.
                    </p>
                    <p>
                        Le service est proposé en version basique (gratuite) avec les fonctionnalités de base, et en
                        version avancée (payante) avec des fonctionnalités étendues.
                    </p>
                </DocTextSection>

                <DocTextSection title="3. Inscription et compte">
                    <p>
                        L'utilisation du service nécessite la création d'un compte utilisateur. L'utilisateur s'engage à
                        fournir des informations exactes et à jour lors de son inscription.
                    </p>
                    <p>
                        L'utilisateur est responsable de la confidentialité de ses identifiants de connexion et de
                        toutes les activités effectuées depuis son compte.
                    </p>
                </DocTextSection>

                <DocTextSection title="4. Utilisation du service">
                    <p>L'utilisateur s'engage à :</p>
                    <ul>
                        <li>Utiliser le service conformément à sa destination</li>
                        <li>Ne pas utiliser le service à des fins illégales ou frauduleuses</li>
                        <li>Ne pas tenter de compromettre la sécurité du service</li>
                        <li>Respecter les droits de propriété intellectuelle</li>
                        <li>Ne pas collecter de données d'autres utilisateurs sans autorisation</li>
                    </ul>
                </DocTextSection>

                <DocTextSection title="5. Données et responsabilité">
                    <p>
                        L'utilisateur est seul responsable des données qu'il saisit dans le service. Arrhes ne peut être
                        tenu responsable des erreurs comptables résultant d'une mauvaise utilisation du service.
                    </p>
                    <p>
                        L'utilisateur est encouragé à vérifier ses données et à consulter un professionnel comptable en
                        cas de doute.
                    </p>
                </DocTextSection>

                <DocTextSection title="6. Propriété intellectuelle">
                    <p>
                        Le code source d'Arrhes est distribué sous licence{" "}
                        <a
                            href="https://raw.githubusercontent.com/arrhes/application/refs/heads/main/LICENSE"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkContent>AGPL-3.0</LinkContent>
                        </a>
                        . Les conditions spécifiques de cette licence sont disponibles sur notre dépôt GitHub.
                    </p>
                    <p>Les marques, logos et contenus graphiques restent la propriété de l'entreprise.</p>
                </DocTextSection>

                <DocTextSection title="7. Protection des données">
                    <p>
                        Le traitement des données personnelles est décrit dans notre{" "}
                        <a
                            href="/documentation/confidentialité"
                            className={css({
                                color: "primary",
                                textDecoration: "underline",
                            })}
                        >
                            Politique de confidentialité
                        </a>
                        .
                    </p>
                </DocTextSection>

                <DocTextSection title="8. Résiliation">
                    <p>
                        L'utilisateur peut supprimer son compte à tout moment depuis les paramètres de son profil. La
                        suppression entraîne l'effacement de toutes les données associées au compte, sauf celle
                        nécessaires, i.e. les données légales.
                    </p>
                    <p>
                        Arrhes se réserve le droit de suspendre ou supprimer un compte en cas de violation des présentes
                        CGU.
                    </p>
                </DocTextSection>

                <DocTextSection title="9. Modification des CGU">
                    <p>
                        Arrhes se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs seront
                        informés de toute modification substantielle par email ou notification dans l'application.
                    </p>
                </DocTextSection>

                <DocTextSection title="10. Droit applicable">
                    <p>
                        Les présentes CGU sont soumises au droit français. En cas de litige, les tribunaux de Paris
                        seront seuls compétents.
                    </p>
                </DocTextSection>

                <DocLastUpdate date="12 Février 2026" />
            </div>
        </DocRoot>
    )
}
