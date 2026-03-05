import { ButtonGhostContent } from "@arrhes/ui"
import type { Icon, IconProps } from "@tabler/icons-react"
import type { ReactElement } from "react"
import { LinkButton } from "../../components/linkButton.tsx"

export interface DocSection {
    id: string
    label: string
    path: string
    icon: ReactElement<IconProps & React.RefAttributes<Icon>>
    navigation: Record<
        string,
        {
            title: string
            icon: ReactElement<IconProps & React.RefAttributes<Icon>>
            items: { path: string; label: string }[]
        }
    >
}

export function SectionTab(props: { section: DocSection; isActive: boolean }) {
    return (
        <LinkButton to={props.section.path}>
            <ButtonGhostContent leftIcon={props.section.icon} text={props.section.label} isCurrent={props.isActive} />
        </LinkButton>
    )
}
