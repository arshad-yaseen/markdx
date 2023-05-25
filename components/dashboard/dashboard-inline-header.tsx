interface DashboardInlineHeaderProps {
  heading: string
  text?: string
  children?: React.ReactNode
}

export function DashboardInlineHeader({
  heading,
  text,
  children,
}: DashboardInlineHeaderProps) {
  return (
    <div className="flex flex-col px-2 sm:flex-row sm:items-center sm:justify-between">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && (
          <p className="mb-4 text-lg text-muted-foreground sm:mb-0">{text}</p>
        )}
      </div>
      {children}
    </div>
  )
}
