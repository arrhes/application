import { ButtonOutlineContent, LinkContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

export function RootDashboardDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Guide d'utilisation"
                description="Découvrez comment utiliser Arrhes au quotidien pour gérer votre comptabilité de manière simple et efficace."
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
                    Nouveau sur Arrhes ?
                </h2>
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}
                >
                    Commencez par le guide de démarrage pour configurer votre première organisation et comprendre les
                    bases du logiciel.
                </p>
                <div
                    className={css({
                        display: "flex",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/documentation/dashboard/démarrage">
                        <ButtonOutlineContent text="Démarrage" rightIcon={<IconChevronRight />} />
                    </LinkButton>
                </div>
            </div>

            <DocTip variant="info">
                <span>
                    Vous avez trouvé un bug ? Vous souhaitez ajouter une fonctionnalité ?{" "}
                    <a href="https://github.com/arrhes/application/issues" target="_blank" rel="noopener noreferrer">
                        <LinkContent>Ouvrez un ticket sur GitHub</LinkContent>
                    </a>{" "}
                    pour que nous puissions discuter de ça rapidement.
                </span>
            </DocTip>

            {/* Tip box */}
            <DocTip variant="tip">
                Si vous n'avez jamais fait de comptabilité, nous vous recommandons de commencer par le{" "}
                <DocLink to="/documentation/comptabilité">cours de comptabilité</DocLink> avant de consulter le guide
                d'utilisation. Cela vous permettra de mieux comprendre les concepts utilisés dans le logiciel.
            </DocTip>
        </DocRoot>
    )
}
