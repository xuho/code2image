import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function mergeClassNames(...classNames) {
    return twMerge(clsx(classNames));
}
