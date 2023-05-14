import { Toaster } from "sonner"

import Features from "@/components/features"
import Hero from "@/components/hero"
import OpenSource from "@/components/open-source"
import SiteFooter from "@/components/site-footer"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Toaster />
      <Hero />
      <Features />
      <OpenSource />
      <SiteFooter />
    </main>
  )
}
