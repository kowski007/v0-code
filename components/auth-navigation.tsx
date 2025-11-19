"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react"
import { Wallet, LogOut } from "lucide-react"

export function AuthNavigation() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setUser(user)
      setLoading(false)

      // Listen for auth changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
        setUser(session?.user || null)
      })

      return () => subscription?.unsubscribe()
    }

    checkAuth()
  }, [])

  if (loading) {
    return null
  }

  if (!user) {
    return (
      <NavbarItem>
        <Link href="/auth">
          <Button className="bg-foreground text-background font-medium px-6" radius="full">
            Sign In
          </Button>
        </Link>
      </NavbarItem>
    )
  }

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          isIconOnly
          className="bg-foreground text-background"
          radius="full"
        >
          <Wallet className="w-5 h-5" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User menu" className="bg-card border border-border">
        <DropdownItem
          textValue="wallet"
          as={Link}
          href="/wallet"
          startContent={<Wallet className="w-4 h-4" />}
        >
          My Wallet
        </DropdownItem>
        <DropdownItem
          textValue="logout"
          as="button"
          onClick={async () => {
            await supabase.auth.signOut()
            setUser(null)
          }}
          startContent={<LogOut className="w-4 h-4" />}
          color="danger"
        >
          Sign Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
