import ParseMarkdown from "./parse-markdown"
import "@/styles/mdx.css"
import { useEffect, useRef } from "react"

import EditorSkeleton from "./skeleton"

const BORDER_SIZE = 4

function PreviewSection({ code, loading }: { code: string; loading: boolean }) {
  const previewSectionRef = useRef<HTMLDivElement | null>(null)
  const mPos = useRef<number | null>(null)

  useEffect(() => {
    const panel = previewSectionRef.current

    const resize = (e: MouseEvent) => {
      if (mPos.current !== null && panel) {
        const dx = mPos.current - e.x
        mPos.current = e.x
        panel.style.width = `${parseInt(getComputedStyle(panel).width) + dx}px`
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault()
      if (e.offsetX < BORDER_SIZE) {
        mPos.current = e.x
        document.addEventListener("mousemove", resize)
      }
    }

    const handleMouseUp = () => {
      mPos.current = null
      document.removeEventListener("mousemove", resize)
    }

    panel?.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      panel?.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mousemove", resize)
    }
  }, [])

  return (
    <div
      ref={previewSectionRef}
      className="preview-section relative flex  h-full w-full flex-col overflow-scroll border-l border-t px-12 py-8 lg:w-[36%] lg:min-w-[25%]  lg:border-t-0"
    >
      <div className="absolute left-0 top-0 h-full w-1 cursor-ew-resize"></div>
      {loading && <EditorSkeleton />}
      <ParseMarkdown code={code} codeCopyable />
    </div>
  )
}

export default PreviewSection
