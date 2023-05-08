import Features from "@/components/Features"
import Hero from "@/components/Hero"
import OpenSource from "@/components/OpenSource"
import SiteFooter from "@/components/SiteFooter"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Hero />
      <Features />
      <OpenSource />
      <SiteFooter />
    </main>
  )
}
