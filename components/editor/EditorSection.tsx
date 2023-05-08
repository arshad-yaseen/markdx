"use client";

import { monacoConfig } from "@/config/editor";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import "@/styles/editor.css";

function EditorSection({
  markdown,
  onCodeChange,
}: {
  markdown: string;
  onCodeChange: (value: string) => void;
}) {
  const [code, setCode] = useState(markdown);
  const { theme } = useTheme();

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
    onCodeChange(value || "");
  };

  return (
    <div className="w-[45%] h-full flex flex-col items-center py-12 px-16">
      <Editor
        language={monacoConfig.language}
        value={code}
        theme={theme === "dark" ? "vs-dark" : "vs-light"}
        onChange={handleEditorChange}
        options={monacoConfig.options}
      />
    </div>
  );
}

export default EditorSection;
