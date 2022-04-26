export const NOT_AVAILABLE = "N/A";
export const UNKNOWN_NUMBER = -1;

export function isNil(value: any) {
    return value === null || value === undefined
}

export function isNotNil(value: any) {
    return !isNil(value)
}
