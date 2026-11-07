"use client"

import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusiness,
  Eye,
  EyeOff,
  ShieldCheck,
  Users,
} from "lucide-react"
import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const roles = [
  { value: "seeker", label: "Job seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const

type Role = (typeof roles)[number]["value"]

export default function SignUpPage() {
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const result = Object.fromEntries(formData.entries())
    const role = result.role as Role

    console.log("signup form data:", result)

    // database
    const { data, error } = await signUp.email({
      name: result.name as string,
      email: result.email as string,
      password: result.password as string,
      role,
    })
    console.log("signup result:", { data, error })

    if (error) {
      alert("Error signing up: " + error.message)
      console.error("Error signing up:", error)
      // Handle the error (e.g., show an error message to the user)
    } else {
      alert("Successfully signed up! Please sign in.")
      console.log("Successfully signed up:", data)
      router.push("/signin")
      // Handle successful sign-up (e.g., redirect the user)
    }
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
              Create your account
            </h1>
            <p className="mt-3 text-sm leading-6 text-white/60">
              Join HireLoop and take the next step in your career.
            </p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <fieldset className="space-y-3">
              <legend className="text-sm font-medium text-white/80">
                I want to join as
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((roleOption) => {
                  const RoleIcon =
                    roleOption.value === "seeker"
                      ? BriefcaseBusiness
                      : roleOption.value === "recruiter"
                        ? Users
                        : ShieldCheck

                  return (
                    <label key={roleOption.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={roleOption.value}
                        required
                        className="peer sr-only"
                      />
                      <span className="flex min-h-24 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2 py-3 text-center text-xs text-white/60 transition-colors peer-checked:border-[#5c53fe] peer-checked:bg-[#5c53fe]/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#5c53fe] hover:border-white/25 hover:bg-white/10">
                        <RoleIcon className="size-5" aria-hidden="true" />
                        {roleOption.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>

            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-white/80"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your full name"
                className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 text-sm text-white transition-colors outline-none placeholder:text-white/35 focus:border-[#5c53fe]"
              />
            </div>

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
                  autoComplete="new-password"
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

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-white/80"
              >
                Confirm password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Repeat your password"
                  className="h-12 w-full rounded-xl border border-white/15 bg-white/5 px-4 pr-12 text-sm text-white transition-colors outline-none placeholder:text-white/35 focus:border-[#5c53fe]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((visible) => !visible)}
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmed password"
                      : "Show confirmed password"
                  }
                  className="absolute top-1/2 right-3 -translate-y-1/2 rounded-md p-1.5 text-white/50 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#5c53fe] focus-visible:outline-none"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="size-5" aria-hidden="true" />
                  ) : (
                    <Eye className="size-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="h-12 w-full cursor-pointer rounded-xl bg-[#5c53fe] text-base text-white shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4f46f0]"
            >
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-white/60">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-[#817bff] hover:text-[#aaa6ff]"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
