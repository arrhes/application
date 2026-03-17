import type { ComponentProps } from "react"
import { token } from "../../../styled-system/tokens/index"
import { ButtonGhostContent } from "../buttons/buttonGhostContent.tsx"

export function Logo(props: { className?: ComponentProps<"div">["className"]; withText?: boolean }) {
    return (
        <ButtonGhostContent
            className={props.className}
            text={props.withText ? "arrhes" : undefined}
            leftIcon={
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    color={token("colors.primary")}
                    strokeLinecap="round"
                >
                    <g opacity=".2" fill="currentColor" stroke="none">
                        <rect x="0" y="0" width="11" height="6" rx="2" />
                        <rect x="13" y="0" width="11" height="6" rx="2" />
                    </g>

                    <g opacity=".5" fill="currentColor" stroke="none">
                        <rect x="0" y="9" width="7" height="6" rx="2" />
                        <rect x="9" y="9" width="15" height="6" rx="2" />
                    </g>

                    <g opacity="1" fill="currentColor" stroke="none">
                        <rect x="0" y="18" width="17" height="6" rx="2" />
                        <rect x="19" y="18" width="5" height="6" rx="2" />
                    </g>
                </svg>
            }
        />
    )
}
