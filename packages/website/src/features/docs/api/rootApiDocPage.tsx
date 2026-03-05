import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconChevronRight } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/docHeader.tsx"
import { DocLink } from "../../../components/document/docLink.tsx"
import { DocRoot } from "../../../components/document/docRoot.tsx"
import { DocTip } from "../../../components/document/docTip.tsx"
import { LinkButton } from "../../../components/linkButton.tsx"

export function RootApiDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="API"
                description="Documentation technique de l'API d'Arrhes. Toutes les routes, leurs paramètres et leurs réponses."
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
                    Vue d'ensemble
                </h2>
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}
                >
                    L'API d'Arrhes utilise exclusivement la méthode POST. L'organisation est identifiée via la clé API
                    (Bearer token). L'API expose 90 routes protégées réparties en 17 catégories.
                </p>
                <div
                    className={css({
                        display: "flex",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/documentation/api/introduction">
                        <ButtonOutlineContent text="Commencer" rightIcon={<IconChevronRight />} />
                    </LinkButton>
                </div>
            </div>

            <DocTip variant="info">
                L'API supporte deux méthodes d'authentification : les cookies de session (pour l'interface web) et les
                clés API avec l'en-tête <code>Authorization: Bearer &lt;clé&gt;</code> (pour l'intégration
                programmatique).
            </DocTip>

            <DocTip variant="tip">
                Pour comprendre les concepts métier utilisés dans l'API, consultez le{" "}
                <DocLink to="/documentation/comptabilité">cours de comptabilité</DocLink> et le{" "}
                <DocLink to="/documentation/dashboard">guide d'utilisation</DocLink>.
            </DocTip>
        </DocRoot>
    )
}
