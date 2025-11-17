
"use client"

import { Card, CardBody } from "@heroui/react"
import { Button } from "@heroui/react"
import { Users, BookOpen, Mic, MapPin } from 'lucide-react'

export default function Contributors() {
  return (
    <main className="w-full min-h-screen py-12 px-4">
      <div className="max-w-3xl w-full mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Become a Contributor
        </h1>
        <p className="text-muted-foreground mb-12">
          Help us build a culturally accurate, unbiased knowledge base for OyaTalk — powered by authentic Nigerian and African voices.
        </p>

        <div className="space-y-6">
          <Card className="bg-card border border-border">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Why Contribute?</h2>
              <p className="text-muted-foreground mb-4">
                OyaTalk aims to provide accurate, culturally-sensitive responses about Nigeria and Africa. To achieve this, we need authentic voices from diverse communities to help train our dataset.
              </p>
              <p className="text-muted-foreground mb-4">
                Your contributions ensure that when OyaTalk speaks about:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Cities, villages, and communities — she gets the history, culture, and pronunciation right</li>
                <li>People and historical figures — she provides accurate, balanced information</li>
                <li>Local languages and dialects — she understands and respects linguistic diversity</li>
                <li>Cultural practices and traditions — she speaks with authenticity and respect</li>
                <li>Places and landmarks — she knows the local context and significance</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-card border border-border">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">What We're Building</h2>
              <p className="text-muted-foreground mb-4">
                The OyaTalk knowledge base is a collaborative effort to create a uniform, accurate dataset that ensures:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex gap-3">
                  <BookOpen className="w-6 h-6 text-foreground flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Accurate Information</h3>
                    <p className="text-sm text-muted-foreground">Verified facts about people, places, and events across Nigeria and Africa</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mic className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Proper Pronunciation</h3>
                    <p className="text-sm text-gray-700">Correct pronunciation of local names, places, and terms in various Nigerian languages</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Cultural Context</h3>
                    <p className="text-sm text-gray-700">Deep understanding of local customs, traditions, and regional differences</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Users className="w-6 h-6 text-gray-900 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Unbiased Perspectives</h3>
                    <p className="text-sm text-gray-700">Balanced, inclusive information from diverse Nigerian and African communities</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Contribute</h2>
              <p className="text-gray-700 mb-4">
                As a contributor, you can help train OyaTalk's dataset in several ways:
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">1. Submit Local Knowledge</h3>
                  <p className="text-gray-700">Share accurate information about your city, village, community, or region — including history, culture, landmarks, and notable people.</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">2. Provide Pronunciation Guides</h3>
                  <p className="text-gray-700">Record or transcribe proper pronunciation of local names, places, and terms in Yoruba, Igbo, Hausa, or other languages.</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">3. Review and Verify Information</h3>
                  <p className="text-gray-700">Help verify existing dataset entries for accuracy and cultural sensitivity, especially for your local area or community.</p>
                </div>
                <div className="border-l-4 border-gray-300 pl-4">
                  <h3 className="font-semibold text-gray-900 mb-2">4. Share Cultural Context</h3>
                  <p className="text-gray-700">Provide context about traditions, practices, slang, and cultural nuances that OyaTalk should understand.</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contribution Guidelines</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>All information must be accurate and verifiable</li>
                <li>Provide balanced perspectives, avoiding bias or stereotypes</li>
                <li>Respect cultural sensitivity and regional differences</li>
                <li>Include sources or references where applicable</li>
                <li>Use inclusive language that respects all Nigerian communities</li>
                <li>Pronunciation guides should follow standard linguistic notation</li>
              </ul>
            </CardBody>
          </Card>

          <Card className="bg-white border border-gray-200">
            <CardBody className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h2>
              <p className="text-gray-700 mb-6">
                Ready to help build a more accurate, culturally-aware AI for Nigeria and Africa? Join our community of contributors today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-gray-900 text-white font-medium px-6" 
                  radius="full"
                  as="a"
                  href="https://naijaprompt.ng"
                  target="_blank"
                >
                  Visit NaijaPrompt Marketplace
                </Button>
                <Button 
                  className="border-2 border-foreground text-foreground font-medium px-6 bg-card" 
                  radius="full"
                  variant="bordered"
                >
                  Contact the Team
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                For contributor support or questions, visit <strong>naijaprompt.ng</strong> or contact the NaijaPrompt team.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  )
}
