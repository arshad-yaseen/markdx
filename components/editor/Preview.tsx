import ParseMarkdown from "./ParseMarkdown"
import "@/styles/mdx.css"

function Preview({ code }: { code: string }) {
  return (
    <div className="flex h-full  w-[35%] flex-col overflow-scroll border-l px-12 py-8">
      <ParseMarkdown code={code} />
    </div>
  )
}

export default Preview
