import { themes } from "../configs/theme";
import { mergeClassNames } from "../utils/mergeClassName";

export const ThemeIconPlaceholder = ({ selectedTheme }) => {
    return (
        <span className={mergeClassNames("h-4 w-5 rounded-full", themes[selectedTheme].background ?? "bg-gradient-to-br from-pink-400 to-pink-600")}>
        </span>
    );
}
