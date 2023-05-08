import React from "react";
import { Button } from "../ui/button";

function EditorLeft() {
  return (
    <div className="w-[20%] h-full border-r flex flex-col items-center py-6 px-6 ">
      <div className="space-y-4">
        <Button variant="outline" className="w-full ">
          Standardize or Format
        </Button>
        <Button variant="outline" className="w-full ">
          Summarize
        </Button>
        <Button variant="outline" className="w-full ">
          Explain
        </Button>
        <Button variant="outline" className="w-full ">
          Document code
        </Button>
        <Button variant="outline" className="w-full ">
          Generate or Convert code
        </Button>
        <Button variant="outline" className="w-full ">
          Correct grammar
        </Button>
        <Button variant="outline" className="w-full ">
          Translate
        </Button>
        <Button className="w-full ">Ask AI to write</Button>
      </div>
      <hr />
      <div className="flex-1 w-full flex flex-col space-y-4 justify-end py-6">
        <Button variant="outline" className="w flex">
          Download
        </Button>
        <Button variant="outline" className="w flex">
          Show preview
        </Button>
      </div>
    </div>
  );
}

export default EditorLeft;
