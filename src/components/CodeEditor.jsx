import flourite from "flourite"
import hljs from "highlight.js"
import { useEffect } from "react"
import Editor from "react-simple-code-editor"
import { codeSnippets } from "../configs/codeSnippet"
import { fonts } from "../configs/font"
import { mergeClassNames } from "../utils/mergeClassName"
import useStore from "../store"
import { themes } from "../configs/theme"

export default function CodeEditor() {
  const store = useStore();

  useEffect(() => {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    const themeNames = Object.keys(themes);
    const randomIndex = Math.floor(Math.random() * themeNames.length);
    const randomTheme = themeNames[randomIndex];
    useStore.setState({
      ...randomSnippet,
      theme: randomTheme
    });
  }, []);

  useEffect(() => {
    if (store.autoDetectLanguage) {
      // TODO: check and handle if language is (c++, c#)
      const { language } = flourite(store.code, { noUnknown: true });
      useStore.setState({
        language: language.toLowerCase() || "plaintext",
      });
    }
  }, [store.autoDetectLanguage, store.code]);

  const onChangeTitle = (e) => {
    useStore.setState({ title: e.target.value });
  }

  return (
    <div
      className={mergeClassNames(
        "border-2 rounded-xl shadow-2xl",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20",
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5">
          <div className="rounded-full h-3 w-3 bg-red-500" />
          <div className="rounded-full h-3 w-3 bg-yellow-500" />
          <div className="rounded-full h-3 w-3 bg-green-500" />
        </div>
        <div className="col-span-4 flex justify-center">
          <input
            type="text"
            value={store.title}
            onChange={onChangeTitle}
            spellCheck={false}
            onClick={(e) => e.target.select()}
            className="bg-transparent text-center text-gray-400 text-sm font-medium focus:outline-none"
          />
        </div>
      </header>
      <div
        className={mergeClassNames(
          "px-4 pb-4",
          store.darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          value={store.code}
          onValueChange={(code) => useStore.setState({ code })}
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || "plaintext" })
              .value
          }
          style={{
            fontFamily: fonts[store.fontStyle].name,
            fontSize: store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => e.target.select()}
        />
      </div>
    </div>
  )
}
