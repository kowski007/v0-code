"use client"

import { Card, CardBody } from "@heroui/react"

export default function Docs() {
  return (
    <main className="w-full min-h-screen py-12 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Documentation
        </h1>
        <p className="text-muted-foreground mb-12">
          Learn how to use OyaTalk and unlock the full power of voice-powered AI assistance.
        </p>

        <div className="space-y-6">
          <Card className="bg-card border border-border">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started</h2>
              <p className="text-muted-foreground mb-4">
                OyaTalk is a smart, multilingual Nigerian AI voice assistant that helps you accomplish tasks through natural conversation. Simply speak to OyaTalk like you would to a personal assistant — she understands Nigerian English, Pidgin, and local languages.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">Quick Steps:</h3>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Visit the OyaTalk homepage</li>
                <li>Click "Get Started" or choose a specific action card</li>
                <li>Start speaking naturally — describe what you want to accomplish</li>
                <li>OyaTalk will understand and help you complete the task</li>
                <li>You can speak in English, Pidgin, or mix languages naturally</li>
              </ol>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What OyaTalk Can Do</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Plan & Organize</h3>
                  <p className="text-gray-700">Schedule meetings, set reminders, create to-do lists, and manage your calendar through natural voice commands.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Research & Information</h3>
                  <p className="text-gray-700">Gather live data, get summaries, and research topics using integrated tools like Perplexity and web APIs.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Work Management</h3>
                  <p className="text-gray-700">Manage tasks in Linear, Trello, or Notion. Keep your projects organized and on track.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Communication</h3>
                  <p className="text-gray-700">Send messages via Slack, compose and send emails, or send SMS — all through voice commands.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Personal Tasks</h3>
                  <p className="text-gray-700">Order food, book rides with Bolt or Uber, buy tickets, check flight information, and handle daily errands.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Language Translation</h3>
                  <p className="text-gray-700">Translate and interpret between English, Pidgin, Yoruba, Igbo, and Hausa seamlessly.</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Language Support</h2>
              <p className="text-gray-700 mb-4">
                OyaTalk is built to understand how Nigerians actually speak. You can:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Speak in Nigerian English or pure Pidgin</li>
                <li>Mix languages naturally (code-switching)</li>
                <li>Use local expressions like "Abeg wait small", "How far?", "No wahala"</li>
                <li>Communicate in Yoruba, Igbo, or Hausa</li>
                <li>OyaTalk understands Nigerian culture, slang, and context</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology & Integrations</h2>
              <p className="text-gray-700 mb-4">
                OyaTalk is powered by ElevenLabs' advanced AI technology and created by NaijaPrompt. The platform connects to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>The NaijaPrompt Marketplace (naijaprompt.ng) for tools and extensions</li>
                <li>External APIs for real-world actions and live data</li>
                <li>Perplexity, Linear, Slack, Notion, Trello, and more</li>
                <li>Local Nigerian services (Bolt, Uber, food delivery, etc.)</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
              <p className="text-gray-700 mb-4">
                All conversations are encrypted and processed securely through ElevenLabs' infrastructure. We prioritize your privacy and data security.
              </p>
              <p className="text-gray-700">
                OyaTalk is designed to be ethical, culturally sensitive, and secure. We do not store personal data beyond the current session, and we maintain strict privacy standards.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Support & Contact</h2>
              <p className="text-gray-700">
                For account-specific support, custom integrations, or to learn more about NaijaPrompt's services, visit <strong>naijaprompt.ng</strong> or contact our team directly.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
