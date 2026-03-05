import { LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { DocLastUpdate } from "../../../components/document/docLastUpdate.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { DocTextSection } from "../../../components/document/docTextSection.js"
import { DocTip } from "../../../components/document/docTip.js"

export function LegalGeneralDocPage() {
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
                    Mentions légales
                </h1>
                <p
                    className={css({
                        color: "neutral/60",
                        fontSize: "md",
                        lineHeight: "relaxed",
                    })}
                >
                    Informations légales relatives à l'utilisation du site et du service Arrhes.
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
                <DocTextSection title="Éditeur du site">
                    <p>
                        Le site arrhes.com est édité par Barbote SAS, société par actions simplifiée au capital de
                        1000.00 euros, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro 908
                        719 503.
                    </p>
                    <p>
                        <strong>Siège social :</strong> 93 rue Sedaine, 75011 Paris
                        <br />
                        <strong>Numéro de TVA intracommunautaire :</strong> FR02 908 719 503
                        <br />
                        <strong>Directeur de la publication :</strong> Emile Sabatier
                        <br />
                        <strong>Contact :</strong>{" "}
                        <a href="mailto:contact@arrhes.com">
                            <LinkContent>contact@arrhes.com</LinkContent>
                        </a>
                    </p>
                </DocTextSection>

                <DocTextSection title="Hébergement">
                    <p>
                        Le site est hébergé par la société :<br />
                        OVH
                        <br />
                        RCS Lille Métropole, 424 761 419 00045
                        <br />2 rue Kellermann - 59100 Roubaix - France
                    </p>
                </DocTextSection>

                <DocTextSection title="Propriété intellectuelle">
                    <p>
                        L'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, etc.) est protégé par
                        les lois relatives à la propriété intellectuelle.
                    </p>
                    <p>
                        Le code source d'Arrhes est distribué sous licence{" "}
                        <a
                            href="https://raw.githubusercontent.com/arrhes/application/refs/heads/main/LICENSE"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkContent>AGPL-3.0</LinkContent>
                        </a>
                        . Consultez notre dépôt GitHub pour plus d'informations.
                    </p>
                </DocTextSection>

                <DocTextSection title="Données personnelles">
                    <p>
                        Les informations relatives au traitement de vos données personnelles sont détaillées dans notre{" "}
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

                <DocTextSection title="Cookies">
                    <p>
                        Ce site utilise des cookies strictement nécessaires au fonctionnement du service. Aucun cookie
                        publicitaire ou de traçage n'est utilisé.
                    </p>
                </DocTextSection>

                <DocTextSection title="Limitation de responsabilité">
                    <p>
                        Arrhes s'efforce de fournir des informations exactes et à jour sur ce site. Toutefois, nous ne
                        pouvons garantir l'exactitude, la complétude ou l'actualité des informations diffusées.
                    </p>
                    <p>
                        L'utilisateur est seul responsable de l'utilisation qu'il fait des informations et
                        fonctionnalités disponibles sur ce site.
                    </p>
                </DocTextSection>

                <DocTip variant="info">Oui, pour notre comptabilité, nous utilisons Arrhes. ;)</DocTip>

                <DocLastUpdate date="12 Février 2026" />
            </div>
        </DocRoot>
    )
}
