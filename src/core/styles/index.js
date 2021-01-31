import { EnumType, Union } from "jazzi"

const Size = Union({
    name: "Size",
    cases: {
        small: () => "small",
        medium: () => "medium",
        large: () => "large",
        huge: () => "huge",
        none: x => x,
    },
    constructors: {
        fromString(str){
            return this[str]?.() || this.none()
        }
    }
})

const cssSizeVar = (pre) => (amount) => {
    return Size.fromString(amount).match({
        default: x => `var(--${pre}-${x})`,
        none: () => `${amount}px`
    })
}

/**
 * 
 * @param {"small" | "medium" | "large" | "huge" | number} amount 
 * @returns {string}
 */
export const margin = (amount) => cssSizeVar("margin")(amount)
/**
 * 
 * @param {"small" | "medium" | "large" | "huge" | number} amount 
 * @returns {string}
 */
export const padding = (amount) => cssSizeVar("padding")(amount)
/**
 * 
 * @param {"small" | "medium" | "large" | "huge" | number} amount 
 * @returns {string}
 */
export const spacing = (amount) => cssSizeVar("spacing")(amount)

export const Colors = {
    primary:"#1a237e",
    light:"#534bae",
    dark:"#000051",
    white:"#fff",
    black:"#000",
    success:"#388e3c",
    danger: "#a30000"
}