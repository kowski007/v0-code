"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Card, Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from "@heroui/react"
import { Mail, Lock, Phone } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [activeTab, setActiveTab] = useState("login")

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        router.push("/wallet")
      }
    }

    checkAuth()
  }, [router])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      router.push("/wallet")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error

      setError("")
      alert("Check your email for the confirmation link!")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">PromptGuy</h1>
          <p className="text-foreground/70">Sign in to your wallet</p>
        </div>

        <Card className="p-8 bg-card border border-border">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-900 dark:text-red-200 text-sm">{error}</p>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={<Mail className="w-4 h-4 text-foreground/50" />}
                    classNames={{
                      input: "text-foreground",
                    }}
                  />
                </div>

                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startContent={<Lock className="w-4 h-4 text-foreground/50" />}
                    classNames={{
                      input: "text-foreground",
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  className="w-full bg-foreground text-background"
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    startContent={<Mail className="w-4 h-4 text-foreground/50" />}
                    classNames={{
                      input: "text-foreground",
                    }}
                  />
                </div>

                <div>
                  <label className="text-foreground/70 text-sm block mb-2">Password</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    startContent={<Lock className="w-4 h-4 text-foreground/50" />}
                    classNames={{
                      input: "text-foreground",
                    }}
                  />
                  <p className="text-foreground/60 text-xs mt-2">
                    At least 8 characters recommended
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  isLoading={loading}
                  className="w-full bg-foreground text-background"
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>

                <p className="text-foreground/60 text-xs text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </Card>

        <p className="text-center text-foreground/70 text-sm mt-6">
          Already have an account?{" "}
          <button
            onClick={() => setActiveTab("login")}
            className="text-foreground font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}
