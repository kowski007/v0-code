"use client"

import { Card, CardBody } from "@heroui/react"

export default function About() {
  return (
    <main className="w-full min-h-screen py-12 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          About OyaTalk
        </h1>
        <p className="text-gray-600 mb-12">
          Meet OyaTalk — the flagship AI voice assistant by NaijaPrompt, designed for Nigeria and Africa.
        </p>

        <div className="space-y-6">
          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Who We Are</h2>
              <p className="text-gray-700 mb-4">
                OyaTalk is created by <strong>NaijaPrompt</strong>, an AI agency based in Lagos, Nigeria. We are building the ultimate personal assistant for Nigeria and Africa — a smart, multilingual AI that can plan, manage, and execute tasks entirely through natural voice conversation.
              </p>
              <p className="text-gray-700">
                Powered by ElevenLabs technology but fully designed and customized by NaijaPrompt, OyaTalk reflects Nigerian intelligence, warmth, and linguistic diversity.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700">
                OyaTalk blends world-class AI performance with authentic Nigerian warmth, humour, and cultural fluency — a truly local voice for a global future. We believe technology should adapt to how humans communicate, not the other way around.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Multilingual & Culturally Aware</h2>
              <p className="text-gray-700 mb-4">
                OyaTalk speaks Nigerian English, Pidgin, and understands Yoruba, Igbo, and Hausa. She can code-switch fluidly and use natural local expressions where appropriate.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Nigerian English and Pidgin</li>
                <li>Yoruba, Igbo, and Hausa language support</li>
                <li>Deep understanding of Nigerian culture and context</li>
                <li>Natural code-switching and local expressions</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What OyaTalk Can Do</h2>
              <p className="text-gray-700 mb-4">
                As an autonomous agent, OyaTalk can help you with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Plan and organize: schedule meetings, set reminders, create to-do lists</li>
                <li>Research: gather live data and summarize insights</li>
                <li>Work management: manage tasks in Linear, Trello, or Notion</li>
                <li>Communication: send messages via Slack, email, or SMS</li>
                <li>Personal tasks: order food, book rides (Bolt, Uber), buy tickets, check flights</li>
                <li>Language translation and interpretation</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Powered by ElevenLabs</h2>
              <p className="text-gray-700">
                OyaTalk is powered by ElevenLabs' cutting-edge technology — featuring advanced Text-to-Speech, Speech-to-Text, Voice Cloning, and AI Agents platform. NaijaPrompt has customized this technology to create an assistant that truly understands and serves the Nigerian and African market.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The NaijaPrompt Ecosystem</h2>
              <p className="text-gray-700 mb-4">
                OyaTalk operates within the NaijaPrompt ecosystem, connected to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>The NaijaPrompt Marketplace at <strong>naijaprompt.ng</strong> for tools, plugins, and agent extensions</li>
                <li>External APIs and integrations for real-world actions</li>
                <li>Custom integrations tailored for Nigerian businesses and users</li>
              </ul>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
