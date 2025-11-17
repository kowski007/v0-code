import { ConvAI } from "@/components/ConvAI"

export const metadata = {
  title: "Voice Chat - OyaTalk",
  description: "Turn your voice into organized notes with OyaTalk AI agents.",
}

export default function ChatPage() {
  return (
    <main className="flex flex-col w-full pt-12 pb-12 min-h-screen items-center justify-center">
      <ConvAI />
    </main>
  )
}
