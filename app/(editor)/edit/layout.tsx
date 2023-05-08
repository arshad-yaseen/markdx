interface EditorProps {
  children?: React.ReactNode;
}

export default function EditorLayout({ children }: EditorProps) {
  return (
    <div>
      {children}
    </div>
  );
}
