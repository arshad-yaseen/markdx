import { Button } from "../ui/button"

function AITools() {
  return (
    <>
      <div className="space-y-4">
        <Button variant="outline" className="flex w-full justify-center px-6  ">
          Standardize or Format
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Summarize
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Explain
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Document code
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Generate or Convert code
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Correct grammar
        </Button>
        <Button variant="outline" className="flex w-full justify-center px-6 ">
          Translate
        </Button>
        <Button className="flex w-full justify-center px-6 ">
          Ask AI to write
        </Button>
      </div>
    </>
  )
}

export default AITools
