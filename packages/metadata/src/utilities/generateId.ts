import { customAlphabet } from "nanoid"

export function generateId() {
    const alphabet = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 16)
    return alphabet()
}
