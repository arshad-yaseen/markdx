import EditorLeft from "@/components/editor/EditorLeft";
import EditorRight from "@/components/editor/EditorRight";
import EditorSection from "@/components/editor/EditorSection";
import React from "react";

function page({ params }: { params: { id: string } }) {
  const markdown = `# Hello World\nThis is a test`;

  return (
    <div className="w-full h-[92vh] flex">
      <EditorLeft />
      <EditorSection markdown={markdown} />
      <EditorRight />
    </div>
  );
}

export default page;
