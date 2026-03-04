import { Button, ButtonGhostContent, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"

export type FormSubmit<T> = {
    previousLabel?: string
    previousCallback?: (data?: T) => Promise<void>
    nextLabel: string
    nextCallback: (data?: T) => Promise<void>
    stepCount?: string
    stepName?: string
}

export function FormSubmit<T>(props: FormSubmit<T>) {
    const handleNext = async () => {
        await props.nextCallback()
    }

    const handlePrevious = () => {
        if (props.previousCallback === undefined) return undefined
        props.previousCallback()
    }

    return (
        <div
            className={css({
                width: "100%",
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "stretch",
                gap: "0.5rem",
            })}
        >
            <div
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "0.5rem",
                })}
            >
                {props.previousCallback === undefined ? null : (
                    <Button onClick={handlePrevious}>
                        <ButtonGhostContent text={props.previousLabel} />
                    </Button>
                )}
                <Button onClick={handleNext} hasLoader>
                    <ButtonPlainContent text={props.nextLabel} />
                </Button>
            </div>
            {!props.stepCount && !props.stepName ? null : (
                <div
                    className={css({
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        gap: "1",
                    })}
                >
                    {!props.stepCount ? null : (
                        <span className={css({ fontSize: "sm", color: "neutral/50" })}>{props.stepCount}</span>
                    )}
                    {!props.stepName ? null : (
                        <span className={css({ fontSize: "sm", color: "neutral/50" })}>{props.stepName}</span>
                    )}
                </div>
            )}
        </div>
    )
}
