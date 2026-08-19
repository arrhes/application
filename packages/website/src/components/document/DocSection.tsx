import { css } from "@comptasse/ui/utilities/cn.js"
import { DocSectionRoot } from "./DocSectionRoot.js"
import { DocSectionTitle } from "./DocSectionTitle.js"

export function DocSection(props: { title: string; depth?: number; children: React.ReactNode }) {
    return (
        <DocSectionRoot depth={props.depth}>
            <DocSectionTitle
                title={props.title}
                depth={props.depth}
            />
            <div
                className={css({
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                })}
            >
                {props.children}
            </div>
        </DocSectionRoot>
    )
}
