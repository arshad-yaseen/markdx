import { Analytics } from "@vercel/analytics/react"
import { Provider as TextBalancer } from "react-wrap-balancer"
import { Toaster } from "sonner"

import { ThemeProvider } from "@/components/theme-provider"

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      <TextBalancer>{children}</TextBalancer>
      <Analytics debug={false} />
      <Toaster
        closeButton
        toastOptions={{
          className: "sonner-toast",
        }}
      />
    </ThemeProvider>
  )
}

export default Providers
