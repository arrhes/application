import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/docHeader.js"
import { DocRoot } from "../../../components/document/docRoot.js"
import { LinkButton } from "../../../components/linkButton.js"

export function RootGeneralDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Documentation"
                description="Bienvenue dans la documentation d'Arrhes. Vous pouvez ici découvrir le projet, reprendre les bases de la comptabilité ou apprendre à utiliser le logiciel."
            />

            {/* About section */}
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    padding: "1.5rem",
                    borderRadius: "lg",
                    border: "1px solid",
                    borderColor: "neutral/10",
                    backgroundColor: "white",
                })}
            >
                <h2
                    className={css({
                        fontSize: "md",
                        fontWeight: "semibold",
                        color: "neutral",
                    })}
                >
                    À propos d'Arrhes
                </h2>
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}
                >
                    Arrhes est un logiciel de comptabilité open source conçu pour les entreprises et associations.
                    Simple, moderne et respectueux des normes comptables françaises, il vous permet de gérer vos
                    écritures comptables, générer vos documents fiscaux et collaborer avec votre équipe.
                </p>
                <div
                    className={css({
                        display: "flex",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/documentation/fonctionnalités">
                        <ButtonOutlineContent text="Voir les fonctionnalités" rightIcon={<IconChevronRight />} />
                    </LinkButton>
                </div>
            </div>
        </DocRoot>
    )
}
