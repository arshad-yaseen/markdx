import "@/styles/mdx.css"
import SectionLoading from "@/components/editor/section-loading"

import ParseMarkdown from "./parse-markdown"

function PreviewSection({ code }: { code: string }) {
  const loading = code === ""

  return (
    <div className="relative flex  h-full w-full flex-col  overflow-scroll border-t px-12 py-8  lg:border-t-0">
      {loading && <SectionLoading />}
      <ParseMarkdown code={code} className="pb-[80vh]" />
    </div>
  )
}

export default PreviewSection
