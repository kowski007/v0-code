"use client"

import { Card, CardBody } from "@heroui/react"

export default function Docs() {
  return (
    <main className="w-full min-h-screen py-12 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Documentation
        </h1>
        <p className="text-gray-600 mb-12">
          Learn how to use OyaPrompt and integrate it with your workflow.
        </p>

        <div className="space-y-6">
          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
              <p className="text-gray-700 mb-4">
                OyaPrompt is an AI voice assistant that helps you accomplish tasks through natural conversation. Simply click on any of the action cards or enter the main chat to start interacting with the agent.
              </p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Steps:</h3>
              <ol className="list-decimal list-inside text-gray-700 space-y-2">
                <li>Visit the OyaPrompt homepage</li>
                <li>Click "Enter Main Chat" or choose a specific action card</li>
                <li>Describe what you want to accomplish</li>
                <li>The AI agent will help you complete the task</li>
              </ol>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Actions</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Send a Mail</h3>
                  <p className="text-gray-700">Compose and send emails directly through the voice assistant. Perfect for quick messages and follow-ups.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Order Food</h3>
                  <p className="text-gray-700">Browse restaurants, check menus, and place food orders using just your voice.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Order a Ride</h3>
                  <p className="text-gray-700">Request and book rides with a simple voice command. Fast and convenient transportation.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Read Documents</h3>
                  <p className="text-gray-700">Upload documents and get AI-powered summaries and insights instantly.</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">API Integration</h2>
              <p className="text-gray-700 mb-4">
                OyaPrompt uses ElevenLabs Agents API for voice processing and natural language understanding. The platform supports MCP (Model Context Protocol) servers for seamless third-party integrations.
              </p>
              <p className="text-gray-700">
                Currently supported integrations include Perplexity, Linear, Slack, and more. Custom integrations can be added through MCP server configuration.
              </p>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
              <p className="text-gray-700">
                All conversations are encrypted and processed securely. We do not store personal data beyond the current session. Your privacy is our priority.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
