"use client"

import { Card, CardBody, Accordion, AccordionItem } from "@heroui/react"

export default function FAQ() {
  const faqs = [
    {
      question: "What is OyaTalk?",
      answer: "OyaTalk is a smart, multilingual Nigerian AI voice assistant — the flagship creation of NaijaPrompt, an AI agency in Lagos. She's powered by ElevenLabs technology and built to be the ultimate personal assistant, helping users plan, research, communicate, and manage daily life entirely through natural voice conversation. OyaTalk blends world-class AI performance with authentic Nigerian warmth, humour, and cultural fluency."
    },
    {
      question: "Who created OyaTalk?",
      answer: "OyaTalk is created by NaijaPrompt, an AI agency based in Lagos, Nigeria. While powered by ElevenLabs technology, OyaTalk is fully designed and customized by NaijaPrompt to reflect Nigerian intelligence, warmth, and linguistic diversity."
    },
    {
      question: "What languages does OyaTalk speak?",
      answer: "OyaTalk speaks Nigerian English, Pidgin, and understands Yoruba, Igbo, and Hausa. She can code-switch fluidly and use natural local expressions like 'Abeg wait small', 'How far?', or 'No wahala'. She understands Nigerian culture deeply and can communicate naturally in the way Nigerians actually speak."
    },
    {
      question: "How do I start using OyaTalk?",
      answer: "Simply click on the 'Get Started' button or choose any of the action cards on the homepage. You can then speak naturally to OyaTalk like you would to a personal assistant — in English, Pidgin, or any mix of languages. Describe what you want to accomplish and OyaTalk will help you."
    },
    {
      question: "What can OyaTalk help me with?",
      answer: "OyaTalk can help with: planning and organizing (schedule meetings, set reminders, create to-do lists); research (gather live data, summarize insights); work management (manage tasks in Linear, Trello, or Notion); communication (send messages via Slack, email, or SMS); personal tasks (order food, book rides with Bolt or Uber, buy tickets, check flights); and language translation between English, Pidgin, Yoruba, Igbo, and Hausa."
    },
    {
      question: "Is OyaTalk a female assistant?",
      answer: "Yes, OyaTalk is a friendly, proactive, and highly intelligent female assistant with a world-class engineering background. Her voice is warm, witty, and relaxed, effortlessly balancing professionalism with a chill, approachable vibe."
    },
    {
      question: "Can I speak Pidgin to OyaTalk?",
      answer: "Absolutely! OyaTalk speaks Nigerian English, Pidgin, and understands local languages. You can speak pure Pidgin, mix languages naturally (code-switching), or use local expressions. OyaTalk understands Nigerian culture, slang, and context deeply."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, all conversations are encrypted and processed securely through ElevenLabs' infrastructure. OyaTalk is designed to be ethical, culturally sensitive, and secure. We do not store personal data beyond the current session, and we maintain strict privacy standards."
    },
    {
      question: "What is the NaijaPrompt Marketplace?",
      answer: "The NaijaPrompt Marketplace at naijaprompt.ng is a platform for tools, plugins, and agent extensions that enhance OyaTalk's capabilities. It's part of the NaijaPrompt ecosystem and allows for custom integrations tailored for Nigerian businesses and users."
    },
    {
      question: "Can OyaTalk integrate with my existing tools?",
      answer: "Yes! OyaTalk connects to external APIs and integrations including Perplexity, Linear, Slack, Notion, Trello, and more. She can also connect to local Nigerian services like Bolt, Uber, and food delivery platforms. For custom integrations, visit naijaprompt.ng or contact the NaijaPrompt team."
    },
    {
      question: "Does OyaTalk understand Nigerian culture?",
      answer: "Yes! OyaTalk understands Nigerian culture deeply — from tech and business to entertainment, traffic, slang, and humour. She is sensitive to regional and cultural nuances, keeping her tone inclusive and positive across all communities."
    },
    {
      question: "How is OyaTalk different from other AI assistants?",
      answer: "OyaTalk is built specifically for Nigeria and Africa. Unlike generic AI assistants, she speaks Nigerian English and Pidgin, understands local languages (Yoruba, Igbo, Hausa), and is deeply familiar with Nigerian culture. She integrates with local services like Bolt and understands the Nigerian context in ways that global assistants don't."
    }
  ]

  return (
    <main className="w-full min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-3xl w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 text-center mb-12">
          Find answers to common questions about OyaTalk and how to use it.
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
