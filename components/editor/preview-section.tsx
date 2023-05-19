import ParseMarkdown from "./parse-markdown"
import "@/styles/mdx.css"
import EditorSkeleton from "./skeleton"

function PreviewSection({ code, loading }: { code: string; loading: boolean }) {
  return (
    <div className="relative flex  h-full w-[35%] flex-col overflow-scroll border-l px-12 py-8">
      {loading && <EditorSkeleton />}
      <ParseMarkdown code={code} />
    </div>
  )
}

export default PreviewSection
