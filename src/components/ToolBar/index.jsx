import React from "react";
import { Input, Select, SelectItem, Slider, Switch, Popover, PopoverTrigger, PopoverContent, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { themes } from "../../configs/theme";
import { fonts } from "../../configs/font";
import { languages } from "../../configs/language";
import useStore from "../../store";
import { mergeClassNames } from "../../utils/mergeClassName";
import { SunIcon } from "../SVGIcons/Sun";
import { MoonIcon } from "../SVGIcons/Moon";
import { ShareIcon } from "../SVGIcons/Share";
import { SaveAsPNGIcon } from "../SVGIcons/SaveAsPNG";
import { SaveAsSVGIcon } from "../SVGIcons/SaveAsSVG";
import { ThemeIconPlaceholder } from "../ThemeIconPlaceholder";
import { CopyToClipboardIcon } from "../SVGIcons/CopyToClipboard";
import { toast } from "react-toastify";

const inputClasses = "flex items-center justify-between rounded-md bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-1/4";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const ToolBar = () => {
    const theme = useStore((state) => state.theme);
    const language = useStore((state) => state.language);
    const font = useStore((state) => state.fontStyle);
    const fontSize = useStore((state) => state.fontSize);
    const padding = useStore((state) => state.padding);
    const darkMode = useStore((state) => state.darkMode);

    const [isOpenMenu, setIsOpenMenu] = React.useState(false);

    const handleThemeChange = (e) => {
        console.log('theme', e.target.value);
        if (!!e.target.value) {
            useStore.setState({ theme: e.target.value });
        }
    }

    const handleLanguageChange = (e) => {
        console.log('language', e.target.value);
        if (!!e.target.value) {
            useStore.setState({ language: e.target.value });
        }
    }

    const handleFontChange = (e) => {
        console.log('font', e.target.value);
        if (!!e.target.value) {
            useStore.setState({ fontStyle: e.target.value });
        }
    }

    const handleFontSizeChange = (e) => {
        console.log('font size', e.target.value);
        if (!!e.target.value) {
            useStore.setState({ fontSize: Number(e.target.value) });
        }
    }

    const handlePaddingChange = (newPadding) => {
        console.log('padding', newPadding);
        if (!!newPadding) {
            useStore.setState({ padding: newPadding });
        }
    }

    const handleDarkModeChange = (darkMode) => {
        console.log('dark mode', darkMode);
        useStore.setState({ darkMode });
    }

    return (
        <div className='w-full rounded-xl border text-card-foreground shadow bottom-16 py-6 px-8 bg-neutral-900/90 backdrop-blur mb-16 flex'>
            <div className="flex w-3/5">
                <Select
                    label="Theme"
                    placeholder="Select theme"
                    selectedKeys={[theme]}
                    startContent={<ThemeIconPlaceholder selectedTheme={theme} />}
                    className={inputClasses}
                    onChange={handleThemeChange}>
                    {Object.entries(themes).map((themeData) => {
                        const [name, theme] = themeData;
                        return (
                            <SelectItem
                                key={name}
                                value={theme}
                                startContent={<div className={`h-4 w-4 rounded-full ${theme.background}`}></div>}>
                                {theme.name}
                            </SelectItem>
                        )
                    })}
                </Select>
                <Select
                    label="Language"
                    placeholder="Select language"
                    selectedKeys={[language]}
                    className={inputClasses}
                    onChange={handleLanguageChange}>
                    {Object.entries(languages).map((languaeData) => {
                        const [name, font] = languaeData;
                        return (
                            <SelectItem
                                onSelect={handleLanguageChange}
                                key={name}
                                value={name}>
                                {font}
                            </SelectItem>
                        )
                    })}
                </Select>
                <Select
                    label="Font"
                    placeholder="Select font"
                    selectedKeys={[font]}
                    className={inputClasses}
                    onChange={handleFontChange}>
                    {Object.entries(fonts).map((fontData) => {
                        const [name, font] = fontData;
                        return (
                            <SelectItem key={name} value={font}>
                                {font.name}
                            </SelectItem>
                        )
                    })}
                </Select>
                <Input
                    type="number"
                    label="Font size"
                    placeholder="14"
                    value={fontSize}
                    labelPlacement="inside"
                    onChange={handleFontSizeChange}
                    endContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">px</span>
                        </div>
                    }
                    className={inputClasses}
                />
            </div>
            <div className="flex w-2/5">
                <Slider
                    size="md"
                    label="Padding"
                    maxValue={128}
                    minValue={16}
                    step={1}
                    hideValue
                    defaultValue={padding}
                    classNames={{
                        base: "max-w-md gap-3 py-2 w-2/5 px-3 py-2",
                    }}
                    onChange={handlePaddingChange}
                />
                <div className="max-w-md gap-3 py-2 w-2/5 px-3 py-2 flex flex-col">
                    <span className="text-small">Dark mode</span>
                    <Switch
                        isSelected={darkMode}
                        size="sm"
                        color="default"
                        onValueChange={handleDarkModeChange}
                        thumbIcon={({ isSelected, className }) =>
                            isSelected ? (
                                <SunIcon className={className} />
                            ) : (
                                <MoonIcon className={className} />
                            )
                        }
                    >
                    </Switch>
                </div>

                <div className="max-w-md gap-3 py-2 w-2/5 px-3 py-2">
                    <Dropdown backdrop="blur">
                        <DropdownTrigger>
                            <Button
                                startContent={<ShareIcon />}
                                variant="solid"
                            >
                                Export
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                            <DropdownItem
                                key="saveAsPNG"
                                shortcut="⌘S"
                                startContent={<SaveAsPNGIcon className={iconClasses} />}
                            >
                                Save as PNG
                            </DropdownItem>
                            <DropdownItem
                                key="saveAsSVG"
                                shortcut="⌘⇧S"
                                startContent={<SaveAsSVGIcon className={iconClasses} />}
                            >
                                Save as SVG
                            </DropdownItem>
                            <DropdownItem
                                key="copyToClipboard"
                                shortcut="⌘C"
                                startContent={<CopyToClipboardIcon className={iconClasses} />}
                            >
                                Copy to clipboard
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
        </div>
    );
}

export default ToolBar;
