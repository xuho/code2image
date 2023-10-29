import { useEffect, useRef, useState } from 'react';
import './App.css';
import './index.css';
import CodeEditor from './components/CodeEditor';
import useStore from './store';
import { themes } from './configs/theme';
import { fonts } from './configs/font';
import { mergeClassNames } from './utils/mergeClassName';
import { Resizable } from "re-resizable";

function App() {
  const [width, setWidth] = useState("auto");
  const [showWidth, setShowWidth] = useState(false);
  const theme = useStore((state) => state.theme ?? 'candy');
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);
  const editorRef = useRef(null);

  useEffect(() => {
    // TODO: handle convert code from base64 text from url
  }, []);

  return (
    <main className="dark min-h-screen flex justify-center items-center bg-neutral-950 text-white">
      <link
        rel="stylesheet"
        href={themes[theme].theme}
        crossOrigin="anonymous"
      />
      <link
        rel="stylesheet"
        href={fonts[fontStyle].src}
        crossOrigin="anonymous"
      />
      <div className="App">
        <Resizable
          enable={{ left: true, right: true }}
          minWidth={padding * 2 + 400}
          size={{ width }}
          onResize={(e, dir, ref) => setWidth(ref.offsetWidth)}
          onResizeStart={() => setShowWidth(true)}
          onResizeStop={() => setShowWidth(false)}
        >
          <div
            className={mergeClassNames(
              "overflow-hidden mb-2 transition-all ease-out",
              showBackground ? themes[theme].background : "ring ring-neutral-900"
            )}
            style={{ padding }}
            ref={editorRef}
          >
            <CodeEditor />
          </div>
        </Resizable>
      </div>
    </main>
  );
}

export default App;
