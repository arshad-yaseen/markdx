import { Fragment } from "react"

export const withDesktopOnly = (Component: React.FC<any>) => {
  const WithDesktopOnly = (props: any) => {
    return (
      <Fragment>
        <div className="hidden md:block">
          <Component {...props} />
        </div>
        <div className="flex flex-col items-center px-6 py-32 md:hidden">
          <p className="mb-4 text-center text-2xl">🙂</p>
          <p className="text-center text-muted-foreground">
            This page is not available on mobile due to the editor&apos;s
            complexity and screen size limitations. Please access it on a
            desktop.
          </p>
        </div>
      </Fragment>
    )
  }

  return WithDesktopOnly
}
