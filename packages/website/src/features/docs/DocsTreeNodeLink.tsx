import { ButtonGhostContent } from "@comptasse/ui"
import type { Icon, IconProps } from "@tabler/icons-react"
import type { ReactElement } from "react"
import { LinkButton } from "../../components/LinkButton.tsx"

export function DocsTreeNodeLink({
    icon,
    label,
    path,
    active = false,
    depth = 0,
    onClick,
}: {
    icon?: ReactElement<IconProps & React.RefAttributes<Icon>>
    label: string
    path: string
    active?: boolean
    depth?: number
    onClick?: () => void
}) {
    return (
        <LinkButton
            to={path}
            className={{
                width: "100%",
            }}
            style={{
                paddingLeft: `${depth * 1}rem`,
            }}
            onClick={onClick}
        >
            <ButtonGhostContent
                leftIcon={icon}
                text={label}
                isCurrent={active}
                className={{
                    width: "100%",
                    justifyContent: "start",
                }}
            />
        </LinkButton>
    )
}
