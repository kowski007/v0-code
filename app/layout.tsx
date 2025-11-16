import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { HeroUIProvider, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@heroui/react"
import { Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

const instrumentSerif = Instrument_Serif({ 
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: "OyaPrompt - Voice to Organized Notes",
  description: "Transform your voice into structured notes with AI-powered conversation agents.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full w-full" suppressHydrationWarning>
      <body className={`${instrumentSerif.className} antialiased w-full h-full flex flex-col bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <HeroUIProvider>
            <Navbar isBordered maxWidth="full" className="bg-background border-b border-border">
              <NavbarBrand>
                <Link href="/" className="font-semibold text-lg text-foreground">
                  OyaPrompt
                </Link>
              </NavbarBrand>

              {/* Desktop Navigation */}
              <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                  <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                    Home
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="/chat" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                    Chat
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="/faq" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                    FAQ
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="/docs" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                    Docs
                  </Link>
                </NavbarItem>
                <NavbarItem>
                  <Link href="/about" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                    About
                  </Link>
                </NavbarItem>
              </NavbarContent>

              <NavbarContent justify="end" className="flex gap-2">
                <NavbarItem className="hidden sm:flex">
                  <ThemeToggle />
                </NavbarItem>
                <NavbarItem className="hidden sm:flex">
                  <Link href="/chat">
                    <Button className="bg-foreground text-background font-medium px-6" radius="full">
                      Get Started
                    </Button>
                  </Link>
                </NavbarItem>
                <NavbarItem className="sm:hidden">
                  <ThemeToggle />
                </NavbarItem>
              </NavbarContent>

              <NavbarMenuToggle className="sm:hidden ml-2" />

              {/* Mobile Menu */}
              <NavbarMenu className="bg-background">
                <NavbarMenuItem>
                  <Link href="/" className="w-full text-foreground/70 hover:text-foreground py-2">
                    Home
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link href="/chat" className="w-full text-foreground/70 hover:text-foreground py-2">
                    Chat
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link href="/faq" className="w-full text-foreground/70 hover:text-foreground py-2">
                    FAQ
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link href="/docs" className="w-full text-foreground/70 hover:text-foreground py-2">
                    Docs
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link href="/about" className="w-full text-foreground/70 hover:text-foreground py-2">
                    About
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="mt-4 flex gap-2">
                  <Link href="/chat" className="flex-1">
                    <Button className="w-full bg-foreground text-background font-medium" radius="full">
                      Get Started
                    </Button>
                  </Link>
                </NavbarMenuItem>
              </NavbarMenu>
            </Navbar>

            <div className="flex flex-col flex-grow w-full items-center justify-center px-4">
              {children}
            </div>
          </HeroUIProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
