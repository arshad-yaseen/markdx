interface EditorProps {
  children?: React.ReactNode
}

export const metadata = {
  title: "Editor",
}

export default function EditorLayout({ children }: EditorProps) {
  return <div>{children}</div>
}
