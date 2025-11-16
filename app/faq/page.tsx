"use client"

import { Card, CardBody, Accordion, AccordionItem } from "@heroui/react"

export default function FAQ() {
  const faqs = [
    {
      question: "What is OyaPrompt?",
      answer: "OyaPrompt is an AI-powered voice assistant built with ElevenLabs Agents that helps you accomplish tasks through natural conversation, from sending emails to ordering food and rides."
    },
    {
      question: "How do I start a conversation?",
      answer: "Click on the 'Enter Main Chat' button or any of the CTA cards on the landing page. You can then interact with the voice assistant to accomplish your desired task."
    },
    {
      question: "What tasks can the agent help with?",
      answer: "Currently, OyaPrompt supports sending emails, ordering food, ordering rides, and reading/summarizing documents. More integrations coming soon."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all conversations are encrypted and processed securely through ElevenLabs' infrastructure. We never store personal data beyond the current session."
    },
    {
      question: "Can I customize the AI voice?",
      answer: "Yes, ElevenLabs offers access to 5,000+ voices. You can select your preferred voice from our library or clone your own."
    },
    {
      question: "What are MCP servers?",
      answer: "MCP (Model Context Protocol) servers allow OyaPrompt to connect to external services and APIs, enabling seamless integrations with tools like Perplexity, Linear, and Slack."
    }
  ]

  return (
    <main className="w-full min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Find answers to common questions about OyaPrompt and how to use it.
        </p>

        <Card className="bg-gray-50 border border-gray-200">
          <CardBody className="p-0">
            <Accordion variant="splitted">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  title={faq.question}
                  className="text-gray-900 font-semibold"
                >
                  <p className="text-gray-700">{faq.answer}</p>
                </AccordionItem>
              ))}
            </Accordion>
          </CardBody>
        </Card>
      </div>
    </main>
  )
}
