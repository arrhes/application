import { Button, type ButtonContentProps, ButtonPlainContent } from "@arrhes/ui"
import { css } from "@arrhes/ui/utilities/cn.js"
import { valibotResolver } from "@hookform/resolvers/valibot"
import { type ReactElement, useEffect, useRef } from "react"
import { type DefaultValues, FormProvider, type UseFormReturn, useForm } from "react-hook-form"
import type * as v from "valibot"

export function FormRoot<T extends Record<string, unknown>, U extends v.GenericSchema<T>>(props: {
    schema: U
    defaultValues: DefaultValues<v.InferOutput<U>>
    onSubmit: (data: v.InferOutput<U>) => Promise<boolean>
    onCancel: ((data: v.InferOutput<U>) => void) | (() => Promise<void>) | undefined
    onSuccess: ((data: v.InferOutput<U>) => void) | (() => Promise<void>) | undefined
    resetOnSubmit?: boolean
    submitOnPressEnterKey?: boolean
    submitButtonProps: ButtonContentProps
    children: (form: UseFormReturn<v.InferOutput<U>, any, v.InferOutput<U>>) => ReactElement
}) {
    const form = useForm<T>({
        mode: "onSubmit",
        criteriaMode: "all",
        shouldFocusError: true,
        defaultValues: props.defaultValues,
        resolver: valibotResolver<T, any, T>(props.schema),
    })
    const submitButtonRef = useRef<HTMLButtonElement>(null)
    const isSubmittingRef = useRef(false)

    useEffect(() => {
        if (props.submitOnPressEnterKey === false) return

        const listener = async (event: KeyboardEvent) => {
            if (event.code === "Enter" || event.code === "NumpadEnter") {
                event.preventDefault()
                submitButtonRef.current?.click()
            }
        }
        document.addEventListener("keydown", listener)
        return () => {
            document.removeEventListener("keydown", listener)
        }
    }, [props.submitOnPressEnterKey])

    return (
        <FormProvider {...form}>
            <form
                className={css({
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                })}
            >
                <div
                    className={css({
                        width: "100%",
                        maxWidth: "md",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch",
                        gap: "1.5rem",
                    })}
                >
                    <div
                        className={css({
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            gap: "1rem",
                        })}
                    >
                        {props.children(form)}
                    </div>
                    <Button
                        ref={submitButtonRef}
                        className={props.submitButtonProps.className}
                        type="button"
                        hasLoader={true}
                        isDisabled={props.submitButtonProps.isDisabled}
                        title={props.submitButtonProps.title ?? props.submitButtonProps.text}
                        onClick={async (event) => {
                            event.preventDefault()

                            if (isSubmittingRef.current) return
                            isSubmittingRef.current = true

                            try {
                                const triggerResponse = await form.trigger()
                                if (!triggerResponse) return

                                const data = form.getValues()
                                const response = await props.onSubmit(data)
                                if (!response) return

                                if (props.resetOnSubmit === true) {
                                    form.reset()
                                }

                                if (props.onSuccess !== undefined) {
                                    await props.onSuccess(data)
                                }
                            } finally {
                                isSubmittingRef.current = false
                            }
                        }}
                    >
                        <ButtonPlainContent
                            text={props.submitButtonProps.text}
                            color={props.submitButtonProps.color}
                            leftIcon={props.submitButtonProps.leftIcon}
                            rightIcon={props.submitButtonProps.rightIcon}
                            isDisabled={props.submitButtonProps.isDisabled}
                        />
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}
