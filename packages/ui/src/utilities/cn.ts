import { css, cx } from "../../styled-system/css"
import type { SystemStyleObject } from "../../styled-system/types"

export function cn(...inputs: (string | undefined | null | false | SystemStyleObject)[]) {
    return cx(...inputs.filter((x): x is string => typeof x === "string"))
}

export { css, cx }
