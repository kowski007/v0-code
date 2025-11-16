import { Hero } from "@/components/hero"
import { CtaButtons } from "@/components/cta-buttons"
import { Features } from "@/components/features"

export default function Home() {
  return (
    <main className="flex flex-col w-full">
      <Hero />
      <CtaButtons />
      <Features />
    </main>
  )
}
