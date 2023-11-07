import { useEffect, useRef, useState } from 'react';
import './index.css';
import CodeEditor from './components/CodeEditor';
import useStore from './store';
import { themes } from './configs/theme';
import { fonts } from './configs/font';
import { mergeClassNames } from './utils/mergeClassName';
import { Resizable } from "re-resizable";
import ToolBar from './components/ToolBar';
import WidthMeasurement from './components/WidthMeasurement';
import { Button } from '@nextui-org/react';

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
    <main className="w-full p-4 min-h-screen items-center dark text-foreground bg-background">
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
      <div className='container flex-column'>
        <ToolBar codeEditorRef={editorRef}/>
        <div className="w-full justify-center flex" id='code-editor'>
          <Resizable
            enable={{ left: true, right: true }}
            minWidth={padding * 2 + 500}
            maxWidth={'100%'}
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
            <WidthMeasurement showWidth={showWidth} width={width} />
            <div
              className={mergeClassNames(
                "transition-opacity w-fit mx-auto -mt-4",
                showWidth || width === "auto"
                  ? "invisible opacity-0"
                  : "visible opacity-100"
              )}
            >
              <Button size="sm" onClick={() => setWidth("auto")} variant="ghost">
                Reset width
              </Button>
            </div>
          </Resizable>
        </div>
      </div>
    </main>
  );
}

export default App;
