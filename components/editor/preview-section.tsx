import ParseMarkdown from "./parse-markdown"
import "@/styles/mdx.css"
import EditorSkeleton from "./skeleton"

function PreviewSection({ code, loading }: { code: string; loading: boolean }) {
  return (
    <div className="relative flex  h-full w-full flex-col overflow-scroll border-l border-t px-12 py-8 lg:w-[36%]  lg:border-t-0">
      {loading && <EditorSkeleton />}
      <ParseMarkdown code={code} />
    </div>
  )
}

export default PreviewSection
