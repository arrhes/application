import { cloneElement, type ReactElement, useEffect, useRef, useState } from "react"

type InputDebounced<T> = {
    value: T
    initialValue?: T
    onChange: (value: T) => void
    debounce?: number
    children: ReactElement<any>
}

export function InputDebounced<T>({ value: propValue, initialValue, onChange, debounce, children }: InputDebounced<T>) {
    const currentPropValue = initialValue !== undefined ? initialValue : propValue
    const [value, setValue] = useState<T>(currentPropValue)
    const [prevValue, setPrevValue] = useState<T>(currentPropValue)
    const onChangeRef = useRef(onChange)

    // Keep the ref up to date
    useEffect(() => {
        onChangeRef.current = onChange
    })

    if (currentPropValue !== prevValue) {
        setPrevValue(currentPropValue)
        setValue(currentPropValue)
    }

    useEffect(() => {
        const timeout = setTimeout(
            () => {
                onChangeRef.current(value)
            },
            !debounce ? 300 : debounce,
        )

        return () => clearTimeout(timeout)
    }, [
        value,
        debounce,
    ])

    return cloneElement(children, {
        value: value,
        onChange: (value: T) => setValue(value),
    })
}
