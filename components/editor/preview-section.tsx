import ParseMarkdown from "./parse-markdown"
import "@/styles/mdx.css"

function PreviewSection({ code }: { code: string }) {
  return (
    <div className="flex h-full  w-[35%] flex-col overflow-scroll border-l px-12 py-8">
      <ParseMarkdown code={code} />
    </div>
  )
}

export default PreviewSection
