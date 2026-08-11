import { css } from "@comptasse/ui/utilities/cn.js"
import { IconBrandGithub, IconBrandX, IconExternalLink, IconMail } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/DocHeader.js"
import { DocLink } from "../../../components/document/DocLink.js"
import { DocParagraph } from "../../../components/document/DocParagraph.js"
import { DocSection } from "../../../components/document/DocSection.js"
import { DocRoot } from "../../../components/document/DocRoot.js"

export function SupportGeneralDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Support"
                description="Besoin d'aide ? Nous sommes là pour vous accompagner."
            />

            <div
                className={css({
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
                    gap: "1rem",
                })}
            >
                <DocSection title="Email">
                    <DocParagraph>Contactez-nous par email pour toute question ou demande d'assistance.</DocParagraph>
                    <DocParagraph>
                        <IconMail size={16} />{" "}
                        <DocLink href="mailto:support@comptasse.com">support@comptasse.com</DocLink>
                    </DocParagraph>
                </DocSection>

                <DocSection title="GitHub">
                    <DocParagraph>
                        Signalez un bug, proposez une amélioration ou consultez le code source.
                    </DocParagraph>
                    <DocParagraph>
                        <IconBrandGithub size={16} />{" "}
                        <DocLink
                            href="https://github.com/comptasse/application"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            comptasse/application
                        </DocLink>{" "}
                        <IconExternalLink size={14} />
                    </DocParagraph>
                </DocSection>

                <DocSection title="X (Twitter)">
                    <DocParagraph>Suivez-nous pour les dernières actualités et mises à jour.</DocParagraph>
                    <DocParagraph>
                        <IconBrandX size={16} />{" "}
                        <DocLink href="https://x.com/comptasse" target="_blank" rel="noopener noreferrer">
                            @comptasse
                        </DocLink>{" "}
                        <IconExternalLink size={14} />
                    </DocParagraph>
                </DocSection>
            </div>

            <DocSection title="Ressources utiles">
                <div
                    className={css({
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
                        gap: "1rem",
                    })}
                >
                    <DocSection title="Cours de comptabilité">
                        <DocParagraph>Les bases de la comptabilité expliquées simplement</DocParagraph>
                        <DocParagraph>
                            <DocLink to="/documentation/comptabilité/introduction/">Commencer le cours</DocLink>
                        </DocParagraph>
                    </DocSection>
                    <DocSection title="Guide d'utilisation">
                        <DocParagraph>Apprenez à utiliser l'application</DocParagraph>
                        <DocParagraph>
                            <DocLink to="/documentation/guide/démarrer">Ouvrir le guide</DocLink>
                        </DocParagraph>
                    </DocSection>
                </div>
            </DocSection>

            <DocParagraph>
                Nous nous efforçons de répondre à toutes les demandes dans un délai raisonnable.
            </DocParagraph>
        </DocRoot>
    )
}
