import EditorHeader from "@/components/editor/editor-header"

interface EditorProps {
  children?: React.ReactNode
}

export const metadata = {
  title: "Editor",
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div className="min-w-screen min-h-screen">
      <EditorHeader />
      {children}
    </div>
  )
}
