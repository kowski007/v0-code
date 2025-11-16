"use client"

import { Card, CardBody } from "@heroui/react"

export default function About() {
  return (
    <main className="w-full min-h-screen py-12 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          About OyaPrompt
        </h1>
        <p className="text-gray-600 mb-12">
          Discover the story behind OyaPrompt and our mission to revolutionize AI assistance.
        </p>

        <div className="space-y-6">
          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700">
                OyaPrompt aims to make AI assistance accessible to everyone through natural voice conversation. We believe technology should adapt to how humans communicate, not the other way around.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Built with ElevenLabs</h2>
              <p className="text-gray-700 mb-4">
                OyaPrompt is powered by ElevenLabs' cutting-edge AI Agents platform, which combines:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Advanced natural language processing</li>
                <li>5,000+ premium AI voices</li>
                <li>Seamless integrations through MCP servers</li>
                <li>Enterprise-grade security and reliability</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Voice?</h2>
              <p className="text-gray-700">
                Voice is the most natural way for humans to communicate. It's faster than typing, more expressive than text, and accessible to everyone. OyaPrompt brings the power of AI to your voice.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">The Future</h2>
              <p className="text-gray-700">
                We're constantly expanding OyaPrompt's capabilities. Future updates will include more integrations, advanced customization options, and industry-specific solutions for enterprise users.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
