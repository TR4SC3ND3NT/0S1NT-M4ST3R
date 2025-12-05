"use client"

import { useEffect, useState, FormEvent } from "react"
import type { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AuthBar() {
  const [user, setUser] = useState<User | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()
        if (!isMounted) return
        if (error) {
          console.error(error)
          return
        }
        setUser(data.user ?? null)
      } catch (err) {
        console.error(err)
      }
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isMounted) return
      setUser(session?.user ?? null)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSignIn = async (e?: FormEvent) => {
    if (e) e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      setPassword("")
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async () => {
    if (!email || !password) return

    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      setPassword("")
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setError(error.message)
        return
      }

      setEmail("")
      setPassword("")
      setUser(null)
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Try again.")
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="flex items-center space-x-2 mr-2">
        <span className="hidden md:inline text-xs text-muted-foreground max-w-[160px] truncate">
          {user.email}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          disabled={loading}
          className="h-8 px-3 text-xs"
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Выйти"}
        </Button>
      </div>
    )
  }

  return (
    <form
      className="flex items-center space-x-2 mr-2"
      onSubmit={handleSignIn}
    >
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="h-8 w-32 md:w-40 text-xs"
        autoComplete="email"
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="h-8 w-28 md:w-32 text-xs"
        autoComplete="current-password"
      />
      <Button type="submit" size="sm" disabled={loading} className="h-8 px-3 text-xs">
        {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : "Войти"}
      </Button>
      <Button
        type="button"
        size="sm"
        variant="outline"
        disabled={loading}
        onClick={handleSignUp}
        className="h-8 px-3 text-xs"
      >
        Регистрация
      </Button>

      {error && (
        <span className="hidden lg:inline text-[10px] text-red-500 ml-1 max-w-[160px] truncate">
          {error}
        </span>
      )}
    </form>
  )
}
