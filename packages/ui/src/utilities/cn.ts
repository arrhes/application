import { css, cx } from "../../styled-system/css"
import type { SystemStyleObject } from "../../styled-system/types"

export function cn(...inputs: (string | undefined | null | false | SystemStyleObject)[]) {
    return cx(
        ...inputs
            .map((x): string | undefined => {
                if (!x) return undefined
                if (typeof x === "string") return x
                return css(x)
            })
            .filter((x): x is string => x !== undefined),
    )
}

export { css }
