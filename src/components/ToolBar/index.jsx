import React, { useRef } from "react";
import { Input, Select, SelectItem, Slider, Switch, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
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
import { toPng, toSvg, toBlob } from 'html-to-image';
import { useCheckMobile } from "../../hooks/useCheckMobile";

const inputClasses = "flex items-center justify-between rounded-md bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-1/4";

const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

const ToolBar = ({
    codeEditorRef
}) => {
    const theme = useStore((state) => state.theme);
    const language = useStore((state) => state.language);
    const font = useStore((state) => state.fontStyle);
    const fontSize = useStore((state) => state.fontSize);
    const padding = useStore((state) => state.padding);
    const darkMode = useStore((state) => state.darkMode);

    const isMobile = useCheckMobile();

    const handleThemeChange = (e) => {
        if (!!e.target.value) {
            useStore.setState({ theme: e.target.value });
        }
    }

    const handleLanguageChange = (e) => {
        if (!!e.target.value) {
            useStore.setState({ language: e.target.value });
        }
    }

    const handleFontChange = (e) => {
        if (!!e.target.value) {
            useStore.setState({ fontStyle: e.target.value });
        }
    }

    const handleFontSizeChange = (e) => {
        if (!!e.target.value) {
            useStore.setState({ fontSize: Number(e.target.value) });
        }
    }

    const handlePaddingChange = (newPadding) => {
        if (!!newPadding) {
            useStore.setState({ padding: newPadding });
        }
    }

    const handleDarkModeChange = (darkMode) => {
        useStore.setState({ darkMode });
    }

    const showMessage = (message) => {
        toast(message, {
            autoClose: 2000,
            position: "bottom-center",
            theme: "dark",
        });
    }

    const showErrorMessage = (message) => {
        toast.error(message, {
            autoClose: 2000,
            position: "bottom-center",
            theme: "dark",
        });
    }

    const saveImageAs = (type) => async () => {
        const saveImageFunction = {
            'png': toPng,
            'svg': toSvg,
        }[type];
        try {
            const image = await saveImageFunction(codeEditorRef.current);
            const link = document.createElement('a');
            link.download = `code.${type}`;
            link.href = image;
            link.click();
            showMessage(`Saved as ${type.toUpperCase()}!`);
        } catch (error) {
            showErrorMessage('Something went wrong!');
        }
    }

    const copyToClipboard = async () => {
        try {
            const imgBlob = await toBlob(codeEditorRef.current);
            const img = new ClipboardItem({ "image/png": imgBlob });
            navigator.clipboard.write([img]);
            showMessage("Copied to clipboard!");
        } catch (error) {
            showErrorMessage('Something went wrong!');
        }
    }

    return (
        <div className='w-full rounded-xl border text-card-foreground shadow bottom-16 p-2 md:py-6 md:px-8 bg-neutral-900/90 backdrop-blur mb-16 block md:flex'>
            <div className="block md:flex md:w-3/5">
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
            <div className="block md:flex md:w-2/5">
                {
                    isMobile
                        ? null : (
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
                        )

                }
                <div className="max-w-md gap-3 w-2/5 px-3 py-2 flex flex-col">
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
                <div className="max-w-md gap-3 py-2 w-2/5 px-3">
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
                                startContent={<SaveAsPNGIcon className={iconClasses} />}
                                onPress={saveImageAs('png')}
                            >
                                Save as PNG
                            </DropdownItem>
                            <DropdownItem
                                key="saveAsSVG"
                                startContent={<SaveAsSVGIcon className={iconClasses} />}
                                onPress={saveImageAs('svg')}
                            >
                                Save as SVG
                            </DropdownItem>
                            <DropdownItem
                                key="copyToClipboard"
                                startContent={<CopyToClipboardIcon className={iconClasses} />}
                                onPress={copyToClipboard}
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
