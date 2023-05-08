"use client";

import EditorLeft from "@/components/editor/EditorLeft";
import Preview from "@/components/editor/Preview";
import EditorSection from "@/components/editor/EditorSection";
import React, { useState } from "react";

function page({ params }: { params: { id: string } }) {
  const markdown = `# Project title\n\nStart writing your markdown here`;
  const [editorCode, setEditorCode] = useState(markdown);

  return (
    <div className="w-full h-[92vh] flex">
      <EditorLeft />
      <EditorSection
        markdown={markdown}
        onCodeChange={(code) => {
          setEditorCode(code);
        }}
      />
      <Preview code={editorCode} />
    </div>
  );
}

export default page;
