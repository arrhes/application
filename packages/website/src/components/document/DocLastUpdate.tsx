import { css } from "@arrhes/ui/utilities/cn.js"

export function DocLastUpdate(props: { date: string }) {
    return (
        <div
            className={css({
                padding: "1rem",
                borderRadius: "lg",
                backgroundColor: "background",
                fontSize: "sm",
                color: "neutral/60",
            })}
        >
            Dernière mise à jour : {props.date}
        </div>
    )
}
