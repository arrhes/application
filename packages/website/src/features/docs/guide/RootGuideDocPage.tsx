import { ButtonOutlineContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { IconBuilding, IconCalendar, IconChevronRight, IconPencil } from "@tabler/icons-react"
import { DocHeader } from "../../../components/document/DocHeader.tsx"
import { DocLink } from "../../../components/document/DocLink.tsx"
import { DocRoot } from "../../../components/document/DocRoot.tsx"
import { DocSectionCard } from "../../../components/document/DocSectionCard.tsx"
import { DocTip } from "../../../components/document/DocTip.tsx"
import { LinkButton } from "../../../components/LinkButton.tsx"

export function RootGuideDocPage() {
    return (
        <DocRoot>
            <DocHeader
                title="Guide d'utilisation"
                description="Découvrez comment utiliser Arrhes au quotidien. Chaque fonctionnalité est présentée sous trois angles : l'interface dashboard, l'API et le CLI."
            />

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
                <p
                    className={css({
                        fontSize: "sm",
                        color: "neutral/60",
                        lineHeight: "relaxed",
                    })}
                >
                    Commencez par le guide de démarrage pour configurer votre première organisation, puis explorez les
                    fonctionnalités selon vos besoins.
                </p>
                <div
                    className={css({
                        display: "flex",
                        gap: "0.5rem",
                    })}
                >
                    <LinkButton to="/documentation/guide/démarrer">
                        <ButtonOutlineContent
                            text="Démarrage"
                            rightIcon={<IconChevronRight />}
                        />
                    </LinkButton>
                </div>
            </div>

            <DocSectionCard
                icon={<IconBuilding />}
                iconColor="primary"
                title="Organisation"
                description="Créer et administrer vos structures, inviter des membres et gérer les accès."
                links={[
                    {
                        to: "/documentation/guide/organisations",
                        label: "Organisations",
                    },
                    {
                        to: "/documentation/guide/membres",
                        label: "Membres",
                    },
                ]}
                ctaTo="/documentation/guide/organisations"
                ctaLabel="Voir les organisations"
            />

            <DocSectionCard
                icon={<IconCalendar />}
                iconColor="success"
                title="Exercice comptable"
                description="Configurer vos exercices, plan comptable, journaux et libellés."
                links={[
                    {
                        to: "/documentation/guide/exercices",
                        label: "Exercices",
                    },
                    {
                        to: "/documentation/guide/comptes",
                        label: "Comptes",
                    },
                    {
                        to: "/documentation/guide/journaux",
                        label: "Journaux",
                    },
                    {
                        to: "/documentation/guide/libellés",
                        label: "Libellés",
                    },
                ]}
                ctaTo="/documentation/guide/exercices"
                ctaLabel="Voir les exercices"
            />

            <DocSectionCard
                icon={<IconPencil />}
                iconColor="information"
                title="Écritures et documents"
                description="Saisir vos opérations, stocker vos pièces justificatives et produire vos documents comptables."
                links={[
                    {
                        to: "/documentation/guide/écritures",
                        label: "Saisie des écritures",
                    },
                    {
                        to: "/documentation/guide/stockage",
                        label: "Stockage & Fichiers",
                    },
                    {
                        to: "/documentation/guide/documents",
                        label: "Documents comptables",
                    },
                ]}
                ctaTo="/documentation/guide/écritures"
                ctaLabel="Voir la saisie"
            />

            <DocTip variant="tip">
                Si vous n'avez jamais fait de comptabilité, commencez par le{" "}
                <DocLink to="/documentation/comptabilité">cours de comptabilité</DocLink> avant de consulter ce guide.
            </DocTip>

            <DocTip variant="info">
                Vous avez trouvé un bug ?{" "}
                <a
                    href="https://github.com/arrhes/application/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ouvrez un ticket sur GitHub
                </a>{" "}
                pour que nous puissions en discuter.
            </DocTip>
        </DocRoot>
    )
}
