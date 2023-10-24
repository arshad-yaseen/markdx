import ParseMarkdown from "./parse-markdown"
import "@/styles/mdx.css"
import { useEffect, useRef } from "react"
import { previewSectionRefAtom } from "@/atoms/editor"
import { useAtom } from "jotai"

import { useLocalStorage } from "@/lib/hooks/use-localstorage"

const BORDER_SIZE = 4

function PreviewSection({ code, loading }: { code: string; loading: boolean }) {
  const [, setPreviewSectionRefState] = useAtom(previewSectionRefAtom)
  const mPos = useRef<number | null>(null)
  const previewSectionRef = useRef<HTMLDivElement>(null)
  const [previewSectionWidth, setPreviewSectionWidth] = useLocalStorage(
    "preview-section-width",
    "0px"
  )

  // Set preview section ref
  useEffect(() => {
    setPreviewSectionRefState(previewSectionRef)
  }, [previewSectionRef])

  // Set preview section width
  useEffect(() => {
    const panel = previewSectionRef?.current
    if (panel) {
      panel.style.width = previewSectionWidth
    }
  }, [previewSectionWidth])

  // Resize preview section
  useEffect(() => {
    const panel = previewSectionRef?.current

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
      setPreviewSectionWidth(getComputedStyle(panel!).width)
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
      <div className="absolute left-0 top-0 h-full w-1 cursor-ew-resize transition-colors duration-300 hover:bg-foreground"></div>
      {loading && (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          Loading...
        </div>
      )}

      <ParseMarkdown code={code} codeCopyable className="pb-[80vh]" />
    </div>
  )
}

export default PreviewSection
