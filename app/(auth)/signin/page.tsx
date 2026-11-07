"use client"

import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { signIn } from "@/lib/auth-client"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const result = Object.fromEntries(formData.entries())

    console.log("signin form data:", result)

    // signin 
    const { data, error } = await signIn.email({
    email: result.email as string,
    password: result.password as string,
    rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: "/", 
    });

    if (error) {
        alert("Error signing in: " + error.message);
      console.error("Error signing in:", error)
      // Handle the error (e.g., show an error message to the user)
    } else {
       alert("Successfully signed in!");
      console.log("Successfully signed in:", data)
      // Handle successful sign-in (e.g., redirect the user)
    }

   console.log("signin result:", { data, error });


  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#010103] px-4 py-10 text-white sm:px-6">
      <div className="w-full max-w-[460px]">
        <Link
          href="/"
          className="mx-auto block w-fit rounded-sm focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none"
          aria-label="Hireloop home"
        >
          <Image
            src="/resources/images/logo.png"
            alt="Hireloop"
            width={154}
            height={44}
            priority
            className="h-10 w-auto"
          />
        </Link>

        <section className="mt-8 rounded-3xl border border-white/10 bg-[#101010] p-6 shadow-2xl shadow-[#5c53fe]/5 sm:p-10">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-manrope)] text-3xl font-bold tracking-[-0.02em]">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Sign in to continue finding your next opportunity.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-white/80"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white transition-colors outline-none placeholder:text-white/35 focus:border-[#5c53fe]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-white/80"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 pr-12 text-sm text-white transition-colors outline-none placeholder:text-white/35 focus:border-[#5c53fe]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-white/50 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="size-5" aria-hidden="true" />
                  ) : (
                    <Eye className="size-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-white/60">
              <input
                type="checkbox"
                name="remember"
                className="size-4 accent-[#5c53fe]"
              />
              Remember me
            </label>

            <Button
              type="submit"
              className="h-12 w-full rounded-xl bg-[#5c53fe] text-base text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#817bff] hover:text-[#aaa6ff]"
            >
              Create one
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
