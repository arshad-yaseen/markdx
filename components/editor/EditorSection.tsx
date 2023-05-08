"use client";

import Editor from "@monaco-editor/react";
import { useState } from "react";

function EditorSection({
  markdown,
  onCodeChange,
}: {
  markdown: string;
  onCodeChange: (value: string) => void;
}) {
  const [code, setCode] = useState(markdown);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
    onCodeChange(value || "");
  };

  return (
    <div className="w-[45%] h-full flex flex-col items-center">
      <Editor
        width={`100%`}
        language={"markdown"}
        value={code}
        onChange={handleEditorChange}
        options={{
          minimap: {
            enabled: false,
          },
          wordWrap: "on",
          wrappingIndent: "indent",
          scrollBeyondLastLine: false,
          scrollbar: {
            vertical: "hidden",
            horizontal: "hidden",
          },
          lineNumbers: "off",
          overviewRulerLanes: 0,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          glyphMargin: false,
          folding: false,
          renderLineHighlight: "none",
          fontSize: 14,
        }}
        className="p-12 "
      />
    </div>
  );
}

export default EditorSection;
