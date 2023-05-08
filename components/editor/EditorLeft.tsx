import React from "react";
import { Button } from "../ui/button";

function EditorLeft() {
  return (
    <div className="w-[20%] h-full border-r flex flex-col items-center py-6 px-6 ">
      <div className="space-y-4">
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Standardize or Format
        </Button>
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Summarize
        </Button>
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Explain
        </Button>
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Document code
        </Button>
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Generate or Convert code
        </Button>
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Correct grammar
        </Button>
        <Button variant="outline" className="w-full flex px-6 justify-start">
          Translate
        </Button>
        <Button className="w-full flex px-6 justify-start">
          Ask AI to write
        </Button>
      </div>
      <hr />
      <div className="flex-1 w-full flex flex-col space-y-4 justify-end py-6">
        <Button variant="outline" className="w-full flex justify-start">
          Download
        </Button>
        <Button variant="outline" className="w-full flex justify-start">
          Show preview
        </Button>
      </div>
    </div>
  );
}

export default EditorLeft;
